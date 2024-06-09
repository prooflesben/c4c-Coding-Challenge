import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partners, setPartners] = useState({});

  // Load all partners on initial page load 
   useEffect(() => {
     fetch('http://localhost:4000', {
      method: 'GET',
    })
    .then((res) => res.json()).then((data) => {
      setPartners(data.sftt)
      // console.log(data)
      // console.log(data.sftt)
      
    }).catch((error) => {
      console.error('Error fetching partner data:', error);
    })})


  return (
    <div id="main-content">
      <div id="main-partners-grid">
        <PartnerTile partnerData={{ partners}} />
      </div>
    </div>
  )
}

export default Dashboard;