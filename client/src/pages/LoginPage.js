import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useToast, Box, Button, FormControl, FormLabel, Heading, Input, Stack, InputRightElement,
  InputGroup, IconButton,
} from '@chakra-ui/react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import Toast from '../components/Toast';

function LoginPage() {
  const [username, usernameUpdate] = useState('');
  const [password, passwordUpdate] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { username, password };
    // postLogin(data).then((resp) => {
    //   switch (resp.status) {
    //     case 201:
    //       localStorage.setItem('token', resp.data);
    //       toast({
    //         position: 'top-right',
    //         duration: 100,
    //         render: () => (
    //           <Toast
    //             title="Success"
    //             content="Succesfully logged in!"
    //             type="success"
    //           />
    //         ),
    //       });
    //       navigate('/');
    //       break;
    //     case 400:
    //       toast({
    //         position: 'top-right',
    //         render: () => (
    //           <Toast
    //             title="Error"
    //             content="No username/password provided."
    //             type="error"
    //           />
    //         ),
    //       });
    //       break;
    //     case 401:
    //       toast({
    //         position: 'top-right',
    //         render: () => (
    //           <Toast
    //             title="Error"
    //             content="Invalid credentials."
    //             type="error"
    //           />
    //         ),
    //       });
    //       break;
    //     default:
    //       break;
    //   }
    // }).catch((err) => {
    //   toast({
    //     position: 'top-right',
    //     render: () => (
    //       <Toast
    //         title="Error"
    //         content={err.message}
    //         type="error"
    //       />
    //     ),
    //   });
    // });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box as="form" onSubmit={handleLogin} p={6} rounded="md" boxShadow="lg" bg="white">
        <Stack spacing={4}>
          <Heading as="h2" size="lg" textAlign="center">User Login</Heading>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input data-testid="username" type="text" value={username} onChange={(e) => usernameUpdate(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input data-testid="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => passwordUpdate(e.target.value)} />
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
          <Stack direction="row" justifyContent="space-between">
            <Button data-testid="login" type="submit" colorScheme="blue">Login</Button>
            <Button onClick={() => navigate('/register')}>Register</Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginPage;