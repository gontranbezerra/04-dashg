import React from 'react';
import { useQuery, UseQueryOptions } from 'react-query';

import { api } from '../api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
    users: User[];
    totalCount: number;
}

// export async function getUsers(page: number): Promise<User[]> {
export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return { users, totalCount };
}

export function useUsers(page: number) {
// export function useUsers(page: number, options: UseQueryOptions) {
  //   return useQuery('users', () => getUsers(page), {
  return useQuery(['users', page], () => getUsers(page), {
    //   staleTime: 1000 * 5, // 5 seconds
    staleTime: 1000 * 60 * 10, // 10 min.
    // ...options,
  });
}
