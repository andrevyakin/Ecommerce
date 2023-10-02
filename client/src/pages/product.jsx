import {useLocation} from "react-router-dom";
import {useGetCategoriesQuery, useGetProductQuery} from "../slices/endpoints/shopApiSlice";
import Loader from "../components/common/loader";
import Header from "../components/header";
import Footer from "../components/footer";
import Icon from "../components/common/icon";
import {useEffect, useState} from "react";
import {PRODUCT_ROUTE_SINGLE, PRODUCT_URL} from "../utils/consts";
import useNavigateSearch from "../hooks/useNavigateSearch";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../slices/reducers/userSlice";
import {toast} from "react-toastify";

const Product = () => {
    const {pathname, search} = useLocation();
    const currentProductId = search.split("=").slice(-1).toString();

    const {
        data: productsList,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductQuery(`${process.env.REACT_APP_API_URL}${PRODUCT_URL}?_id=${currentProductId}`);
    const {
        data: categories,
        isLoading: isLoadingCategories,
        isSuccess: isSuccessCategories
    } = useGetCategoriesQuery();

    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.auth);
    const [userRole, setUserRole] = useState();
    useEffect(() => {
        setUserRole(userInfo?.user.role || undefined);
    }, [userInfo]);

    //const elements = useRoutes(routes(userRole));
    const addToCart = () => {
        if (!userRole) {
            toast.error("Только авторизированные пользователи могут добавлять товар в корзину");
        } else {
            dispatch(addItemToCart(productsList.products[0]));
        }
    };

    const navigateSearch = useNavigateSearch();
    const [searchStr, setSearchStr] = useState("");
    const handleChangeStr = e => {
        e.preventDefault();
        navigateSearch(PRODUCT_ROUTE_SINGLE, {"title[regex]": e.target.value});
        setSearchStr(e.target.value);
    };

    let content;
    if (isLoading || isLoadingCategories) {
        content = <Loader/>;
    } else if (isSuccess && isSuccessCategories) {
        const categoryName = id => categories.find(i => i._id === id);
        content =
            (
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
                    <div className="d-flex my-2">
                        <input className="flex-grow-1 text-center"
                            placeholder={`${process.env.REACT_APP_API_URL}${pathname}${search}`}/>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <div className="row g-0">
                                <div className="col-md-4 d-flex align-items-center">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/${productsList.products[0]?.images}` || null}
                                        className="img-fluid rounded-start"
                                        alt="Фото товара"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {productsList.products[0].title}
                                        </h5>
                                        <p className="card-text mt-3">
                                            {`Категория: ${categoryName(productsList.products[0].category).name}`}
                                        </p>
                                        <p className="card-text">
                                            {`Цена: ${productsList.products[0].price} руб.`}
                                        </p>
                                        <p className="card-text">
                                            {`Продано: ${productsList.products[0].sold} шт.`}
                                        </p>
                                        <p className="card-text text-muted">
                                            {`Описание: ${productsList.products[0].description}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 d-flex flex-column d-block justify-content-around">
                            <div className="d-flex flex-grow-1 flex-column justify-content-center">
                                {!!userRole && <button
                                    className="btn btn-lg btn-outline-secondary fs-5 fw-bold mt-2 p-3 bg-success-subtle border border-primary-subtle rounded-3"
                                    onClick={addToCart}
                                >
                                    Добавить в корзину
                                </button>}
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <small
                                    className="card-text text-center fw-bold">{`Id товара: ${productsList.products[0]._id}`}</small>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
    } else if (isError) {
        content = <div>{error.toString()}</div>;
    }

    return content;
};

export default Product;
