import React from 'react';
import requireAuth from './requireAuth';

const Grid = () => (
    <main>
        <h1>GRID</h1>
        <div className="row">
            <h2>.row .col</h2>
        </div>
        <div className="row">
            <div className="col">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Donec elementum ligula eu sapien</p>
            </div>
        </div>

        <div className="row">
            <h2>.row .col.col--main .col.col--side</h2>
        </div>
        <div className="row">
            <div className="col col--main">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Donec elementum ligula eu sapien</p>
            </div>
            <div className="col col--side">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Donec elementum ligula eu sapien</p>
            </div>
        </div>

        <div className="row">
            <h2>.row.row--centered .col.col--center</h2>
        </div>
        <div className="row row--centered">
            <div className="col col--center">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Donec elementum ligula eu sapien</p>
            </div>
        </div>

        <div className="row">
            <h2>.row.row--spaced</h2>
        </div>
        <div className="row row--spaced">
            <h3>item1</h3>
            <h3>item2</h3>
        </div>
    </main>
);

export default requireAuth(Grid);
