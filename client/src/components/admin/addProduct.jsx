import {useRef, useState} from "react";
import {useGetCategoriesQuery} from "../../slices/endpoints/shopApiSlice";
import {
    useAddCategoryMutation,
    useAddProductMutation
} from "../../slices/endpoints/adminApiSlice";

const AddProduct = () => {
    const {data: categories} = useGetCategoriesQuery();
    const [addProduct] = useAddProductMutation();
    const [addCategory] = useAddCategoryMutation();

    const [values, setValues] = useState({
        inputName: "",
        inputDescription: "",
        selectCategory: "",
        inputCategory: "",
        inputPrice: ""
    });

    const [inputPhoto, setInputPhoto] = useState(null);

    const handleChange = (e) => {
        e.preventDefault();
        const {value, name} = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addNewCategory = async (newCategory) => {
        const createdCategory = await addCategory({name: newCategory}).unwrap();
        return createdCategory._id;
    };

    const getIdCategory = (name) => categories.find((i) => i.name === name);

    const inputFileRef = useRef(null);

    const handleChangeFile = async (e) => {
        try {
            e.preventDefault();
            setInputPhoto(e.target.files[0]);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        const formData = new FormData();
        formData.append("title", values.inputName);
        formData.append("price", `${values.inputPrice}`);
        formData.append("description", values.inputDescription);
        formData.append("images", inputPhoto);
        const currentCategory = values.inputCategory
            ? await addNewCategory(values.inputCategory)
            : values.selectCategory
                ? getIdCategory(values.selectCategory)._id
                : categories[0]._id;

        formData.append("category", currentCategory);

        await addProduct(formData).unwrap();

        setValues(
            Object.keys(values).reduce((acc, el) => {
                acc = {
                    ...acc,
                    [el]: ""
                };
                return acc;
            }, {})
        );
        setInputPhoto(null);
    };

    return (
        <aside className="p-2 bg-light d-none d-sm-block">
            <h1 className="text-center fw-bold lead">
                Блок для добавления, или редактирования товара
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
                    <label htmlFor="inputDescription">
                        <div className="fw-semibold">Описание</div>
                    </label>
                    <input
                        type="text"
                        className="form-control border-primary"
                        id="inputDescription"
                        placeholder="Описание"
                        name="inputDescription"
                        onChange={handleChange}
                        value={values.inputDescription}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="selectCategory">
                        <div className="fw-semibold">Категория (выбрать)</div>
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
                    <label htmlFor="inputCategory">
                        <div className="fw-semibold">Категория (новая)</div>
                    </label>
                    <input
                        type="text"
                        className="form-control border-primary"
                        id="inputCategory"
                        name="inputCategory"
                        onChange={handleChange}
                        value={values.inputCategory}
                    />
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
                </div>
            </form>
        </aside>
    );
};

export default AddProduct;
