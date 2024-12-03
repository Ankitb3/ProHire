import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../assets/Logo.png";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (search.get("sign-in")) {
      setShow(true);
    }
  }, [search]);
  const handleOverlay = (e) => {
    if (e.target == e.currentTarget) {
      setShow(false);
      setSearch({});
    }
  };
  return (
    <>
      <nav className="flex justify-between items-center align-middle">
        <Link className="m-2">
          <img src={Logo} alt="logo" className="h-32 w-32 rounded" />
        </Link>
        <div>
          <SignedOut>
            <Button
              variant="outline"
              colorScheme={"white"}
              className="m-2"
              onClick={() => setShow(true)}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <button className="m-2 relative bottom-2 bg-red-700  text-white font-semibold p-2 rounded gap-2">
                <span className="flex">
                  {" "}
                  <PenBox size={20} className="mr-2" />
                  <p>Post a Job</p>
                </span>
              </button>
            )}

            {/* <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} href="/my-jobs" />}
                />
                <UserButton.Action
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} href="/my-jobs" />}
                />{" "}
                <UserButton.Action
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} href="/my-jobs" />}
                />
              </UserButton.MenuItems>
            </UserButton> */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  onClick={() => navigate("my-jobs")}
                />
                <UserButton.Action
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  onClick={() => navigate("saved-jobs")}
                />
                {/* <UserButton.Action
                  label="Applied Jobs"
                  labelIcon={<BriefcaseBusiness />}
                  onClick={() => navigate("applied-jobs")}
                /> */}
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {show && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
          onClick={handleOverlay}
        >
          <SignIn
            appearance={"black"}
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
