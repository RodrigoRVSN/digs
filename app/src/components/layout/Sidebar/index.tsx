import ProfileImageMinter from '@App/components/elements/MintingModal';
import { Modal } from '@nextui-org/react';
import Image from 'next/image';
import Router from 'next/router';
import { useState } from 'react';
import { Iconly } from 'react-iconly';
import { itensSidebar } from './index.data';
import * as S from './styles';

export const Sidebar = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggleModal = (): void => setOpenModal(prevState => !prevState);

  return (
    <S.SidebarContainer>
      <Image src="/logo.png" width={40} height={50} objectFit="scale-down" />

      {itensSidebar.map(item => (
        <S.ItemMenu
          light
          icon={<Iconly name={item.icon} style={{ marginRight: '8px' }} />}
          onClick={() =>
            Router.push(item.name === 'Profile' ? `/${item.id}` : item.route)
          }
        >
          {item.name}
        </S.ItemMenu>
      ))}

      <S.MintButton shadow color="secondary" onClick={handleToggleModal}>
        Mint
      </S.MintButton>

      <Modal closeButton open={openModal} blur onClose={handleToggleModal}>
        <ProfileImageMinter />
      </Modal>
    </S.SidebarContainer>
  );
};
