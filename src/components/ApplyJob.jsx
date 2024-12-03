// /* eslint-disable react/prop-types */
// import {
//   Button,
//   Drawer,
//   DrawerBody,
//   DrawerContent,
//   DrawerHeader,
//   DrawerOverlay,
//   Input,
//   RadioGroup,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { z } from "zod";
// import useFetch from "../hooks/useFetch";
// import { applyToJob } from "../api/apiApplications";
// import { BarLoader } from "react-spinners";
// const schema = z.object({
//   experience: z
//     .number()
//     .min(0, { message: "Experience must be at least 0" })
//     .int(),
//   skills: z.string().min(1, { message: "Skill are required " }),
//   education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
//     message: "Education is required",
//   }),
//   resume: z
//     .any()
//     .refine(
//       (file) =>
//         (file[0] && file[0].type === "application/pdf") ||
//         file[0].type === "application/msword ",
//       {
//         message: "Only pdf and word document are allowed",
//       }
//     ),
// });
// const ApplyJobDrawer = ({ user, applied, job, fetchjob }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(schema),
//   });
//   const {
//     loading: loadingApply,
//     error: errorApply,
//     fn: fnApply,
//   } = useFetch(applyToJob);

//   const onsubmit = (data) => {
//     fnApply({
//       ...data,
//       job_id: job.id,
//       candidate_id: user.id,
//       name: user.fullName,
//       status: "applied",
//       resume: data.resume[0],
//     }).then(() => {
//       fetchjob(), reset();
//     });
//   };
//   return (
//     <div>
//       <div className="flex justify-center">
//         <Button
//           w={"70%"}
//           colorScheme={`${job?.isOpen && !applied ? "blue" : "white"}`}
//           disabled={!job?.isOpen || applied}
//           onClick={onOpen}
//         >
//           {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
//         </Button>
//       </div>

//       <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerHeader borderBottomWidth="1px">
//             Applied for {job?.title} at {job?.company?.name}
//             <p className="text-gray-500 text-lg">Please fill the form below</p>
//           </DrawerHeader>

//           <DrawerBody>
//             <form
//               onSubmit={handleSubmit(onsubmit)}
//               className=" flex flex-col gap-4  p-4 pb-0"
//             >
//               {errors.experience && (
//                 <p className="text-red-500">{errors.experience.message}</p>
//               )}
//               <Input
//                 type="number"
//                 placeholder="Years Of Experience"
//                 className="flex-1"
//                 {...register("experience", {
//                   valueAsNumber: true,
//                 })}
//               />
//               {errors.skills && (
//                 <p className="text-red-500">{errors.skills.message}</p>
//               )}
//               <Input
//                 type="text"
//                 placeholder="Skills (Comma Separated)"
//                 className="flex-1"
//                 {...register("skills", {
//                   valueAsNumber: true,
//                 })}
//               />
//             </form>
//             <Controller
//               name="control"
//               control={control}
//               render={({ field }) => {
//                 return (
//                   <RadioGroup
//                     className="ms-8 mt-4"
//                     onValueChange={field.onChange}
//                     {...field}
//                   >
//                     <div>
//                       <input
//                         type="radio"
//                         id="intermediate"
//                         value="intermediate"
//                       />
//                       <label className="ms-1" htmlFor="intermediate">
//                         Intermediate
//                       </label>
//                     </div>
//                     <div>
//                       <input type="radio" id="Graduate" value="Graduate" />
//                       <label className="ms-1" htmlFor="Graduate">
//                         Graduate
//                       </label>
//                     </div>
//                     <div>
//                       <input
//                         type="radio"
//                         id="post-graduate"
//                         value="Post Graduate"
//                       />
//                       <label className="ms-1" htmlFor="post-graduate">
//                         Post Graduate
//                       </label>
//                     </div>
//                   </RadioGroup>
//                 );
//               }}
//             />

//             {/* <Controller
//               name="control"
//               control={control}
//               render={(field) => {
//                 <RadioGroup
//                   className="ms-8 mt-4"
//                   onValueChange={field.onChange}
//                   {...field}
//                 >
//                   <div>
//                     <input
//                       type="radio"
//                       id="intermediate"
//                       value="intermediate"
//                     />
//                     <label className="ms-1" htmlFor="intermediate">
//                       Intermediate
//                     </label>
//                   </div>
//                   <div>
//                     {" "}
//                     <input type="radio" id="Graduate" value="Graduate" />
//                     <label className="ms-1" htmlFor="Graduate">
//                       Graduate
//                     </label>
//                   </div>
//                   <div>
//                     {" "}
//                     <input
//                       type="radio"
//                       id="post-graduate"
//                       value="Post Graduate"
//                     />
//                     <label className="ms-1" htmlFor="post-graduate">
//                       Post Graduate
//                     </label>
//                   </div>
//                 </RadioGroup>;
//               }}
//             /> */}
//             {errors.education && (
//               <p className="text-red-500">{errors.education.message}</p>
//             )}
//             <input
//               type="file"
//               accept=".pdf, .doc, .docx"
//               className="flex-1  file:text-gray-500"
//               {...register("resume")}
//             />
//             {errors.resume && (
//               <p className="text-red-500">{errors.resume.message}</p>
//             )}
//             {errorApply?.message && (
//               <p className="text-red-500">{errorApply.message}</p>
//             )}
//             {loadingApply && (
//               <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />
//             )}
//             <button className="bg-blue-500 p-2 w-full text-white font-semibold m-2 rounded hover:bg-blue-400">
//               Apply
//             </button>
//             <Button
//               onClick={onClose}
//               className=" p-2 w-full  font-semibold m-2 rounded"
//             >
//               Cancel
//             </Button>
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </div>
//   );
// };

