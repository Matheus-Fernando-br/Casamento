// src/App.jsx
import { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";

import SplashScreen from "./components/SplashScreen";
import "./styles/global.css";

export default function App() {

  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem("visited");

    if (!alreadyVisited) {
      setShowSplash(true);
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );

}