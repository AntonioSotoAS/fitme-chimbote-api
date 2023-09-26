import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Exit from "../../assets/img/exit.png";
import { toast } from "react-hot-toast";
import { useMemberships } from "../../context/MembershipContext";
import { useShifts } from "../../context/ShiftContext";
import { useMembershipTypes } from "../../context/MembershipTypeContext";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, Select, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useClients } from "../../context/ClientContext";

function MembershipEditModal({ onClose, membership }) {
  const { register, handleSubmit, setValue } = useForm();
  const { createMembership, memberships, setMemberships } = useMemberships();
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const { shifts } = useShifts();
  const { membershipTypes } = useMembershipTypes();
  const { clients } = useClients();
  // Define opciones para el autocompletado (esto puede variar según tus datos)

  const clientOptions = clients.map((client) => ({
    value: client._id,
    label: client.dni,
  }));

  const shiftOptions = shifts.map((shift) => ({
    value: shift._id,
    label: shift.shift,
  }));

  const membershipTypesOptions = membershipTypes.map((membershipType) => ({
    value: membershipType._id,
    label: membershipType.typeMembership,
  }));

  const defaultOptionClient = clientOptions.find(
    (optionClient) => optionClient.value === membership.Client._id
  );
  const defaultOptionShift = shiftOptions.find(
    (optionShift) => optionShift.value === membership.Shift._id
  );

  const defaultOptionMembershipType = membershipTypesOptions.find(
    (optionMembershipType) =>
      optionMembershipType.value === membership.TypeMembership._id
  );

  const [selectedClient, setSelectedClient] = useState(defaultOptionClient);
  const [selectedShift, setSelectedShift] = useState(defaultOptionShift);
  const [selectedMembershipType, setSelectedMembershipType] = useState(
    defaultOptionMembershipType
  );

  useEffect(() => {
    if (membership) {
      setValue("amount", membership.amount);
      setValue("attendance", membership.attendance);
      // Establece las fechas de inicio y fin aquí
      console.log("prubea  " + new Date(membership.startDate));
      const start = new Date(membership.startDate);
      setStartDate(start.getTime());
      console.log(start.getTime());
      const end = new Date(membership.endDate);
      console.log(end.getTime());
      setStartDate(end.getTime());
    }
  }, [membership, setValue]);

  console.log("shifts: " + JSON.stringify(shiftOptions));
  console.log("membershipTypes: " + JSON.stringify(membershipTypesOptions));
  console.log("clients: " + JSON.stringify(clientOptions));

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleGetRange = async () => {
    if (startDate && endDate) {
      // Llama a la función getDashboard para obtener los datos del dashboard
      try {
        const dateRange = {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };
        setStartDate(startDate);
        setEndDate(endDate);
        // Si ambos startDate y endDate están llenos, retorna true
        return true;
      } catch (error) {
        console.error("Error al obtener datos del calendario:", error);
      }
    } else {
      toast.error("Selecciona un rango de fechas primero");
      console.log("Selecciona un rango de fechas primero.");

      // Si uno o ambos de startDate y endDate están vacíos, retorna false
      return false;
    }
  };

  console.log(memberships);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (handleGetRange()) {
        console.log("duda" + JSON.stringify(selectedShift));
        console.log(startDate);
        console.log(endDate);
        const createMembershipData = {
          Client: selectedClient.value,
          Shift: selectedShift.value,
          TypeMembership: selectedMembershipType.value,
          amount: values.amount,
          attendance: values.attendance,
          startDate: startDate.toISOString().substring(0, 10),
          endDate: endDate.toISOString().substring(0, 10),
          state: true,
        };
        console.log(createMembershipData);

        // const response = await createMembership(createMembershipData);

        setMemberships([...memberships, createMembershipData]);
        toast.success("Usuario Registrado!");
      }
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
        Registrar Membresia
      </h1>

      <button onClick={onClose} className="absolute top-4 right-2">
        <img src={Exit} className="h-8 mr-3" alt="X" />
      </button>

      <form onSubmit={onSubmit}>
        <Autocomplete
          options={clientOptions}
          getOptionLabel={(option) => option.label} // Esto muestra el campo 'dni' como etiqueta
          value={selectedClient}
          onChange={(_, newValue) => setSelectedClient(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cliente"
              variant="outlined"
              fullWidth
              {...register("Client", { required: true })}
            />
          )}
          sx={{
            "& .MuiCalendar-root": {
              background: "black",
            },
            "& label": {
              color: "white",
            },
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "white",
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& MuiFormControl-root": {
                background: "black",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiButtonBase-root": {
              color: "white",
            },
          }}
          className="mt-6 bg-zinc-700"
        />

        <Autocomplete
          options={shiftOptions}
          getOptionLabel={(option) => option.label}
          value={selectedShift}
          onChange={(_, newValue) => setSelectedShift(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Shift"
              variant="outlined"
              fullWidth
              {...register("Shift", { required: true })}
            />
          )}
          sx={{
            "& .MuiCalendar-root": {
              background: "black",
            },
            "& label": {
              color: "white",
            },
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "white",
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& MuiFormControl-root": {
                background: "black",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiButtonBase-root": {
              color: "white",
            },
          }}
          className="mt-6 bg-zinc-700"
        />
        <Autocomplete
          options={membershipTypesOptions}
          getOptionLabel={(option) => option.label}
          value={selectedMembershipType}
          onChange={(_, newValue) => setSelectedMembershipType(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Elije el tipo de Membresia"
              variant="outlined"
              fullWidth
              {...register("TypeMembership", { required: true })}
            />
          )}
          inputRef={(ref) => {
            register(ref, { name: "MembershipType", required: true }); // Aplicar validación requerida al campo "Shift"
          }}
          sx={{
            "& .MuiCalendar-root": {
              background: "black",
            },
            "& label": {
              color: "white",
            },
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "white",
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& MuiFormControl-root": {
                background: "black",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiButtonBase-root": {
              color: "white",
            },
          }}
          className="mt-6 mb-6 bg-zinc-700"
        />
        <input
          type="number"
          {...register("amount", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 mb-6"
          placeholder="amount"
        />
        <input
          type="number"
          {...register("attendance", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 mb-6"
          placeholder="attendance"
        />
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 active:bg-green-500 text-white font-semibold px-4 py-3 rounded-md transition-colors duration-300"
          >
            Editar Membresia
          </button>
        </div>
      </form>
    </div>
  );
}

export default MembershipEditModal;
