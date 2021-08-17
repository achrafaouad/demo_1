import React from 'react';

const Card = ({ nom, immatriculation, id,user,ON_afficherList,ON_choosen }) => {
    let src  =  user.image?"http://localhost:3001/"+user.image:`https://robohash.org/${id}?size=200x200`;
  return (
    <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5' onClick={()=>{console.log(user); ON_afficherList(); ON_choosen(user)}}>
      <img alt='robots' style={{width:"200px",height:"200px"}} src={src} />
      <div>
        <h2>{nom}</h2>
        <p>{immatriculation}</p>
      </div>
    </div>
  );
}

export default Card;