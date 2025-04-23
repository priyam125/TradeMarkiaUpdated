import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Home from "./pages/Home";
import Trademarks from "./pages/Trademarks";

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trademarks/:searchTerm" element={<Trademarks />} />
          <Route path="/trademarks" element={<Trademarks />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;