import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import Loading from "../Loading";

const AdminPage = ({ isAdmin }) => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (!isAdmin) history.push("/");
  }, []);

  useEffect(() => {
    getDocs(query(collection(db, "posts"), orderBy("timeStamp", "desc"))).then(
      (val) => {
        setPosts(val);
        setPostsLoading(false);
      }
    );
  }, []);

  function deletePost(id) {
    deleteDoc(doc(db, "posts", id)).then(() => history.push("/"));
  }

  return (
    <main className="container">
      <h2>
        <i className="bi bi-newspaper text-primary"></i> All Announcements
        <Link to="/admin/new">New Article</Link>
      </h2>
      {postsLoading ? (
        <Loading />
      ) : (
        posts.docs.map((post) => {
          const { title, date, author } = post.data();
          return (
            <div className="announcement">
              <a>
                <button
                  onClick={() => deletePost(post.id)}
                  id="delete"
                  className="btn announcement"
                >
                  <i className="bi bi-trash"></i>
                </button>
                <Link to={"/edit/" + post.id}>
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
