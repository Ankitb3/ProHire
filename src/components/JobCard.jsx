/* eslint-disable react/prop-types */
import { Button, Card, CardBody, CardFooter, Text } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { CardContent, CardDescription } from "./ui/card";
import { Heart, MapPinIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { saveJobs } from "../api/apiJobs";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

const JobCard = ({
  job,
  isMyJob = false,
  savedInt = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInt);
  console.log(saved, "saved josb");

  const {
    fn: fnSavedJobs,
    data: SavedJobs,
    loading: loadingSavedJobs,
  } = useFetch(saveJobs, {
    alreadySaved: saved,
  });
  const { user } = useUser();
  useEffect(() => {
    if (saveJobs !== undefined) {
      setSaved(SavedJobs?.length > 0);
    }
  }, [SavedJobs]);
  const handleSavedjobs = async () => {
    await fnSavedJobs({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };
  return (
    <div>
      <Card
        variant={"funky"}
        bgColor={"transparent"}
        border={"1px solid white"}
        textColor={"white"}
        margin={"2px"}
      >
        <CardBody className=" bg-transparent">
          <Text className="text-white text-2xl">{job?.title}</Text>
        </CardBody>
        <CardContent>
          <div className="flex justify-between">
            {job.company && <img src={job.company.logo_url} className="h-6" />}
            <div className="flex items-center gap-2">
              <MapPinIcon size={15} />
              {job.location}
            </div>
          </div>

          <CardDescription>
            <p className="text-white text-lg mt-10">
              {job.description.substring(0, job.description.indexOf("."))}
            </p>
          </CardDescription>
        </CardContent>
        <CardFooter className="  w-full flex justify-between items-center">
          <Link to={`/job/${job.id}`} className="flex gap-2">
            <Button colorScheme={"blue"} className="w-full">
              More Details
            </Button>
          </Link>
          {!isMyJob && (
            <Button
              bgColor={"transparent"}
              border={"1px solid grey"}
              _hover={{
                bgColor: "transparent",
              }}
              onClick={handleSavedjobs}
              disabled={loadingSavedJobs}
            >
              {saved ? (
                <Heart
                  size={30}
                  fill="red"
                  stroke="red"
                  color="white"
                  className="hover:bg-none"
                />
              ) : (
                <Heart size={30} color="white" className="hover:bg-none" />
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobCard;
