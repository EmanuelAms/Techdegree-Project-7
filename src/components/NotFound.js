import React from 'react';

/*--------------------------/
NOTFOUND STATELESS COMPONENT
  displays a message when
  the search has no resuls
/--------------------------*/

const NotFound = () => {
  
  return (
      <li className="not-found">
        <h3>No Results Found</h3>
        <p>That search did not return any results, please try again.</p>
      </li>
  );
}

export default NotFound;