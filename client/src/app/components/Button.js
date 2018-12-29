import React from 'react';

const Button = ({ user }) => (
    <button type="button" key={user.id}>
        {`Message ${user.name}`}
    </button>
);

export default Button;
