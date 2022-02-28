import { Button, Input, Text, Modal } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';

interface InitialStateProps {
  profileImage: File;
  setProfileImage: Dispatch<SetStateAction<File>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  mint: () => void;
}

const InitialState = ({
  profileImage,
  setProfileImage,
  name,
  setName,
  description,
  setDescription,
  mint,
}: InitialStateProps): JSX.Element => {
  return (
    <>
      <Modal.Header>
        <Text size={34}>Mint</Text>
      </Modal.Header>

      <Modal.Body
        style={{
          paddingTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        <Input
          labelPlaceholder="Title of Image"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          labelPlaceholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="file"
          placeholder="Image URL"
          onChange={e => setProfileImage(e.target.files![0])}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button
          color="secondary"
          type="button"
          disabled={!name || !description || !profileImage.name}
          onClick={() => mint()}
        >
          Mint
        </Button>
      </Modal.Footer>
    </>
  );
};

export default InitialState;
