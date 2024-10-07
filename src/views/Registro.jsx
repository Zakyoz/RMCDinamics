// src/views/Register.jsx
import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Container, Text, useToast, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseconfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Mostrar mensaje de éxito
      toast({
        title: "Registro exitoso",
        description: "Te has registrado exitosamente. Ahora puedes iniciar sesión.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redirigir al inicio de sesión después de mostrar el mensaje
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirige después de 3 segundos para que el usuario pueda ver el mensaje
    } catch (error) {
      console.error("Error en el registro:", error);
      toast({
        title: "Error en el registro",
        description: `Hubo un problema con el registro: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      bgImage="url('https://drive.google.com/file/d/1HUFm8du4Mzg8peXtPcw3IesBVXpC4tGi/view?usp=drive_link')" // Cambia la ruta de la imagen según sea necesario
      bgSize="cover"
      bgPosition="center"
    >
      <Container maxW="container.md" py={4}>
        <Box
          as="form"
          onSubmit={handleRegister}
          maxW="md"
          borderWidth={1}
          borderRadius="md"
          p={6}
          boxShadow="lg"
          bg="rgba(255, 255, 255, 0.9)" // Fondo blanco semitransparente para mejorar la legibilidad
          mx="auto"
        >
          <Heading as="h1" size="lg" mb={6} textAlign="center">
            Regístrate
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
          <FormControl mb={6}>
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
            Registrarse
          </Button>
          <Text mt={4} textAlign="center">
            ¿Ya tienes una cuenta? <Button as="a" colorScheme="teal" variant="link" onClick={() => navigate('/login')}>Inicia sesión</Button>
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

export default Register;
