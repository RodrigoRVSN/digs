import { styled } from '@nextui-org/react';

export const DigsContainer = styled('section', {
  borderBottom: '1px solid $gray_2',
  display: 'flex',
  flexDirection: 'column',
  gap: '$md',
  padding: '$lg',
});

export const DigContainer = styled('article', {
  borderBottom: '1px solid $gray_2',
  gap: '$xs',
  maxWidth: '800px',
  padding: '$md',
  display: 'flex',
});

export const UserName = styled('div', {
  alignItems: 'center',
  display: 'flex',
  gap: '$xs',
});

export const Actions = styled('aside', {
  display: 'flex',
  gap: '$xlg',
  marginTop: '$md',
});
