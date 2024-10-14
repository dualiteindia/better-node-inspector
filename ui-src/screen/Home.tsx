import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ExpandableProperty from "../Components/ExpandableProperty";
import EmptyNode from "../Components/EmptyNode";

function getChildren() {
  console.log("Getting children");
  parent.postMessage({ pluginMessage: { type: "get-children" } }, "*");
}

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(""); // State to store selected value

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value); // Update state with selected value
    getChildren();
  };

  const [nodeData, setNodeData] = useState({});
  const [children, setChildren] = useState([]);

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage;

      console.log("Data received: ", data);

      // if (type === "no-selection" || type === "frame") {
      //   setNodeData(data);
      // }

      if (type === "children") {
        console.log("Children received: ", data);
        setChildren(data);
      }
    };
  }, [selectedOption]);
  return (
    <div>
      <div className="h-screen w-screen  ">
        <Navbar selectionName={""} />
        <ExpandableProperty propertyName={""}>children</ExpandableProperty>
        <EmptyNode />
        <Footer />
      </div>

      {/* <p>{JSON.stringify(nodeData)}</p> */}
      <p>{JSON.stringify(children)}</p>
    </div>
  );
};

export default Home;

// {
//   <Link to="/rectangle">Navigate to app</Link>;
// }
