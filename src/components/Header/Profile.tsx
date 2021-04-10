import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export default function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Gontran Bezerra</Text>
        <Text color="gray.300" fontSize="small">
          gontranbezerra@gmail.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Gontran Bezerra"
        src="https://github.com/gontranbezerra.png"
      />
    </Flex>
  );
}
