import React, { Component } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

class ListView extends Component {


  selected(e) {
    const element = document.getElementById(e.target.id);

    if(element && element.classList.contains('accordion__title')) {
      document.getElementById(e.target.id).classList.toggle("colored");
    }
  }

  render() {
    const { certificates } = this.props;
    return (

        <Accordion onClick={(e) => this.selected(e)} accordion={false}>
            {// Display all the names of the Certificates
            certificates.map((cert, i) => (
            <AccordionItem sections={cert.sections} key={i}>
                <AccordionItemTitle>{cert.title}</AccordionItemTitle>
                <AccordionItemBody>
                {// Display all the names of the sections
                cert.sections.map((section, i) => (
                    <AccordionItem key={i}>
                    <AccordionItemTitle>{section.name}</AccordionItemTitle>
                    <AccordionItemBody>
                    <div className="accordion__body--container">
                        <p>This section includes the challenges: </p>
                        <ul>
                        {// List out all the challenges
                        section.list.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                        </ul>
                        <p>Want to pair-program with someone in this section? click the button to see who's studying.</p>
                        <button className="btn">Find A Partner</button>
                        </div>
                    </AccordionItemBody>
                    </AccordionItem>
                ))}
                </AccordionItemBody>
            </AccordionItem>
            ))}
        </Accordion>
    );
  }
}

export default ListView;
