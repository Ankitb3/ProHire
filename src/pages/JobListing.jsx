import useFetch from "../hooks/useFetch";
import { getJobs } from "../api/apiJobs";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "../components/JobCard";
import { getCompanies } from "../api/apiCommpanies";
import { Button, Input, Select } from "@chakra-ui/react";
import { State } from "country-state-city";

const JobListing = () => {
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });
  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  useEffect(() => {
    if (isLoaded) fnCompanies();
    console.log(State.getAllStates("IN"), "states id");
  }, [isLoaded]);
  const handleClear = () => {
    setLocation("");
    setCompany_id("");
    setSearchQuery("");
  };
  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />;
  }
  return (
    <div>
      <h1 className=" text-6xl font-bold pp-2 text-center">Latest Jobs</h1>
      <form onSubmit={handleSearch} className="m-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search Jobs By Title"
            type="text"
            name="search-query"
            className="px-4 text-md"
          />
          <Button colorScheme={"blue"} type="submit">
            Search
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select
            placeholder="Filter By Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            width={"fit-content"}
            className="mt-2"
            bg={"transparent"}
          >
            {State.getAllStates("IN")
              ?.filter(({ countryCode }) => countryCode === "IN")
              .map(({ name }) => {
                return (
                  <option value={name} key={name} className="text-black">
                    {name}
                  </option>
                );
              })}
          </Select>
          <Select
            placeholder="Filter By Company"
            value={company_id}
            onChange={(e) => setCompany_id(e.target.value)}
            width={"fit-content"}
            className="mt-2"
            bg={"transparent"}
          >
            {companies?.map(({ name, id }) => {
              return (
                <option value={id} key={name} className="text-black ">
                  {name}
                </option>
              );
            })}
          </Select>

          <Button
            onClick={handleClear}
            disabled={false}
            className="m-2 text-white"
            bg={"#D2042D"}
            color={"white"}
            _hover={{
              bg: "#D2042D",
              color: "white",
              opacity: "10px",
            }}
          >
            Clear Filter
          </Button>
        </div>
      </form>
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
