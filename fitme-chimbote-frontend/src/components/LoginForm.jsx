import React from "react";
import { useForm } from "react-hook-form";
import { loginRequest } from "../api/auth";

function LoginForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);

    try {
      values.photo = values.photo[0].name; // Obtiene el nombre del archivo seleccionado
      console.log("Nombre del archivo seleccionado:", values.photo);

      // Utiliza la función registerClientRequest para realizar la solicitud
      const response = await loginRequest(values);

      if (response.status === 200) {
        // La solicitud fue exitosa
        console.log(response.data);
        // Cerrar el modal u realizar alguna otra acción después del registro
        onClose();
      } else {
        // La solicitud falló
        console.error("Error al registrar:", response.statusText);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="username"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="password"
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

export default LoginForm;
