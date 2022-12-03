import React, { FC } from 'react';
import styles from './styles.module.scss';

interface TitleProps {
  children: string;
}

export const Title: FC<TitleProps> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};
