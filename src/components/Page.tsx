import React from "react";
import Seo from "./SEO";
import Nav from "./Navigation/Navigation";
import Footer from "./Footer/Footer";

export default function Page({
  children,
  className,
  seo,
}: {
  children: React.ReactNode;
  className?: string;
  seo?: any;
}) {
  if (className) {
    className = className + " app";
  } else {
    className = "app";
  }

  return (
    <div
      className={className}
      style={{
        paddingTop: "3rem",
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Seo {...seo} />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
