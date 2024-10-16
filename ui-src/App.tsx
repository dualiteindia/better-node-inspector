import "./App.css";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Home from "./screen/Home";
import Splash from "./screen/Splash";

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
  return <RouterProvider router={router} />;
}

export default App;
