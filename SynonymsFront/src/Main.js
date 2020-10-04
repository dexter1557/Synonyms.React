import React, { useState, useEffect } from "react";
import Form from "./components/form/Form";
import ListOfWords from "./components/listOfWords/ListOfWords";
import Axios from "axios";
import { getItem } from "./api/endpoints";

const Main = () => {
  const [synonyms, setSynonyms] = useState([{ term: "", synonyms: "" }]);

  const getItems = async () => {
    try {
      const res = await Axios({ method: "get", url: getItem });
      const { data } = res;
      return data;
    } catch (e) {
      console.error("Something went wrong!", e);
      return false;
    }
  };

  useEffect(() => {
    const update = async () => {
      const data = await getItems();
      setSynonyms(data);
    };

    update();
  }, []);

  const onSubmit = async () => {
    const data = await getItems();
    setSynonyms(data);
  };

  return (
    <div className="col-12 d-flex">
      <Form onSubmitClick={onSubmit} />
      <ListOfWords synonyms={synonyms} />
    </div>
  );
};

export default Main;
