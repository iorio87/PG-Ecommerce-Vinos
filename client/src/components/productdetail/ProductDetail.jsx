import "./productDetail.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  getReviewById,
  AddShoppingCart,
  addFavorite,
  deleteFavorite,
  getFavorite,
} from "../../actions/action";
import { FaShoppingCart, FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

function DetailsComponent() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { detailProduct, review, listFavorite } = useSelector((state) => state);
  const { user, isAuthenticated } = useAuth0();
  const [fav, setFav] = useState(false);
  let usuario = localStorage.getItem("user");

  let { id } = useParams(); //traer el id del url

  useEffect(() => {
    dispatch(getProductDetail(id));
    dispatch(getReviewById(id));
    getFav();
  }, [dispatch, id]);

  useEffect(() => {
    headerFav();
  }, [listFavorite]);

  function AddtoCart(id) {
    const producto = {
      id_prod_cart: id,
      amount: 1,
      product: {
        name: detailProduct.name ? detailProduct.name : "Nombre No Disponible",
        price: detailProduct.price ? detailProduct.price : 0,
        image: detailProduct.image,
      },
    };
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCarts"));
    if (!shoppingCart) {
      shoppingCart = [producto];
    } else {
      if (!shoppingCart.filter((prod) => prod.id_prod_cart === id).length > 0) {
        shoppingCart.push(producto);
      }
    }
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCart));
    if (isAuthenticated) {
      const id_usuario = user.sub;
      dispatch(
        AddShoppingCart({ id_usuario: id_usuario, products: shoppingCart })
      );
      toast.success('Producto agregado al carrito')
    } else {
      dispatch(AddShoppingCart({ products: shoppingCart }));
    }
  }

  function getFav() {
    if (usuario) {
      dispatch(getFavorite(usuario));
    }
  }

  function AddtoFav(id) {
    if (usuario) {
      dispatch(addFavorite({ id_usuario: usuario, id_prod: id }));
    }
  }

  function DeletetoFav(id) {
    if (usuario) {
      dispatch(deleteFavorite({ id_usuario: usuario, id_prod: id }));
    }
  }

  function headerFav() {
    let result = listFavorite.find((favorite) => favorite.id_prod == id);
    if (result) {
      setFav(true);
    } else {
      setFav(false);
    }
  }

  function createMarkup(xtext) {
    return { __html: xtext };
  }

  let precios = detailProduct.price / ((100 - detailProduct.descuento) / 100);

  // return detailProduct ? (
  //   <div className="inline-flex ">
  //     <nav aria-label="Breadcrumb" className="m-0">
  //       <ol className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"></ol>
  //     </nav>

  //     <div className="mt-10 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:gap-x-4">
  //       <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
  //         <img
  //           src={detailProduct.image}
  //           alt={detailProduct.name}
  //           className="w-[450px] h-full object-center object-cover"
  //         ></img>
  //       </div>
  //     </div>

  //     <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
  //       <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
  //         <h1 className="font-extrabold tracking-tight text-gray-900 sm:text-3xl">
  //           {detailProduct.name}
  //         </h1>
  //       </div>

  //       <div className="mt-4 lg:mt-0 lg:row-span-3">
  //         <h2 className="sr-only">Precio: $</h2>
  // {detailProduct.descuento > 0 ? (
  //   <div>
  //     <p className="text-base text-gray-600 font-bold">
  //       Precio
  //       <span className="line-through opacity-50">
  //         {" "}
  //         ${Math.floor(precios)}
  //       </span>
  //       &nbsp;
  //       <span className="text-base text-blue-600 font-bold">
  //         ${detailProduct.price} Dscto.{detailProduct.descuento}%
  //       </span>
  //     </p>
  //   </div>
  // ) : (
  //   <p className="text-3xl text-gray-900">${detailProduct.price}</p>
  // )}

  //         <div className="mt-6">
  //           <h3 className="sr-only">Reseñas</h3>
  //           <div className="flex items-center">
  //             <div className="flex items-center">
  //               <a className={BrightStar(1, review.avg)} href="#/">
  //                 ⭐
  //               </a>
  //               <a className={BrightStar(2, review.avg)} href="#/">
  //                 ⭐
  //               </a>
  //               <a className={BrightStar(3, review.avg)} href="#/">
  //                 ⭐
  //               </a>
  //               <a className={BrightStar(4, review.avg)} href="#/">
  //                 ⭐
  //               </a>
  //               <a className={BrightStar(5, review.avg)} href="#/">
  //                 ⭐
  //               </a>
  //             </div>
  //             <p className="sr-only">4 out of 5 stars</p>
  //             <a
  //               href="#/"
  //               className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
  //             >
  //               {review.count} Reseñas
  //             </a>
  //           </div>
  //         </div>
  //         <span
  //           className="absolute -inset-px rounded-md pointer-events-none"
  //           aria-hidden="true"
  //         ></span>
  //         {usuario && (
  //           <button
  //             type="submit"
  //             className="mt-10 w-full bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //             onClick={() => {
  //               if (fav === true) {
  //                 DeletetoFav(id);
  //               } else {
  //                 AddtoFav(id);
  //               }
  //             }}
  //           >
  //             {fav === true ? (
  //               <FaHeart className="mx-2 text-base" />
  //             ) : (
  //               <FaRegHeart className="mx-2 text-base" />
  //             )}
  //           </button>
  //         )}
  //         <button
  //           type="submit"
  //           className="mt-10 w-full bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //           onClick={() => AddtoCart(id)}
  //         >
  //           Agregar al Carrito
  //           <FaShoppingCart className="mx-2 text-base" />
  //         </button>
  //         <Link
  //           to={`/review/${id}`}
  //           className="mt-6 w-full bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //         >
  //           Ver Reseñas
  //         </Link>

  //         <Link
  //           to={"/"}
  //           className="mt-6 w-full bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //         >
  //           Pagina Principal
  //         </Link>
  //       </div>

  //       <div className="py-4 lg:pt-6 lg:pb-2 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
  //         <div className="">
  //           <div>
  //             <h3 className="sr-only">Descripcion:</h3>

  //             <div className="space-y-6">
  //               <p
  //                 className="text-base text-gray-900"
  //                 dangerouslySetInnerHTML={createMarkup(detailProduct.summary)}
  //               />
  //             </div>
  //           </div>

  //           <hr className="mt-4" />

  //           <div className="mt-6">
  //             <h3 className="text-sm font-medium text-gray-900">
  //               Caracteristicas
  //             </h3>

  //             <div className="mt-2">
  //               <ul className="pl-4 list-disc text-sm space-y-2">
  //                 <li className="text-gray-400">
  //                   <span className="text-gray-600">
  //                     Variedad:{" "}
  //                     {detailProduct.category && detailProduct.category.variety}
  //                   </span>
  //                 </li>
  //                 <li className="text-gray-400">
  //                   <span className="text-gray-600">
  //                     Tipo:{" "}
  //                     {detailProduct.category && detailProduct.category.type}
  //                   </span>
  //                 </li>
  //                 <li className="text-gray-400">
  //                   <span className="text-gray-600">
  //                     Degree Sugar:{" "}
  //                     {detailProduct.category &&
  //                       detailProduct.category.degreeSugar}
  //                   </span>
  //                 </li>
  //                 <li className="text-gray-400">
  //                   <span className="text-gray-600">
  //                     Origen:{" "}
  //                     {detailProduct.location &&
  //                       detailProduct.location.description}
  //                   </span>
  //                 </li>
  //                 <li className="text-gray-400">
  //                   <span className="text-gray-600">
  //                     Productor:{" "}
  //                     {detailProduct.productor &&
  //                       detailProduct.productor.description}
  //                   </span>
  //                 </li>
  //                 <li className="text-gray-400">
  //                   <span className="text-gray-600">
  //                     Grad. Alcoholica: {detailProduct.alcohol}
  //                   </span>
  //                 </li>
  //               </ul>
  //             </div>
  //           </div>

  //           <div className="mt-4 inline-flex">
  //             <h2 className="text-sm font-medium text-gray-900">Stock:</h2>

  //             <div className="px-2 space-y-6">
  //               <p className="text-sm text-gray-600">
  //                 {detailProduct.product_state &&
  //                   detailProduct.product_state.description}
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ) : null;

  // Nuevo detail

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className=" px-5 py-5 lg:mx-auto">
        <div className="flex">
        <Link
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold px-4 py-2 m-1 rounded focus:outline-none focus:shadow-outline align-right"
          to={-1}
        >
          <div className="flex items-center">
            <p>VOLVER</p>
          </div>
        </Link>
        </div>
        <div className=" mx-auto flex flex-wrap">
          <img
            alt={detailProduct.name}
            className="w-60 md:w-1/3 object-cover object-center rounded border border-gray-200"
            src={detailProduct.image}
          />
          <div className="md:w-2/3 w-full pl-2 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {detailProduct.productor?.description}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {detailProduct.name}
            </h1>
            {/* <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div> */}

            {/* ------Reviews------- */}

            <div className="mt-6">
              <h3 className="sr-only">Reseñas</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <a className={BrightStar(1, review.avg)} href="#/">
                    ⭐
                  </a>
                  <a className={BrightStar(2, review.avg)} href="#/">
                    ⭐
                  </a>
                  <a className={BrightStar(3, review.avg)} href="#/">
                    ⭐
                  </a>
                  <a className={BrightStar(4, review.avg)} href="#/">
                    ⭐
                  </a>
                  <a className={BrightStar(5, review.avg)} href="#/">
                    ⭐
                  </a>
                </div>
                <Link
                  to={`/review/${id}`}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {review.count} Reseñas
                </Link>
              </div>
            </div>

            <hr className="mx-10 p-1" />
            <p
              className=""
              dangerouslySetInnerHTML={createMarkup(detailProduct.summary)}
            ></p>            

            <hr className="m-2 border" />

            <div className="flex mt-5 justify-around lg:px-20">
              {detailProduct.descuento > 0 ? (
                <div>
                  <p className=" text-gray-600 font-bold">
                    Precio &nbsp;
                    <span className="line-through opacity-50">
                      ${Math.floor(precios)}
                    </span>
                    &nbsp;
                    <span className=" text-black font-bold">
                      ${detailProduct.price} Dto.{detailProduct.descuento}%
                    </span>
                  </p>
                </div>
              ) : (
                <p className="md:text-3xl font-bold text-gray-900">
                  Precio ${detailProduct.price}
                </p>
              )}
              <button
                className="flex text-white text-sm md:text-base bg-violet-500 border-0 py-2 px-2 focus:outline-none hover:bg-violet-700 rounded items-center"
                onClick={() => AddtoCart(id)}
              >
                Agregar al Carrito
                <FaShoppingCart className="mx-2 text-base" />
              </button>
              <button
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4"
                onClick={() => {
                  if (fav === true) {
                    DeletetoFav(id);
                  } else {
                    AddtoFav(id);
                  }
                }}
              >
                {fav === true ? (
                  <FaHeart className="mx-2 text-base" />
                ) : (
                  <FaRegHeart className="mx-2 text-base" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrightStar(id, level) {
  if (id <= Math.floor(level)) {
    return "starOn";
  } else {
    return "starOff";
  }
}
export default DetailsComponent;
