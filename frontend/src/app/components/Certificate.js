import React from "react";

import {
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody
} from "react-accessible-accordion";

import Section from "./Section";

const Certificate = ({ cert }) => (
    <AccordionItem sections={cert.sections} key={cert.title}>
        <AccordionItemTitle>{cert.title}</AccordionItemTitle>
        <AccordionItemBody>
            {// Display all the names of the sections
                cert.sections.map((section, i) => (
                    <Section section={section} />
                ))}
        </AccordionItemBody>
    </AccordionItem>
);

export default Certificate;
