import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Navbar/>
      <Footer/>

    </div>
  );
};

export default Home

{/* <Link to="/rectangle">Navigate to app</Link> */}
