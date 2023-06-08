import React from 'react';
import styles from './Button.module.css';

interface IButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    type?: 'primary' | 'secondary' | 'danger' | 'success';
}

export const Button: React.FC<IButtonProps> = ({ children, onClick, type='primary'}) => {
  return (
    <button className={`${styles.root} ${styles[type]}`} onClick={onClick}>{children}</button>
  );
}