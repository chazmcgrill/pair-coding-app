import React, { Component } from "react";

import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody }  from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

class Curriculum extends Component {
  state = {
    certificates: []
  };

  callAPI() {
    fetch("/api/subjects")
      .then(res => res.json())
      .then(res => {
        this.setState({
          certificates: res
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    const { certificates } = this.state;
    return (
      <div className="App">
        <div className="row">
          <h1>Curriculum</h1>
        </div>

        <div className="row">
          <Accordion accordion={false}>
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
                            <ul>
                              {// List out all the challenges
                                section.list.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                            </ul>
                          </AccordionItemBody>
                        </AccordionItem>
                      ))}
                  </AccordionItemBody>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    );
  }
}

export default Curriculum;
