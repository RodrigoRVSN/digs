import { Button, styled } from '@nextui-org/react';

export const SidebarContainer = styled('aside', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderRight: '1px solid $gray_2',
  paddingRight: '$xlg',
});

export const ItemMenu = styled(Button, {
  marginTop: '20px',
  cursor: 'pointer',
  '&:hover': {
    background: '$terciary',
  },
});

export const MintButton = styled(Button, {
  marginTop: '$xxlg',
  fontWeight: '$bold',
});
