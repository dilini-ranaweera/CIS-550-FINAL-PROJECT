import React from 'react';
import {Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button} from '@chakra-ui/react'

function CraigListing({name, city, price, neighborhood}) {
    return (
        <div>
            <Card maxW='sm'>
  <CardBody>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{name}</Heading>
      <Text>
        City: {city}, Neighborhood: {neighborhood}
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        ${price}/month
      </Text>
    </Stack>
  </CardBody>
</Card>
        </div>
    );
}

export default CraigListing;