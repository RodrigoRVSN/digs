import { Container, styled } from '@nextui-org/react';
import { ReactNode } from 'react';

interface ILayout {
  children: ReactNode;
}

const LayoutContainer = styled(Container, {
  marginTop: '$xlg',
});

export const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <LayoutContainer lg display="flex">
      {children}
    </LayoutContainer>
  );
};
