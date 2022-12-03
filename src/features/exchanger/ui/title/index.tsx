import React, { FC } from 'react';
import styles from './styles.module.scss';

interface TitleProps {
  children: string;
}

export const Title: FC<TitleProps> = ({ children }) => {
  return <h3 className={styles.title}>{children}</h3>;
};
