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

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    window.onmessage = (event) => {
      const { type, data } = event.data.pluginMessage;

      console.log(data);

      if (type === "selection-changed") {
        setData(data);
      }
    };
  }, []);
  return (
    <div>
      <h1>Hello world</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
