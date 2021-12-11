import ItemsList from "../components/ItemsList";
import { User } from "../interfaces/UserInterfaces";

interface Props {
  user: User | undefined;
}

export default function Home({user}: Props): JSX.Element {
  return (
    <>
      <ItemsList {...{user}}/>
    </>
  );
}