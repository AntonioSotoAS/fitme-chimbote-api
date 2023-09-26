import React from "react";
import { useForm } from "react-hook-form";
import Exit from "../../assets/img/exit.png";
import { useClients } from "../../context/ClientContext";
import { toast } from "react-hot-toast";

function ClientForm({ onClose }) {
  const { register, handleSubmit } = useForm();
  const { createClient, clients, setClients } = useClients();
  console.log(clients);

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    var photoName = "";

    try {
      // Verifica si se proporcionó una foto; si no, establece una foto predeterminada
      if (values.photo && values.photo.length > 0) {
        // Se seleccionó al menos un archivo
        console.log("Se seleccionó un archivo");
        console.log("Valor de values.photo:", values.photo);
        photoName = values.photo[0].name;
      } else {
        // No se seleccionó ningún archivo
        console.log("No se seleccionó ningún archivo");
        photoName =
          "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg";
      }

      const createClientData = {
        dni: values.dni,
        firstName: values.firstName,
        secondName: values.secondName,
        surName: values.surName,
        secondSurName: values.secondSurName,
        photo: photoName, // Establece el nombre de la foto en el objeto createClientData
        // Agrega otros campos del cliente aquí si es necesario
      };

      console.log("create client", JSON.stringify(createClientData, null, 2));

      // Utiliza la función createClientRequest para realizar la solicitud
      const response = await createClient(createClientData);

      console.log(response.data);

      setClients([...clients, response.data]);
      console.log("Llegó a la función onSubmit");
      toast.success("Usuario Registrado!");
    } catch (error) {
      console.error("Error al registrar:", error);
    } finally {
      onClose();
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
          {...register("photo")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
         <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 active:bg-green-500 text-white font-semibold px-4 py-3 rounded-md transition-colors duration-300"
          >
            Registrar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientForm;
