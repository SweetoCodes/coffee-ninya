import { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "../../utils/contexts/auth_context";

export default function ProfilePicture(props) {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return null;
  }
  return (
    <div className={props.style}>
      <Image
        className="object-cover rounded-full transition duration-1000 ease-in-out"
        src={currentUser.photoURL}
        alt="me"
        width="50"
        height="50"
        layout="responsive"
        alt="Profile Picture"
      />
    </div>
  );
}
