import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import axios from 'axios'
/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

// Define prop types for PartnerTile component
PartnerTile.propTypes = {
  partnerData: PropTypes.shape({
    logoUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Add more PropTypes for other fields if necessary
  }).isRequired,
};

function PartnerTile({ partnerData }) {
  //console.log(partnerData.partners)
  const { name, logoUrl, description, isCurrentParnter } = partnerData.partners;
  const handleDelete = (event) => {
    console.log(name)
    const url = `http://localhost:4000/partners/${name}`
    axios.delete(url).then(function (response) {
      console.log(response)
    }).catch(function (err) {
      console.log(err)
    })
  };

  
  //console.log(partnerData.partners)
  return (
    <div className="partner-tile">
      <img className="partner-thumbnail" src={logoUrl} />
      <hr />
      <div className="partner-info">
        <p>Name: {name}</p>
        <p>Description: {description}</p>
        <p>Are we currently working with them: {isCurrentParnter ? "Yes" : "No"}</p>
      </div>
      <div>
      <Button type="button" onClick={handleDelete}>
        Delete
      </Button>
      </div>
    </div>
  );
}

export default PartnerTile;
