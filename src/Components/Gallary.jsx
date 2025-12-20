import React from "react";
import img1 from "../Images/logo.jpg";
import img2 from "../Images/logo.jpg";
import img3 from "../Images/logo.jpg";
import img4 from "../Images/logo.jpg";

function Gallary() {
  return (
    <div className="gallery_container">
      <h1>Our Gallery</h1>

      <div className="gallery_grid">
        <div className="gallery_item">
          <img src={img1} alt="" />
        </div>
        <div className="gallery_item">
          <img src={img2} alt="" />
        </div>
        <div className="gallery_item">
          <img src={img3} alt="" />
        </div>
        <div className="gallery_item">
          <img src={img4} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Gallary;
