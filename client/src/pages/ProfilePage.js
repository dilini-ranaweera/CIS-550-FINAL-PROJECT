import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box, Text, VStack, HStack, Divider, Stack,
  IconButton, Flex, Spacer, Button, Input, Wrap, WrapItem, Avatar, Center, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,

} from '@chakra-ui/react';
import { MdEditSquare } from 'react-icons/md';
import config from '../config.json';
//import UserSavesTable from '../components/UserSavesTable'; // Adjust the path based on your file structure

const fetchUserSaves = async (email) => {
  try {
    const response = await fetch(`http://${config.server_host}:${config.server_port}/user_saves/${email}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching user saves', error);
    return [];
  }
};

const UserSavesTable = () => {
  const email = 'user25@example.com'; // Replace with the desired email
  const [userSaves, setUserSaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSavesAndSetState = async () => {
      try {
        const result = await fetchUserSaves(email);
        setUserSaves(result);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSavesAndSetState();
  }, [email]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <VStack  justify="center" w = "100%">
      <Flex borderWidth="1px" w="100%" shadow="md" justify="center">
        <Text fontSize="xl" fontWeight="bold" textAlign="center" >
          My Saved Listings
        </Text>
      </Flex>

      <Flex w="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Neighborhood</Th>
              <Th>City</Th>
              <Th>Listing Type</Th>

            </Tr>
          </Thead>
          <Tbody>
            {userSaves.map((save) => (
              <Tr key={save.ListingID}>
                <Td>{save.Name}</Td>
                <Td>{save.Price}</Td>
                <Td>{save.Neighborhood}</Td>
                <Td>{save.City}</Td>
                <Td>{save.ListingType}</Td>

              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </VStack>
  );
};

const fetchCommonSaves = async (email) => {
  try {
    const response = await fetch(`http://${config.server_host}:${config.server_port}/common_listings/${email}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching user saves', error);
    return [];
  }
};

const CommonSavesTable = () => {
  const email = 'user25@example.com'; // Replace with the desired email
  const [commonSaves, setCommonSaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommonSavesAndSetState = async () => {
      try {
        const result = await fetchCommonSaves(email);
        setCommonSaves(result);
      } finally {
        setLoading(false);
      }
    };

    fetchCommonSavesAndSetState();
  }, [email]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <VStack  justify="center" w = "100%">
      <Flex borderWidth="1px" w="100%" shadow="md" justify="center">
        <Text fontSize="xl" fontWeight="bold" textAlign="center" >
          Other People Saved...
        </Text>
      </Flex>

      <Flex w="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Neighborhood</Th>
              <Th>City</Th>
              <Th>Listing Type</Th>

            </Tr>
          </Thead>
          <Tbody>
            {commonSaves.map((save) => (
              <Tr key={save.ListingID}>
                <Td>{save.Name}</Td>
                <Td>{save.Price}</Td>
                <Td>{save.Neighborhood}</Td>
                <Td>{save.City}</Td>
                <Td>{save.ListingType}</Td>

              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </VStack>
  );
};


function ProfilePage() {
  const [me, setMe] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [diet, setDiet] = useState('');
  const [showEmail, setShowEmail] = useState(true);
  const [showDiet, setShowDiet] = useState(true);
  const [showName, setShowName] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [showBio, setShowBio] = useState(true);
  const [photoURL, setPhotoURL] = useState();

  const getMe = async () => {
    try {
      const res = await fetch(`http://${config.server_host}:${config.server_port}/user_info/user25@example.com`);
      if (res.ok) {
        const data = await res.json();
        setMe(data[0]);
        console.log(data[0]); // Log the data after setting the state
      } else {
        console.error('Error fetching user data', res.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const getMyData = async () => {
    setEmail(me.Email);
    setLocation(me.City);
    setName(me.Name);
    setBio(me.Bio);
    setUsername(me.Username)
  };

  const makeChange = async (currAttribute, newValue) => {
    // const payload = {
    //   attribute: currAttribute,
    //   value: newValue,
    // };
    // setShowEmail(true);
    // setShowName(true);
    // setShowLocation(true);
    // setShowDiet(true);
    // setShowBio(true);
    // editUser(me.username, payload);
  };

  function closeName() {
    getMyData();
    setShowName(!showName);
  }

  function closeEmail() {
    getMyData();
    setShowEmail(!showEmail);
  }

  function closeLocation() {
    getMyData();
    setShowLocation(!showLocation);
  }

  function closeBio() {
    getMyData();
    setShowBio(!showBio);
  }

  function closeDiet() {
    getMyData();
    setShowDiet(!showDiet);
  }

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    getMyData(); // Log the updated state in useEffect
  }, [me]); // Add me as a dependency to the useEffect hook

  return (
    <VStack spacing={8} margin="50px" align="start">
      <Flex direction="row" w="100%" justify="center">
        <Box p={10} shadow="md" width="30%" borderWidth="1px">
          <Center>
            <Avatar align="center" src={photoURL} sx={{ width: 40, height: 40 }} />
          </Center>
          <HStack>
            <Wrap>
              <WrapItem>
                <Text align="left-align" fontWeight="bold" ml={7} fontSize="2xl" p="30px 0px 0px">{name}</Text>
              </WrapItem>
            </Wrap>
          </HStack>
          <Text align="left-align" ml={7} fontSize="lg">{`@${username}`}</Text>
          <Text align="left-align" ml={7} color="grey" fontSize="sm">{bio}</Text>
        </Box>
        <Spacer />

        <Box shadow="md" p={10} width="68%" height="50%" borderWidth="1px">
          <VStack divider={<Divider />} spacing="10" align="left-align">
            {showName
              ? (
                <Flex direction="row">
                  <Text fontWeight="bold" fontSize="xl">Full Name:</Text>
                  <Text ml={3} fontSize="xl">{name}</Text>
                  <Spacer />
                  <IconButton variant="ghost" icon={<MdEditSquare />} onClick={() => { setShowName(!showName); }} />
                </Flex>
              )
              : (
                <Flex direction="row">
                  <Input w="50%" variant="outline" placeholder="Name" mr={3} onChange={(e) => setName(e.target.value)} />
                  <Button mr={3} onClick={() => { makeChange('name', name); }}>
                    Save
                  </Button>
                  <Button onClick={() => closeName()}>Cancel</Button>
                </Flex>
              )}
            {showEmail
              ? (
                <Flex direction="row">
                  <Text fontWeight="bold" fontSize="xl">Email:</Text>
                  <Text ml={3} fontSize="xl">{email}</Text>
                  <Spacer />
                  <IconButton variant="ghost" icon={<MdEditSquare />} onClick={() => { setShowEmail(!showEmail); }} />
                </Flex>
              )
              : (
                <Flex direction="row">
                  <Input w="50%" variant="outline" placeholder="Email" mr={3} onChange={(e) => setEmail(e.target.value)} />
                  <Button mr={3} onClick={() => { makeChange('email', email); }}>
                    Save
                  </Button>
                  <Button onClick={() => closeEmail()}>Cancel</Button>
                </Flex>
              )}
            {showLocation
              ? (
                <Flex direction="row">
                  <Text fontWeight="bold" fontSize="xl">City:</Text>
                  <Text ml={3} fontSize="xl">{location}</Text>
                  <Spacer />
                  <IconButton variant="ghost" icon={<MdEditSquare />} onClick={() => { setShowLocation(!showLocation); }} />
                </Flex>
              )
              : (
                <Flex direction="row">
                  <Input w="50%" variant="outline" placeholder="Location" mr={3} onChange={(e) => setLocation(e.target.value)} />
                  <Button mr={3} onClick={() => { makeChange('location', location); }}>
                    Save
                  </Button>
                  <Button onClick={() => closeLocation()}>Cancel</Button>
                </Flex>
              )}
          </VStack>
        </Box>
      </Flex>
      {/* UserSavesTable component added here */}
      <Flex w="100%" shadow="md" borderWidth="1px">
        <UserSavesTable />
      </Flex>

      <Flex w="100%" shadow="md" borderWidth="1px">
        <CommonSavesTable />
      </Flex>

    </VStack>
  );
}

export default ProfilePage;
