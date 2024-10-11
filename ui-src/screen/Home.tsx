import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div>
        <h5 className="flex h-full w-full justify-center items-center">Dualite + Figma Boilerplate App</h5>
        <p>A simple app to combining Plugin Boilerplate.</p>
        <p>
          <Link to="/rectangle">Navigate to app</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