// export default ApplyJobDrawer;

/* eslint-disable react/prop-types */
// import {
//   Button,
//   Drawer,
//   DrawerBody,
//   DrawerContent,
//   DrawerHeader,
//   DrawerOverlay,
//   Input,
//   RadioGroup,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import useFetch from "../hooks/useFetch";
// import { applyToJob } from "../api/apiApplications";
// import { BarLoader } from "react-spinners";

// const schema = z.object({
//   experience: z
//     .number()
//     .min(0, { message: "Experience must be at least 0" })
//     .int(),
//   skills: z.string().min(1, { message: "Skill are required " }),
//   education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
//     message: "Education is required",
//   }),
//   resume: z
//     .any()
//     .refine(
//       (file) =>
//         (file[0] && file[0].type === "application/pdf") ||
//         file[0].type === "application/msword ",
//       {
//         message: "Only pdf and word document are allowed",
//       }
//     ),
// });

// const ApplyJobDrawer = ({ user, applied, job, fetchjob }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(schema),
//   });
//   const {
//     loading: loadingApply,
//     error: errorApply,
//     fn: fnApply,
//   } = useFetch(applyToJob);

//   const onsubmit = (data) => {
//     fnApply({
//       ...data,
//       job_id: job.id,
//       candidate_id: user.id,
//       name: user.fullName,
//       status: "applied",
//       resume: data.resume[0],
//     })
//       .then(() => {
//         // Reset the form values after successful submission
//         reset(); // Clears the form fields
//         fetchjob(); // Fetch the updated job details (optional)
//         onClose(); // Close the drawer after form submission
//       })
//       .catch((error) => {
//         console.error("Error applying for job:", error);
//         // Handle any error (e.g., show an error message)
//       });
//   };

//   return (
//     <div>
//       <div className="flex justify-center">
//         <Button
//           w={"70%"}
//           colorScheme={`${job?.isOpen && !applied ? "blue" : "white"}`}
//           disabled={!job?.isOpen || applied}
//           onClick={onOpen}
//         >
//           {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
//         </Button>
//       </div>

//       <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerHeader borderBottomWidth="1px">
//             Applied for {job?.title} at {job?.company?.name}
//             <p className="text-gray-500 text-lg">Please fill the form below</p>
//           </DrawerHeader>

//           <DrawerBody>
//             <form
//               onSubmit={handleSubmit(onsubmit)}
//               className="flex flex-col gap-4 p-4 pb-0"
//             >
//               {/* Experience */}
//               {errors.experience && (
//                 <p className="text-red-500">{errors.experience.message}</p>
//               )}
//               <Input
//                 type="number"
//                 placeholder="Years Of Experience"
//                 className="flex-1"
//                 {...register("experience", {
//                   valueAsNumber: true,
//                 })}
//               />

//               {/* Skills */}
//               {errors.skills && (
//                 <p className="text-red-500">{errors.skills.message}</p>
//               )}
//               <Input
//                 type="text"
//                 placeholder="Skills (Comma Separated)"
//                 className="flex-1"
//                 {...register("skills")}
//               />

//               {/* Education */}
//               <Controller
//                 name="education"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     className="ms-8 mt-4"
//                     onChange={field.onChange}
//                     value={field.value}
//                   >
//                     <div>
//                       <input
//                         type="radio"
//                         id="intermediate"
//                         value="Intermediate"
//                       />
//                       <label className="ms-1" htmlFor="intermediate">
//                         Intermediate
//                       </label>
//                     </div>
//                     <div>
//                       <input type="radio" id="Graduate" value="Graduate" />
//                       <label className="ms-1" htmlFor="Graduate">
//                         Graduate
//                       </label>
//                     </div>
//                     <div>
//                       <input
//                         type="radio"
//                         id="post-graduate"
//                         value="Post Graduate"
//                       />
//                       <label className="ms-1" htmlFor="post-graduate">
//                         Post Graduate
//                       </label>
//                     </div>
//                   </RadioGroup>
//                 )}
//               />
//               {errors.education && (
//                 <p className="text-red-500">{errors.education.message}</p>
//               )}

//               {/* Resume */}
//               <input
//                 type="file"
//                 accept=".pdf, .doc, .docx"
//                 className="flex-1 file:text-gray-500"
//                 {...register("resume")}
//               />
//               {errors.resume && (
//                 <p className="text-red-500">{errors.resume.message}</p>
//               )}

//               {/* Error from Apply API */}
//               {errorApply?.message && (
//                 <p className="text-red-500">{errorApply.message}</p>
//               )}

//               {/* Loader when submitting */}
//               {loadingApply && (
//                 <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />
//               )}

//               {/* Apply Button */}
//               <button
//                 type="submit"
//                 className="bg-blue-500 p-2 w-full text-white font-semibold m-2 rounded hover:bg-blue-400"
//               >
//                 Apply
//               </button>

//               {/* Cancel Button */}
//               <Button
//                 onClick={onClose}
//                 className="p-2 w-full font-semibold m-2 rounded"
//               >
//                 Cancel
//               </Button>
//             </form>
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </div>
//   );
// };

// export default ApplyJobDrawer;

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
