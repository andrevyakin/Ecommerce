import {Link, useLocation, useMatch} from "react-router-dom";
import PropTypes from "prop-types";

const CustomLink = (props) => {
    const {children, ...others} = props;
    const {pathname, search} = useLocation();
    const to = pathname + search;
    console.log("to", to);
    //const resolved = useResolvedPath(to);
    const match = useMatch({path: to, caseSensitive: false, end: false});

    console.log(match);

    const style = {
        color: match ? "text-dark-emphasis bg-danger" : ""
    };

    return (
        <Link to={to} style={style} {...others}>
            {children}
        </Link>
    );
};

export default CustomLink;

CustomLink.propTypes = {
    children: PropTypes.string.isRequired,
    to: PropTypes.object.isRequired
};

/*import {Link, useLocation, useResolvedPath} from "react-router-dom";

function CustomLink({children, path}) {
    let resolved = useResolvedPath(path);
    let location = useLocation();
    let isActive = resolved.pathname === location.pathname;

    return (
        <Link style={{ textDecoration: isActive ? 'underline' : 'none' }} to={path}>
            {children}
        </Link>
    );
}

export default CustomLink;*/
