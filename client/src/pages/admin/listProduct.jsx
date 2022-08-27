import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductoAll, delProducto } from "../../actions/action";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";


function ListProduct() {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getProductoAll());
  }, [dispatch]);

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 15;
  const LastProductForPage = currentPage * productPerPage;
  const FirtProductForPage = LastProductForPage - productPerPage;

  const currentProducts = products.slice(
    FirtProductForPage,
    LastProductForPage
  );

  const paginado = (pageNumber) => {
    return setCurrentPage(pageNumber);
  };

  const handleDelete = (id_prod) => {
    dispatch(delProducto(id_prod));
    window.location.href = "/admin/listProduct";
  };

  return (
    <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
      <label className="text-3xl font-semibold">Products</label>
      <hr />
     
     <div className="flex gap-2 m-1">
      <button
        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right"
        onClick={() => (window.location.href = "/admin/home")}
      >
        Página Principal
      </button>
      <Link
        to={"/admin/addProduct"}
        state={{
          id: 0,
          name: "",
          price: "",
          image: "",
          summary: "",
          alcohol: "",
          productor: "",
          location: "",
          category: "",
          categ: "",
          place: "",
          producer: "",
          stock: 0,
          minimo: 0,
          descuento: 0,
        }}
        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline flex justify-end"
      >
        Agregar Producto
      </Link>
      </div>
      
      <section className="bg-white">
        <div className="container flex justify-center">
          <div className="">
            <div className="w-full px-4 mx-auto">
              <div className="max-w-full">
                <table className="table-auto w-full border rounded-md shadow-lg">
                  <thead>
                    <tr className="bg-violet-500 text-center">
                      <th className="w-1/4 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent">
                        Nombre
                      </th>
                      <th className="w-1/4 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent">
                        Precio
                      </th>
                      <th className="w-1/4 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent">
                        Bodega
                      </th>
                      <th className="w-1/4 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent">
                        Ubicacion
                      </th>
                      <th className="w-1/4 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent">
                        Categoria
                      </th>

                      <th className="w-1/2 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product) => {
                      return (
                        <tr>
                          <td className="text-center text-dark font-medium text-sm py-3 px-2 bg-violet-100 border-b border-l border-[#E8E8E8]">
                            {product.name}
                          </td>
                          <td className="text-center text-dark font-medium text-base py-3 px-2 bg-white border-b border-l border-[#E8E8E8]">
                            ${product.price}
                          </td>
                          <td className="text-center text-dark font-medium text-base py-3 px-2 bg-violet-100 border-b border-l border-[#E8E8E8]">
                            {product.productor.description}
                          </td>
                          <td className="text-center text-dark font-medium text-base py-3 px-2 bg-white border-b border-l border-[#E8E8E8]">
                            {product.location.description}
                          </td>
                          <td className="text-center text-dark font-medium text-base py-3 px-2 bg-violet-100 border-b border-l border-[#E8E8E8]">
                            {product.category.type}
                          </td>

                          <td className="text-center py-3 px-2 bg-white border-b border-[#E8E8E8] ">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white text-[13px] p-1 mt-2 rounded focus:outline-none focus:shadow-outline align-right">
                            <Link to={`/admin/addProductUpd/${product.id}`}>Modificar</Link>
                            </button>
                            &nbsp;
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white text-[13px] p-1 mt-2 rounded focus:outline-none focus:shadow-outline align-right"
                              onClick={() => handleDelete(product.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
      <Pagination
        productPerPage={productPerPage}
        products={products.length}
        paginado={paginado}       
      />
      </div>
    </div>
  );
}

export default ListProduct;
