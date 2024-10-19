import "./App.css";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Home from "./screen/Home";
import Splash from "./screen/Splash";
import { useEffect } from "react";

const routes = [
  // {
  //   path: "/",
  //   element: <Splash />,
  // },
  {
    path: "/",
    element: <Home />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
  initialIndex: 0,
});

function App() {
  // useEffect(() => {
  //   window.onmessage = (event) => {
  //     const { type, value } = event.data.pluginMessage;
  //     if (type === "prod-mode") {
  //       console.log(value);
  //     }
  //   };
  // }, []);
  // try {
  //   const prodStuffUI = () => {
  //     const modeFromEnv = import.meta.env.VITE_DUALITE_MODE as string;
  //     console.log("modeFromEnv", modeFromEnv);
  //     if (modeFromEnv !== "prod") {
  //       return; // we're not in prod
  //     }
  //     console.log = () => {};
  //     parent.postMessage({ pluginMessage: { type: "the-mode" } }, "*");
  //   };

  //   prodStuffUI();
  // } catch (e) {
  //   console.log("Error in App", e);
  // }
  return <RouterProvider router={router} />;
}

export default App;
