'use client'
import React from 'react';
import Title from '../../atoms/Title';
import { useIntl } from 'react-intl';


const Header: React.FC = ({ }) => {
    const {formatMessage} = useIntl()
  return (
    <header className='bg-white w-100% flex items-center justify-center h-[10vh] shadow-2xl mb-2'>
      <Title  className="text-2xl !font-extrabold text-green-800"text={formatMessage({id:'app.title'})} />
    </header>
  );
};

export default Header;
