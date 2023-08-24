import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import FormContainer from "../../components/common/formContainer";
import {REGISTRATION_ROUTE} from "../../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/common/loader";
import {useLoginMutation} from "../../slices/endpoints/userApiSlice";
import {setCredentials} from "../../slices/reducers/authSlice";
import {toast} from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate("/");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
    return (
        <FormContainer>
            <h1 className="text-center">Войти</h1>
            <form onSubmit={submitHandler}>
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
                <button type="submit" className="btn-primary mt-3">
                    Войти
                </button>
                <div className="row py-3">
                    <div className="col">
                        Не зарегистрированы?
                        <Link
                            className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ms-2"
                            to={REGISTRATION_ROUTE}
                        >
                            Зарегистрируйтесь
                        </Link>
                    </div>
                </div>
            </form>
            {isLoading && <Loader />}
        </FormContainer>
    );
};

export default Login;
