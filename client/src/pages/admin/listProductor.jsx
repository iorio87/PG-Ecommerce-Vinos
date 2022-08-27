import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducer, delAdmin } from "../../actions/action";
import { Link } from "react-router-dom";

function ListProductor() {
  const { productores } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducer());
  }, [dispatch]);

  const handleDelete = (id_Prod) => {
    dispatch(delAdmin(id_Prod, "productors", '"id_Prod"', "producer"));
    window.location.href = "/admin/listProductor";
  };

  return (
    <>
      <div className="align-middle min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <label className="text-3xl font-semibold">Bodegas</label>
        <hr />

        <div className="flex gap-2">
        
        <button
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right"
          onClick={() => (window.location.href = "/admin/home")}
        >
          Página Principal
        </button>
        &nbsp;
        <Link
          to={"/admin/formProductor"}
          state={{
            id_Prod: 0,
            description: "",
          }}
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Bodega
        </Link>
        </div>
      </div>      

      <section className="bg-white">
        <div className="container flex justify-center">
          <div className="">
            <div className="w-full px-4 mx-auto">
              <div className="max-w-full">
                <table className="table-auto w-full border rounded-md shadow-lg">
                  <thead>
                    <tr className="bg-violet-500 text-center">
                      <th className="w-1/2 min-w-[300px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent">
                        Bodega
                      </th>

                      <th className="w-1/2 min-w-[300px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productores.map((productor) => {
                      return (
                        <tr>
                          <td className="text-center text-dark font-medium text-base py-3 px-2 bg-violet-100 border-b border-l border-[#E8E8E8]">
                            {productor.description}
                          </td>

                          <td className="text-center text-[14px] py-1 px-2 m-0 bg-white border-b border-l border-[#E8E8E8]">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right">
                              <Link
                                to={"/admin/formProductor"}
                                state={{
                                  id_Prod: productor.id_Prod,
                                  description: productor.description,
                                }}
                              >
                                Modificar
                              </Link>
                            </button>
                            &nbsp;
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right"
                              onClick={() => handleDelete(productor.id_Prod)}
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
    </>
  );
}

export default ListProductor;
