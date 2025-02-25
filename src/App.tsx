import React from "react";
import AppRoutes from "./routes/AppRoutes"; // Memuat routing utama
import { Provider } from "react-redux";
import store from "./store/store"; // Redux store (jika menggunakan Redux)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
