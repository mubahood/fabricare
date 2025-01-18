import React from "react";
import Navbar from "../components/Navbar";

function PublicLayout({ children }) {
  return (
    <div>
      <Navbar isAdmin={false} />
      <main className="container py-4">{children}</main>
    </div>
  );
}

export default PublicLayout;
