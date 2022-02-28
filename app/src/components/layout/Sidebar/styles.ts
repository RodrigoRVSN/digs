import { Button, styled } from '@nextui-org/react';

export const SidebarContainer = styled('aside', {
  width: '20%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
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
