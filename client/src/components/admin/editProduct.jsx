import Header from "../header";
import Footer from "../footer";
import {useLocation, useNavigate} from "react-router-dom";
import {
    useGetCategoriesQuery,
    useGetProductQuery
} from "../../slices/endpoints/shopApiSlice";
import {useEditProductMutation} from "../../slices/endpoints/adminApiSlice";
import Loader from "../common/loader";
import {useRef, useState} from "react";
import {toast} from "react-toastify";
import {PRODUCT_URL} from "../../utils/consts";

const EditProduct = () => {
    const {pathname, search} = useLocation();
    const currentProductId = search
        ? search.split("=").slice(-1).toString()
        : pathname.split("/").slice(-1).toString();

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

    const [editProduct] = useEditProductMutation();

    const [values, setValues] = useState({
        inputName: "",
        selectCategory: "",
        inputPrice: 0
    });

    const navigate = useNavigate();

    const [inputPhoto, setInputPhoto] = useState(null);

    const handleChange = (e) => {
        e.preventDefault();
        const {value, name} = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const inputFileRef = useRef(null);

    const handleChangeFile = async (e) => {
        try {
            e.preventDefault();
            setInputPhoto(e.target.files[0]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClick = async (id) => {
        try {
            const formData = new FormData();
            formData.append("_id", productsList.products[0]._id);
            formData.append("title", values.inputName || productsList.products[0].title);
            formData.append("price", `${values.inputPrice || productsList.products[0].price}`);
            formData.append("images", inputPhoto || productsList.products[0].images);
            formData.append("category", values.selectCategory || productsList.products[0].category);
            await editProduct(formData).unwrap();
            toast.success("Товар успешно обновлен.");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
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
                    <div className="row">
                        <div className="col-6">
                            <div>
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
                                            <small className="card-text">{`Id товара: ${currentProductId}`}</small>
                                            <p className="card-text mt-3">
                                                {`Категория: ${categoryName(productsList.products[0].category).name}`}
                                            </p>
                                            <p className="card-text">
                                                {`Цена: ${productsList.products[0].price} руб.`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <aside className="p-2 bg-light d-none d-sm-block">
                                <h1 className="text-center fw-bold lead">
                                    Блок для редаткирования товара
                                </h1>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="inputName">
                                            <div className="fw-semibold">Наименование</div>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control border-primary"
                                            id="inputName"
                                            placeholder="Наименование"
                                            name="inputName"
                                            onChange={handleChange}
                                            value={values.inputName}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="selectCategory">
                                            <div className="fw-semibold">Категория</div>
                                        </label>
                                        <select
                                            type="text"
                                            className="form-control form-select border-primary"
                                            id="selectCategory"
                                            name="selectCategory"
                                            onChange={handleChange}
                                            value={values.selectCategory}
                                        >
                                            {categories.map((i) => (
                                                <option key={i._id} value={i.name}>
                                                    {" "}
                                                    {i.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputPrice">
                                            <div className="fw-semibold">Цена</div>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control border-primary"
                                            id="inputPrice"
                                            placeholder="Цена"
                                            name="inputPrice"
                                            onChange={handleChange}
                                            value={values.inputPrice}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <label htmlFor="buttonPhoto">
                                            <div className="fw-bold">Загрузить файл</div>
                                        </label>
                                        <input
                                            name="inputPhoto"
                                            type="file"
                                            /*accept="image"*/
                                            onChange={handleChangeFile}
                                            hidden={true}
                                            ref={inputFileRef}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary fw-bold bg-primary-subtle border-primary"
                                            id="buttonPhoto"
                                            onClick={() => inputFileRef.current.click()}
                                        >
                                            <div className="fw-bold">Выбрать изображение</div>
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary fw-bold bg-primary-subtle border-primary"
                                            onClick={handleClick}
                                        >
                                            <div className="fw-bold">
                                                Добавить товар в базу (отправить)
                                            </div>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary fw-bold bg-primary-subtle border-primary ms-5"
                                            onClick={() => navigate(-1)}
                                        >
                                            <div className="fw-bold">
                                                Назад
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </aside>
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

export default EditProduct;
