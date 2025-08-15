import React from "react";
import PropTypes from "prop-types";

function CoverImage({ src }) {
    return (
        <div>
            <div className="relative min-h-[150px] w-full pt-[16.28%]">
                <div className="absolute inset-0 overflow-hidden">
                    <img src={src} alt="cover-photo" />
                </div>
            </div>
        </div>
    );
}

export default CoverImage;

CoverImage.propTypes = {
    src: PropTypes.string.isRequired
};
