import React from 'react';
import aus from "../Images/realAUS.png"

const cringyVow = "We pledge to encourage team spirit and promote positivity amongst students."

const MainPage = () => {
    return <main>
        <section class="container-fluid">
            <div className="row">
                <div className="col-md-5 col-lg-5 align-items-center d-flex"><p id="cringyVow" class="h4">{cringyVow}</p></div>
                <div className="col-md-7 col-lg-7">
                    <img src={aus} alt="AUS school" id="school" />
                </div>
            </div>
            {/* <ul className="list-group">
                <h4><i className="bi bi-megaphone text-primary"></i> Recent Announcements</h4>
                <a href="#" className="list-group-item list-group-item-action">
                    <h5>Announcement/Post/News title goes here</h5>
                    <p class="text-secondary">News description or little excerpt goes here</p>
                </a>
            </ul> */}
        </section>
    </main>
}

export default MainPage;