import React, { useState, useEffect } from "react";
import "./useForm.css";
import { isNameValid, getLocations } from "./mock-api/apis";

const mockValidateNameAPI = async (name) => {
    return await isNameValid(name);
};

const mockFetchLocationsAPI = async () => {
    return getLocations();
};

const UserForm = () => {
  const [name, setName] = useState("");
  const [isNameTaken, setIsNameTaken] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const locations = await mockFetchLocationsAPI();
      setLocations(locations);
      if (locations.length > 0) {
        setSelectedLocation(locations[0]); 
      }
    };

    fetchLocations();
  }, []);

  const handleNameChange = async (event) => {
    const newName = event.target.value;
    setName(newName);

    if (newName.length) {
      const nameTaken = await mockValidateNameAPI(newName);
      setIsNameTaken(nameTaken);
    } else {
      setIsNameTaken(false);
    }
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAdd = () => {
    if (name) {
      setEntries([...entries, { name, location: selectedLocation }]);
      handleClear();
    }
  };

  const handleClear = () => {
    setName("");
    setIsNameTaken(false);
  };

  return (
    <div className="user-form">
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className={isNameTaken ? "error" : ""}
        />
        {isNameTaken && (
          <p className="error-message">This name has already been taken</p>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="location">Location</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="btn-group">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleAdd} >
            Add
        </button>
      </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default UserForm;
