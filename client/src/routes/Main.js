import React from 'react';
import { connect } from 'react-redux';
import Landing from './Landing';
import Home from './Home';

const Main = ({ user }) => (
    <main>
        {user.photo ? <Home /> : <Landing />}
    </main>
);

function mapStateToProps(state) {
    return {
        user: state.userProfile.user,
    };
}

export default connect(mapStateToProps)(Main);
