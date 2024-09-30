import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//main firebase database api
const firebaseConfig = {
  apiKey: "AIzaSyBlrFsXG9KRADx4_c8HCLJah7RWZ2NxzAE",
  authDomain: "inreport-v3.firebaseapp.com",
  projectId: "inreport-v3",
  storageBucket: "inreport-v3.appspot.com",
  messagingSenderId: "602594606969",
  appId: "1:602594606969:web:6fd5272da030777f9739a8",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAao3gMLVVy9t4uBTCRElUTyxaXlyvh61o",
//   authDomain: "inreport-v3-test.firebaseapp.com",
//   projectId: "inreport-v3-test",
//   storageBucket: "inreport-v3-test.appspot.com",
//   messagingSenderId: "321142471211",
//   appId: "1:321142471211:web:e4a22795a435d93746886e",
// };

// apiKey: "AIzaSyBlrFsXG9KRADx4_c8HCLJah7RWZ2NxzAE",
// authDomain: "inreport-v3.firebaseapp.com",
// projectId: "inreport-v3",
// storageBucket: "inreport-v3.appspot.com",
// messagingSenderId: "602594606969",
// appId: "1:602594606969:web:6fd5272da030777f9739a8"

const firebaseApp1 = initializeApp(firebaseConfig, "app1");
// const firebaseApp2 = initializeApp(firebaseConfig2, "app2");

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(firebaseApp1);
// export const db2 = getFirestore(firebaseApp2);
export const storage = getStorage();
