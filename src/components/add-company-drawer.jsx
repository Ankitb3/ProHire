import { addNewCompany } from "../api/apiCommpanies";
import useFetch from "../hooks/useFetch";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  resume: z.any().refine((file) => {
    file[0] &&
      (file[0]?.type === "image/png" || file[0]?.type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      };
  }),
});
const AddCompanyDrawer = ({ fetchCompanies }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);
  const onSubmit = (data) => {
    fnAddCompany({ ...data, logo: data?.logo[0] });
  };
  useEffect(() => {
    if (dataAddCompany?.length > 0) fetchCompanies();
  }, [loadingAddCompany]);
  return (
    <div>
      <Button
        onClick={onOpen}
        bg={"transparent"}
        color={"white"}
        size={"sm"}
        variant={"secondary"}
        className="border bg-slate-900"
      >
        Add Company
      </Button>
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Add a new company
            <p className="text-gray-500 text-lg">Please fill the form below</p>
          </DrawerHeader>

          <DrawerBody>
            <form className="flex flex-col gap-4 p-4 pb-0">
              <input placeholder="Company name" {...register("name")} />
              <input
                type="file"
                accept="image/*"
                className="flex-1 file:text-gray-500"
                {...register("logo")}
              />
              {/* {errors.resume && (
                  <p className="text-red-500">{errors.resume.message}</p>
                )} */}
              {/* Error from Apply API */}
              {/* Apply Button */}
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="bg-red-500 p-2 text-white font-semibold m-2 rounded"
              >
                Add
              </button>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              {errors.logo && (
                <p className="text-red-500">{errors.logo.message}</p>
              )}
              {errorAddCompany?.message && (
                <p className="text-red-500">{errorAddCompany?.message}</p>
              )}
              {loadingAddCompany && (
                <BarLoader className="mb-4" width={"100%"} color="#FF99FF" />
              )}
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

export default AddCompanyDrawer;
