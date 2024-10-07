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
  const navigate = useNavigate();

  useEffect(() => {
    const sprintsGuardados = localStorage.getItem('sprints');
    if (sprintsGuardados) {
      setSprints(JSON.parse(sprintsGuardados));
    }
  }, []);

  const agregarTarea = () => {
    const tareasActualizadas = sprints.map((sprint, index) => {
      if (index === parseInt(sprintIndex)) {
        return {
          ...sprint,
          tareas: [...sprint.tareas, {
            nombre: nombreTarea,
            descripcion: descripcionTarea,
            fecha: fechaFinalizacion,
            estado: estadoTarea,
            completada: false
          }]
        };
      }
      return sprint;
    });
    setSprints(tareasActualizadas);
    localStorage.setItem('sprints', JSON.stringify(tareasActualizadas));
    setNombreTarea('');
    setDescripcionTarea('');
    setFechaFinalizacion('');
    setEstadoTarea('pendiente');
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
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="finalizado">Finalizado</option>
          <option value="urgente">Urgente</option>
        </Select>

        <Button onClick={agregarTarea} colorScheme="teal">
          Agregar Tarea
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
          <Text>{tarea.descripcion}</Text>
          <Text>Fecha: {tarea.fecha}</Text>
          <Text>Estado: {tarea.estado}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default SprintDetalle;
