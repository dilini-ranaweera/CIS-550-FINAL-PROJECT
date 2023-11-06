import {
    Box,
    CloseButton,
    Heading,
    Flex,
  } from '@chakra-ui/react';
  import PropTypes from 'prop-types';
  import React from 'react';
  
  function Toast({ title, content, type }) {
    let color;
    switch (type) {
      case 'error':
        color = 'red';
        break;
      case 'success':
        color = 'green';
        break;
      default:
        color = 'blue.500';
    }
  
    return (
      <Box color="white" p={3} bg={color} rounded="md">
        <Flex>
          <Heading size="sm" alignSelf="center">{title}</Heading>
          <CloseButton marginLeft="auto" />
        </Flex>
        {content}
      </Box>
    );
  }
  
  Toast.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['error', 'success', 'info']),
  };
  
  Toast.defaultProps = {
    type: 'default',
  };
  
  export default Toast;