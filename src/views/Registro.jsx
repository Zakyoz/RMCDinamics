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

    const allowedDomains = ['@gmail.com', '@outlook.com', '@hotmail.com'];
    const emailDomain = email.substring(email.lastIndexOf('@'));
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!allowedDomains.includes(emailDomain)) {
      toast({
        title: "Correo no válido",
        description: "Solo se permiten correos de Gmail, Outlook o Hotmail.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!emailPattern.test(email)) {
      toast({
        title: "Correo no válido",
        description: "El correo no debe contener caracteres especiales.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Registro exitoso",
        description: "Te has registrado exitosamente. Ahora puedes iniciar sesión.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
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
      bgImage="url('/images/background.jpg')" // Cambia la ruta a tu imagen en la carpeta public
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
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
            ¿Ya tienes una cuenta?{' '}
            <Button as="a" colorScheme="teal" variant="link" onClick={() => navigate('/login')}>
              Inicia sesión
            </Button>
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

export default Register;
