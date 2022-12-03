import React, { FC } from 'react';
import styles from './styles.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};
