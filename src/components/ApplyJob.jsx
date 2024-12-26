import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  RadioGroup,
  Radio,
  useDisclosure,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useFetch from "../hooks/useFetch";
import { applyToJob } from "../api/apiApplications";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skill are required " }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        (file[0] && file[0].type === "application/pdf") ||
        file[0].type === "application/msword ",
      {
        message: "Only pdf and word document are allowed",
      }
    ),
});

const ApplyJobDrawer = ({ user, applied, job, fetchjob }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onsubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    })
      .then(() => {
        reset();
        fetchjob();
        onClose();
      })
      .catch((error) => {
        console.error("Error applying for job:", error);
      });
  };

  return (
    <div>
      <div className="flex justify-center">
        <Button
          w={"70%"}
          colorScheme={`${job?.isOpen && !applied ? "blue" : "red"}`}
          disabled={!job?.isOpen || applied}
          onClick={onOpen}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </div>

      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Applied for {job?.title} at {job?.company?.name}
            <p className="text-gray-500 text-lg">Please fill the form below</p>
          </DrawerHeader>

          <DrawerBody>
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="flex flex-col gap-4 p-4 pb-0"
            >
              {/* Experience */}
              {errors.experience && (
                <p className="text-red-500">{errors.experience.message}</p>
              )}
              <Input
                type="number"
                placeholder="Years Of Experience"
                className="flex-1"
                {...register("experience", {
                  valueAsNumber: true,
                })}
              />

              {/* Skills */}
              {errors.skills && (
                <p className="text-red-500">{errors.skills.message}</p>
              )}
              <Input
                type="text"
                placeholder="Skills (Comma Separated)"
                className="flex-1"
                {...register("skills")}
              />

              {/* Education */}
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    className=" mt-2 flex flex-col"
                    onChange={field.onChange} // React Hook Form controlled onChange
                    value={field.value} // React Hook Form value binding
                  >
                    <Radio value="Intermediate" className="ms-1">
                      Intermediate
                    </Radio>
                    <Radio value="Graduate" className="ms-1">
                      Graduate
                    </Radio>
                    <Radio value="Post Graduate" className="ms-1">
                      Post Graduate
                    </Radio>
                  </RadioGroup>
                )}
              />
              {errors.education && (
                <p className="text-red-500">{errors.education.message}</p>
              )}

              {/* Resume */}
              <input
                type="file"
                accept=".pdf, .doc, .docx"
                className="flex-1 file:text-gray-500"
                {...register("resume")}
              />
              {errors.resume && (
                <p className="text-red-500">{errors.resume.message}</p>
              )}

              {/* Error from Apply API */}
              {errorApply?.message && (
                <p className="text-red-500">{errorApply.message}</p>
              )}

              {/* Loader when submitting */}
              {loadingApply && (
                <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />
              )}

              {/* Apply Button */}
              <button
                type="submit"
                className="bg-blue-500 p-2 w-full text-white font-semibold m-2 rounded hover:bg-blue-400"
              >
                Apply
              </button>

              {/* Cancel Button */}
              <Button
                onClick={onClose}
                className="p-2 w-full font-semibold m-2 rounded"
              >
                Cancel
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ApplyJobDrawer;
