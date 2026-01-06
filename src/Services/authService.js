import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";




/* ================= SIGN UP ================= */
export const signupUser = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    role: "user",
    createdAt: new Date(),
  });

  return {
    user,
    name,
    role: "user",
  };
};

/* ================= LOGIN ================= */
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  try {
    const docSnap = await getDoc(doc(db, "users", user.uid));

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        user,
        name: data.name,
        role: data.role,
      };
    } else {
      return {
        user,
        name: user.email,
        role: "user",
      };
    }
  } catch (error) {
    console.error("Firestore error:", error.message);

    return {
      user,
      name: user.email,
      role: "user",
    };
  }
};

// ========== LogOut ==========
export const logoutUser = async () => {
  await signOut(auth);
};