
import PropTypes from 'prop-types';
/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

// Define prop types for PartnerTile component
PartnerTile.propTypes = {
  partnerData: PropTypes.shape({
    thumbnailUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Add more PropTypes for other fields if necessary
  }).isRequired,
};


function PartnerTile({ partnerData }) {
  //console.log(partnerData.partners)
  const {name, thumbnailUrl, description } = partnerData.partners
  return (
    <div className="partner-tile">
      <img className="partner-thumbnail" src={thumbnailUrl} />
      <hr />
      <div className="partner-info">
        <p>Name: {name}</p>
        <p>Description:{description}</p>
      </div>
    </div>
  )
}

export default PartnerTile;