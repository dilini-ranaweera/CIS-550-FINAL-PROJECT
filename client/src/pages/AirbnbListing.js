import React from 'react';
import {Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button} from '@chakra-ui/react'


function AirbnbListing({name, city, price}) {
  return (
    <div>
      <Card maxW='sm'>
        <CardBody>
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{name}</Heading>
            <Text>
              City: {city}
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              ${price}/night
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default AirbnbListing;