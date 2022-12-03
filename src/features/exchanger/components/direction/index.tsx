import React, { FC } from 'react';
import { Title } from '../../ui';

interface DirectionProps {
  title: string;
  children: React.ReactNode;
}

export const Direction: FC<DirectionProps> = ({ title, children }) => {
  return (
    <div>
      <Title>{title}</Title>
      {children}
    </div>
  );
};
