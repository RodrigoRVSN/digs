import ProfileImageMinter from '@App/components/elements/MintingModal';
import { Button, Modal } from '@nextui-org/react';
import Image from 'next/image';
import Router from 'next/router';
import { useState } from 'react';
import { Iconly } from 'react-iconly';
import { itensSidebar } from './index.data';

export const Sidebar = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggleModal = (): void => setOpenModal(prevState => !prevState);

  return (
    <aside
      style={{
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Image src="/logo.png" width={40} height={50} objectFit="scale-down" />

      {itensSidebar.map(item => (
        <Button
          light
          style={{ marginTop: '20px' }}
          icon={<Iconly name={item.icon} style={{ marginRight: '8px' }} />}
          onClick={() =>
            Router.push(item.name === 'Profile' ? `/${item.id}` : item.route)
          }
        >
          {item.name}
        </Button>
      ))}

      <Button
        style={{ marginTop: '64px' }}
        shadow
        color="secondary"
        onClick={handleToggleModal}
      >
        Mint
      </Button>

      <Modal open={openModal} onClose={handleToggleModal}>
        <ProfileImageMinter />
      </Modal>
    </aside>
  );
};
