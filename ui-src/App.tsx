import "./App.css";
// import { RouterProvider, createMemoryRouter } from "react-router-dom";
// import Rectangle from "./screen/Rectangle";
// import Home from "./screen/Home";
// import Splash from "./screen/Splash";
// import StoreProvider from "./StoreProvider";

// const routes = [
//   {
//     path: "/",
//     element: <Splash />,
//   },
//   {
//     path: "/home",
//     element: <Home />,
//   },
//   {
//     path: "/rectangle",
//     element: <Rectangle />,
//   },
// ];

// const router = createMemoryRouter(routes, {
//   initialEntries: ["/"],
//   initialIndex: 0,
// });

// function App() {
//   return (
//     <StoreProvider>
//       <RouterProvider router={router} />
//     </StoreProvider>
//   );
// }

// export default App;

// my code

import { useEffect, useState } from "react";

function getChildren() {
  console.log("Getting children");
  parent.postMessage({ pluginMessage: { type: "get-children" } }, "*");
}

function App() {

  const [nodeData, setNodeData] = useState({});
  const [children, setChildren] = useState([]);

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage;

      // console.log("Data received: ", data);

      if (type === "no-selection" || type === "frame") {
        setNodeData(data);
      }

      if (type === "children") {
        console.log("Children received: ", data);
        setChildren(data);
      }
    };
  }, []);
  return (
    <div>
      <h1>Hello world</h1>
      <p>{JSON.stringify(nodeData)}</p>
      <button onClick={getChildren}>Click</button>
      <p>{JSON.stringify(children)}</p>
    </div>
  );
}

export default App;
