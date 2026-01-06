import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGalleryItems } from "../Services/galleryService";

function Gallery() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const data = await getGalleryItems();
      setItems(data);
    };
    loadData();
  }, []);

  return (
    <div className="gallery_container">
      <h1>Our Furniture Collection</h1>

      <div className="gallery_grid">
        {items.map((item) => (
          <div className="gallery_card" key={item.id}>
            <img src={item.imageUrl} alt={item.title} />

            <div className="gallery_content">
              <h3>{item.title}</h3>
              <h4>{item.price}</h4>
              <p>{item.description}</p>

              <button
  onClick={() => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
>
  Contact for Details
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
