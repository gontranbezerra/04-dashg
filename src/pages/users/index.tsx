import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination';

export default function UsersList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                colorScheme="pink"
                fontSize="20"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={['4', '4', '6']} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de cadastro</Th>}
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={['4', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Gontran Bezerra</Text>
                    <Text fontSize="sm" color="gray.300">
                      gontranbezerra@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>04 de abril de 2021</Td>}
                <Td>
                  {isWideVersion && (
                    <Button
                      as="a"
                      size="sm"
                      colorScheme="purple"
                      fontSize="16"
                      leftIcon={<Icon as={RiPencilLine} />}
                    >
                      Editar
                    </Button>
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
