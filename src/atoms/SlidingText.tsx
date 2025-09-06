import React from 'react';
import styles from './SlidingHeaderText.module.css';

interface SlidingHeaderTextProps {
  text: string;
  speed?: number; // pixels per second
}

const SlidingHeaderText: React.FC<SlidingHeaderTextProps> = ({ text, speed = 3 }) => {
  return (
    <div className={styles.cardHeader}>
      <div className={styles.sliderWrapper}>
      <div className={styles.slider} style={{ animationDuration: `${text.length / speed}s` }}>
        <span className='text-white'>{text}</span>
      </div>
      </div>
    </div>
  );
};

export default SlidingHeaderText;
