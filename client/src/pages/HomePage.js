import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
} from '@chakra-ui/react';
import image from './image.webp'

function HomePage() {
  const navigate = useNavigate();
  const [me, setMe] = useState({});

  return (
    <Flex
      direction="row"
      align="center"
      justify="space-around"
      h="100vh"
      bg="gray.50"
      backgroundColor="lightblue"
    >
      <Box maxW="lg" textAlign="left">
        <Heading as="h1" color="darkblue" size="4xl" mb="8">
          Subletter for Short Stays
        </Heading>
        <Box fontSize="xl" mb="8">
          Staying for short periods of time?
          Compare Cragislist and Airbnb to maximize
          your Short Stay!
        </Box>
        <Input
          placeholder="Search for a place to stay..."
          size="lg"
          w="100%"
          maxW="lg"
          borderRadius="full"
          px="8"
          py="4"
          borderWidth="1px"
          borderColor="gray.300"
          variant="filled"
        />
        <Stack direction="row" spacing="12" mt="12">
          <Button size="lg" onClick={() => navigate('/feed')} colorScheme="blue">
            Search Cragislist
          </Button>
          <Button size="lg" colorScheme="blue">
            Search Airbnb
          </Button>
        </Stack>
      </Box>
      <Flex justify="center" mt="8">
        <Image
          src={image}
          alt="Placeholder"
          w="full"
          maxW="lg"
          borderRadius="lg"
          boxShadow="lg"
        />
      </Flex>
    </Flex>
  );
}

export default HomePage;