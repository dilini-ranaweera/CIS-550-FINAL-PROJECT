import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useToast, Box, Button, FormControl, FormLabel, Heading, Input, Stack, InputRightElement,
  InputGroup, IconButton,
} from '@chakra-ui/react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Toast from '../components/Toast';

function RegistrationPage() {
  const [username, usernameChange] = useState('');
  const [name, nameChange] = useState('');
  const [password, passwordChange] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, emailChange] = useState('');
  const [diet, dietChange] = useState('');
  const [location, locationChange] = useState('');
  const [bio, bioChange] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('diet', diet);
    formData.append('location', location);
    formData.append('bio', bio);
    formData.append('file', selectedFile);

    // postRegister(formData).then((resp) => {
    //   switch (resp.status) {
    //     case 201:
    //       localStorage.setItem('token', resp.data);
    //       toast({
    //         position: 'top-right',
    //         duration: 5000,
    //         render: () => (
    //           <Toast
    //             title="Success"
    //             content="Succesfully created account!"
    //             type="success"
    //           />
    //         ),
    //       });
    //       navigate('/');
    //       break;
    //     case 409:
    //       toast({
    //         position: 'top-right',
    //         render: () => (
    //           <Toast
    //             title="Error"
    //             content="User with username already exists."
    //             type="error"
    //           />
    //         ),
    //       });
    //       break;
    //     default:
    //       toast({
    //         position: 'top-right',
    //         render: () => (
    //           <Toast
    //             title="Error"
    //             content="Error creating account."
    //             type="error"
    //           />
    //         ),
    //       });
    //   }
    // });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box as="form" onSubmit={handleRegister} p={6} rounded="md" boxShadow="lg" bg="white">
        <Stack spacing={4}>
          <Heading as="h2" size="lg" textAlign="center">User Registration</Heading>
          <Stack direction="row" justifyContent="space-between">
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input data-testid="username" type="text" value={username} onChange={(e) => usernameChange(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input data-testid="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => passwordChange(e.target.value)} />
                <InputRightElement width="3rem">
                {showPassword 
                    ? <IconButton h="1.5rem" size="sm" onClick={() => setShowPassword(!showPassword)} icon={<MdVisibility/>}>
                    </IconButton>
                    : <IconButton h="1.5rem" size="sm" onClick={() => setShowPassword(!showPassword)} icon={<MdVisibilityOff/>}>
                        </IconButton>
                    }
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <FormControl id="fullname" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input data-testid="fullname" type="text" value={name} onChange={(e) => nameChange(e.target.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input data-testid="email" type="text" value={email} onChange={(e) => emailChange(e.target.value)} />
            </FormControl>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <FormControl id="diet">
              <FormLabel>Dietary Restrictions</FormLabel>
              <Input data-testid="diet" type="text" value={diet} onChange={(e) => dietChange(e.target.value)} />
            </FormControl>
            <FormControl id="location">
              <FormLabel>Location</FormLabel>
              <Input data-testid="location" type="text" value={location} onChange={(e) => locationChange(e.target.value)} />
            </FormControl>
          </Stack>
          <FormControl id="bio">
            <FormLabel>Bio</FormLabel>
            <Input data-testid="bio" type="text" value={bio} onChange={(e) => bioChange(e.target.value)} />
          </FormControl>
          <Stack direction="row" justifyContent="space-between">
            <Button data-testid="register" type="submit" colorScheme="blue">Register</Button>
            <Button data-testid="back" colorScheme="red" onClick={() => navigate('/login')}>Back</Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default RegistrationPage;