import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Stack, Text, Button, VStack, Center, Input, InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md'
import AirbnbListing from './AirbnbListing';
import CraigListing from './CraigListing';
const config = require('../config.json');

const ListingPage = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [airbnb, setAirbnb] = useState([]);
  const [craigslist, setCraigslist] = useState([]);
  const [priceInput, setPriceInput] = useState("");
  const [showCraigslist, setShowCraigslist] = useState(true);
  const [showAirBnb, setShowAirBnb] = useState(true);

  useEffect(() => {
    if (location.state) {
      const { search, listing } = location.state
      if (listing === "airbnb") {
        setShowCraigslist(false);
        fetch(`http://${config.server_host}:${config.server_port}/listings/airbnb?city=${search}`)
          .then(res => res.json())
          .then((data) => {
            const arr = data.slice(0, 20)
            setAirbnb(arr)
          })
      } else {
        setShowAirBnb(false);
        fetch(`http://${config.server_host}:${config.server_port}/listings/craigslist?city=${search}`)
          .then(res => res.json())
          .then((data) => {
            const arr = data.slice(0, 20)
            setCraigslist(arr)
          })
      }
    }
  }, [location.state]);

  const searchListing = () => {
    if (priceInput === "") {
      fetch(`http://${config.server_host}:${config.server_port}/airbnb_no_craiglist`)
        .then(res => res.json())
        .then((data) => {
          let showCraig = true
          data.forEach((city) => {
            if (city.City === searchInput) {
              showCraig = false
            }
          });
          setShowCraigslist(showCraig)
          if (showCraig) {
            fetch(`http://${config.server_host}:${config.server_port}/listings/craigslist?city=${searchInput}`)
              .then(res => res.json())
              .then((data) => {
                const arr = data.slice(0, 50)
                setCraigslist(arr)
              })
          }
          fetch(`http://${config.server_host}:${config.server_port}/listings/airbnb?city=${searchInput}`)
            .then(res => res.json())
            .then((data) => {
              const arr = data.slice(0, 50)
              setAirbnb(arr)
            })
        })
    } else {
      const price = Number(priceInput)
      fetch(`http://${config.server_host}:${config.server_port}/airbnb_no_craiglist`)
        .then(res => res.json())
        .then((data) => {
          let showCraig = true
          data.forEach((city) => {
            if (city.City === searchInput) {
              showCraig = false
            }
          });
          setShowCraigslist(showCraig)
          if (showCraig) {
            fetch(`http://${config.server_host}:${config.server_port}/craigslist_in_price_range?price=${price}&city=${searchInput}`)
              .then(res => res.json())
              .then((data) => {
                const arr = data.slice(0, 50)
                setCraigslist(arr)
              })
          }
          fetch(`http://${config.server_host}:${config.server_port}/airbnb_in_price_range?price=${price}&city=${searchInput}`)
            .then(res => res.json())
            .then((data) => {
              const arr = data.slice(0, 50)
              setAirbnb(arr)
            })
        })
    }
  }

  const searchCheapest = () => {
    fetch(`http://${config.server_host}:${config.server_port}/top_rentals?city=${searchInput}`)
      .then(res => res.json())
      .then((data) => {
        let air = []
        let craig = []
        data.forEach((listing) => {
          if (listing.Type === "airbnb") {
            air.push({
              Name: listing.Name,
              Price: listing.Price,
              Neighborhood: listing.Neighborhood,
              City: listing.City
            })
          } else {
            craig.push({
              Name: listing.Name,
              Price: listing.Price,
              Neighborhood: listing.Neighborhood,
              City: listing.City
            })
          }
        })
        setAirbnb(air)
        setCraigslist(craig)
      })
  }

  return (
    <div>
      <Center mt={10} ml={200} mr={200}>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <MdSearch />
          </InputLeftElement>
          <Input onChange={e => setSearchInput(e.target.value)} placeholder='Search for a city to stay...' />
          <Input onChange={e => setPriceInput(e.target.value)} placeholder='Max price for your stay: $/day' />
        </InputGroup>
        <Button onClick={() => searchListing()}>Search</Button>
        <Button onClick={() => searchCheapest()}>Search Cheapest</Button>
      </Center>
      <Center>
        <Stack spacing={20} direction='row' mt={100}>
          <VStack>
            {
              showAirBnb && (
                <VStack>
                  <Text fontSize='5xl'>Airbnb Listings</Text>
                  {
                    airbnb.map((listing) => <AirbnbListing key={listing.Name} name={listing.Name} city={listing.City} price={listing.Price} />)
                  }
                </VStack>
              )
            }

          </VStack>
          {
            showCraigslist && (
              <VStack>
                <Text fontSize='5xl'>Craigslist Listings</Text>
                {
                  craigslist.map((listing) => <CraigListing key={listing.Name} name={listing.Name} city={listing.City} price={listing.Price} neighborhood={listing.Neighborhood} />)
                }
              </VStack>
            )
          }
        </Stack>
      </Center>
    </div>
  );
};

export default ListingPage;
