import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import { withRouter } from 'react-router-dom'


const PhotoContainer = props => {
    const results = props.data;
    const photoTitle = props.title;
    let photos;
    //create new photos array from the results array by calling photo function element to add attributes to each array element in photos
    if (results.length ) {
        photos = results.map(photo => <Photo key={photo.id} url={'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'}/> );
    } else {
        //if there are no results, show NotFound component
        if(props.location.pathname === '/search'){
            photos = <NotFound />
        }

    }
    //return the list of photos
    return(
     <div className="photo-container">
             <h2>Results for {photoTitle}</h2>
          <ul>
           {photos}
          </ul>
     </div>
    )
}



  
  export default withRouter(PhotoContainer);