import React, { useState, useEffect } from 'react';
import './ScrollArrow.css';

const ScrollArrow = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercentage = (winScroll / height) * 100;
    setScrollProgress(scrolledPercentage);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <div className="scroll-arrow-container" onClick={scrollToTop}>
      <div
        className="scroll-arrow-progress"
        style={{
          background: `conic-gradient(#007bff ${scrollProgress}%, #ccc ${scrollProgress}%)`,
        }}
      >
        <button
          className="scroll-arrow"
          style={{ display: visible ? 'inline' : 'none' }}
        >
          &#8679;
        </button>
      </div>
    </div>
  );
};

export default ScrollArrow;
