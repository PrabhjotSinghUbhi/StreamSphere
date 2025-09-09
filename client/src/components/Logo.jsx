import React from "react";

const Logo = ({ heightAndWidth }) => {
    return (
        <img
            src="/logo.png"
            alt="logo"
            height={heightAndWidth}
            width={heightAndWidth}
        />
    );
};

export default Logo;
