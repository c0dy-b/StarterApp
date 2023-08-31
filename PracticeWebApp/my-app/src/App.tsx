import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { EntriesDetail } from "./Pages/entries-detail";
import { SearchEntries } from "./Pages/search-entries";
import { LoginPage } from "./Pages/Login";
import { AuthProvider } from "./Contexts/use-auth";
import { NavBar } from "./components/nav-bar";
import { EntryCreate } from "./Pages/entry-create";

function App() {
  return (
    <div className="app-root-content">
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/Home/" element={<Home />} />
            <Route path="/entries/details/:id" element={<EntriesDetail />} />
            <Route path="/entries/create" element={<EntryCreate />} />
            <Route
              path="/search-entries/"
              element={<SearchEntries header="Search" />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
