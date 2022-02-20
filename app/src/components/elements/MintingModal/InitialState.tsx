import { Dispatch, SetStateAction } from 'react';

interface InitialStateProps {
  profileImage: File;
  setProfileImage: Dispatch<SetStateAction<File | undefined>>;
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
  console.log(profileImage);

  return (
    <>
      <label htmlFor="image-upload">
        <input
          type="file"
          id="image-upload"
          accept=".jpg, .jpeg, .png"
          placeholder="Image URL"
          onChange={e => setProfileImage(e.target.files![0])}
        />
        Select File
      </label>

      <input
        type="text"
        placeholder="Title of Image"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <span>Everyone can see this</span>
      <button
        type="button"
        onClick={() => {
          if (name && description && profileImage) {
            mint();
          }
        }}
      >
        Mint
      </button>
    </>
  );
};

export default InitialState;
