import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ApplicationDetails from "./pages/ApplicationDetails";
import AddApplication from "./pages/AddApplication";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main className="main-content">

        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route
            path="/applications"
            element={<Applications />}
          />

          <Route
            path="/applications/:id"
            element={<ApplicationDetails />}
          />

          <Route
            path="/add-application"
            element={<AddApplication />}
          />

        </Routes>

      </main>

    </BrowserRouter>
  );
}

export default App;