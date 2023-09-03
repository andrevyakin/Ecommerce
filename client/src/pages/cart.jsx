import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, removeItemFromCart} from "../slices/reducers/userSlice";
import Icon from "../components/common/icon";
import Header from "../components/header";
import {useState} from "react";
import {PRODUCT_ROUTE_SINGLE} from "../utils/consts";
import useNavigateSearch from "../hooks/useNavigateSearch";

const Cart = () => {
    const dispatch = useDispatch();
    const {cart} = useSelector(({userCart}) => userCart);

    const changeQuantity = (item, quantity) => {
        dispatch(addItemToCart({...item, quantity}));
    };

    const removeItem = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);

    const navigateSearch = useNavigateSearch();
    const [searchStr, setSearchStr] = useState("");
    const handleChangeStr = e => {
        e.preventDefault();
        navigateSearch(PRODUCT_ROUTE_SINGLE, {"title[regex]": e.target.value});
        setSearchStr(e.target.value);
    };

    return (
        <div className="container">
            <Header/>
            <div className="d-flex mt-2">
                <Icon
                    id="search"
                    color="RGBA(var(--bs-secondary-rgb)"
                    size={20}
                />
                <input
                    className="flex-grow-1 text-center"
                    type="search"
                    name="searchStr"
                    placeholder="Поиск (по названию)"
                    autoComplete="off"
                    value={searchStr}
                    onChange={handleChangeStr}
                />
            </div>
            <section className="">
                <h2 className="">Корзина</h2>
                {!cart.length ? (
                    <div className="">Корзина пуста</div>
                ) : (
                    <>
                        <div className="d-flex flex-column">
                            <div className="row">
                                <div className="col-9">
                                    {cart.map((item) => {
                                        const {images, title, price, _id, quantity} = item;
                                        return (
                                            <div className="row align-items-center mt-2 bg-danger-subtle" key={_id}>
                                                <div className="d-flex col-2 justify-content-center">
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}/${images}` || null}
                                                        alt="Фото товара"
                                                    />
                                                </div>
                                                <div className="col-4">
                                                    <h5 className="d-flex justify-content-center">{title}</h5>
                                                    <div className="d-flex justify-content-center">id {_id}</div>
                                                </div>
                                                <div className="d-flex justify-content-evenly col-2 border-primary-subtle">
                                                    <div
                                                        className=""
                                                        onClick={() =>
                                                            changeQuantity(item, Math.max(1, quantity - 1))
                                                        }
                                                    >
                                                        <Icon
                                                            id="minus"
                                                            color="RGBA(var(--bs-secondary-rgb)"
                                                            size={30}
                                                            addClassName="mb-1"
                                                        />
                                                    </div>
                                                    <span className="h3">{quantity}</span>
                                                    <div
                                                        className=""
                                                        onClick={() =>
                                                            changeQuantity(item, Math.max(1, quantity + 1))
                                                        }
                                                    >
                                                        <Icon
                                                            id="plus"
                                                            color="RGBA(var(--bs-secondary-rgb)"
                                                            size={30}
                                                            addClassName="mt-1"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-4 d-flex justify-content-evenly">
                                                    <div className="d-block fw-bold">
                                                        <div className="d-flex justify-content-center">{`Цена: ${price}`} руб.</div>
                                                        <div className="d-flex justify-content-center">{`Стоимость: ${price * quantity}`} руб.
                                                        </div>
                                                    </div>
                                                    <div
                                                        className=""
                                                        onClick={() => removeItem(item._id)}
                                                    >
                                                        <Icon
                                                            id="close"
                                                            color="RGBA(var(--bs-danger-rgb)"
                                                            size={25}
                                                            addClassName=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        );
                                    })}
                                </div>
                                <div className="col-3 mt-2">
                                    <div
                                        className="d-flex justify-content-evenly align-items-center flex-column h-100 bg-danger-subtle">
                                        <div className="d-flex d-block h4">
                                            ИТОГО:{" "}
                                            <div className="ms-1">
                                                {sumBy(cart.map(({quantity, price}) => quantity * price))} руб.
                                            </div>
                                        </div>
                                        <div className="">
                                            <button className="btn btn-lg btn-secondary">Оформить заказ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default Cart;
