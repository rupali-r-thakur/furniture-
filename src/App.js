import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";

import AdminDashboard from "./Admin/AdminDashboard";
import AdminRoute from "./Routes/AdminRoute";

function MainPage() {
  return (
    <>
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="gallery"><Gallery /></section>
      <section id="contact"><Contact /></section>
    </>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(undefined); 

  // KEEP USER LOGGED IN AFTER REFRESH
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentUser({
            uid: user.uid,
            ...docSnap.data(),
          });
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (currentUser === undefined) return <div>Loading...</div>;

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<MainPage />} />
        <Route path="/gallery" element={<MainPage />} />
        <Route path="/contact" element={<MainPage />} />

        
        <Route
          path="/admin"
          element={
            <AdminRoute currentUser={currentUser}>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
