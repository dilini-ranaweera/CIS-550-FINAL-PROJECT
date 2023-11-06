import { HStack, Heading, Box, Spacer } from '@chakra-ui/react';
import { MdHolidayVillage } from 'react-icons/md';
import React from 'react';

export default function Logo() {
  return (
    <HStack>
        <Spacer />
      <MdHolidayVillage color="black" size={50} />
      <Box>
        <Heading color="black" size="md">Subletter</Heading>
      </Box>
    </HStack>
  );
}