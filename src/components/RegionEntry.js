// import React, { Component, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

// // This returns an entry from the region selection: region_name and user_id

// const RegionEntry = (props) => {
//   return (
//   <div> 
    
//     <p>
//     <button 
//       onClick={() => {props.libraryCallback(
//         {id: props.id, 
//         title: props.title}
//         )
//       }
//     }
//     > 
//       <img src={props.image_url} alt={props.title}/>
//       <p>Select {props.title}</p>
//     </button>
//     <p> </p>
//     </p>
//     </div>
//   )
// }

// // for callback, need to have id come back up so we can pass it to rails
// // hold onto it (setState) then pass it
// RegionEntry.propTypes = {
//   title: PropTypes.string,
//   id: PropTypes.number,
//   libraryCallback: PropTypes.func.isRequired
// }


// export default RegionEntry;