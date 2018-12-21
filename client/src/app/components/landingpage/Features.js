import React from 'react';
import './Features.sass';
import Section from './Section';

export default () => (
    <Section title="What it does">
        <div className="features">
            <div className="feature">
                <div>Icon</div>
                <h3>Title</h3>
                <p className="feature__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis officiis modi aspernatur consequuntur dolor.</p>
            </div>
            <div className="feature">
                <div>Icon</div>
                <h3>Title</h3>
                <p className="feature__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis officiis modi aspernatur consequuntur dolor.</p>
            </div>
            <div className="feature">
                <div>Icon</div>
                <h3>Title</h3>
                <p className="feature__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis officiis modi aspernatur consequuntur dolor.</p>
            </div>
        </div>
    </Section>
);
