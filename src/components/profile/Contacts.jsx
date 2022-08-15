import React from "react";
import { FormAction } from "../hellper/helper";
import styless from "./Profile.module.css";

const Contacts = ({ contacts, errors, register }) => {
  return (
    <div>
      <b>Contacts : </b>
      {Object.keys(contacts).map((key) => (
        <div key={key} className={styless.name_input}>
          <p>{key} : </p>
          {FormAction(
            "input",
            "url",
            errors,
            false,
            contacts[key],
            "contacts",
            { register },
            key
          )}
        </div>
      ))}
    </div>
  );
};

export default Contacts;
