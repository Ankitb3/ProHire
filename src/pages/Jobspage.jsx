import MDEditor from "@uiw/react-md-editor";
import { getSingleJob, updateHiringStatus } from "../api/apiJobs";
import useFetch from "../hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Select } from "@chakra-ui/react";
import ApplyJobDrawer from "../components/ApplyJob";
import ApplicationCard from "../components/ApplicationCard";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );
  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };
  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />;
  }
  return (
    <div className=" flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6  md:flex-row justify-between items-center m-4">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} alt={job?.title} className="h-12" />
      </div>
      <div className="flex justify-between m-2">
        <div className="flex gap-2">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {job?.applications?.length} Applicant
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>
      {loadingHiringStatus && (
        <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />
      )}
      {job?.recruiter_id === user?.id && (
        <Select
          placeholder={`Hiring Status` + job.isOpen ? "( Open )" : "( Closed )"}
          onChange={handleStatusChange}
          width={"fit-content"}
          className="mt-2"
          bg={"red"}
        >
          <option value={"open"} className="text-black">
            Open
          </option>
          <option value={"closed"} className="text-black">
            Closed
          </option>
        </Select>
      )}
      <h2 className="text-4xl font-semibold ms-2">About the job</h2>
      <p className="text-semibold ms-2 text-xl">{job?.description}</p>
      <h2 className="text-2xl font-semibold ms-2">We are looking for</h2>
      <div className=" m-2 p-1">
        <MDEditor.Markdown
          source={job?.requirements}
          className=" bg-white sm:text-lg list-disc"
        />
      </div>

      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div>
          <h2 className="text-bold text-4xl text-center">Applications</h2>
          {job?.applications.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobPage;
