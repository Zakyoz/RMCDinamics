import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Container, Textarea, Flex, VStack, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const CrearProyecto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo proyecto
    const nuevoProyecto = {
      id: Date.now(),
      nombre,
      descripcion,
      imagen: imagen ? URL.createObjectURL(imagen) : '', // Crear un URL local para la imagen
      fecha: new Date().toISOString(),
    };

    // Guardar el proyecto en localStorage
    const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
    proyectosGuardados.push(nuevoProyecto);
    localStorage.setItem('proyectos', JSON.stringify(proyectosGuardados));

    // Redirigir al inicio
    navigate('/');
  };

  return (
    <Container maxW="container.md" py={4}>
      {/* Navbar */}
      <Box as="nav" mb={8}>
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

      <Box as="form" onSubmit={handleSubmit} borderWidth={1} borderRadius="md" p={4} boxShadow="md">
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel htmlFor="nombre">Nombre del Proyecto</FormLabel>
            <Input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="descripcion">Descripción del Proyecto</FormLabel>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="imagen">Imagen del Proyecto</FormLabel>
            <Input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Crear Proyecto
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CrearProyecto;
