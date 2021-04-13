import { Flex, Stack, Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

// const signInFormSchema = yup.object().shape({
//   email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
//   password: yup.string().required('Senha obrigaória'),
// });

const signInFormSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm();
  // const {
  //   register,
  //   handleSubmit,
  //   formState,
  //   formState: { errors },
  // } = useForm<SignInFormData>({
  //   resolver: yupResolver(signInFormSchema),
  // });

  // function handleSignIn(data: SignInFormData) {
  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            name="email"
            label="E-mail"
            error={errors.email}
            // ref={register}
            // {...register('email')}
            {...register('email', { required: 'E-mail obrigatório' })}
          />
          <Input
            type="password"
            name="password"
            label="Senha"
            error={errors.password}
            // ref={register}
            {...register('password', { required: 'Senha obrigatória' })}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
