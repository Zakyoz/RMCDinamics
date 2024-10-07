import React from 'react';
import { Box, Heading, List, ListItem, Button, Container, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const TareasPendientes = ({ tareas, completarTarea }) => {
  console.log('Tareas:', tareas); // Verifica que las tareas se están recibiendo

  return (
    <Container maxW="container.xl" py={4}>
      <Flex direction="column" align="center">
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
        {/* Main Content */}
        <Heading as="h2" size="xl" color="teal.500" mb={4}>
          Tareas Pendientes
        </Heading>
        <List spacing={3}>
          {tareas.length > 0 ? (
            tareas.filter((tarea) => !tarea.completada).map((tarea, index) => (
              <ListItem key={index} p={3} borderWidth={1} borderRadius="md" mb={2} boxShadow="sm" display="flex" justifyContent="space-between" alignItems="center">
                <span>{tarea.nombre} (Importancia: {tarea.importancia})</span>
                <Button onClick={() => completarTarea(index)} colorScheme="teal">
                  Completar
                </Button>
              </ListItem>
            ))
          ) : (
            <p>No hay tareas pendientes.</p>
          )}
        </List>
      </Flex>
    </Container>
  );
};

export default TareasPendientes;
