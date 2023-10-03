import Icon from "../common/icon";
import useNavigateSearch from "../../hooks/useNavigateSearch";
import {PRODUCT_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

//Сделать адаптивность
const SearchBar = () => {
    const [values, setValues] = useState({
        sort: "",
        search: "",
        quantity: ""
    });
    const navigateSearch = useNavigateSearch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        const {value, name} = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));

        switch (e.target.value) {
        case "по умолчанию (сбросить все фильтры)":
            navigate(SHOP_ROUTE);
            setValues({
                search: "",
                quantity: "6 товаров"
            });
            break;
        case "по цене (по возрастанию)":
            navigateSearch(PRODUCT_ROUTE, {sort: "price"});
            break;
        case "по цене (по убыванию)":
            navigateSearch(PRODUCT_ROUTE, {sort: "-price"});
            break;
        case "6 товаров":
            navigateSearch(PRODUCT_ROUTE, {limit: "6", page: "1"});
            break;
        case "8 товаров":
            navigateSearch(PRODUCT_ROUTE, {limit: "8", page: "1"});
            break;
        case "10 товаров":
            navigateSearch(PRODUCT_ROUTE, {limit: "10", page: "1"});
            break;
        default:
            navigate(SHOP_ROUTE);
        }
        if (e.target.name === "search") {
            navigateSearch(PRODUCT_ROUTE, {"title[regex]": e.target.value});
            if (!e.target.value) {
                navigate(SHOP_ROUTE);
                setValues({
                    search: "",
                    quantity: "6 товаров"
                });
            }
        }
    };

    return (
        <form className="row-cols-3 d-flex bg-success-subtle my-2 py-2">
            <div className="col d-flex justify-content-center align-items-center">
                <label className="mx-2" htmlFor="sort">
                    Сортировать
                </label>
                <select
                    className="form-select"
                    id="sort"
                    name="sort"
                    value={values.sort}
                    onChange={handleChange}
                >
                    <option value="по умолчанию (сбросить все фильтры)">
                        по умолчанию (обнулить фильтры)
                    </option>
                    <option value="по цене (по возрастанию)">
                        по цене (по возрастанию)
                    </option>
                    <option value="по цене (по убыванию)">
                        по цене (по убыванию)
                    </option>
                </select>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
                <Icon
                    id="search"
                    color="RGBA(var(--bs-secondary-rgb)"
                    size={20}
                />
                <input
                    type="search"
                    name="search"
                    placeholder="Поиск (по названию)"
                    autoComplete="off"
                    value={values.search}
                    onChange={handleChange}
                />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
                <label className="mx-2" htmlFor="quantity">
                    Показать
                </label>
                <select
                    className="form-select me-2"
                    id="quantity"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                >
                    <option value="6 товаров">6 товаров</option>
                    <option value="8 товаров">8 товаров</option>
                    <option value="10 товаров">10 товаров</option>
                </select>
            </div>
        </form>
    );
};

export default SearchBar;
