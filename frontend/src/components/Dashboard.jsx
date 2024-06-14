import { useState, useEffect } from "react";
import PartnerTile from "./PartnerTile";

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {
  const [partnersJson, setPartnersJson] = useState({});
  const [partnerComponents, setPartnerComponents] = useState([]);

  /**
   * Redirects to the add partner interface
   */
  const handleAddPartner = () => {
    window.location.href = 'http://localhost:3000/addPartner'
  }

  // Load all partners on initial page load and partner changes
  useEffect(() => {
    fetch("http://localhost:4000/partners", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPartnersJson(data);
        const parnterCompTiles = [];
        for (let partner in partnersJson) {
          parnterCompTiles.push(
            <PartnerTile
              key={partner}
              partnerData={{ partners: partnersJson[partner] }}
            />
          );
        }
        setPartnerComponents(parnterCompTiles);
      })
      .catch((error) => {
        console.error("Error fetching partner data:", error);
      });
     // console.log(partnersJson)
  }, [partnerComponents,partnersJson]);

  return (
    <div id="main-content">
      <h1 className="title">C4C: Projects</h1>
      <button className="btn" onClick={handleAddPartner}>AddPartner</button>
      <div id="main-partners-grid">{partnerComponents}</div>
    </div>
  );
}

export default Dashboard;
