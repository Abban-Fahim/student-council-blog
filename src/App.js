import { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import MainPage from "./Pages/Main-page";
import AboutPage from "./Pages/About-page";
import PostPage from "./Pages/Post-Page";
import NewPost from "./Pages/New-post";
import ExhibitionPage from "./Pages/Exhibition-page";
import Login from "./Pages/Login";
import AdminPage from "./Pages/Admin-page";
import EditPage from "./Pages/Edit-page";
import logoIMG from "./AUSLogo.png";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import PendingPosts from "./Pages/PendingPosts";

const emails = [
  { title: "Head Boy", email: "kingshukpaul133569d@gmail.com" },
  { title: "Head Girl", email: "sheemamohamed1505810h@gmail.com" },
  { title: "Boys H&W Ambassador", email: "muhammadtalhaijaz2005@gmail.com" },
  { title: "Girls H&W Ambassador", email: "sagdawael39@gmail.com" },
  { title: "Deputy Head Girl", email: "amanah.sajid17030@auschool.ae" },
];

function App() {
  const [sidebarVisisble, setSideBarVisible] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isAdmin, setIsAdmin] = useState("");

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [events, setEvents] = useState([]);

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
    // get cookie to check if client is admin
    const date = Date.now();
    let keyStr = window.localStorage.getItem("isAdmin");
    if (keyStr) {
      let key = JSON.parse(keyStr);
      console.log(key);
      if (date < key.expiry) setIsAdmin(key.level);
    }
    // get all the latest posts
    getDocs(query(collection(db, "posts"), orderBy("timeStamp", "desc"))).then(
      (val) => {
        setPosts(val);
        setPostsLoading(false);
      }
    );
    // get all teh latest events
    getDocs(query(collection(db, "events"), orderBy("timeStamp", "desc"))).then(
      (val) => {
        setEvents(val);
        setEventsLoading(false);
      }
    );
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
            to="/exhibition"
            className="orange"
          >
            Exhibition
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
          {isAdmin ? (
            <Link
              onClick={toggleSidebar}
              onMouseOver={handleHover}
              onMouseLeave={handleHoverOut}
              to="/admin"
              className="green"
            >
              Admin
            </Link>
          ) : null}
          {/* <div id="sidebar-img" className={buttonHovering ? "visible" : null}>
            <img
              src={buttonHovering ? "img/" + buttonHovering + ".png" : null}
              width="100%"
              alt={buttonHovering}
              className={buttonHovering ? "visible" : null}
            />
          </div> */}
        </ul>
        <button
          onClick={toggleSidebar}
          className="btn text-primary fs-3"
          id="menu"
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
      <header>
        <Link to="/" className="text-center" id="logo">
          <img src={logoIMG} alt="Arab Unity Logo" />
        </Link>
      </header>
      <button
        onClick={toggleTheme}
        id="theme"
        className="btn btn-outline-secondary fs-3"
      >
        <i className={`bi bi-${theme === "light" ? "sun" : "moon"}-fill`}></i>
      </button>
      <Switch>
        <Route path="/about" children={<AboutPage />} />
        <Route path="/admin/:route" children={<NewPost isAdmin={isAdmin} />} />
        <Route path="/exhibition" children={<ExhibitionPage />} />
        <Route
          path="/login"
          children={<Login isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        />
        <Route
          path="/admin"
          children={
            <AdminPage
              posts={posts}
              events={events}
              postsLoading={postsLoading}
              eventsLoading={eventsLoading}
              isAdmin={isAdmin}
            />
          }
        />
        <Route path="/pending" children={
            <PendingPosts 
              posts={posts}
              events={events}
              postsLoading={postsLoading}
              eventsLoading={eventsLoading}
              isAdmin={isAdmin} />} />
        <Route
          path="/edit/:route/:id"
          children={<EditPage isAdmin={isAdmin} />}
        />
        <Route path="/post/:postID" children={<PostPage />} />
        <Route
          path="/"
          children={
            <MainPage
              posts={posts}
              events={events}
              postsLoading={postsLoading}
              eventsLoading={eventsLoading}
            />
          }
        />
      </Switch>
      <footer>
        <div id="contact-us">
          <p>Contact us</p>
          {emails.map((val) => {
            return (
              <a target="_blank" href={"mailto:" + val.email}>
                <small>{val.title}</small>
              </a>
            );
          })}
        </div>
        <div>
          <a href="https://www.instagram.com/arabunityschool/">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://www.facebook.com/Arab-Unity-School-100402739103122">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCMG7ffPH5XqvtyXMBcpA8EA">
            <i className="bi bi-youtube"></i>
          </a>
          <a href="https://www.arabunityschool.ae/">
            <i className="bib bi-globe2"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
