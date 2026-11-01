import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Browse from "./components/Browse";
import Login from "./components/Login";
import appStore from "./utils/appStore";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#333", color: "#fff" },
        }}
      />
    </Provider>
  );
}

export default App;
