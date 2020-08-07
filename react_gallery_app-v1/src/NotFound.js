import React from 'react';

//function returns not found message if the user input results in an empty array
const NotFound = props => {
  return(
<li className="not-found">
            <h3>No Results Found</h3>
            <p>Your search did not return any results. Please try again.</p>
          </li>)

}
export default NotFound;