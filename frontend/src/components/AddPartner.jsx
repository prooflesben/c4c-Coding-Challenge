import { useState } from "react";
import axios from "axios";

function AddPartner() {
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isCurrentParnter, setIsCurrentParnter] = useState("");

  const handleGoBack = (event) => {
    window.location.href = 'http://localhost:3000'
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLogoChange = (event) => {
    setLogoUrl(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleIsCurrentParnter = (event) => {
    setIsCurrentParnter(
      event.target.value.toLowerCase() === "Yes".toLowerCase() ? true : false
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Logo:", logoUrl); // The selected logo file
    console.log("Description:", description);
    console.log("Are they a current partner:", isCurrentParnter);
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
      isCurrentParnter: isCurrentParnter
    };
    axios.put(putURL,data, config).then(function (response) {
      window.location.href = 'http://localhost:3000'}
    ).catch(function (error) {
        console.log(error)
    })

  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Enter Partner Info</h1>
      <form onSubmit={handleSubmit}>
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
            id="name"
            value={logoUrl}
            onChange={handleLogoChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
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
            <option value="">Select an option...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="button" onClick={handleGoBack}>
        Go Back
      </button>
      </form>
    </div>
  );
}

export default AddPartner;
