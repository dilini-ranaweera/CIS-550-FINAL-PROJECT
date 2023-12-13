import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Fade,
  Heading,
  Center,
  InputGroup,
  Input,
  InputLeftElement,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
const config = require("../config.json");

const StatisticsPage = () => {
  //set up hooks for the relevant query information
  const [listingsPerCityData, setlistingsPerCityData] = useState([]);
  const [averagePricePerNeighborhoodData, setaveragePricePerNeighborhoodData] =
    useState([]);
  const [topNeighborhoodsPerCityData, setTopNeighborhoodsPerCityData] =
    useState([]);
  const [loadingLPCD, setLoadingLPCD] = useState(false);
  const [loadingAPPND, setLoadingAPPND] = useState(false);
  const [loadingTNPCD, setLoadingTNPCD] = useState(false);
  const [searchTermLPCD, setSearchTermLPCD] = useState("");
  const [searchTermAPPND, setSearchTermAPPND] = useState("");
  const [searchTermTNPCD, setSearchTermTNPCD] = useState("");

  const [stateChangeAPPND, setStateChangeAPPND] = useState(false);
  const [stateChangeLPCD, setStateChangeLPCD] = useState(false);
  const [stateChangeTNPCD, setStateChangeTNPCD] = useState(false);

  //fetch the data for the respective queries
  const handleListingsPerCityData = () => {
    setLoadingLPCD(true);
    fetch(`http://${config.server_host}:${config.server_port}/listing_per_city`)
      .then((res) => res.json())
      .then((resJson) => {
        setlistingsPerCityData(resJson);
        setLoadingLPCD(false);
        console.log(resJson);
      });
  };

  const handleAveragePricePerNeighborhoodData = () => {
    setLoadingAPPND(true);
    setStateChangeAPPND(true);
    fetch(`http://${config.server_host}:${config.server_port}/average_price/${searchTermAPPND}`)
      .then((res) => res.json())
      .then((resJson) => {
        setaveragePricePerNeighborhoodData(resJson[0]['AVG(L.price)']);
        setLoadingAPPND(false);
        console.log(resJson);
      });
  };

  const handleTopNeighborhoodsPerCityData = () => {
    setLoadingTNPCD(true);
    setStateChangeTNPCD(true);
    fetch(`http://${config.server_host}:${config.server_port}/top_neighborhoods/${searchTermTNPCD}`)
      .then((res) => res.json())
      .then((resJson) => {
        setTopNeighborhoodsPerCityData(resJson);
        setLoadingTNPCD(false);
        console.log(resJson);
      });
  };

  return (
    <div className="statistics-page-wrapper">
      <Fade in={true}>
        <Box
          p="10vh"
          color="white"
          mt="4"
          bg="lightblue"
          rounded="md"
          shadow="md"
        >
          <Heading as="h1" color="darkblue" size="4xl" mb="8">
            Statistics!
          </Heading>
          <Box fontSize="xl" mb="8">
            Want to see some statistics for respective cities and neighborhoods?
            Use the search bars below to type in a specific city, and see some
            relevant information!
          </Box>
        </Box>
      </Fade>

      <div>
      <Center mt={10} ml={200} mr={200}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdSearch />
          </InputLeftElement>
          <Input
            type="tel"
            onChange={(e) => setSearchTermLPCD(e.target.value)}
            placeholder="Type in a City to See all of its Listings...."
          />
        </InputGroup>
        <Button type = 'button' onClick={handleListingsPerCityData}>Search</Button>
      </Center>

      <Center mt={10} ml={200} mr={200}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdSearch />
          </InputLeftElement>
          <Input
            type="tel"
            onChange={(e) => setSearchTermAPPND(e.target.value)}
            placeholder="Type in a Neighhorhood to see the Average Price of a Listing In It..."
          />
        </InputGroup>
        <Button type="button" onClick={handleAveragePricePerNeighborhoodData}>Search</Button>
      </Center>

      {!stateChangeAPPND ? (
        <div className="filler"></div>
      ) : (
        <Center>
          <Stack spacing={20} direction="row" mt={100}>
            <VStack>
              <Text fontSize="2xl">City: {searchTermAPPND}</Text>
            </VStack>
            <VStack>
              <Text fontSize="2xl">
                Average Price: {averagePricePerNeighborhoodData}
              </Text>
            </VStack>
          </Stack>
        </Center>
      )}

      <Center mt={10} ml={200} mr={200}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdSearch />
          </InputLeftElement>
          <Input
            type="tel"
            onChange={(e) => setSearchTermTNPCD(e.target.value)}
            placeholder="Type in a City to See the Top Neighborhoods In It..."
          />
        </InputGroup>
        <Button onClick={handleTopNeighborhoodsPerCityData}>Search</Button>
      </Center>

      {!stateChangeTNPCD ? (
        <div className="filler"></div>
      ) : (
        topNeighborhoodsPerCityData.map((neighborhoodData, index) => (
          <Center key={index}>
            <Stack spacing={20} direction="row" mt={100}>
              <VStack>
                <Text fontSize="2xl">Neighborhood: {neighborhoodData.searchTermAPPND}</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl">
                  Average Price: {neighborhoodData.averagePrice}
                </Text>
              </VStack>
            </Stack>
          </Center>
        ))
      )}
      </div>
    </div>
  );
};

export default StatisticsPage;
