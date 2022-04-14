import React from "react";

const AboutPage = () => {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="text-primary about-page">Secondary Student Council</h1>
        <h2 className="fancy-grad-3">Our Vision</h2>
        <p className="text-justify p-4">
          Our vision aims to take initiatives and bring notice to imminent
          events and activities taking place at our school, also keeping
          students informed on major activities that the student council
          instigates, publishing articles in awareness of pivotal topics
          surrounding the welfare of students and a place for students to evince
          their skills and talents.
        </p>
        <hr />
      </div>
      <p>
        This is the AUS Student Council's site, created by Abban Faheem and Talha Ijaz as an initiative to bridge the communication barrier with the students. It is
        <a href="https://github.com/Abban-Fahim/student-council-blog">
          open-sourced
        </a>
        and open to contributions :)
      </p>
      <p>
        © All content posted on this page is originally made by the Student
        Council or students of Arab Unity School.
      </p>
    </main>
  );
};

export default AboutPage;
