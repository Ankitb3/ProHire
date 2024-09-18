import { Outlet } from "react-router-dom";
import bgImage from "../assets/bg-img.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
const AppLayouts = () => {
  return (
    <div
      className={`bg-cover bg-center min-h-screen text-white`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default AppLayouts;
