import React from 'react';
import requireAuth from './requireAuth';

const Languages = () => (
    <main>
        <h1>Languages</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic ipsum non dicta quas! Pariatur libero voluptatem laudantium eum praesentium numquam! Deleniti ullam eligendi incidunt voluptatibus, quas ex perspiciatis eum dolor!</p>
    </main>
);

export default requireAuth(Languages);
