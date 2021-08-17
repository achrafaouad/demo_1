import React from 'react';
import Card from './Card';

const CardList = ({ materiels,ON_afficherList,ON_choosen }) => {
  return (
    <div>
      {
        materiels.map((user, i) => {
          return (
            <Card
              key={i}
              id={materiels[i].id_mat}
              nom={materiels[i].nom}
              immatriculation={materiels[i].immatriculation}
              user={user}
              ON_afficherList={ON_afficherList}
              ON_choosen={ON_choosen}
              />
          );
        })
      }
    </div>
  );
}

export default CardList;