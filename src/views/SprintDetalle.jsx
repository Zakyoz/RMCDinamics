import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Stack, Checkbox, Input, Button, Select } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

const SprintDetalle = () => {
  const { sprintIndex } = useParams();
  const [sprints, setSprints] = useState([]);
  const [nombreTarea, setNombreTarea] = useState('');
  const [descripcionTarea, setDescripcionTarea] = useState('');
  const [fechaFinalizacion, setFechaFinalizacion] = useState('');
  const [estadoTarea, setEstadoTarea] = useState('pendiente');
  const [rolTarea, setRolTarea] = useState('');
  const [editando, setEditando] = useState(false);
  const [indiceTareaEditando, setIndiceTareaEditando] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sprintsGuardados = localStorage.getItem('sprints');
    if (sprintsGuardados) {
      setSprints(JSON.parse(sprintsGuardados));
    }
  }, []);

  const agregarTarea = () => {
    const nuevasTareas = editando
      ? sprints[sprintIndex].tareas.map((tarea, index) =>
          index === indiceTareaEditando
            ? { nombre: nombreTarea, descripcion: descripcionTarea, fecha: fechaFinalizacion, estado: estadoTarea, rol: rolTarea, completada: tarea.completada }
            : tarea
        )
      : [
          ...sprints[sprintIndex].tareas,
          { nombre: nombreTarea, descripcion: descripcionTarea, fecha: fechaFinalizacion, estado: estadoTarea, rol: rolTarea, completada: false }
        ];

    const sprintsActualizados = sprints.map((sprint, index) =>
      index === parseInt(sprintIndex) ? { ...sprint, tareas: nuevasTareas } : sprint
    );

    setSprints(sprintsActualizados);
    localStorage.setItem('sprints', JSON.stringify(sprintsActualizados));

    setNombreTarea('');
    setDescripcionTarea('');
    setFechaFinalizacion('');
    setEstadoTarea('pendiente');
    setRolTarea('');
    setEditando(false);
    setIndiceTareaEditando(null);
  };

  const editarTarea = (tareaIndex) => {
    const tarea = sprints[sprintIndex].tareas[tareaIndex];
    setNombreTarea(tarea.nombre);
    setDescripcionTarea(tarea.descripcion);
    setFechaFinalizacion(tarea.fecha);
    setEstadoTarea(tarea.estado);
    setRolTarea(tarea.rol);
    setEditando(true);
    setIndiceTareaEditando(tareaIndex);
  };

  const borrarTarea = (tareaIndex) => {
    const nuevasTareas = sprints[sprintIndex].tareas.filter((_, index) => index !== tareaIndex);
    const sprintsActualizados = sprints.map((sprint, index) =>
      index === parseInt(sprintIndex) ? { ...sprint, tareas: nuevasTareas } : sprint
    );

    setSprints(sprintsActualizados);
    localStorage.setItem('sprints', JSON.stringify(sprintsActualizados));
  };

  return (
    <Box p={4}>
      <Button onClick={() => navigate('/progreso')} colorScheme="teal" mb={4}>
        Volver a Progreso
      </Button>

      <Heading as="h2" size="lg" mb={4}>
        {sprints[sprintIndex]?.nombre} - Tareas
      </Heading>

      <Stack spacing={3}>
        <Input
          placeholder="Nombre de la tarea"
          value={nombreTarea}
          onChange={(e) => setNombreTarea(e.target.value)}
        />
        <Input
          placeholder="Descripción de la tarea"
          value={descripcionTarea}
          onChange={(e) => setDescripcionTarea(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Fecha de finalización"
          value={fechaFinalizacion}
          onChange={(e) => setFechaFinalizacion(e.target.value)}
        />
        <Select
          value={estadoTarea}
          onChange={(e) => setEstadoTarea(e.target.value)}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En Progreso</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Urgente">Urgente</option>
        </Select>
        <Input
          placeholder="Rol de la tarea"
          value={rolTarea}
          onChange={(e) => setRolTarea(e.target.value)}
        />

        <Button onClick={agregarTarea} colorScheme="teal">
          {editando ? 'Actualizar Tarea' : 'Agregar Tarea'}
        </Button>
      </Stack>

      {sprints[sprintIndex]?.tareas.map((tarea, tareaIndex) => (
        <Box key={tareaIndex} p={4} borderWidth={1} borderRadius="md" mt={4}>
          <Checkbox
            isChecked={tarea.completada}
            onChange={() => {
              const nuevasTareas = sprints[sprintIndex].tareas.map((t, idx) =>
                idx === tareaIndex ? { ...t, completada: !t.completada } : t
              );
              const sprintsActualizados = [...sprints];
              sprintsActualizados[sprintIndex].tareas = nuevasTareas;
              setSprints(sprintsActualizados);
              localStorage.setItem('sprints', JSON.stringify(sprintsActualizados));
            }}
          >
            <Text as={tarea.completada ? 's' : 'span'}>{tarea.nombre}</Text>
          </Checkbox>
          <Text>Descripción: {tarea.descripcion}</Text>
          <Text>Fecha: {tarea.fecha}</Text>
          <Text>Estado: {tarea.estado}</Text>
          <Text>Rol: {tarea.rol}</Text>
          <Button onClick={() => editarTarea(tareaIndex)} colorScheme="blue" size="sm" mt={2}>
            Editar
          </Button>
          <Button onClick={() => borrarTarea(tareaIndex)} colorScheme="red" size="sm" mt={2} ml={2}>
            Borrar
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default SprintDetalle;
