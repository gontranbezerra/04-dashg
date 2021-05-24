import React, { useEffect } from 'react';
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
  Spinner,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination';
import { api } from '../../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function UsersList() {
  // const query = useQuery('users', async () => {
  //   const response = await fetch('http://localhost:3000/api/users');
  //   const data = await response.json();
  //   return data;
  // });

  // console.log('UsersList.query: ', query);

  const { data, isLoading, isFetching, error } = useQuery('users', async () => {
    // const response = await fetch('http://localhost:3000/api/users');
    // const data = await response.json();
    
    const { data } = await api.get('users');
    
    const users = data.users.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
      };
    })
    return users;
  }, {
    staleTime: 1000 * 5, // 5 seconds
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/users')
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              { !isLoading && isFetching && <Spinner sizer='sm' color='gray.500' ml='4' /> }
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

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuáios</Text>
            </Flex>
          ) : (
            <>
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
                  {data.map((user: User) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
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
                  ))}
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
