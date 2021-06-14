import React from 'react';

/*-------------------------/
WRONGURL STATELESS COMPONENT
  displays a message when
  the url is incorrect
/-------------------------*/

const WrongUrl = () => {
  return (
      <li className="not-found">
        <h3>404 Error</h3>
        <p>This page doesn't exist !</p>
      </li>
  );
}

export default WrongUrl;