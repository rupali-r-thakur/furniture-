import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";

const galleryRef = collection(db, "gallery");

// ADD
export const addGalleryItem = async (data) => {
  try {
    await addDoc(galleryRef, data);
  } catch (error) {
    console.error("Add error:", error);
    throw error;
  }
};

// GET
export const getGalleryItems = async () => {
  const q = query(galleryRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// UPDATE
export const updateGalleryItem = async (id, data) => {
  const docRef = doc(db, "gallery", id);
  await updateDoc(docRef, data);
};

// DELETE
export const deleteGalleryItem = async (id) => {
  const docRef = doc(db, "gallery", id);
  await deleteDoc(docRef);
};
