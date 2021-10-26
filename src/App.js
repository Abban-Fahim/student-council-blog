 import { useState } from "react";
import {Switch, Route} from "react-router-dom"
import MainPage from "./Pages/Main-page";
import logo from "./Images/AUSLogo.png"
import AboutPage from "./Pages/About-page";

function App() {
  const [sidebarVisisble, setSideBarVisible] = useState(false)
  return (
    <div>
        <div id="sidebar" style={{left: sidebarVisisble?0:'-100vw'}}>
          <button onClick={()=>setSideBarVisible(false)} className="btn btn-lg"><i className="bi bi-x-lg"></i></button>
        <ul>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="#">Page #2</a>
          <a href="#">Page #3</a>
        </ul>
      </div>
      <header className="d-flex justify-content-between align-items-center p-3">
            <button onClick={()=>setSideBarVisible(true)} className="btn btn-outline-primary fs-3"><i className="bi bi-list"></i></button>
            <div class="d-flex align-items-center">
                <img src={logo} alt="Arab Unity Logo" width="75px" height="75px" />
                <h3 className="d-inline text-primary">AUS Student Council Blog or Something?</h3>
            </div>
            <button className="btn btn-outline-secondary fs-3"><i className="bi bi-moon-fill"></i></button>
      </header>
      <Switch>
      <Route path="/about" children={<AboutPage />} />
      <Route path="/" children={<MainPage />} />
    </Switch>
    </div>
    
  );
}

export default App;
