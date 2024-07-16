import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import Login from "./pages/Login";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <Dashboard/>
        },
        {
          path: '/products',
          element: <Products/>
        },
      ]
    },
    {
      path: '/login',
      element: <Login/>,
    }
  ])

  return <RouterProvider router={router} />;
}

export default App;