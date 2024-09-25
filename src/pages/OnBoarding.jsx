import BlurIn from "../components/magicui/blur-in";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  console.log(user, "user");
  const handleRoleSelect = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/job-post" : "/jobs");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/job-post" : "/jobs"
      );
    }
  });
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />;
  }

  return (
    <div className=" h-[70vh]">
      <BlurIn word={"I am a..."} />
      <div className="flex justify-center gap-4 mt-20">
        <button
          className="h-20 w-60 p-2 rounded text-2xl bg-blue-500"
          onClick={() => handleRoleSelect("candidate")}
        >
          Candidate
        </button>
        <button
          className="h-20 w-60 p-2 rounded text-2xl bg-red-500"
          onClick={() => handleRoleSelect("recruiter")}
        >
          Recruiter
        </button>
      </div>
    </div>
  );
};

export default OnBoarding;
