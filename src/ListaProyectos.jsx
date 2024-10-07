import React from 'react';
import { Box, Button, VStack, Heading, Flex, Container, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const ListaProyectos = ({ proyectos }) => {
  return (
    <Container maxW="container.xl" py={4}>
      <Flex direction="column" align="center">
        {/* Navbar */}
        <Box as="nav" mb={8} width="100%">
          <Flex as="ul" listStyleType="none" p={0} m={0} justify="center" wrap="wrap">
            <Link as={RouterLink} to="/" mx={4} p={2} rounded="md" _hover={{ bg: 'teal.500', color: 'white' }}>
              Inicio
            </Link>
            <Link as={RouterLink} to="/crear-proyecto" mx={4} p={2} rounded="md" _hover={{ bg: 'teal.500', color: 'white' }}>
              Crear Proyecto
            </Link>
          </Flex>
        </Box>

        {/* Lista de Proyectos */}
        <VStack spacing={4} align="stretch" width="100%">
          <Heading as="h2" size="lg" mb={4} textAlign="center">Lista de Proyectos</Heading>
          {proyectos.length === 0 ? (
            <Heading size="md" color="gray.500">No hay proyectos creados.</Heading>
          ) : (
            proyectos.map((proyecto, index) => (
              <Box key={index} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                <Heading as="h3" size="md">{proyecto.nombre}</Heading>
                <p>Integrantes: {proyecto.integrantes}</p>
                <p>Fecha de Creación: {proyecto.fecha}</p>
                {proyecto.imagen && (
                  <img src={URL.createObjectURL(proyecto.imagen)} alt={proyecto.nombre} width="100" />
                )}
                <Button as={RouterLink} to={`/proyectos/${index}`} colorScheme="teal" mt={4}>
                  Ver Proyecto
                </Button>
              </Box>
            ))
          )}
        </VStack>
      </Flex>
    </Container>
  );
};

export default ListaProyectos;
