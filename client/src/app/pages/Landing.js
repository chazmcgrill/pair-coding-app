import React, { Component, Fragment } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Modal from '../components/Modal';
import { toggleLoginModal, addUser } from '../actions';

const API_URL = 'http://127.0.0.1:5000';
const socket = io(API_URL);

class Landing extends Component {
    state = {
        disabled: false,
        popup: null,
    }

    componentDidMount() {
        const { popup } = this.state;
        const { addsUser } = this.props;
        socket.on('github', (user) => {
            popup.close();
            addsUser(user);
        });
    }

    componentWillUnmount() {
        clearInterval(this.check);
    }

    checkPopup = () => {
        this.check = setInterval(() => {
            const { popup } = this.state;
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(this.check);
                this.setState({ disabled: false });
            }
        }, 1000);
    }

    startAuth = () => {
        const { disabled } = this.state;
        if (!disabled) {
            this.checkPopup();
            this.setState({
                disabled: true,
                popup: this.openPopup(),
            });
        }
    }

    handleModalClick = () => {
        const { clickModalClose } = this.props;
        clickModalClose();
    }

    openPopup() {
        const width = 600;
        const height = 600;
        const left = (window.innerWidth / 2) - (width / 2);
        const top = (window.innerWidth / 2) - (height / 2);

        const url = `${API_URL}/api/auth?socket-id=${socket.id}`;

        return window.open(url, '', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,  copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`);
    }

    render() {
        const { disabled } = this.state;
        const { isModalOpen } = this.props;
        return (
            <Fragment>
                <section>
                    <div>
                        <h1>Find people to pair code with right now</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, exercitationem. Modi, dolores tempora. Numquam officia debitis consequuntur tempore aut? Minima debitis qui vel excepturi, provident perferendis quibusdam expedita tempora quo?</p>
                        <div>Learn More</div>
                    </div>
                </section>

                <section>
                    <h2>What it does</h2>
                    <div>
                        <div>Icon</div>
                        <h3>Title</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis officiis modi aspernatur consequuntur dolor.</p>
                        <div>Icon</div>
                        <h3>Title</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis officiis modi aspernatur consequuntur dolor.</p>
                        <div>Icon</div>
                        <h3>Title</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur reiciendis officiis modi aspernatur consequuntur dolor.</p>
                    </div>
                </section>

                <section>
                    <h2>What people are saying about pear</h2>
                    <div>
                        <div>Avatar</div>
                        <p>Similique maiores, totam dicta nobis quaerat, optio soluta? Voluptatibus, distinctio!</p>
                        <h4>Jane Something</h4>
                        <p>CEO pf Something</p>
                    </div>
                    <div>
                        <div>Avatar</div>
                        <p>Similique maiores, totam dicta nobis quaerat, optio soluta? Voluptatibus, distinctio!</p>
                        <h4>Jane Something</h4>
                        <p>CEO pf Something</p>
                    </div>
                    <div>
                        <div>Avatar</div>
                        <p>Similique maiores, totam dicta nobis quaerat, optio soluta? Voluptatibus, distinctio!</p>
                        <h4>Jane Something</h4>
                        <p>CEO pf Something</p>
                    </div>
                    <div>
                        <div>Avatar</div>
                        <p>Similique maiores, totam dicta nobis quaerat, optio soluta? Voluptatibus, distinctio!</p>
                        <h4>Jane Something</h4>
                        <p>CEO pf Something</p>
                    </div>
                </section>

                {isModalOpen && (
                    <Modal
                        auth={this.startAuth}
                        disabled={disabled}
                        closeModal={this.handleModalClick}
                    />
                )}
            </Fragment>
        );
    }
}

function matchStateToProps(state) {
    return {
        isModalOpen: state.userProfile.isModalOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clickModalClose: () => {
            dispatch(toggleLoginModal(false));
        },
        addsUser: (user) => {
            dispatch(addUser(user));
        },
    };
}

export default connect(matchStateToProps, mapDispatchToProps)(Landing);
