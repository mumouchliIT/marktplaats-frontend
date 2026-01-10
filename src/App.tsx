import { useState } from "react";
import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";

function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <CookieBanner />

      {showPrivacy ? (
        <PrivacyPage onBack={() => setShowPrivacy(false)} />
      ) : (
        <HomePage />
      )}

      <Footer onShowPrivacy={() => setShowPrivacy(true)} />

    </>
  );
}

export default App;
