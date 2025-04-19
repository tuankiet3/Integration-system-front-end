import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
=======
import { Provider } from "react-redux";
import { store } from "./app/store"; // đường dẫn đến Redux store của bạn

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
);
