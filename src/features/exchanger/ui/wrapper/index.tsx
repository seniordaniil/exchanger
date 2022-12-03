import React, { FC } from 'react';
import styles from './styles.module.scss';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
