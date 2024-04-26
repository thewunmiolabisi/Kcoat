import React, { useState } from "react";
import Styles from "./DetailsForm.module.css";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    phoneNumber: "",
    email: "",
    termsAndConditions: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = "https://kcoat-1-c4lk.onrender.com/PersonalDetails";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: formData.birthDate,
          gender: formData.gender,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          termsAndConditions: formData.termsAndConditions,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Submission successful", result);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <h1 className={Styles.heading}>Personal Details</h1>
          <div className={Styles.imageUploadContainer}>
            <img src="../../assets/icons/imgholder.svg" alt="placeholder" />
            <button className={Styles.uploadBtn}>
              <img src="../../assets/icons/Upload.svg" alt="Upload" />
              Upload
            </button>
          </div>
        </div>
        <p className={Styles.subheading}>Create your personal account</p>

        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.inputPair}>
            <div className={Styles.inputHalf}>
              <label htmlFor="firstName" className={Styles.label}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={Styles.input}
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className={Styles.inputHalf}>
              <label htmlFor="lastName" className={Styles.label}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={Styles.input}
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>

          <div className={Styles.inputPair}>
            <div className={Styles.inputHalf}>
              <label htmlFor="phoneNumber" className={Styles.label}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className={Styles.input}
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className={Styles.inputHalf}>
              <label htmlFor="email" className={Styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={Styles.input}
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button className={Styles.submit} type="submit">
            Continue
          </button>

          <label htmlFor="termsAndConditions">
            <input
              type="checkbox"
              id="termsAndConditions"
              name="termsAndConditions"
              checked={formData.termsAndConditions}
              onChange={handleInputChange}
            />
            I read and consented to the terms and conditions
          </label>
        </form>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default RegistrationForm;
