import { MessagesList } from './components/MessagesList';
import { UserSubmitMessage } from './components/UserSubmitMessage';

export const UserLoggedIn = (): JSX.Element => {
  return (
    <>
      <UserSubmitMessage />
      <MessagesList />
    </>
  );
};
