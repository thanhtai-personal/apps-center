// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const getFirebaseConfig = () => {
  return {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
  };
};

// Initialize Firebase
const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const uploadImage = async (file: any, filePath: string) => {
  console.log("storage", storage);
  try {
    const storage = getStorage();

    // Create a reference to the file you want to upload
    const fileRef = ref(storage, filePath);

    // Upload file
    const res = await uploadBytes(fileRef, file);
    return res;
  } catch (error) {
    throw error;
  }
};

const getImage = async (filePath: string) => {
  try {
    // Get a reference to the storage service
    const storage = getStorage();

    // Create a reference to the image you want to get
    const imageRef = ref(storage, filePath);

    // Get download URL
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    throw error;
  }
};

export { app, auth, db, storage, getImage, uploadImage };
