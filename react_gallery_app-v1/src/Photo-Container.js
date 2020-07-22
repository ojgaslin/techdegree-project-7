import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import { withRouter } from 'react-router-dom'


const PhotoContainer = props => {
    const results = props.data;
    let photos;
    if (results.length ) {
        photos = results.map(photo => <Photo key={photo.id} url={'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'}/> );
    } else {
        if(props.location.pathname == '/search'){
            photos = <NotFound />
        }

    }

    return(
     <div className="photo-container">
          <ul>
           {photos}
          </ul>
     </div>
    )
}



  
  export default withRouter(PhotoContainer);