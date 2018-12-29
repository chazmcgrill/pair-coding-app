import React from 'react';
import './Features.sass';
import Section from './Section';

export default () => (
    <Section title="What it does" sectionId="features">
        <div className="features">
            <div className="feature">
                <div className="feature_icon" />
                <h3>Title</h3>
                <p className="feature_text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis officiis modi aspernatur consequuntur dolor.</p>
            </div>
            <div className="feature">
                <div className="feature_icon" />
                <h3>Title</h3>
                <p className="feature_text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis officiis modi aspernatur consequuntur dolor.</p>
            </div>
            <div className="feature">
                <div className="feature_icon" />
                <h3>Title</h3>
                <p className="feature_text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis officiis modi aspernatur consequuntur dolor.</p>
            </div>
        </div>
    </Section>
);
