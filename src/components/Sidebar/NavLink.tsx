import { ElementType } from 'react';
import {
  Link as ChakraLink,
  Text,
  Icon,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

import ActiveLink from '../ActiveLink';
interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export default function NavLink(props: NavLinkProps) {
  const { icon, children, href, ...rest } = props;

  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
