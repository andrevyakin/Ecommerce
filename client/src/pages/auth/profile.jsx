import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../../components/common/formContainer";
import {toast} from "react-toastify";
import Loader from "../../components/common/loader";
import {useUpdateUserMutation} from "../../slices/endpoints/userApiSlice";
import {setCredentials} from "../../slices/reducers/authSlice";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";

const Profile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.auth);

    const [updateProfile, {isLoading}] = useUpdateUserMutation();
    useEffect(() => {
        setName(userInfo.user.name);
        setEmail(userInfo.user.email);
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Пароли не совпадают.");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo.user._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success("Данные успешно обновлены.");
                navigate(SHOP_ROUTE);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    return (
        <FormContainer>
            <h1 className="text-center">Обновите данные</h1>
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
                <div className="d-flex justify-content-evenly">
                    <button type="submit" className="btn-primary mt-3">
                        Обновить
                    </button>
                    <button
                        type="button"
                        className="btn-primary mt-3"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Назад
                    </button>
                </div>
            </form>
            {isLoading && <Loader />}
        </FormContainer>
    );
};

export default Profile;
