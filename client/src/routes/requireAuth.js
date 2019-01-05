import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends Component {
        // Our component just got rendered
        componentDidMount() {
            this.shouldNavigateAway();
        }

        // Our component just got updated
        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            const { user, history } = this.props;
            if (!user.photo) {
                history.push('/');
            }
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return { user: state.userProfile.user };
    }

    return connect(mapStateToProps)(ComposedComponent);
};
