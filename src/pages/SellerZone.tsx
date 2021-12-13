import { User } from "../interfaces/UserInterfaces";

interface Props {
  user: User | undefined;
}

export default function SellerZone({user}: Props): JSX.Element {
  return (
    <>Seller</>
  );
}