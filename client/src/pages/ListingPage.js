import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Card, CardBody, Image, Stack, Heading, Text, 
    Divider, CardFooter, ButtonGroup, Button, VStack, Center, Input, InputGroup, 
    InputLeftElement

} from '@chakra-ui/react';
import {MdSearch} from 'react-icons/md'
import AirbnbListing from './AirbnbListing';
import CraigListing from './CraigListing';
const config = require('../config.json');

const ListingPage = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [airbnb, setAirbnb] = useState([])
  const [craigslist, setCraigslist] = useState([])

  useEffect(() => {
    if (location.state) {
      const {search, listing} = location.state
      if (listing === "airbnb") {
        fetch(`http://${config.server_host}:${config.server_port}/listings/airbnb?city=${search}`)
          .then(res => res.json())
          .then((data) => {
            const arr = data.slice(0, 20)
            setAirbnb(arr)
          })
      } else {
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
    fetch(`http://${config.server_host}:${config.server_port}/listings/craigslist?city=${searchInput}`)
      .then(res => res.json())
      .then((data) => {
        const arr = data.slice(0, 20)
        setCraigslist(arr)
      })
    fetch(`http://${config.server_host}:${config.server_port}/listings/airbnb?city=${searchInput}`)
    .then(res => res.json())
    .then((data) => {
      const arr = data.slice(0, 20)
      setAirbnb(arr)
    })
  }

  const searchAirbnb = () => {
    
  }
  
  return (
    <div>
      <Center mt={10} ml={200} mr={200}>
        <InputGroup>
        <InputLeftElement pointerEvents='none'>
        <MdSearch />
        </InputLeftElement>
        <Input type='tel' onChange={e=> setSearchInput(e.target.value)} placeholder='Search for a city to stay...' />
        </InputGroup>
        <Button onClick={() => searchListing()}>Search</Button>
      </Center>
      <Center>
        <Stack spacing={20} direction='row' mt={100}> 
          <VStack>
              <Text fontSize='5xl'>Airbnb Listings</Text>
              {
                airbnb.map((listing) => <AirbnbListing key={listing.Name} name={listing.Name} city={listing.City} price={listing.Price}/>)
              }
          </VStack>
          <VStack>
              <Text fontSize='5xl'>Cragislist Listings</Text>
              {
                craigslist.map((listing) => <CraigListing key={listing.Name} name={listing.Name} city={listing.City} price={listing.Price} neighborhood={listing.Neighborhood}/>)
              }
          </VStack>
        </Stack>
      </Center>
    </div>
  );
};



export default ListingPage;