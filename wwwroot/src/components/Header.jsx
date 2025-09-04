import React from 'react';

const Header = ({ user, onLogin, onLogout }) => {
    return (
        <div id="header">
            <img
                className="logo"
                src="https://cdn.autodesk.io/logo/black/stacked.png"
                alt="Autodesk Platform Services"
            />
            <span className="title">Hubs Browser</span>
            <button
                id="login"
                onClick={user ? onLogout : onLogin}
            >
                {user ? `Logout (${user.name})` : 'Login'}
            </button>
        </div>
    );
};

export default Header;