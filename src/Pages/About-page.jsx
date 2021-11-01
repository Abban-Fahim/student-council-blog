import React from "react";

const AboutPage = () => {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="text-primary about-page">Secondary Student Council</h1>
        <h2 className="fancy-grad-3">Our Vow</h2>
        <p>We swear to be rude and idiotic!</p>
        <h2 className="fancy-grad-3">Our Vision</h2>
        <p>
          Our vision aims to take initiatives and bring notice to imminent
          events and activities taking place at our school, also keeping them
          informed on major activities that the student council instigates,
          publishing articles in awareness of pivotal topics surrounding the
          welfare of students and a place for students to envice their skills
          and talents.
        </p>
        <hr />
      </div>
      <p>
        This site is made by Abban Faheem. It is
        <a href="https://github.com/Abban-Fahim/student-council-blog">
          open-sourced
        </a>
        under an ISC lisence.
      </p>
      <p>
        To contribute, please
        <a href="mailto:lloydtechno58@gmail.com?subject=Contributing to the Student Council Website">
          contact
        </a>
        .
      </p>
      <p>
        All content on this page is copyright of the Student Council of Arab
        Unity School, 2021 - 2022, unless otherwise explicitly said so.
      </p>
      <p>
        You may contact the official student council via
        <a href="mailto:// ! insert their email here :)">email</a>.
      </p>
    </main>
  );
};

export default AboutPage;
