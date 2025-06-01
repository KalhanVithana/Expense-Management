
import React from 'react';

type TitleProps = {
  level?: 1 | 2 | 3;
  text:string;
  className?:string
};

const Title: React.FC<TitleProps> = ({ level = 1, text,className }) => {
  const Tag: React.ElementType = `h${level}`;
  return <Tag className={className}>{text}</Tag>;
};

export default Title;
