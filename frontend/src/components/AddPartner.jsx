import { useState } from "react";
import axios from "axios";

/**
 * Component to add a partner to the grid.
 * @returns {JSX.Element} - Rendered component.
 */
function AddPartner() {
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isCurrentParnter, setIsCurrentParnter] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // Handles the Go Back button
  const handleGoBack = () => {
    window.location.href = "http://localhost:3000";
  };

  // Handles the name form and its changes
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handles the logo form and its changes
  const handleLogoChange = (event) => {
    setLogoUrl(event.target.value);
  };

  // Handles the description form and its changes
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Handles the is current partner form and its changes
  const handleIsCurrentParnter = (event) => {
    setIsCurrentParnter(event.target.value === "Yes");
  };

  // Validates the logo URL format
  const validateLogoUrl = (url) => {
    const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return !!pattern.test(url);
  };

  // Submits the new partner to storage with validation
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!name || !logoUrl || !description || !isCurrentParnter) {
      setErrorMessage("Please fill in all fields."); // Update error message
      return; 
    }

    // Validate logoUrl format
    if (!validateLogoUrl(logoUrl)) {
      setErrorMessage("Please enter a valid LogoUrl."); 
      return; 
    }

    const putURL = "http://localhost:4000/partners";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      logoUrl: logoUrl,
      name: name.trim(),
      description: description,
      isCurrentParnter: isCurrentParnter,
    };
    try {
      await axios.put(putURL, data, config);
      window.location.href = "http://localhost:3000";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container" style={{ textAlign: "center" }}>
      <h1>Enter Partner Info</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="partner-form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="logoUrl" className="form-label">
            LogoUrl:
          </label>
          <input
            type="text"
            className="form-control"
            id="logoUrl"
            value={logoUrl}
            onChange={handleLogoChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="currentPartner" className="form-label">
            Are they a current partner:
          </label>
          <select
            className="form-select"
            id="currentPartner"
            value={isCurrentParnter ? "Yes" : "No"}
            onChange={handleIsCurrentParnter}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleGoBack}
          >
            Go Back
          </button>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPartner;
