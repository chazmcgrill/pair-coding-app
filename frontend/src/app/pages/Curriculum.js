import React, { Component } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

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

  selected(e) {
    const element = document.getElementById(e.target.id);

    if(element && element.classList.contains('accordion__title')) {
      document.getElementById(e.target.id).classList.toggle("colored");
    }
  }

  render() {
    const { certificates } = this.state;
    return (
      <div className="App">
        <div className="row">
          <h1>Curriculum</h1>
        </div>

        <div className="row">
          <div className="col col--main">
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
          </div>
          <div className="col col--side">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Donec elementum ligula eu sapien
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Curriculum;
