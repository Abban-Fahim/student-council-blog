import React from "react";

const ExhibitionPage = () => {
  return (
    <main className="text-center container">
      <h1 className="fancy-grad">Exhibition</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
        nesciunt itaque aliquid fugit, magni cum libero quaerat. Molestiae
        delectus a quod deserunt possimus inventore, optio sint temporibus
        soluta, officia error?
      </p>
      <h2 className="fancy-grad-2">Categories</h2>
      <div id="exhibitions" className="row">
        <div className="col-md-6 col-lg-6">
          <div>
            <i className="bi bi-pen"></i>Compositions
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div>
            <i className="bi bi-brush"></i>Art
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div>
            <i className="bi bi-music-note-beamed"></i>Music
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div>
            <i className="bi bi-camera2"></i>Photography
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div>
            <i className="bi bi-camera-reels"></i>Videography
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExhibitionPage;
