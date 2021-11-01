import { doc, getDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Loading from "../Loading";

const PostPage = () => {
  const { postID } = useParams();
  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    getDoc(doc(db, "posts", postID)).then((doc) => {
      setLoading(false);
      setPostInfo(doc.data());
    });
  }, []);

  if (loading) return <Loading />;
  else
    return (
      <main className="container">
        <div className="d-flex justify-content-between">
          <h1>{postInfo.title}</h1>
          <i className="text-secondary">
            <b>By:</b> {postInfo.author}
          </i>
        </div>
        <div
          className="container"
          id="content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
        <i>Published on: {postInfo.date}</i>
      </main>
    );
};

export default PostPage;
