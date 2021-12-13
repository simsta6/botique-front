import { User } from "../interfaces/UserInterfaces";

interface Props {
  user: User | undefined;
}

export default function AdminZone({user}: Props): JSX.Element {
  return (
    <>admin</>
  );
}