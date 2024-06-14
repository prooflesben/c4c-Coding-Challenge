/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
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

/**
 * Component to handle adding a partner
 * @param {JSON} partnerData JSON of the partners information 
 * @returns 
 */
function PartnerTile({ partnerData }) {
  const { name, logoUrl, description, isCurrentParnter } = partnerData.partners;
  // Handles deleting a partner
  const handleDelete = async () => {
    console.log(name)
    const url = `http://localhost:4000/partners/${name}`
    await axios.delete(url).then(function (response) {
      console.log(response)
    }).catch(function (err) {
      console.log(err)
    })
  };

  
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
      <button type="button" className="btn btn-secondary" onClick={handleDelete}>
        Delete
      </button>
      </div>
    </div>
  );
}

export default PartnerTile;
