import { useEffect, useState } from "react";
import "./admin.css";
import {
  addGalleryItem,
  getGalleryItems,
  deleteGalleryItem,
  updateGalleryItem,
} from "../Services/galleryService";

function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  // LOAD DATA
  const loadGallery = async () => {
    const data = await getGalleryItems();
    setItems(data);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // CLOUDINARY IMAGE UPLOAD
  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "unsigned_upload"); // 👈 change if needed
    formData.append("cloud_name", "ddqkysibv"); // 👈 change this

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ddqkysibv/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";

    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    if (editId) {
      const oldItem = items.find((i) => i.id === editId);

      await updateGalleryItem(editId, {
        title,
        price,
        description,
        imageUrl: image ? imageUrl : oldItem.imageUrl,
      });

      setEditId(null);
    } else {
      await addGalleryItem({
        title,
        price,
        description,
        imageUrl,
        createdAt: new Date(),
      });
    }

    setTitle("");
    setPrice("");
    setDescription("");
    setImage(null);
    loadGallery();
  };

  // EDIT
  const handleEdit = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setPrice(item.price);
    setDescription(item.description);
    setImage(null);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await deleteGalleryItem(id);
      loadGallery();
    }
  };

  return (
    <div className="admin_container">
      <h1>Admin Gallery Management</h1>

      <form className="admin_form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Furniture Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">
          {editId ? "Update Item" : "Add Item"}
        </button>
      </form>

      <div className="admin_list">
        {items.map((item) => (
          <div className="admin_card" key={item.id}>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            )}

            <h3>{item.title}</h3>
            <p>{item.price}</p>
            <p>{item.description}</p>

            <div className="admin_actions">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button
                className="delete"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
