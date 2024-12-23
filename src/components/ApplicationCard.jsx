import { BarLoader } from "react-spinners";
import { updateApplications } from "../api/apiApplications";
import useFetch from "../hooks/useFetch";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import { Select } from "@chakra-ui/react";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplications,
    {
      job_id: application.job_id,
    }
  );
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };
  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };
  return (
    <>
      {loadingHiringStatus && (
        <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />
      )}
      <div className="flex justify-between p-2 border m-4 font-semibold">
        <div>
          <h2>
            {isCandidate
              ? `${isCandidate?.job?.title} at ${isCandidate?.job?.company?.name}`
              : `${application?.name}`}
          </h2>
          <div className="">
            <div className="flex items-center align-middle gap-2 mt-4">
              <BriefcaseBusiness size={18} /> {application?.experience} years of
              experience
            </div>
            <div className="flex items-center align-middle gap-2 mt-4">
              <School size={18} />
              Education: {application?.education}
            </div>{" "}
            <div className="flex items-center align-middle gap-2 mt-4">
              <Boxes size={18} /> Skills: {application?.skills}
            </div>
          </div>
          <div className="">
            <div className="mt-4 w-fit m-4 align-middle flex  justify-between">
              <div> {new Date(application?.created_at).toLocaleString()}</div>
            </div>
          </div>

          <div className="">
            {isCandidate ? (
              <span>Status:{application?.status}</span>
            ) : (
              <Select
                placeholder={`Application Status`}
                onChange={handleStatusChange}
                width={"fit-content"}
                defaultValue={application?.status}
                className="mt-2"
              >
                <option value={"applied"} className="text-black">
                  Applied
                </option>
                <option value={"interviewing"} className="text-black">
                  Interviewing
                </option>
                <option value={"hired"} className="text-black">
                  Hired
                </option>
                <option value={"rejected"} className="text-black">
                  Rejected
                </option>
              </Select>
            )}
          </div>
        </div>

        <Download
          size={28}
          className="cursor-pointer  text-black  rounded  bg-white p-1"
          onClick={handleDownload}
        />
      </div>
    </>
  );
};

export default ApplicationCard;
