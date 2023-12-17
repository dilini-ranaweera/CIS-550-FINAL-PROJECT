import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [searchInput, setSearchInput] = useState('');

  return (
    <Flex
      direction="row"
      align="center"
      justify="space-around"
      h="100vh"
      bg="gray.50"
      backgroundColor="lightblue"
    >
      <Flex justify="center" mt="8">
        <Image
          src={image}
          alt="Placeholder"
          h="full"
          maxW="lg"
          borderRadius="lg"
          boxShadow="lg"
        />
      </Flex>
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
          placeholder="Search for a city to stay..."
          size="lg"
          w="100%"
          maxW="lg"
          borderRadius="full"
          px="8"
          py="4"
          borderWidth="1px"
          borderColor="gray.300"
          variant="filled"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Stack direction="row" spacing="12" mt="12">
          <Link
            to="/listing"
            state={{
              search: searchInput,
              listing: "craigslist"
            }}
          >
            <Button size="lg" colorScheme="blue">
              Search Craigslist
            </Button>
          </Link>
          <Link
            to="/listing"
            state={{
              search: searchInput,
              listing: "airbnb"
            }}
          >
            <Button size="lg" colorScheme="blue">
              Search Airbnb
            </Button>
          </Link>
        </Stack>
      </Box>
      
    </Flex>
  );
}

export default HomePage;