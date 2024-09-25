import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import companies from "../Data/companies.json";
import faq from "../Data/Faq.json";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import banner from "../../public/companies/banner.png";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import BlurIn from "../components/magicui/blur-in";
const Landing = () => {
  return (
    <main>
      <section className=" text-center mt-10">
        {/* <h1 className="text-6xl">Find Your Dream Job</h1>
        <span className="text-6xl">And Get Hired</span> */}
        <BackgroundBeamsWithCollision>
          <h2 className="text-2xl flex flex-col  relative z-0 md:text-4xl lg:text-7xl font-bold text-center text-white dark:text-white font-sans tracking-tight">
            <span>
              <BlurIn word={"Find Your Dream Job"} />{" "}
            </span>
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span className=""> And Get Hired</span>
              </div>
            </div>
          </h2>
        </BackgroundBeamsWithCollision>
      </section>
      <div className="flex justify-center gap-6 mt-10">
        <Link to="/jobs">
          <Button colorScheme={"blue"} className="p-4 w-48">
            Find Jobs
          </Button>
        </Link>
        <Link to="/job-post">
          <Button colorScheme={"red"} className="p-4 w-48">
            Post Jobs
          </Button>
        </Link>
      </div>
      <div className="flex justify-center mt-10">
        <Carousel
          className="w-[90%] py-10 "
          plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
        >
          <CarouselContent className="flex gap-20 item-center">
            {companies.map((name, id) => {
              return (
                <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                  <img
                    src={name.path}
                    alt="paths"
                    className="h-9 sm:h-14 object-contain"
                  />
                </CarouselItem>
              );
            })}
            {/* <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            12121
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            12121
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            12121
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            12121
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            12121
          </CarouselItem> */}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex justify-center">
        <img src={banner} />
      </div>
      <section className="flex gap-4 m-4 ">
        <Card
          className="w-[50%] "
          variant={"outline"}
          style={{
            background: "transparent",
            color: "white",
          }}
        >
          <CardHeader className="bg-none">
            <Heading size="md">For Job Seekers</Heading>
          </CardHeader>
          <CardBody>
            <p>Search and apply for jobs, track applications, and more.</p>
          </CardBody>
        </Card>
        <Card
          className="w-[50%]"
          variant={"outline"}
          style={{
            background: "transparent",
            color: "white",
          }}
        >
          <CardHeader>
            <Heading size="md">For Employers</Heading>
          </CardHeader>
          <CardBody>
            <p>Post jobs, manage applications, and find the best candidates.</p>
          </CardBody>
        </Card>
      </section>
      {/* <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg border  dark:bg-black">
        <TextRevealByWord text="Believe in your abilities—ProHirred is here to help you shine in the job market!" />
      </div> */}
      {/* accordian  */}

      <section className="m-4 mt-10">
        <Accordion allowToggle>
          {faq.map((data, id) => {
            return (
              <AccordionItem key={id} isFocusable={true} border={"none"}>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      className="text-lg"
                    >
                      {data.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{data.answer}</AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </main>
  );
};

export default Landing;
