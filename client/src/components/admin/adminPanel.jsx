import {
    useGetCategoriesQuery,
    useGetProductsCountQuery
} from "../../slices/endpoints/shopApiSlice";
import Loader from "../common/loader";
import Icon from "../common/icon";
import {useRef, useState} from "react";

const AdminPanel = () => {
    const {
        data: productsList,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductsCountQuery();
    const {
        data: categories,
        isLoading: isLoadingCategories,
        isSuccess: isSuccessCategories
    } = useGetCategoriesQuery();

    let content;
    if (isLoading || isLoadingCategories) {
        content = <Loader />;
    } else if (isSuccess && isSuccessCategories) {
        const [products, setProducts] = useState(
            productsList.products.map((i) => ({...i, isActive: false}))
        );
        const [values, setValues] = useState(
            products.reduce((acc, el, i) => {
                acc = {
                    ...acc,
                    ["inputId" + i]: "",
                    ["inputName" + i]: "",
                    ["inputDescription" + i]: "",
                    ["selectCategory" + i]: "",
                    ["inputCategory" + i]: "",
                    ["inputPrice" + i]: "",
                    ["inputSold" + i]: "",
                    ["inputPhotoUrl" + i]: ""
                };
                return acc;
            }, {})
        );
        const [inputPhotoEdit, setInputPhotoEdit] = useState(null);

        const handleClickEditBtn = (id) => {
            setProducts(
                products.reduce((acc, i) => {
                    i._id === id
                        ? acc.push({...i, isActive: true})
                        : acc.push({...i, isActive: false});
                    return acc;
                }, [])
            );
        };

        const handleChangeFile = async (e) => {
            try {
                e.preventDefault();
                setInputPhotoEdit(e.target.files[0]);
                console.log(inputPhotoEdit);
            } catch (err) {
                console.log(err);
            }
        };

        const handleClickSaveBtn = () => {};

        const handleClickDeleteBtn = (id) =>
            setProducts(products.filter((product) => product._id !== id));

        const categoryName = (name) => categories.find((i) => i._id === name);

        const handleChange = (e) => {
            e.preventDefault();
            const {value, name} = e.target;
            setValues((prev) => ({
                ...prev,
                [name]: value
            }));
        };

        const inputFileRef = useRef(null);

        content = (
            <table className="table table-hover table-bordered border-primary mt-2">
                <thead>
                    <tr className="text-center">
                        <th scope="col">Id</th>
                        <th scope="col">Наименование</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Категория</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">Продано</th>
                        <th scope="col">Фото</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                {products.map(
                    (
                        {
                            _id: id,
                            title,
                            description,
                            category,
                            price,
                            images,
                            sold,
                            isActive
                        },
                        i
                    ) => (
                        <tbody key={id}>
                            <tr>
                                <th
                                    className="fw-lighter text-break "
                                    scope="row"
                                >
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            isActive ? "bg-primary-subtle" : ""
                                        }`}
                                        placeholder={id}
                                        name={"inputId" + i}
                                        readOnly={true}
                                    />
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            isActive ? "bg-primary-subtle" : ""
                                        }`}
                                        name={"inputName" + i}
                                        placeholder={title}
                                        onChange={handleChange}
                                        value={values["inputName" + i]}
                                        readOnly={!isActive}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            isActive ? "bg-primary-subtle" : ""
                                        }`}
                                        name={"inputDescription" + i}
                                        placeholder={description}
                                        onChange={handleChange}
                                        value={values["inputDescription" + i]}
                                        readOnly={!isActive}
                                    />
                                </td>
                                <td>
                                    {isActive && (
                                        <select
                                            className="form-control form-select bg-primary-subtle"
                                            name={"selectCategory" + i}
                                            value={values["selectCategory" + i]}
                                            onChange={handleChange}
                                        >
                                            {categories.map((i) => (
                                                <option
                                                    key={i._id}
                                                    value={i.name}
                                                >
                                                    {" "}
                                                    {i.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    {!isActive && (
                                        <input
                                            type={"text"}
                                            className="form-control"
                                            name={"inputCategory" + i}
                                            placeholder={
                                                categoryName(category).name
                                            }
                                            readOnly={true}
                                        />
                                    )}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            isActive ? "bg-primary-subtle" : ""
                                        }`}
                                        name={"inputPrice" + i}
                                        placeholder={price}
                                        onChange={handleChange}
                                        value={values["inputPrice" + i]}
                                        readOnly={!isActive}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            isActive ? "bg-primary-subtle" : ""
                                        }`}
                                        name={"inputSold" + i}
                                        placeholder={sold}
                                        onChange={handleChange}
                                        value={values["inputSold" + i]}
                                        readOnly={!isActive}
                                    />
                                </td>
                                {isActive && (
                                    <td>
                                        <input
                                            name="inputPhotoEdit"
                                            type="file"
                                            onChange={handleChangeFile}
                                            hidden={true}
                                            ref={inputFileRef}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary fw-bold bg-primary-subtle border-primary"
                                            id="buttonPhotoEdit"
                                            onClick={() =>
                                                inputFileRef.current.click()
                                            }
                                        >
                                            <div className="fw-bold">
                                                Фото
                                            </div>
                                        </button>
                                    </td>
                                )}
                                {!isActive && (
                                    <td
                                        abbr="true"
                                        title={`${process.env.REACT_APP_API_URL}/${images}`}
                                        className="initialism text-decoration-underline"
                                    >
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                isActive
                                                    ? "bg-primary-subtle"
                                                    : ""
                                            }`}
                                            name={"inputPhotoUrl" + i}
                                            placeholder="URL"
                                            onChange={handleChange}
                                            value={values["inputPhotoUrl" + i]}
                                            readOnly={true}
                                        />
                                    </td>
                                )}
                                <td>
                                    <div className=" btn-group" role="group">
                                        <button
                                            type="button"
                                            className="btn btn-primary text-bg-light"
                                            onClick={(e) =>
                                                handleClickEditBtn(id)
                                            }
                                        >
                                            <Icon
                                                id="brush"
                                                color="RGBA(var(--bs-secondary-rgb)"
                                                size={18}
                                                addClassName="pb-1"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary text-bg-light"
                                            onClick={handleClickSaveBtn}
                                        >
                                            <Icon
                                                id="check-square"
                                                color="RGBA(var(--bs-dark-rgb)"
                                                size={20}
                                                addClassName="pb-1"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary text-bg-light"
                                            onClick={() =>
                                                handleClickDeleteBtn(id)
                                            }
                                        >
                                            <Icon
                                                id="x-circle"
                                                color="RGBA(var(--bs-danger-rgb)"
                                                size={20}
                                                addClassName="pb-1"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )
                )}
            </table>
        );
    } else if (isError) {
        content = <div>{error.toString()}</div>;
    }

    return content;
};

export default AdminPanel;
