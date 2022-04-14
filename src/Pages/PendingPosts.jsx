import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import Loading from "../Loading";

const PendingPosts = ({isAdmin}) =>{
    const history = useHistory();

    const [posts, setPosts] = useState("");
    const [postsLoading, setPostsLoading] = useState(true);

    useEffect(() => {
        if (!isAdmin) history.push("/");
        getDocs(query(collection(db, "pending"), orderBy("timeStamp", "desc"))).then(
            (val) => {
              setPosts(val);
              setPostsLoading(false);
            }
          );
    }, []);

    return (
        <main className="container">
            {postsLoading ?<Loading />:<>
                {posts.docs.map(post=>{
                    <Link to={`/edit/events/${post.id}`}>
                    <button id="edit" className="btn announcement">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </Link>
                    const { title, date, author, genre } = post.data();
                    return <div className="announcement">
                        <a>
                        <h5>{title}</h5>
                  <div className="d-flex justify-content-between">
                    <p class="text-secondary">
                      <b>Published:</b> {date}
                    </p>
                    <i className="text-secondary">
                      <b>By:</b> {author}
                    </i>
                    <p className="text-secondary">
                        <b>Genre:</b> {genre}
                    </p>
                  </div>
                        </a>
                    </div>
                })}
            </>}
        </main>
    )
}

export default PendingPosts;