import React from 'react';
import { connect } from 'react-redux';
import Landing from './Landing';

const Home = (props) => {
  	return (
		<main>
			{props.user.photo ? (
				<h1>Home</h1>
			) : (
				<Landing />
			)}
		</main>
  	);
}

function mapStateToProps(state) {
	return {
		user: state.userProfile.user
	}
}

export default connect(mapStateToProps)(Home);