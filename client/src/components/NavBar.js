import {
  Box, Button, ButtonGroup, Flex, HStack, IconButton, useBreakpointValue, Text
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Logo from './Logo'

function Navbar() {
  const isDesktop = useBreakpointValue({
    base: true, sm: false, md: true, lg: true,
  });
  const navigate = useNavigate();
  const [user, setUser] = useState("sdfds");

 
  return (
    <Box as="nav" bg="bg-surface" boxShadow="sm">
      <Flex>
        <Flex marginEnd={10}>
          <Logo />
        </Flex>
        {isDesktop ? (
          <Flex justify="space-between" flex="1">
            {user && (
              <ButtonGroup variant="link" spacing="8">
                <Button key="home" onClick={() => navigate('/')}>Home</Button>
                {['Listing', 'Statistics'].map((item) => (
                  <Button key={item} onClick={() => navigate(`/${item.toLowerCase()}`)}>{item}</Button>
                ))}
              </ButtonGroup>
            )}
            <HStack spacing="3">
              {user ? (
                <Button variant="primary" onClick={() => navigate('/profile')}>User</Button>
              ) : (
                <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
              )}
            </HStack>
          </Flex>
        ) : (
          <IconButton alignSelf="center" marginLeft="auto" marginRight="10px" variant="ghost" icon={<FiMenu fontSize="1.25rem" />} aria-label="Open Menu" />
        )}
      </Flex>
    </Box>
  );
}

export default Navbar;