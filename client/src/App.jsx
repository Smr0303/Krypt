import React from "react";
import "./index.css";

import {
  Navbar,
  Transaction,
  Services,
  Footer,
  Loader,
  Welcome,
} from "./components/index";


function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
        <Services />
        <Transaction />
        <Footer />
    </div>
  );
}
export default App;
