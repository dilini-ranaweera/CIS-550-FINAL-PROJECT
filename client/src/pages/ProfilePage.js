import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box, Text, VStack, HStack, Divider, Stack,
  IconButton, Flex, Spacer, Button, Input, Wrap, WrapItem, Avatar, Center,
} from '@chakra-ui/react';
import { MdEditSquare } from 'react-icons/md';
// import testImage from '../assets/image.png';

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
    // const res = await getAuth();
    // if (res.status === 200) {
    //   setMe(res.data);
    //   setUsername(me.username);
    //   setName(me.name);
    //   setEmail(me.email);
    //   setLocation(me.location);
    //   setDiet(me.diet);
    //   setBio(me.bio);
    //   setPhotoURL(me.photoUrl);
    // }
  };

  const getMyData = async () => {
    // const res = await getUser(me.username);
    // if (res) {
    //   setName(res.name);
    //   setEmail(res.email);
    //   setLocation(res.location);
    //   setDiet(res.diet);
    //   setBio(res.bio);
    //   setPhotoURL(res.photoUrl);
    // }
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
  }, [me.username]);

  return (
    <Stack spacing={8} direction="row" margin="50px">
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
      <Box shadow="md" p={10} width="70%" height="50%" borderWidth="1px">
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
    </Stack>
  );
}

export default ProfilePage;