import React from 'react';
import './Pagination.sass';

export default () => (
    <div className="pagination">
        <button type="button" className="pagination-link">1</button>
        <button type="button" className="pagination-link">2</button>
        <button type="button" className="pagination-link">&gt;</button>
    </div>
);
