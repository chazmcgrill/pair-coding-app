import React from 'react';
import requireAuth from './requireAuth';

const Guide = () => (
    <main className="row">
        <h1>Guide</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic ipsum non dicta quas! Pariatur libero voluptatem laudantium eum praesentium numquam! Deleniti ullam eligendi incidunt voluptatibus, quas ex perspiciatis eum dolor!</p>
    </main>
);

export default requireAuth(Guide);
