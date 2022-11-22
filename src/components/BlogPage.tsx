import React from 'react';
import Seo from './SEO';
import Nav from './Navigation/Navigation';
import Footer from './Footer/Footer';
import { motion } from 'framer-motion';

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
    className = className + ' app';
  } else {
    className = 'app';
  }

  return (
    <motion.div
      className={className}
      layoutScroll
      style={{
        paddingTop: '3rem',
        display: 'flex',
        height: '100vh',
        overflow: 'auto',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Seo {...seo} />
      <Nav />
      {children}
      <Footer />
    </motion.div>
  );
}
