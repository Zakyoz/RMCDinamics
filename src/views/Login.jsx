import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Container, Text, Flex } from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseconfig';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bgImage="url('/images/background.jpg')" // Ruta correcta a tu imagen en la carpeta public
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Container maxW="container.md" py={4}>
        <Box
          as="form"
          onSubmit={handleLogin}
          maxW="md"
          borderWidth={1}
          borderRadius="md"
          p={6}
          boxShadow="md"
          bg="white" // Fondo blanco para el formulario
          mx="auto"
        >
          <Heading as="h1" size="lg" mb={4}>
            Iniciar Sesión
          </Heading>
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Iniciar Sesión
          </Button>
          <Text mt={4} textAlign="center">
            ¿No tienes una cuenta?{' '}
            <Button
              as={RouterLink}
              to="/register"
              colorScheme="teal"
              variant="link"
              fontSize="sm"
              ml={1}
            >
              Regístrate
            </Button>
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

export default Login;
