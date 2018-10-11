import React from "react";
import { Accordion } from "react-accessible-accordion";
import Certificate from './Certificate';


function selected(e) {
    const element = document.getElementById(e.target.id);

    if(element && element.classList.contains('accordion__title')) {
      document.getElementById(e.target.id).classList.toggle("colored");
    }
  }

  const ListView = ({ certificates }) => (
        <Accordion onClick={(e) => selected(e)} accordion={false}>
            {// Display all the names of the Certificates
                certificates.map((cert, i) => (
                    <Certificate cert={cert} />
            ))}
        </Accordion>
    );

export default ListView;
