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
    setStateChangeLPCD(true);
    fetch(
      `http://${config.server_host}:${config.server_port}/listings_per_city`
    )
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
    fetch(
      `http://${config.server_host}:${config.server_port}/average_price/${searchTermAPPND}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setaveragePricePerNeighborhoodData(resJson[0]["AVG(L.price)"]);
        setLoadingAPPND(false);
        console.log(resJson);
      });
  };

  const handleTopNeighborhoodsPerCityData = () => {
    setLoadingTNPCD(true);
    setStateChangeTNPCD(true);
    fetch(
      `http://${config.server_host}:${config.server_port}/top_neighborhoods/${searchTermTNPCD}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setTopNeighborhoodsPerCityData(resJson);
        setLoadingTNPCD(false);
        console.log(resJson);
        console.log(resJson[0]["neighborhood"]);
      });
  };

  return (
    <div className="statistics-page-wrapper">
      <Fade in={true}>
        <Box
          p="10vh"
          color="black"
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",

          justifyContent: "center",
          columnGap: "2rem",
          marginTop: "2rem",
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: "27%" }}>
          <Center>
            <Button type="button" onClick={handleListingsPerCityData}>
              Click me to see the number of listings per city!
            </Button>
          </Center>

          {!stateChangeLPCD ? (
            <div style={{ display: "none" }}></div>
          ) : (
            listingsPerCityData.map((listingData, index) => (
              <Box border="2px solid black" borderRadius="md" p="2" m={4}>
                <Center key={index}>
                  <Stack spacing={20} direction="row">
                    <VStack>
                      <Text fontSize="1xl">City: {listingData["City"]}</Text>
                    </VStack>
                    <VStack>
                      <Text fontSize="1xl">
                        Number Of Listings: {listingData["COUNT(*)"]}
                      </Text>
                    </VStack>
                  </Stack>
                </Center>
              </Box>
            ))
          )}
        </div>

        <div style={{ width: "27%" }}>
        <Heading as="h6" size="1x1" color="black" mb={2}>
            Type in a Neighborhood to see the Average Price of a Listing in It.
          </Heading>
          <Center>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdSearch />
              </InputLeftElement>
              <Input
                type="tel"
                onChange={(e) => setSearchTermAPPND(e.target.value)}
                placeholder="Type in a Neighhorhood:"
              />
            </InputGroup>
            <Button
              type="button"
              onClick={handleAveragePricePerNeighborhoodData}
            >
              Search
            </Button>
          </Center>

          {!stateChangeAPPND ? (
            <div style={{ display: "none" }}></div>
          ) : (
            <Box border="2px solid black" borderRadius="md" p="2" m={4}>
              <Center>
                <Stack spacing={20} direction="row">
                  <VStack>
                    <Text fontSize="1xl">City: {searchTermAPPND}</Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="1xl">
                      Average Price: {averagePricePerNeighborhoodData}
                    </Text>
                  </VStack>
                </Stack>
              </Center>
            </Box>
          )}
        </div>

        <div style={{ width: "27%" }}>
        <Heading as="h6" size="1x1" color="black" mb={8}>
            Type in a City to see the top neighborhoods in it.
          </Heading>
          <Center>
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
            <div style={{ display: "none" }}></div>
          ) : (
            topNeighborhoodsPerCityData.map((neighborhoodData, index) => (
              <Box border="2px solid black" borderRadius="md" p="2" m={4}>
                <Center key={index}>
                  <Stack spacing={20} direction="row">
                    <VStack>
                      <Text fontSize="1xl">
                        Neighborhood: {neighborhoodData["neighborhood"]}
                      </Text>
                    </VStack>
                    <VStack>
                      <Text fontSize="1xl">
                        Average Price: {neighborhoodData["avg_price"]}
                      </Text>
                    </VStack>
                  </Stack>
                </Center>
              </Box>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
