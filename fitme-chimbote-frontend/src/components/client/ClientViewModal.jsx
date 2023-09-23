import React from "react";
import { useForm } from "react-hook-form";
import Exit from "../../assets/img/exit.png";
import { useClients } from "../../context/ClientContext";
import { toast } from "react-hot-toast";

function ClientViewModal({ onClose, clientToEdit }) {
  const { register, handleSubmit, setValue } = useForm();
  const { updateClient, clients, setClients } = useClients();

  // Llena los campos del formulario con los datos del cliente a editar
  React.useEffect(() => {
    if (clientToEdit) {
      setValue("dni", clientToEdit.dni);
      setValue("firstName", clientToEdit.firstName);
      setValue("secondName", clientToEdit.secondName);
      setValue("surName", clientToEdit.surName);
      setValue("secondSurName", clientToEdit.secondSurName);
      // Puedes hacer lo mismo para la foto si lo necesitas
    }
  }, [clientToEdit, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (clientToEdit) {
        // Si estamos editando, llamamos a la función de actualización
        const updatedClient = await updateClient(clientToEdit._id, values);
        // Actualizamos el cliente en la lista
        const updatedClients = clients.map((client) =>
          client._id === updatedClient._id ? updatedClient : client
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
          {/* Aquí puedes agregar un campo para editar la foto si lo necesitas */}
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

export default ClientViewModal;
