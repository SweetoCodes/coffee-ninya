import { useContext } from "react";
import { AuthContext } from "../../utils/contexts/auth_context";
import LoggedInNavBar from "../widgets/logged-in-navbar";
import LoggedOutNavBar from "../widgets/logged-out-navbar";

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <LoggedInNavBar/>;
  } else {
    return <LoggedOutNavBar/>;
  }
}
