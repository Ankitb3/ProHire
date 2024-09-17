import { CircularProgress } from "@chakra-ui/react";

const App = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        <CircularProgress value={80} />{" "}
      </h1>
    </div>
  );
};

export default App;
