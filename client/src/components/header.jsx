import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
    CART_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "../utils/consts";
import Icon from "./common/icon";
import {useSelector, useDispatch} from "react-redux";
import {useLogoutMutation} from "../slices/endpoints/userApiSlice";
import {logout} from "../slices/reducers/authSlice";
import {toast} from "react-toastify";

const Header = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [isAriaExpanded, setIsAriaExpanded] = useState(false);

    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate(LOGIN_ROUTE);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        } finally {
            setIsAriaExpanded(false);
        }
    };
    return (
        <nav className="navbar navbar-expand-lg row-cols-4 text-center bg-dark">
            <Link className="navbar-brand col link-secondary" to={SHOP_ROUTE}>
                <Icon
                    id="fire"
                    color="RGBA(var(--bs-secondary-rgb)"
                    size={30}
                    addClassName="mb-3 me-1"
                />
                <h3 className="d-inline-block">Всякая Всячина</h3>
            </Link>
            <button
                className="navbar-toggler bg-secondary me-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded={isNavCollapsed}
                aria-label="Toggle navigation"
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className={`${
                    isNavCollapsed ? "collapse" : "d-grid gap-3"
                } navbar-collapse`}
                id="navbarNavAltMarkup"
            >
                <Link className="link-secondary col" to={CART_ROUTE}>
                    <Icon
                        id="basket-fill"
                        addClassName="position-relative mb-4"
                        color="RGBA(var(--bs-secondary-rgb)"
                        size={35}
                    />
                    <span className="position-absolute top-50 start-60 translate-middle badge rounded-pill bg-success fs-7">
                        2
                    </span>
                    <h3 className="d-inline-block ms-3">Корзина</h3>
                </Link>
                <div className="col d-flex justify-content-evenly">
                    {userInfo ? (
                        <div className="btn-group">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                onClick={() =>
                                    setIsAriaExpanded(!isAriaExpanded)
                                }
                            >
                                {userInfo.user.name}
                            </button>
                            <div
                                className={
                                    "dropdown-menu mt-5" +
                                    (isAriaExpanded ? " show" : "")
                                }
                            >
                                <Link
                                    className="dropdown-item"
                                    onClick={() =>
                                        setIsAriaExpanded(!isAriaExpanded)
                                    }
                                    to={PROFILE_ROUTE}
                                >
                                    Профиль
                                </Link>
                                <button
                                    className="dropdown-item"
                                    onClick={logoutHandler}
                                >
                                    Выход
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link className="link-secondary" to={LOGIN_ROUTE}>
                                <h3 className="d-inline-block me-1">Вход</h3>
                                <Icon
                                    id="box-arrow-in-right"
                                    color="RGBA(var(--bs-secondary-rgb)"
                                    size={30}
                                    addClassName="mb-1"
                                />
                            </Link>
                            <Link
                                className="link-secondary mx-3"
                                to={REGISTRATION_ROUTE}
                            >
                                <h3 className="d-inline-block me-1">
                                    Регистрация
                                </h3>
                                <Icon
                                    id="box-arrow-in-right"
                                    color="RGBA(var(--bs-secondary-rgb)"
                                    size={30}
                                    addClassName="mb-1"
                                />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
