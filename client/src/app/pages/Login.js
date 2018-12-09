import React from 'react';
import LoginBox from '../components/LoginBox';

const Login = () => {
    return (
        <main>
            <LoginBox auth={this.props.auth}/>
        </main>
    );
}

export default Login;