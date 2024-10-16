import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ExpandableProperty from "../Components/ExpandableProperty";
import EmptyNode from "../Components/EmptyNode";
// import { plugin } from "../Utils/plugin";

const Home = () => {
  interface NodeData {
    fillProperties: [];
    commonProperties: [];
    layoutProperties: [];
    postionalProperties: [];
    remaining: [];
  }

  const [nodeData, setNodeData] = useState<NodeData>({
    fillProperties: [],
    commonProperties: [],
    layoutProperties: [],
    postionalProperties: [],
    remaining: [],
  });
  // const [children, setChildren] = useState<NodeData[]>([
  //   {
  //     fillProperties: [],
  //     commonProperties: [],
  //     remaining: [],
  //   },
  // ]);
  const [children, setChildren] = useState<string>("");
  const [nodeName, setNodeName] = useState("");
  const [message, setMesssage] = useState("no-selection");

  async function getChildren() {
    parent.postMessage({ pluginMessage: { type: "get-children" } }, "*");
    // const res = await plugin.get("get-children", "children");
    // console.log("res", res);
  }

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, value, children } = event.data.pluginMessage;
      if (value === undefined) {
        if (type === "no-selection") {
          setMesssage(type);
          setNodeName("");
        }
        return;
      }

      const data = JSON.parse(value);

      if (type === "node-selected") {
        setMesssage(type);
        setNodeData(data);
        setNodeName(data?.commonProperties[0].name);
        setChildren(children);
      }

      if (type === "children") {
        // console.log("Children received: ", value);
        setChildren(value);
      }
    };
  }, [message]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-3">
        <Navbar selectionName={nodeName} />
      </div>
      <div className="flex-grow overflow-auto">
        {message === "no-selection" ? (
          <div className="flex justify-center items-center h-full">
            <EmptyNode />
          </div>
        ) : (
          <div className="mt-6 flex-grow scrollbar-hide w-full">
            <ExpandableProperty propertyName={"General Properties"}>
              {JSON.stringify(nodeData?.commonProperties, null, 2)}
            </ExpandableProperty>

            <ExpandableProperty propertyName={"Positional Properties"}>
              {JSON.stringify(nodeData?.postionalProperties, null, 2)}
            </ExpandableProperty>

            <ExpandableProperty propertyName={"Flex/AutoLayout Properties"}>
              {JSON.stringify(nodeData?.layoutProperties, null, 2)}
            </ExpandableProperty>

            <ExpandableProperty propertyName={"Fill Properties"}>
              {JSON.stringify(nodeData?.fillProperties, null, 2)}
            </ExpandableProperty>

            <ExpandableProperty
              propertyName={"Children"}
              loadChildren={getChildren}
            >
              {children}
            </ExpandableProperty>

            <ExpandableProperty propertyName={"Remaining Properties"}>
              {JSON.stringify(nodeData?.remaining, null, 2)}
            </ExpandableProperty>
          </div>
        )}
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
