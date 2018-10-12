import React from "react";

import { AccordionItem, AccordionItemTitle, AccordionItemBody } from "react-accessible-accordion";

const Section = ({ section }) => (

    <AccordionItem key={section.name}>
        <AccordionItemTitle>{section.name}</AccordionItemTitle>
        <AccordionItemBody>
            <div className="accordion__body--container">
                <p>This section includes the challenges: </p>
                <ul>
                    {// List out all the challenges
                        section.list
                            .filter((item, i) => (i < 15))
                            .map((item, i) => (
                                <li key={item+i}>{item}</li>
                            ))}
                </ul>
                <p>Want to pair-program with someone in this section? click the button to see who's studying.</p>
                <button className="btn">Find A Partner</button>
            </div>
        </AccordionItemBody>
    </AccordionItem>

);

export default Section;
