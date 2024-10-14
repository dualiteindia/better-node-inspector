import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ExpandableProperty from "../Components/ExpandableProperty";
import EmptyNode from "../Components/EmptyNode";

// function getChildren() {
//   console.log("Getting children");
//   parent.postMessage({ pluginMessage: { type: "get-children" } }, "*");
// }

const Home = () => {
  // const [selectedOption, setSelectedOption] = useState(""); // State to store selected value

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedOption(event.target.value); // Update state with selected value
  //   getChildren();
  // };

  interface NodeData {
    fillProperties: any; // Adjust the type as needed
    commonProperties: any; // Adjust the type as needed
    remaining: any; // Adjust the type as needed
  }

  const [nodeData, setNodeData] = useState<NodeData[]>([]);
  const [children, setChildren] = useState([]);
  const [nodeName, setNodeName] = useState("");

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage;

      if (type === "no-selection" || type === "frame" || type === "section") {
        setNodeData(data);
        setNodeName(data[1].commonProperties[0].name);
      }

      if (type === "children") {
        console.log("Children received: ", data);
        setChildren(data);
      }
    };
  }, []);

  return (
    <div className="h-screen w-screen  ">
      <Navbar selectionName={nodeName} />
      {Object.keys(nodeData).length === 0 ? (
        <EmptyNode />
      ) : (
        <div>
          <ExpandableProperty propertyName={"General Properties"}>
            {JSON.stringify(nodeData[0])}
          </ExpandableProperty>

          <ExpandableProperty propertyName={"Positional Properties"}>
            {JSON.stringify(nodeData[0])}
          </ExpandableProperty>

          <ExpandableProperty propertyName={"Flex/AutoLayout Properties"}>
            {JSON.stringify(nodeData[0])}
          </ExpandableProperty>

          <ExpandableProperty propertyName={"Fill Properties"}>
            {JSON.stringify(nodeData[0])}
          </ExpandableProperty>

          <ExpandableProperty propertyName={"Children"}>
            {JSON.stringify(nodeData[0])}
          </ExpandableProperty>
        </div>
      )}
      {/* <p>{JSON.stringify(nodeData)}</p> */}
      {/* <p>{JSON.stringify(children)}</p> */}
      <Footer />
    </div>
  );
};

export default Home;

// {
//   <Link to="/rectangle">Navigate to app</Link>;
// }
