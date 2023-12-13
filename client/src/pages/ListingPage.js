import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  VStack,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import AirbnbListing from "./AirbnbListing";
import CraigListing from "./AirbnbListing";

const ListingPage = (props) => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Center mt={10} ml={200} mr={200}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdSearch />
          </InputLeftElement>
          <Input
            type="tel"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a Listing..."
          />
        </InputGroup>
        <Button>Search</Button>
      </Center>
      <Center>{search != "" && <Text>Searching for: {search}</Text>}</Center>
      <Center>
        <Stack spacing={20} direction="row" mt={100}>
          <VStack>
            <Text fontSize="5xl">Airbnb Listings</Text>
            <AirbnbListing />
          </VStack>
          <VStack>
            <Text fontSize="5xl">Cragislist Listings</Text>
            <CraigListing />
          </VStack>
        </Stack>
      </Center>
    </div>
  );
};

export default ListingPage;
