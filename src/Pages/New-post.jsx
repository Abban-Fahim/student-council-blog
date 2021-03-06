import React, { useCallback, useEffect, useRef, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from "draft-js-export-html";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useHistory, useParams } from "react-router-dom";

const NewPost = ({ isAdmin }) => {
  const history = useHistory();
  const { route } = useParams();

  useEffect(() => {
    if (!isAdmin) history.push("/");
  }, []);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const htmlPreview = stateToHTML(editorState.getCurrentContent());
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("General");

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    [editorState, setEditorState]
  );

  function createPost() {
    addDoc(collection(db, isAdmin === "journalist" ? "pending" : route), {
      title: title,
      content: htmlPreview,
      date: new Date().toLocaleDateString("en-GB"),
      timeStamp: serverTimestamp(),
      author: author,
      genre: genre,
    })
      .then(() => history.push("/"))
      .catch((err) => console.error(err));
  }

  function focus() {
    if (editorRef.current) editorRef.current.focus();
  }

  const inlineStyles = [
    { label: "bold", style: "BOLD" },
    { label: "italic", style: "ITALIC" },
    { label: "underline", style: "UNDERLINE" },
  ];

  const blockStyles = [
    { label: "blockquote-left", style: "blockquote" },
    { label: "list-ul", style: "unordered-list-item" },
    { label: "list-ol", style: "ordered-list-item" },
  ];

  const genres = ["General", "World", "Sports", "Welfare", "Technology", "101"];

  const headings = [
    { label: "Paragraph", value: "paragraph" },
    { label: "Heading 1", value: "header-one" },
    { label: "Heading 2", value: "header-two" },
    { label: "Heading 3", value: "header-three" },
    { label: "Heading 4", value: "header-four" },
    { label: "Heading 5", value: "header-five" },
    { label: "Heading 6", value: "header-six" },
  ];

  return (
    <main>
      <div className="container post-input">
        <h4>Post title</h4>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      {route === "posts" ? (
        <>
          <div className="container post-input">
            <h4>Author</h4>
            <input
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          </div>
          <div className="container post-input">
            <h4>Genre</h4>
            <ReactDropdown
              options={genres}
              className="me-2"
              onChange={(genre) => setGenre(genre.value)}
              value={genre}
            />
          </div>
        </>
      ) : (
        ""
      )}

      <div className="btn-toolbar container" role="toolbar">
        <div className="btn-group me-2" role="group">
          {inlineStyles.map((type) => {
            return (
              <>
                <input
                  id={type.label}
                  type="checkbox"
                  className="btn-check"
                  checked={editorState.getCurrentInlineStyle().has(type.style)}
                />
                <label
                  htmlFor={type.label}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    let newState = RichUtils.toggleInlineStyle(
                      editorState,
                      type.style
                    );
                    setEditorState(newState);
                  }}
                  className="btn btn-outline-primary"
                >
                  <i className={"bi bi-type-" + type.label}></i>
                </label>
              </>
            );
          })}
        </div>
        <ReactDropdown
          options={headings}
          className="me-2"
          onChange={(style) => {
            let newState = RichUtils.toggleBlockType(editorState, style.value);
            setEditorState(newState);
          }}
          value={{ label: "Paragraph", value: "paragraph" }}
        />
        <div className="btn-group me-2">
          {blockStyles.map((type) => (
            <>
              <input id={type.label} type="checkbox" className="btn-check" />
              <label
                htmlFor=""
                onMouseDown={(e) => {
                  e.preventDefault();
                  let newState = RichUtils.toggleBlockType(
                    editorState,
                    type.style
                  );
                  setEditorState(newState);
                }}
                className="btn btn-outline-primary"
              >
                <i className={"bi bi-" + type.label}></i>
              </label>
            </>
          ))}
        </div>
      </div>
      <div onClick={focus} className="container post-input">
        <h4>Post Content</h4>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
      <button
        onClick={createPost}
        type="button"
        className="btn btn-primary btn-lg"
      >
        Create
      </button>
      <hr className="bg-primary" />
      {route === "posts" ? (
        <div className="container">
          <h1>{title}</h1>
          <div className="text-end" style={{ marginBottom: "2.5rem" }}>
            <i className="text-secondary d-block">
              <b>By:</b> {author}
            </i>
            <i>Published on: {new Date().toLocaleDateString("en-GB")}</i>
          </div>
          <div
            className="container"
            id="content"
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
          />
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default NewPost;
