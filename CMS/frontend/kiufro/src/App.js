
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Render from "./components/render";
import Update from "./components/update";

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
              <Route path="/home" element= { <Home/>} />
              <Route path="/render" element={<Render/>}/>
             <Route path="/update/:id" element={<Update/>}/>
              <Route path="/" element= { <Login/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
