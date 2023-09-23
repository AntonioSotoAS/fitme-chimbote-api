import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Exit from "../../assets/img/exit.png";
import { useClients } from "../../context/ClientContext";
import { toast } from "react-hot-toast";

function ClientEditModal({ onClose, client }) {
  const { register, handleSubmit, setValue } = useForm();
  const { updateClient, clients, setClients } = useClients();

  const [selectedFile, setSelectedFile] = useState(null);

  // Llena los campos del formulario con los datos del cliente a editar
  React.useEffect(() => {
    if (client) {
      console.log(client);
      setValue("dni", client.dni);
      setValue("firstName", client.firstName);
      setValue("secondName", client.secondName);
      setValue("surName", client.surName);
      setValue("secondSurName", client.secondSurName);
      // Puedes hacer lo mismo para la foto si lo necesitas
    }
  }, [client, setValue]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (client) {
        if (selectedFile) {
          // Si se selecciona un nuevo archivo, puedes cargarlo aquí
          // Ejemplo de cómo cargar la foto, asegúrate de ajustarlo a tu API:
          // const formData = new FormData();
          // formData.append("photo", selectedFile);
          // await uploadPhoto(client._id, formData);
        }

        // Luego, puedes actualizar los otros campos del cliente
        const updatedClient = await updateClient(values); // Pasar el ID del cliente aquí

        // Actualizamos el cliente en la lista
        const updatedClients = clients.map((c) =>
          c._id === updatedClient._id ? updatedClient : c
        );
        setClients(updatedClients);
        toast.success("Cliente actualizado exitosamente.");
      }
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    } finally {
      onClose();
    }
  });

  return (
    <div className="bg-zinc-800 max-w-md rounded-md p-4 mx-auto">
      <h1 className="text-white text-2xl font-semibold mb-3">Editar Cliente</h1>
      <button onClick={onClose} className="absolute top-2 right-2">
        <img src={Exit} className="h-8" alt="Cerrar" />
      </button>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="text-white block mb-1">Foto</label>
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Vista previa"
              className="w-full max-h-96 object-contain mb-2"
            />
          ) : null}
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="text-white"
          />
        </div>
        <div className="mb-3">
          <label className="text-white block mb-1">Nombres</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              {...register("firstName", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              placeholder="Primer Nombre"
            />
            <input
              type="text"
              {...register("secondName", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              placeholder="Segundo Nombre"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="text-white block mb-1">Apellidos</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              {...register("surName", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              placeholder="Primer Apellido"
            />
            <input
              type="text"
              {...register("secondSurName", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
              placeholder="Segundo Apellido"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 active:bg-green-500 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300 w-full"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default ClientEditModal;
