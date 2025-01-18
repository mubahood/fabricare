import React from "react";
import Navbar from "../components/Navbar";

function AdminLayout({ children }) {
  return (
    <div>
      <Navbar isAdmin={true} />
      <main className="container py-4">{children}</main>
    </div>
  );
}

export default AdminLayout;
