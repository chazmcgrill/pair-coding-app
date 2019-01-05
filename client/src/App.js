import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

export default ({ children }) => (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
);
