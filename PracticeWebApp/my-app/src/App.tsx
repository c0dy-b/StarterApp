import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { EntriesDetail } from "./Pages/entries-detail";
import { SearchEntries } from "./Pages/search-entries";
import { LoginPage } from "./Pages/Login";
import { AuthProvider } from "./Contexts/use-auth";
// import { AuthProvider } from "./Contexts/use-auth";

function App() {
  return (
    <div className="app-root-content">
      <AuthProvider>
        <Router>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/Home/" element={<Home />} />
            <Route path="/Entries/Details/:id" element={<EntriesDetail />} />
            <Route
              path="/Search-Entries/"
              element={<SearchEntries header="Search" />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
