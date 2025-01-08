import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Components/Home';
import Stream from './Components/Stream';

const router = createBrowserRouter([

  {
    path: "/",
    element : <Home/>

  },

  {
    path: "/stream",
    element : <Stream/>
  },

])

function App() {
  return (
    <RouterProvider router={router}/> 
  );
}

export default App;
