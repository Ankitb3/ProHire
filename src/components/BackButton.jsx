import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="flex w-fit">
      <ArrowBigLeft />
      Back
    </button>
  );
};

export default BackButton;
