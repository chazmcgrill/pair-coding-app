import React from 'react';
import { connect } from 'react-redux';
import Landing from './Landing';

const Home = ({ user }) => (
    <main>
        {user.photo ? <h1>Home</h1> : <Landing />}
    </main>
);

const mapStateToProps = state => ({
    user: state.userProfile.user,
});

export default connect(mapStateToProps)(Home);
