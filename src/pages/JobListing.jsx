import useFetch from "../hooks/useFetch";
import { getJobs } from "../api/apiJobs";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "../components/JobCard";

const JobListing = () => {
  const [loaction, setLoaction] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { loaction, company_id, searchQuery });
  // const { session } = useSession();
  // const fethJobs = async () => {
  //   const supabseAccessToken = await session.getToken({
  //     template: "supabase",
  //   });
  //   const data = await getJobs(supabseAccessToken);
  //   console.log(data);
  // };

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, loaction, company_id, searchQuery]);
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />;
  }
  return (
    <div>
      <h1 className=" text-6xl font-bold pp-2 text-center">Latest Jobs</h1>
      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />
      )}
      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-col-3 gap-4 m-2">
          {Jobs?.length ? (
            Jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInt={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
