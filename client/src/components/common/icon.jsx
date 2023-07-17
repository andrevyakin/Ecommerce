import PropTypes from "prop-types";

function Icon({id, ...props}) {
    const {color, size, addClassName} = props;
    return (
        <svg
            className={`icon icon-${id} ` + addClassName}
            fill={color}
            width={size}
            height={size}
        >
            <use xlinkHref={`/images/icons/sprite.svg#icon-${id}`} />
        </svg>
    );
}

Icon.propTypes = {
    id: PropTypes.string.isRequired,
    addClassName: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number
};

export default Icon;
