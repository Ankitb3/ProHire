import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpeg";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
import { Button } from "@chakra-ui/react";
const Header = () => {
  return (
    <nav className="flex justify-between">
      <Link className="m-2">
        <img src={Logo} alt="logo" className="h-32 w-32 rounded" />
      </Link>
      <Button variant="outline" colorScheme={"white"} className="m-2">
        Login
      </Button>
      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
    </nav>
  );
};

export default Header;
