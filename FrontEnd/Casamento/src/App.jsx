import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import SplashScreen from "./components/SplashScreen";
import "./styles/global.css";

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    const alreadyVisited = sessionStorage.getItem("visited");
    if (alreadyVisited) return false;
    sessionStorage.setItem("visited", "true");
    return true;
  });

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}
