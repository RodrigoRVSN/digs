import { Container } from '@nextui-org/react';
import { ReactNode } from 'react';

interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <Container lg display="flex" style={{ marginTop: '16px' }}>
      {children}
    </Container>
  );
};
