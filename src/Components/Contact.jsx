import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handelOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const validate = function () {
    const newErrors = {};
    if (!formData.Name) newErrors.Name = "Name is required";
    else if (formData.Name && formData.Name < 3) {
      newErrors.Name = "Name should be at least 3 charaxhters";
    }
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setSubmissionStatus("Submitting");
      const response = await fetch("https://formcarry.com/s/fJWh9d-KvBX", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.code === 200) {
        // success
        setSubmissionStatus("Success");
        setFormData({
          Name: "",
          email: "",
          message: "",
        });
        alert("Form submitted successfully");
      } else {
        // failure
        setSubmissionStatus("Failure");
        alert("Sorry could't send message");
      }
    } catch (err) {
      //failure
      setSubmissionStatus("Failure");
      alert("Sorry could't send message");
    }
  };
  return (
    <div className="contact_container">
      <h1>Contact Me</h1>

      <form className="contact_form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          name="Name"
          value={formData.Name}
          onChange={handelOnChange}
          disabled={submissionStatus == "Submitting"}
        />
        {errors.Name && <p className="error">{errors.Name}</p>}
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          value={formData.email}
          onChange={handelOnChange}
          disabled={submissionStatus == "Submitting"}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <textarea
          placeholder="Your Message"
          name="message"
          value={formData.message}
          onChange={handelOnChange}
          disabled={submissionStatus == "Submitting"}
        ></textarea>
        {errors.message && <p className="error">{errors.message}</p>}
        <button type="submit" disabled={submissionStatus == "Submitting"}>
          {submissionStatus == "Submitting" ? "Sending" : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
