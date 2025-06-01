'use client'
import React, { ReactNode } from 'react';
import { Card as AntCard } from 'antd';

type CardProps = {
  children: ReactNode;
  title?: ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, title, className }) => {
  return (
    <AntCard title={title} className={className} style={{padding:0}}  >
      {children}
    </AntCard>
  );
};

export default Card;
