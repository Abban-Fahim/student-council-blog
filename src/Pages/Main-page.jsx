import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import Loading from "../Loading";

const cringyVow =
  "We pledge to encourage team spirit and promote positivity amongst students.";

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    getDocs(query(collection(db, "posts"), orderBy("timeStamp", "desc"))).then(
      (val) => {
        setPosts(val);
        setPostsLoading(false);
      }
    );
  }, []);

  return (
    <main>
      <section class="container-fluid">
        <div className="container-fluid bg-aus d-flex">
          <p id="cringyVow" class="h4">
            {cringyVow}
          </p>
        </div>
        <div className="row flex-wrap-reverse">
          <div className="col-md-9 p-3">
            <h2>
              <i className="bi bi-newspaper text-primary"></i> All Announcements
            </h2>
            {postsLoading ? (
              <Loading />
            ) : (
              posts.docs.map((post) => {
                const { title, date, author } = post.data();
                return (
                  <div className="announcement">
                    <Link to={"/post/" + post.id}>
                      <h5>{title}</h5>
                      <div className="d-flex justify-content-between">
                        <p class="text-secondary">
                          <b>Published:</b> {date}
                        </p>
                        <i className="text-secondary">
                          <b>By:</b> {author}
                        </i>
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
          <div className="d-sm-none d-md-block col-md-3 p-3">
            <h2>
              <i className="bi bi-stars text-primary"></i>Featured
            </h2>
            <small className="text-secondary">Nothing featured right now</small>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
