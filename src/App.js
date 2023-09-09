import Login from './components/login';
import Signin from './components/Signin';
import Mainpage from './components/Mainpage';
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";



const App = () => {
  return (
    <>
      <BrowserRouter>
   
        <Routes>
        <Route path="/mainpage" element={<Mainpage/>}/>
  <Route path="/" element={<Login/>}/>
  <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
