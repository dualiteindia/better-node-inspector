import "./App.css";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Home from "./screen/Home";
import Splash from "./screen/Splash";
import StoreProvider from "./StoreProvider";

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
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
