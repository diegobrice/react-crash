import React from 'react';
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Actions = ({ onToggle, showAdd }) => {
  const location = useLocation()
  return (
    <>
      {
        location.pathname === '/' &&
        <Button onClick={onToggle} showAdd={showAdd} />
      }
    </>
  );
};

export default Actions;
