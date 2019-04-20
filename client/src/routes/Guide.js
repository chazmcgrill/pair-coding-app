import React from 'react';
import GuideDetail from '../components/guide/Guide';
import requireAuth from './requireAuth';

const Guide = () => (
    <main className="row">
        <GuideDetail />
    </main>
);

export default requireAuth(Guide);
