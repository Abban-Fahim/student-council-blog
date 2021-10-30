import { collection, getDocs, query } from "@firebase/firestore";
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
    getDocs(query(collection(db, "posts"))).then((val) => {
      setPosts(val);
      setPostsLoading(false);
    });
  }, []);

  return (
    <main>
      <section class="container-fluid">
        <div className="container-fluid bg-aus d-flex">
          <p id="cringyVow" class="h4">
            {cringyVow}
          </p>
        </div>
        <div className="row">
          <div className="col-md-9 p-3">
            <h4>
              <i className="bi bi-newspaper text-primary"></i> All Announcements
            </h4>
            {postsLoading ? (
              <Loading />
            ) : (
              posts.docs.map((post) => {
                const { title, content, date } = post.data();
                const parsedContent = {
                  __html: `${content.slice(0, 35)}..., published on ${date}`,
                };
                return (
                  <div className="announcement">
                    <Link to={"/post/" + post.id}>
                      <h5>{title}</h5>
                      <p
                        class="text-secondary"
                        dangerouslySetInnerHTML={parsedContent}
                      />
                    </Link>
                  </div>
                );
              })
            )}
          </div>
          <div className="d-sm-none d-md-block col-md-3 p-3">
            <h4>
              <i className="bi bi-stars text-primary"></i>Featured Exhibitions
            </h4>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
