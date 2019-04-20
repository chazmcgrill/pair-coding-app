import React from 'react';
import requireAuth from './requireAuth';

const Home = () => (
    <main className="row">
        <div>
            <h2>Home</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic ipsum non dicta quas! Pariatur libero voluptatem laudantium eum praesentium numquam! Deleniti ullam eligendi incidunt voluptatibus, quas ex perspiciatis eum dolor!</p>
        </div>
    </main>
);

export default requireAuth(Home);
