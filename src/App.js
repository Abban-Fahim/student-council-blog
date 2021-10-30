import { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import MainPage from "./Pages/Main-page";
import AboutPage from "./Pages/About-page";
import PostPage from "./Pages/Post-Page";
import NewPost from "./Pages/New-post";
import ExhibitionPage from "./Pages/Exhibition-page";
import Login from "./Pages/Login";

function App() {
  const [sidebarVisisble, setSideBarVisible] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const toggleSidebar = () => {
    sidebarVisisble ? setSideBarVisible(false) : setSideBarVisible(true);
  };

  const [buttonHovering, setBtnHovering] = useState(null);

  function handleHover(e) {
    setBtnHovering(e.target.innerHTML.toLowerCase());
  }

  useEffect(() => {
    const date = Date.now();
    let keyStr = window.localStorage.getItem("isAdmin");
    if (keyStr) {
      let key = JSON.parse(keyStr);
      console.log(key);
      if (date < key.expiry) setIsAdmin(true);
    }
  }, []);

  function handleHoverOut() {
    setBtnHovering(null);
  }

  return (
    <div id={theme}>
      <div id="sidebar" className={sidebarVisisble ? "open" : "closed"}>
        <button onClick={toggleSidebar} id="close" className="btn btn-lg">
          <i className="bi bi-x-lg"></i>
        </button>
        <ul>
          <Link
            onClick={toggleSidebar}
            onMouseOver={handleHover}
            onMouseLeave={handleHoverOut}
            to="/"
            className="blue"
          >
            Home
          </Link>
          <Link
            onClick={toggleSidebar}
            onMouseOver={handleHover}
            onMouseLeave={handleHoverOut}
            to="/about"
            className="purple"
          >
            About us
          </Link>
          <Link
            onClick={toggleSidebar}
            onMouseOver={handleHover}
            onMouseLeave={handleHoverOut}
            to="/exhibition"
            className="orange"
          >
            Exhibition
          </Link>
          {isAdmin ? (
            <Link
              onClick={toggleSidebar}
              onMouseOver={handleHover}
              onMouseLeave={handleHoverOut}
              to="/admin/new"
              className="green"
            >
              New article
            </Link>
          ) : null}
          <div id="sidebar-img" className={buttonHovering ? "visible" : null}>
            <img
              src={buttonHovering ? "img/" + buttonHovering + ".png" : null}
              width="100%"
              alt={buttonHovering}
              className={buttonHovering ? "visible" : null}
            />
          </div>
        </ul>
        <button
          onClick={toggleSidebar}
          className="btn text-primary fs-3"
          id="menu"
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
      <header className="d-flex justify-content-end align-items-center p-3">
        <div className="text-center" id="logo">
          <img src="img/AUSLogo.png" alt="Arab Unity Logo" />
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
        <Route path="/admin/new" children={<NewPost />} />
        <Route path="/exhibition" children={<ExhibitionPage />} />
        <Route
          path="/login"
          children={<Login isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        />
        <Route path="/admin" />
        <Route path="/post/:postID" children={<PostPage />} />
        <Route path="/" children={<MainPage />} />
      </Switch>
      <footer className="bg-primary d-flex">
        <i className="bi bi-instagram"></i>
        <i className="bi bi-facebook"></i>
        <i className="bib bi-web"></i>
      </footer>
    </div>
  );
}

export default App;
