import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Container, Textarea, Flex, VStack, Link, Select, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

// Imágenes predeterminadas
import Image1 from '../assets/image1.jpg';
import Image2 from '../assets/image2.jpg';
import Image3 from '../assets/image3.jpg';


const CrearProyecto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(Image1); // Imagen predeterminada
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo proyecto con imagen predeterminada
    const nuevoProyecto = {
      id: Date.now(),
      nombre,
      descripcion,
      imagen, // Usar la imagen seleccionada
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
            <FormLabel htmlFor="imagen">Selecciona una Imagen Predeterminada</FormLabel>
            <Select
              id="imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            >
              <option value={Image1}>Imagen 1</option>
              <option value={Image2}>Imagen 2</option>
              <option value={Image3}>Imagen 3</option>
            </Select>
            <Image src={imagen} alt="Previsualización" boxSize="150px" mt={2} />
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
