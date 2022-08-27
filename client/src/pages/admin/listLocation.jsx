import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getlocation, delAdmin } from "../../actions/action";
import { Link } from "react-router-dom";

function ListLocation() {
  const { locations } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getlocation());
  }, [dispatch]);

  const handleDelete = (id_prod) => {
    dispatch(delAdmin(id_prod, "locations", "id_place", "place"));
    window.location.href = "/admin/listLocation";
  };

  return (
    <>
      <div className="align-middle min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <label className="text-3xl font-semibold">Locations</label>
        <hr />
        
        <div className="flex gap-2">
        
        <button
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline flex justify-end"
          onClick={() => (window.location.href = "/admin/home")}
        >
          Página Principal
        </button>
        <Link
          to={"/admin/formLocation"}
          state={{
            id_place: 0,
            description: "",
          }}
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline flex justify-end"
        >
          Agregar Ubicacion
        </Link>
        </div>
        {/* <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Ubicacion
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {locations &&
              locations.map((location) => {
                return (
                  <tr key={location.id_place}>
                    <td>{location.description}</td>
                    <td>
                      <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
                        <Link
                          to={"/admin/formLocation"}
                          state={{
                            id_place: location.id_place,
                            description: location.description,
                          }}
                        >
                          🖋️
                        </Link>
                        &nbsp; &nbsp;&nbsp;&nbsp;
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button
                        className="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                        onClick={() => handleDelete(location.id_place)}
                      >
                        🚫
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table> */}
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
                        Ubicacion
                      </th>

                      <th className="w-1/2 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((location) => {
                      return (
                        <tr>
                          <td className="text-center text-dark font-medium text-base py-3 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                            {location.description}
                          </td>

                          <td className="text-center text-dark font-medium text-sm py-1 px-2 m-0 bg-white border-b border-l border-[#E8E8E8] w-80 inline-flex items-center justify-center gap-1">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right">
                              <Link
                                to={"/admin/formLocation"}
                                state={{
                                  id_place: location.id_place,
                                  description: location.description,
                                }}
                              >
                                Modificar
                              </Link>
                            </button>
                            &nbsp;
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right"
                              onClick={() => handleDelete(location.id_place)}
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

export default ListLocation;
