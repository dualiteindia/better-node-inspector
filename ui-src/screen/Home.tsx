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
  const [message, setMesssage] = useState("me");

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage;

      console.log("Type: ", type); // works

      if (type === "no-selection" || type === "node-selected") {
        setMesssage(type); // not working
        setNodeData(data);
        setNodeName(data.commonProperties[0].name);
        console.log("Message", message);
      }

      if (type === "children") {
        console.log("Children received: ", data);
        setChildren(data);
        console.log("Children on ui: ", children);
      }
    };
  }, []);

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
              {JSON.stringify(nodeData?.commonProperties)}
            </ExpandableProperty>

            <ExpandableProperty propertyName={"Positional Properties"}>
              {JSON.stringify("")}
            </ExpandableProperty>

            <ExpandableProperty propertyName={"Flex/AutoLayout Properties"}>
              {JSON.stringify("")}
            </ExpandableProperty>

            <ExpandableProperty propertyName={"Fill Properties"}>
              {JSON.stringify(nodeData?.fillProperties)}
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
