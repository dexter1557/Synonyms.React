import React, { useState } from "react";
import axios from "axios";
import { saveItem } from "../../api/endpoints";
import "./Form.css";

const Form = ({ onSubmitClick }) => {
  const [formData, setFormData] = useState({ term: "", synonyms: "" });
  const [errors, setErrors] = useState({ term: false, synonyms: false });

  const mySubmit = async (e) => {
    e.preventDefault();
    try {
      if (isValid()) {
        await sendData({
          ...formData,
          synonyms: formData.synonyms.replace(/ /g, ""),
        });
        onSubmitClick();
        return;
      }
    } catch (e) {
      console.error("Something went wrong!", e);
    }
  };

  const sendData = (data) => axios({ method: "POST", url: saveItem, data });

  const isValid = () => {
    if (!formData.term.length && !formData.synonyms.length) {
      setErrors({ term: true, synonyms: true });
      return false;
    }
    if (!formData.term.length) {
      setErrors({ term: true, synonyms: false });
      return false;
    }
    if (!formData.synonyms.length) {
      setErrors({ term: false, synonyms: true });
      return false;
    }
    setErrors({ term: false, synonyms: false });
    return true;
  };

  const setFormObject = ({ name, value }) => ({ ...formData, [name]: value });
  return (
    <form onSubmit={mySubmit} className="col-6 form">
      <div className="form-group  ">
        <label>
          Specify term:
          <input
            type="text"
            name="term"
            className="form-control "
            value={formData.term}
            placeholder="Enter term"
            onChange={(e) => setFormData(setFormObject(e.target))}
          />
          <span className="error">{errors.term ? "Cant be empty" : ""}</span>
        </label>
      </div>
      <div className="form-group ">
        <label>
          Specify synonyms:
          <input
            type="text"
            name="synonyms"
            className="form-control"
            placeholder="Enter synonyms"
            value={formData.synonyms}
            onChange={(e) => setFormData(setFormObject(e.target))}
          />
          <span className="error">
            {errors.synonyms ? "Cant be empty" : ""}
          </span>
        </label>
      </div>
      <input type="submit" className="btn btn-primary" value="Send" />
    </form>
  );
};

export default Form;
