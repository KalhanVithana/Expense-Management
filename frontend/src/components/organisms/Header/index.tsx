'use client'
import React from 'react';
import Title from '../../atoms/Title';
import { useIntl } from 'react-intl';


const Header: React.FC = ({ }) => {
    const {formatMessage} = useIntl()
  return (
    <header className='bg-indigo-light w-100% flex items-center justify-center h-[10vh] border-b-2 border-gray-400'>
      <Title  className="text-2xl font-bold"text={formatMessage({id:'app.title'})} />
    </header>
  );
};

export default Header;
