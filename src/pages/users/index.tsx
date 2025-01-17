import React, { useState } from 'react';
import NextLink from 'next/link';
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
  Link,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
// import { useQuery } from 'react-query';
import { GetServerSideProps } from 'next';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination';
import { api } from '../../services/api';
import { getUsers, useUsers } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function UsersList({ users }) {
  // const query = useQuery('users', async () => {
  //   const response = await fetch('http://localhost:3000/api/users');
  //   const data = await response.json();
  //   return data;
  // });

  // console.log('UsersList.query: ', query);

  // const { data, isLoading, isFetching, error } = useQuery('users', async () => {
  //   // const response = await fetch('http://localhost:3000/api/users');
  //   // const data = await response.json();

  //   const { data } = await api.get('users');

  //   const users = data.users.map((user: User) => {
  //     return {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
  //         day: '2-digit',
  //         month: 'long',
  //         year: 'numeric'
  //       }),
  //     };
  //   })
  //   return users;
  // }, {
  //   staleTime: 1000 * 5, // 5 seconds
  // });

  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);
  // const { data, isLoading, isFetching, error } = useUsers(page, {
  //   initialData: users,
  // });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/users')
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  async function handlerPrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 min.
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner sizer="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                colorScheme="pink"
                fontSize="20"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </NextLink>
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
                  {data.users.map((user: User) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlerPrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
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
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1);

//   return {
//     props: {
//       users,
//     },
//   };
// };
