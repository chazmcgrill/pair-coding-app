import React from 'react';
import './Section.sass';

const Section = (props) => {
    const { title, children, backgroundColor } = props;
    return (
        <section className="section" style={{ backgroundColor }}>
            {title && <h2>{title}</h2>}
            {children}
        </section>
    );
};

Section.defaultProps = {
    title: false,
    backgroundColor: '#fff',
};

export default Section;
