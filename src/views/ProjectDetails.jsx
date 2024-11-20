// ProjectDetails.jsx
import React from 'react';
import { Container, Heading, VStack } from '@chakra-ui/react';
import Progress from './Progress';
import TareasPendientes from './TareasPendientes';

const ProjectDetails = ({ tareas, completarTarea }) => {
    return (
        <Container maxW="container.xl" py={4}>
                <Progress tareas={tareas} />
        </Container>
    );
};

export default ProjectDetails;
