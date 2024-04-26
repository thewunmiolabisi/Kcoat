import React, { useState } from "react";
import Styles from "./Address.module.css";
import { Link } from "react-router-dom";
import NewsLetter from "../../components/NewsLetter";
import Footer from "../../components/Footer";

const AddAddress = () => {
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    additionalPhoneNumber: "",
    deliveryAddress: "",
    emailAddress: "",
    additionalInfo: "",
    region: "",
    city: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressData((prevAddressData) => ({
      ...prevAddressData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = "https://kcoat-1-c4lk.onrender.com/addAddress";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Address saved successfully", result);
    } catch (error) {
      console.error("There was an error saving the address:", error);
    }
  };

  return (
    <div>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <span className={Styles.backArrow}>←</span>
          <h1 className={Styles.title}>Add a New Address</h1>
        </div>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <div className={Styles.inputRow}>
            <input
              className={Styles.inputHalf}
              type="text"
              placeholder="First Name"
              name="firstName"
              value={addressData.firstName}
              onChange={handleInputChange}
            />
            <input
              className={Styles.inputHalf}
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={addressData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className={Styles.inputRow}>
            <input
              className={Styles.inputHalf}
              type="tel"
              placeholder="+234 Phone Number"
            />
            <input
              className={Styles.inputHalf}
              type="tel"
              placeholder="+234 Additional Phone Number"
            />
          </div>
          <input
            className={Styles.inputFull}
            type="text"
            placeholder="Delivery Address"
          />

          <textarea
            className={Styles.textarea}
            placeholder="Additional Information"
            name="additionalInfo"
            value={addressData.additionalInfo}
            onChange={handleInputChange}
          />
          <div className={Styles.selectRow}>
            <select className={Styles.selectHalf}>
              <option value="">Region</option>
            </select>
            <select className={Styles.selectHalf}>
              <option value="">City</option>
              <option>Abia</option>
              <option>Ibadan</option>
              <option>Lagos</option>
              <option>Ogun</option>
            </select>
          </div>
          <Link to="/SavedAddress" className={Styles.saveButton} type="submit">
            Save
          </Link>
        </form>
      </div>
      <NewsLetter />
      <Footer />
      <Footer />
    </div>
  );
};

export default AddAddress;
