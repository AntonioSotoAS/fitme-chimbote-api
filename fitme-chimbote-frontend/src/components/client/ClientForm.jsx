import React from "react";
import { useForm } from "react-hook-form";
import Exit from "../../assets/img/exit.png";
import { useClients } from "../../context/ClientContext";

function ClientForm({ onClose }) {
  const { register, handleSubmit } = useForm();
  const { createClient, clients } = useClients();
  console.log(clients);

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);

    try {
      values.photo = values.photo[0].name; // Obtiene el nombre del archivo seleccionado
      console.log("Nombre del archivo seleccionado:", values.photo);

      // Utiliza la función registerClientRequest para realizar la solicitud
      const response = await createClient(values);

      console.log(response.data);
      onClose(response.data); 
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  });

  return (
    <div className="bg-zinc-800 max-w-md rounded-md">
      {/* Botón para cerrar el modal estilo close icon */}
      <h1 className="text-white text-2xl sm:text-sm md:text-xl lg:text-3xl xl:text-4xl font-semibold text-center mb-3">
        Registrar Cliente
      </h1>

      <button onClick={onClose} className="absolute top-4 right-2">
        <img src={Exit} className="h-8 mr-3" alt="X" />
      </button>

      <form onSubmit={onSubmit}>
        <input
          type="number"
          {...register("dni", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="dni"
        />
        <input
          type="text"
          {...register("firstName", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="firstName"
        />
        <input
          type="text"
          {...register("secondName", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="secondName"
        />
        <input
          type="text"
          {...register("surName", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="surName"
        />
        <input
          type="text"
          {...register("secondSurName", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="secondSurName"
        />
        <input
          type="file"
          accept="image/*"
          {...register("photo", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 active:bg-green-500 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default ClientForm;
