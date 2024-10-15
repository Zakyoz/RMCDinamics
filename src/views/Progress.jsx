import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Input, Button, Stack, Checkbox, Progress, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Progreso = () => {
  const [sprints, setSprints] = useState([]);
  const [cantidadSprints, setCantidadSprints] = useState(1);
  const [sprintsSeleccionados, setSprintsSeleccionados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sprintsGuardados = localStorage.getItem('sprints');
    if (sprintsGuardados) {
      setSprints(JSON.parse(sprintsGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sprints', JSON.stringify(sprints));
  }, [sprints]);

  const agregarSprints = () => {
    const nuevosSprints = [];
    const numeroInicial = sprints.length + 1;

    for (let i = 0; i < cantidadSprints; i++) {
      nuevosSprints.push({
        nombre: `Sprint ${numeroInicial + i}`,
        fechaInicio: '',
        fechaFin: '',
        tareas: [],
      });
    }

    setSprints([...sprints, ...nuevosSprints]);
    setCantidadSprints(1);
  };

  const calcularProgresoTotal = () => {
    let totalTareas = 0;
    let tareasCompletadas = 0;

    sprints.forEach((sprint) => {
      totalTareas += sprint.tareas.length;
      tareasCompletadas += sprint.tareas.filter((tarea) => tarea.completada).length;
    });

    return totalTareas === 0 ? 0 : (tareasCompletadas / totalTareas) * 100;
  };

  const manejarSeleccionSprint = (nombreSprint) => {
    if (sprintsSeleccionados.includes(nombreSprint)) {
      setSprintsSeleccionados(sprintsSeleccionados.filter((nombre) => nombre !== nombreSprint));
    } else {
      setSprintsSeleccionados([...sprintsSeleccionados, nombreSprint]);
    }
  };

  const eliminarSprintsSeleccionados = () => {
    const sprintsActualizados = sprints.filter((sprint) => !sprintsSeleccionados.includes(sprint.nombre));
    setSprints(sprintsActualizados);
    setSprintsSeleccionados([]);
  };

  const manejarCambioFecha = (index, campo, valor) => {
    const sprintsActualizados = [...sprints];
    sprintsActualizados[index][campo] = valor;
    setSprints(sprintsActualizados);
  };

  return (
    <Box maxW="container.lg" py={4} mx="auto">
      <Flex direction="column" align="center">
        {/* Navbar */}
        <Box as="nav" mb={8} width="100%">
          <Flex as="ul" listStyleType="none" p={0} m={0} justify="center" wrap="wrap">
            <Link as={RouterLink} to="/" mx={4} p={2} rounded="md" _hover={{ bg: 'teal.500', color: 'white' }}>
              Inicio
            </Link>
            <Link as={RouterLink} to="/crearproyecto" mx={4} p={2} rounded="md" _hover={{ bg: 'teal.500', color: 'white' }}>
              Crear Proyecto
            </Link>
            <Link as={RouterLink} to="/progreso" mx={4} p={2} rounded="md" _hover={{ bg: 'teal.500', color: 'white' }}>
              Progreso
            </Link>
            <Link as={RouterLink} to="/pending-tasks" mx={4} p={2} rounded="md" _hover={{ bg: 'teal.500', color: 'white' }}>
              Tareas Pendientes
            </Link>
            <Link as={RouterLink} to="/profile" mx={4} p={2} rounded="md" _hover={{ bg: 'teal.500', color: 'white' }}>
              Información de Usuario
            </Link>
          </Flex>
        </Box>

        {/* Header */}
        <Heading as="h2" size="xl" color="teal.500" mb={6} textAlign="center">
          Progreso de Sprints
        </Heading>

        {/* Progreso total */}
        <Box width="100%" mb={6} textAlign="center">
          <Text fontSize="lg" color="teal.500" mb={2}>Progreso total</Text>
          <Progress colorScheme="teal" size="lg" value={calcularProgresoTotal()} />
          <Text fontSize="lg" color="gray.600">{Math.round(calcularProgresoTotal())}% Completado</Text>
        </Box>

        {/* Agregar Sprint */}
        <Flex mb={6} width="100%" justify="center" gap={4}>
          <Input
            type="number"
            min="1"
            placeholder="Cantidad de Sprints"
            value={cantidadSprints}
            onChange={(e) => setCantidadSprints(parseInt(e.target.value))}
            width="200px"
          />
          <Button onClick={agregarSprints} colorScheme="teal" width="150px">
            Agregar Sprints
          </Button>
        </Flex>

        {/* Botón eliminar */}
        <Button
          onClick={eliminarSprintsSeleccionados}
          colorScheme="red"
          mb={6}
          isDisabled={sprintsSeleccionados.length === 0}
        >
          Eliminar
        </Button>

        {/* Lista de sprints */}
        <Box width="100%">
          {sprints.length === 0 ? (
            <Text textAlign="center">No hay sprints disponibles para mostrar.</Text>
          ) : (
            sprints.map((sprint, sprintIndex) => (
              <Box key={sprintIndex} mb={6} p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
                <Flex justify="space-between" align="center">
                  <Heading as="h3" size="md" mb={2}>{sprint.nombre}</Heading>
                  <Flex direction="column" align="flex-end">
                    <Button onClick={() => navigate(`/sprint/${sprintIndex}`)} colorScheme="teal" mb={2}>
                      Ver Tareas
                    </Button>
                    <Checkbox
                      isChecked={sprintsSeleccionados.includes(sprint.nombre)}
                      onChange={() => manejarSeleccionSprint(sprint.nombre)}
                    >
                      Seleccionar
                    </Checkbox>
                  </Flex>
                </Flex>

                {/* Inputs de fecha */}
                <Flex mt={4} gap={4}>
                  <Input
                    type="date"
                    value={sprint.fechaInicio}
                    onChange={(e) => manejarCambioFecha(sprintIndex, 'fechaInicio', e.target.value)}
                    placeholder="Fecha de Inicio"
                  />
                  <Input
                    type="date"
                    value={sprint.fechaFin}
                    onChange={(e) => manejarCambioFecha(sprintIndex, 'fechaFin', e.target.value)}
                    placeholder="Fecha de Fin"
                  />
                </Flex>
              </Box>
            ))
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Progreso;