import React from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Maps from "../maps/maps";

export default function Contact() {  
  return (
    <div>
      <section className="text-gray-700 body-font relative">
        <div className="container px-5 py-2 mx-auto">
          
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
             
              <div className="p-2 w-full pt-4 text-center">
                <h3 className="sm:text-3xl text-2xl font-medium title-font mb-3 text-gray-900">
                  Te esperamos en nuestras sucursales:
                </h3>

                <p className="mb-2 text-lg">Suipacha 600 - Buenos Aires</p>
                <p className="mb-2 text-lg">Monroe 2700 - Buenos Aires</p>
                <p className="mb-2 text-lg">Córdoba 2486 - Buenos Aires</p>
              </div>
            </div>
            <div className="flex flex-col text-center">
              <Maps />
            </div>
            
          </div>

          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mt-2 mb-3 text-gray-900">
              Contáctenos
            </h1>
            <div className="sm:text-3xl mx-8 text-2xl font-medium title-font mb-4 text-gray-900 ">
              <span className="inline-flex">
                <a
                  href="#/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    className="w-10 h-10 mx-8 text-blue-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    className="w-10 h-10 mx-8 text-green-400 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>
                </a>                  
                
                <a
                  href="https://www.linkedin.com/in/emanuel-gimenez/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    className="w-10 h-10 mx-8 text-blue-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Envianos tu pregunta o inquietud y la responderemos a la brevedad.
            </p>          
          </div>
          <Link
              to={'/'}              
              className="mx-auto whitespace-nowrap inline-flex items-center justify-center px-4 py-2  border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-violet-500 hover:bg-indigo-700"
            >
              Volver
            </Link>
        </div>
      </section>
    </div>
  );
}
