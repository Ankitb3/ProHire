import { BarLoader } from "react-spinners";
import { getSavedJobs } from "../api/apiJobs";
import useFetch from "../hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import JobCard from "../components/JobCard";

const SavedJobs = () => {
  const { isLoaded } = useUser();
  const {
    fn: fnSavedJobs,
    data: savedJobs,
    loading: loadingSavedJobs,
  } = useFetch(getSavedJobs);
  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded]);
  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />;
  }
  return (
    <div>
      <h1>Saved Jobs</h1>
      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-col-3 gap-4 m-2">
          {savedJobs?.length ? (
            savedJobs.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved.job}
                  savedInt={true}
                  onJobSaved={fnSavedJobs}
                />
              );
            })
          ) : (
            <div>No Saved Jobs Found😥</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
