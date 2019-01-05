import React from 'react';
import heroImage from '../../graphics/hero.png';
import './Hero.sass';

export default () => (
    <div className="hero">
        <img src={heroImage} alt="pair hero" className="hero_img" />
        <div className="hero_wrapper">
            <div className="hero-text">
                <h1>Find people to pair code with right now</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, exercitationem. Modi, dolores tempora. Numquam officia debitis consequuntur tempore aut? Minima debitis qui vel excepturi, provident perferendis quibusdam expedita tempora quo?</p>
                <a href="#features" className="btn btn--lg hero-text_btn">Learn More</a>
            </div>
        </div>
    </div>
);
