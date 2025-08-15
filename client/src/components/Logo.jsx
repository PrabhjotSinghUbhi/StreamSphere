import React from "react";

const Logo = ({ heightAndWidth }) => {
    return (
        <img
            src="/public/logo.png"
            alt="logo"
            height={heightAndWidth}
            width={heightAndWidth}
        />
    );
};

export default Logo;
