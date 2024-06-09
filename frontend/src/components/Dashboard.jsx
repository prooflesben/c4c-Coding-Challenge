import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partnersJson, setPartnersJson] = useState({});
  const [partnerComponents, setPartnerComponents] = useState([]);

  // Load all partners on initial page load 
   useEffect(() => {
     fetch('http://localhost:4000/partners', {
      method: 'GET',
    })
    .then((res) => res.json()).then((data) => {
      setPartnersJson(data)
      //console.log(data)
      //console.log(partnersJson)
      const parnterCompTiles = [];
      for(let partner in partnersJson){
        parnterCompTiles.push(<PartnerTile key={partner} partnerData = {{partners: partnersJson[partner]}}/>)
        //console.log("Partner data", partnersJson[partner])
      }
      setPartnerComponents(parnterCompTiles)
    }).catch((error) => {
      console.error('Error fetching partner data:', error);
    })},[partnerComponents])


  return (
    <div id="main-content">
      <div id="main-partners-grid">
      {partnerComponents}
      </div>
    </div>
  )
}

export default Dashboard;