import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export default function Profile(props) {
  const { showProfileData = true } = props;
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gontran Bezerra</Text>
          <Text color="gray.300" fontSize="small">
            gontranbezerra@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Gontran Bezerra"
        src="https://github.com/gontranbezerra.png"
      />
    </Flex>
  );
}
