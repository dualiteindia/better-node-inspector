import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Property from "../Components/Property";

const Home = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar selectionName="" />
      <Property/>
      <Footer />
    </div>
  );
};

export default Home;

{
  /* <Link to="/rectangle">Navigate to app</Link> */
}
