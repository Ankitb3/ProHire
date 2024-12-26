import { Input, Select, Textarea } from "@chakra-ui/react";
import BlurIn from "../components/magicui/blur-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { State } from "country-state-city";
import { getCompanies } from "../api/apiCommpanies";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { addNewJob } from "../api/apiJobs";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add new Company" }),
  requirements: z.string().min(1, { message: "Requirements is required" }),
});
const PostJobs = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);
  const {
    fn: fnCreateJob,
    data: dataCreatedjob,
    loading: loadingCreateJob,
    error: errorCreateJob,
  } = useFetch(addNewJob);
  const onSubmit = (data) => {
    fnCreateJob({ ...data, recruiter_id: user.id, isOpen: true });
  };
  useEffect(() => {
    if (dataCreatedjob?.length > 0) navigate("/jobs");
  }, [loadingCreateJob]);
  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />;
  }
  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to={"/jobs"} />;
  }

  return (
    <div>
      <BlurIn word={"Post a job"} />
      <form className="m-4 p-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Job Title"
          {...register("title")}
          className="m-4"
        />
        {errors?.title && (
          <p className="text-red-500">{errors?.title?.message}</p>
        )}
        <Textarea
          placeholder="Job Description"
          {...register("description")}
          className="m-4"
        />
        {errors?.description && (
          <p className="text-red-500">{errors?.description?.message}</p>
        )}
        <div className="flex gap-4 items-center">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Filter By Location"
                value={field.value}
                onChange={field.onChange}
                width={"fit-content"}
                className="mt-2"
                bg={"transparent"}
              >
                {State?.getAllStates("IN")
                  ?.filter(({ countryCode }) => countryCode === "IN")
                  .map(({ name }) => {
                    return (
                      <option value={name} key={name} className="text-black">
                        {name}
                      </option>
                    );
                  })}
              </Select>
            )}
          />
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Filter By Company"
                value={field.value}
                onChange={field.onChange}
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
            )}
          />
          {/* <AddCompanyDrawer fetchCompanies={fnCompanies} /> */}
        </div>
        <div className="flex">
          {errors?.location && (
            <p className="text-red-500">{errors?.location?.message}</p>
          )}
          {errors?.company_id && (
            <p className="text-red-500 ms-20">{errors?.company_id?.message}</p>
          )}
        </div>
        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor
              value={field.value}
              onChange={field.onChange}
              className="mt-4 bg-transparent text-white"
            />
          )}
        />

        {errors?.requirements && (
          <p className="text-red-500">{errors?.requirements?.message}</p>
        )}
        {errorCreateJob?.message && (
          <p className="text-red-500">{errorCreateJob?.message}</p>
        )}
        {loadingCreateJob && (
          <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />
        )}
        <div className="flex align-middle justify-center">
          <button
            type="submit"
            className="mt-4 bg-blue-600 p-2 w-[50%] rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobs;
