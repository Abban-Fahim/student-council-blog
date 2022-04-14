import { deleteDoc, doc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import Loading from "../Loading";
import Tab from "./TabComponent";

const AdminPage = ({ isAdmin, posts, events, postsLoading, eventsLoading }) => {
  const history = useHistory();
  const [tab, setTab] = useState("General");

  const tabOptions = [
    { name: "General" },
    { name: "World" },
    { name: "Sports" },
    { name: "Welfare" },
    { name: "Technology" },
    { name: "Events" },
  ];

  useEffect(() => {
    if (!isAdmin) history.push("/");
  }, []);

  function deletePost(id, route) {
    deleteDoc(doc(db, route, id)).then(() => window.location.reload());
  }

  console.log(isAdmin);

  return (
    <main className="container">
      <h2 className="d-flex justify-content-around">
        <Link to="/admin/posts">New Article</Link>
        <Link to="/admin/events">New Event</Link>
        <Link to="/pending">Pending posts</Link>
      </h2>
      <Tab currentTab={tab} setCurrentTab={setTab} options={tabOptions} />
      {postsLoading && eventsLoading ? (
        <Loading />
      ) : tab === "Events" ? (
        events.docs.map((post) => {
          const { title, date } = post.data();
          return (
            <div className="announcement">
              <a>
                {isAdmin === "admin" ? (
                  <button
                    onClick={() => deletePost(post.id, "events")}
                    id="delete"
                    className="btn announcement"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                ) : (
                  ""
                )}
                <Link to={`/edit/events/${post.id}`}>
                  <button id="edit" className="btn announcement">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </Link>
                <h5>{title}</h5>
                <div className="d-flex justify-content-between">
                  <p class="text-secondary">
                    <b>Published:</b> {date}
                  </p>
                </div>
              </a>
            </div>
          );
        })
      ) : (
        posts.docs.map((post) => {
          const { title, date, author, genre } = post.data();
          if (genre === tab)
            return (
              <div className="announcement">
                <a>
                  {isAdmin === "admin" ? (
                    <button
                      onClick={() => deletePost(post.id, "posts")}
                      id="delete"
                      className="btn announcement"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  ) : (
                    ""
                  )}
                  <Link to={`/edit/posts/${post.id}`}>
                    <button id="edit" className="btn announcement">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </Link>
                  <h5>{title}</h5>
                  <div className="d-flex justify-content-between">
                    <p class="text-secondary">
                      <b>Published:</b> {date}
                    </p>
                    <i className="text-secondary">
                      <b>By:</b> {author}
                    </i>
                  </div>
                </a>
              </div>
            );
        })
      )}
    </main>
  );
};

export default AdminPage;
