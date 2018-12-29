import React from 'react';
import './Section.sass';

const Section = (props) => {
    const {
        title,
        children,
        backgroundColor,
        sectionId,
    } = props;

    return (
        <section className="section" style={{ backgroundColor }} id={sectionId}>
            {title && <h2 className="section_title">{title}</h2>}
            {children}
        </section>
    );
};

Section.defaultProps = {
    title: false,
    backgroundColor: '#fff',
};

export default Section;
