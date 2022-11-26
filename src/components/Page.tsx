import React from "react";
import Seo from "./SEO";
import Nav from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import { useScrollRestoration } from "gatsby";
import { motion } from "framer-motion";

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

export function ScrollablePage({
  children,
  className,
  seo,
  path,
}: {
  children: React.ReactNode;
  className?: string;
  seo?: any;
  path: string;
}) {
  let fullClassName = className || "" + " app blogPage";

  const ulScrollRestoration = useScrollRestoration(path);

  return (
    // @ts-ignore
    <motion.div
      className={fullClassName}
      layoutScroll
      {...ulScrollRestoration}
      style={{
        paddingTop: "3rem",
        display: "flex",
        height: "100vh",
        overflow: "auto",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Seo {...seo} />
      <Nav />
      {children}
      <Footer />
    </motion.div>
  );
}
