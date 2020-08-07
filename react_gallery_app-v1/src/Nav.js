import React from 'react';
//create default search options with href route attribute 
const Nav = props => {
    return(
<nav className="main-nav">
        <ul>
          <li><a href='/Alpacas'>Alpacas</a></li>
          <li><a href='/oldEnglishSheepdogs'>Old English Sheepdogs</a></li>
          <li><a href='/owls'>Owls</a></li>
        </ul>
      </nav>
    )
}
export default Nav;