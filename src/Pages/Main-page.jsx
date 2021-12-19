import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import Tab from "./TabComponent";
import AUSLOGO from "./../AUSLogo.png";

const cringyVow =
  "We pledge to encourage team spirit and promote positivity amongst students.";

const MainPage = ({ posts, events, postsLoading, eventsLoading }) => {
  const [eventModal, setEventModal] = useState(false);
  const [tab, setTab] = useState("General");

  const tabOptions = [
    { name: "General", img: AUSLOGO },
    { name: "World", icon: "globe" },
    { name: "Sports", icon: "dribbble" },
    { name: "Welfare", icon: "emoji-smile" },
    { name: "Technology", icon: "cpu" },
  ];

  function filterPosts(genre) {
    setTab(genre);
  }

  return (
    <main>
      <Modal
        show={!!eventModal}
        onHide={() => {
          setEventModal(false);
        }}
        centered={true}
      >
        <ModalHeader>{eventModal.header}</ModalHeader>
        <ModalBody
          dangerouslySetInnerHTML={{ __html: eventModal.body }}
        ></ModalBody>
      </Modal>
      <section class="container-fluid">
        <div className="container-fluid bg-aus d-flex">
          <p id="cringyVow" class="h4">
            {cringyVow}
          </p>
        </div>
        <div className="row flex-wrap-reverse">
          <div className="col-md-9 p-3">
            <h2>
              <Tab
                currentTab={tab}
                setCurrentTab={filterPosts}
                options={tabOptions}
              />
            </h2>
            {postsLoading ? (
              <Loading />
            ) : (
              posts.docs.map((post) => {
                const { title, date, author, genre } = post.data();
                if (genre === tab)
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
              <i className="bi bi-stars text-primary"></i>Events
            </h2>
            {eventsLoading ? (
              <Loading />
            ) : (
              events.docs.map((event) => {
                const { title, date, content } = event.data();
                return (
                  <div
                    className="announcement"
                    onClick={() => {
                      setEventModal({
                        header: title,
                        body: content,
                      });
                    }}
                  >
                    <h6>{title}</h6>
                    <div className="d-flex justify-content-between">
                      <p class="text-secondary">
                        <b>Published:</b> {date}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
