import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);

    try {
      values.photo = values.photo[0].name; // Obtiene el nombre del archivo seleccionado
      console.log('Nombre del archivo seleccionado:', values.photo);

      // Utiliza la función registerRequest para realizar la solicitud

      if (response.status === 200) {
        // La solicitud fue exitosa
        console.log(response.data);
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
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        <input
          type="file"
          accept="image/*"
          {...register("photo", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        <input
          type="text"
          {...register("Role", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Role"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
