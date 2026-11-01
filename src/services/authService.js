// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../utils/fireBase";

export const signUp = async (name, email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  return user;
};

export const signIn = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

// Calls callback with a plain user object (or null when signed out).
// Returns the unsubscribe function.
export const subscribeToAuthChanges = (callback) =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, email, displayName, photoURL } = user;
      callback({ uid, email, displayName, photoURL });
    } else {
      callback(null);
    }
  });

export const updateUserProfile = async (user, profile) => {
  await updateProfile(user, profile);
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

export const logOut = () => signOut(auth);
