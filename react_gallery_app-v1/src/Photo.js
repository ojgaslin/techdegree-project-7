import React from 'react';

const Photo = (props) => (
    //display img elements
  <li>
    {/* src attribute assigned url assembled in Photo-Container.js */}
    <img src={props.url} alt=" " />
  </li>
);

export default Photo;



