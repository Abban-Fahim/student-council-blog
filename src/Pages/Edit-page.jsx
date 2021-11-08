import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  convertFromHTML,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from "draft-js-export-html";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useHistory, useParams } from "react-router-dom";
import { stateFromHTML } from "draft-js-import-html";
import Loading from "../Loading";

const EditPage = ({ isAdmin }) => {
  const { id } = useParams();
  const [postLoading, setPostLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (!isAdmin) history.push("/");
  }, []);

  useEffect(() => {
    getDoc(doc(db, "posts", id)).then((val) => {
      let { title, content, author } = val.data();
      setTitle(title);
      setAuthor(author);
      setEditorState(EditorState.createWithContent(stateFromHTML(content)));
      setPostLoading(false);
    });
  }, []);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const htmlPreview = stateToHTML(editorState.getCurrentContent());
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

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

  function updatePost() {
    updateDoc(doc(db, "posts", id), {
      title: title,
      content: htmlPreview,
      date: new Date().toLocaleDateString("en-GB"),
      timeStamp: serverTimestamp(),
      author: author,
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
      {postLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container post-input border border-2 rounded-3 p-3">
            <h4>Post title</h4>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="btn-toolbar container" role="toolbar">
            <div className="btn-group me-2" role="group">
              {inlineStyles.map((type) => {
                return (
                  <>
                    <input
                      id={type.label}
                      type="checkbox"
                      className="btn-check"
                      checked={editorState
                        .getCurrentInlineStyle()
                        .has(type.style)}
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
                let newState = RichUtils.toggleBlockType(
                  editorState,
                  style.value
                );
                setEditorState(newState);
              }}
              value={{ label: "Paragraph", value: "paragraph" }}
            />
            <div className="btn-group me-2">
              {blockStyles.map((type) => (
                <>
                  <input
                    id={type.label}
                    type="checkbox"
                    className="btn-check"
                  />
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
          <div
            onClick={focus}
            className="container post-input border border-2 rounded-3 p-3"
          >
            <h4>Post Content</h4>
            <Editor
              ref={editorRef}
              editorState={editorState}
              onChange={setEditorState}
              handleKeyCommand={handleKeyCommand}
            />
          </div>
          <div className="container post-input border border-2 rounded-3 p-3">
            <h4>Author</h4>
            <input
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          </div>
          <button
            onClick={updatePost}
            type="button"
            className="btn btn-primary btn-lg"
          >
            Update
          </button>
          <hr className="bg-primary" />
          <h5>Actual Preview</h5>
          <div dangerouslySetInnerHTML={{ __html: htmlPreview }}></div>
        </>
      )}
    </main>
  );
};

export default EditPage;
