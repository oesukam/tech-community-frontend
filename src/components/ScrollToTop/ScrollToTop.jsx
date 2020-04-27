import React, { useState, useEffect } from 'react';
import './ScrollToTop.scss';
import { animateScroll as scroll } from 'react-scroll';
import backToTop from '../../assets/images/backToTop.png';

export const ScrollToTop = () => {
  const [scrollPosition, setScrollPostion] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPostion(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      role="presentation"
      id="scroll-to-top"
      className={scrollPosition < 400 ? 'hide-back-to_top' : ''}
      onClick={() => {
        scroll.scrollToTop();
      }}
    >
      <img src={backToTop} alt="Back To Top" />
    </div>
  );
};
