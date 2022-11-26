import React from "react";
import Seo from "./SEO";
import Nav from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import { motion } from "framer-motion";
import { useScrollRestoration } from "gatsby";

export default function Page({
  children,
  className,
  seo,
}: {
  children: React.ReactNode;
  className?: string;
  seo?: any;
}) {
  let fullClassName = className || "" + " app blogPage";

  const ulScrollRestoration = useScrollRestoration(`blogroll`);

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
