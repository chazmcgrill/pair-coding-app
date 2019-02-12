import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from './requireAuth';
import { getLanguages } from '../actions';
import LanguagesWrapper from '../components/languages/LanguagesWrapper';

class Languages extends Component {
    componentDidMount() {
        const { fetchLanguages } = this.props;
        fetchLanguages();
    }

    render() {
        const { languages } = this.props;
        return (
            <main>
                <LanguagesWrapper languages={languages} />
            </main>
        );
    }
}

const mapStateToProps = state => ({
    languages: state.languages,
    errorMessage: state.errorMessage,
});

const mapDispatchToProps = dispatch => ({
    fetchLanguages: () => dispatch(getLanguages()),
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Languages));
