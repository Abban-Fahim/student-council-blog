import { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import MainPage from "./Pages/Main-page";
import logo from "./Images/AUSLogo.png";
import AboutPage from "./Pages/About-page";
import PostPage from "./Pages/Post-Page";
import NewPost from "./Pages/New-post";
import ExhibitionPage from "./Pages/Exhibition-page";

function App() {
  const [sidebarVisisble, setSideBarVisible] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const toggleSidebar = () => {
    sidebarVisisble ? setSideBarVisible(false) : setSideBarVisible(true);
  };

  return (
    <div id={theme}>
      <div id="sidebar" className={sidebarVisisble ? "open" : "closed"}>
        <button onClick={toggleSidebar} id="close" className="btn btn-lg">
          <i className="bi bi-x-lg"></i>
        </button>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/exhibition">Exhibition</Link>
          <Link to="#">Page #3</Link>
        </ul>
        <button
          onClick={toggleSidebar}
          className="btn btn-outline-primary fs-3"
          id="menu"
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
      <header className="d-flex justify-content-between align-items-center p-3">
        <div class="d-flex align-items-center ms-5">
          <img src={logo} alt="Arab Unity Logo" width="75px" height="75px" />
          <h3 className="d-inline text-primary">
            AUS Student Council Blog or Something?
          </h3>
        </div>
        <button
          onClick={toggleTheme}
          className="btn btn-outline-secondary fs-3"
        >
          <i className={`bi bi-${theme === "light" ? "sun" : "moon"}-fill`}></i>
        </button>
      </header>
      <Switch>
        <Route path="/about" children={<AboutPage />} />
        <Route path="/exhibition" children={<ExhibitionPage />} />
        <Route path="/admin/new" children={<NewPost />} />
        <Route path="/post/:postID" children={<PostPage />} />
        <Route path="/" children={<MainPage />} />
      </Switch>
      <footer className="bg-primary p-3 d-flex">
        LInks to AUS instagram,facebook...
      </footer>
    </div>
  );
}

export default App;
