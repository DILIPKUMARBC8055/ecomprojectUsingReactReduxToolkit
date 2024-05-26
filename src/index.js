import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

// import data from "./utils/data";
// import { db } from "./config/firebase";
// import { addDoc, collection } from "firebase/firestore";
// const coll=collection(db,"products")
// const promise=data.map((pro)=>addDoc(coll,pro));
// await Promise.all(promise);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>
);
