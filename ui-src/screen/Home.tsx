import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ExpandableProperty from "../Components/ExpandableProperty";
import EmptyNode from "../Components/EmptyNode";

function getChildren() {
  // console.log("Getting children");
  parent.postMessage({ pluginMessage: { type: "get-children" } }, "*");
}

const Home = () => {
  interface NodeData {
    fillProperties: [];
    commonProperties: [];
    remaining: [];
  }

  const [nodeData, setNodeData] = useState<NodeData>({
    fillProperties: [],
    commonProperties: [],
    remaining: [],
  });
  const [children, setChildren] = useState<NodeData[]>([
    {
      fillProperties: [],
      commonProperties: [],
      remaining: [],
    },
  ]);
  const [nodeName, setNodeName] = useState("");
  const [message, setMesssage] = useState("no-selection");

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage;

      if (type === "no-selection") {
        setMesssage(type);
        setNodeData(data);
        setNodeName("");
      }

      if (type === "node-selected") {
        setMesssage(type);
        setNodeData(data);
        setNodeName(data?.commonProperties[0].name);
      }

      if (type === "children") {
        console.log("Children received: ", data);
        setChildren(data);
        console.log("Children on ui: ", children);
      }
    };
  }, [message]);

  return (
    <div className="h-full w-screen flex flex-col">
      <div className="p-3">
        <Navbar selectionName={nodeName} />
      </div>
      <div className="h-full">
        {message === "no-selection" ? (
          <div className="flex justify-center items-center h-full">
            <EmptyNode />
          </div>
        ) : (
          <div className="mt-6">
            <ExpandableProperty propertyName={"General Properties"}>
              {JSON.stringify(nodeData?.commonProperties, null, 2)}
            </ExpandableProperty>

            <ExpandableProperty propertyName={"Positional Properties"}>
              {JSON.stringify("")}
            </ExpandableProperty>

            <ExpandableProperty propertyName={"Flex/AutoLayout Properties"}>
              {JSON.stringify("")}
            </ExpandableProperty>

            <ExpandableProperty propertyName={"Fill Properties"}>
              {JSON.stringify(nodeData?.fillProperties, null, 2)}
            </ExpandableProperty>

            <ExpandableProperty
              propertyName={"Children"}
              loadChildren={getChildren}
            >
              {JSON.stringify(children)}
            </ExpandableProperty>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

// {
//   <Link to="/rectangle">Navigate to app</Link>;
// }
