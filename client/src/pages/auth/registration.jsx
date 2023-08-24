import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import FormContainer from "../../components/common/formContainer";
import {LOGIN_ROUTE} from "../../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {useRegisterMutation} from "../../slices/endpoints/userApiSlice";
import {toast} from "react-toastify";
import {setCredentials} from "../../slices/reducers/authSlice";
import Loader from "../../components/common/loader";

const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();

    const {userInfo} = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Пароли не совпадают.");
        } else {
            try {
                const res = await register({
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success("Регистрация прошла успешно.");
                navigate("/");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    return (
        <FormContainer>
            <h1 className="text-center">Зарегистрироваться</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="login" className="form-label">
                        Логин
                    </label>
                    <input
                        type="text"
                        placeholder="Введите логин"
                        className="form-control"
                        id="login"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Введите email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Пароль
                    </label>
                    <input
                        type="password"
                        placeholder="Введите пароль"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Подтвердите пароль
                    </label>
                    <input
                        type="password"
                        placeholder="Подтвердите пароль"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-primary mt-3">
                    Зарегистрироваться
                </button>
                <div className="row py-3">
                    <div className="col">
                        Зарегистрированы?
                        <Link
                            className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ms-2"
                            to={LOGIN_ROUTE}
                        >
                            Войдите
                        </Link>
                    </div>
                </div>
            </form>
            {isLoading && <Loader />}
        </FormContainer>
    );
};

export default Registration;
