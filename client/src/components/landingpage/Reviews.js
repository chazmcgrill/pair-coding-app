import React from 'react';
import Section from './Section';
import './Reviews.sass';
import Avatar1 from '../../graphics/reviews/avatar-1.png';
import Avatar2 from '../../graphics/reviews/avatar-2.png';
import Avatar3 from '../../graphics/reviews/avatar-3.png';
import Avatar4 from '../../graphics/reviews/avatar-4.png';

export default () => (
    <Section title="What people are saying about pear" backgroundColor="#F1F2F1" sectionId="reviews">
        <div className="reviews">
            <div className="review">
                <div className="review_avatar">
                    <img className="review_avatar_img" src={Avatar1} alt="avatar 1" />
                </div>
                <div className="review_text">
                    <p className="review_quote">&ldquo;Similique maiores, totam dicta nobis quaerat, optio soluta? Voluptatibus, distinctio! Lorem ipsum dolor sit amet consectetur adipisicing elit. At animi natus nemo ab obcaecati aperiam. Natus!&rdquo;</p>
                    <h4>Jane Something</h4>
                    <p>
                        CEO of
                        <strong> Something</strong>
                    </p>
                </div>
            </div>
            <div className="review">
                <div className="review_avatar">
                    <img className="review_avatar_img" src={Avatar2} alt="avatar 1" />
                </div>
                <div className="review_text">
                    <p className="review_quote">&ldquo;Similique maiores, totam dicta nobis quaerat, optio soluta? Voluptatibus, distinctio! Lorem ipsum dolor sit amet consectetur adipisicing elit. At animi natus nemo ab obcaecati aperiam. Natus!&rdquo;</p>
                    <h4>John Smith</h4>
                    <p>
                        CEO of
                        <strong> Something</strong>
                    </p>
                </div>
            </div>
            <div className="review">
                <div className="review_avatar">
                    <img className="review_avatar_img" src={Avatar3} alt="avatar 1" />
                </div>
                <div className="review_text">
                    <p className="review_quote">&ldquo;Similique maiores, totam dicta nobis quaerat, optio soluta? Voluptatibus, distinctio! Lorem ipsum dolor sit amet consectetur adipisicing elit. At animi natus nemo ab obcaecati aperiam. Natus!&rdquo;</p>
                    <h4>Darren Brown</h4>
                    <p>
                        CEO of
                        <strong> Something</strong>
                    </p>
                </div>
            </div>
            <div className="review">
                <div className="review_avatar">
                    <img className="review_avatar_img" src={Avatar4} alt="avatar 1" />
                </div>
                <div className="review_text">
                    <p className="review_quote">&ldquo;Similique maiores, totam dicta nobis quaerat, optio soluta? Voluptatibus, distinctio! Lorem ipsum dolor sit amet consectetur adipisicing elit. At animi natus nemo ab obcaecati aperiam. Natus!&rdquo;</p>
                    <h4>Sarah Smith</h4>
                    <p>
                        CEO of
                        <strong> Something</strong>
                    </p>
                </div>
            </div>
        </div>
    </Section>
);
