import React from 'react';

/*-----------------------/
PHOTO STATELESS COMPONENT
  displays one image to
  be part of a full list,
  mapped out of an array
/-----------------------*/

const Photo = (props) => {
  
  return(
    <li>
      <img src={props.url} alt=""/>
    </li>
    );
}

export default Photo;