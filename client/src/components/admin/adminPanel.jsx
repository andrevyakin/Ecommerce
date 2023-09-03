import {useGetCategoriesQuery, useGetProductQuery} from "../../slices/endpoints/shopApiSlice";
import Loader from "../common/loader";
import Icon from "../common/icon";
import {PRODUCT_EDIT_ROUTE, PRODUCT_URL} from "../../utils/consts";
import {useDeleteProductMutation} from "../../slices/endpoints/adminApiSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AdminPanel = () => {
    const {
        data: productsList,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductQuery(`${process.env.REACT_APP_API_URL}${PRODUCT_URL}?limit=Infinity`);

    const {
        data: categories,
        isLoading: isLoadingCategories,
        isSuccess: isSuccessCategories
    } = useGetCategoriesQuery();

    const navigate = useNavigate();

    const handleClickEditBtn = id => {
        navigate(`${PRODUCT_EDIT_ROUTE}/${id}`);
    };

    const [deleteProduct] = useDeleteProductMutation();
    const handleClickDeleteBtn = async id => {
        try {
            await deleteProduct(id);
            toast.success("Товар удален.");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    let content;
    if (isLoading || isLoadingCategories) {
        content = <Loader/>;
    } else if (isSuccess && isSuccessCategories) {
        const getNameCategory = id => categories.find(i => i._id === id);
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
                {productsList.products.map(
                    (
                        {
                            _id: id,
                            title,
                            description,
                            category,
                            price,
                            images,
                            sold
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
                                        className="form-control"
                                        placeholder={id}
                                        readOnly={true}
                                    />
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={title}
                                        readOnly={true}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={description}
                                        readOnly={true}
                                    />
                                </td>
                                <td>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder={
                                            getNameCategory(category).name
                                        }
                                        readOnly={true}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={price}
                                        readOnly={true}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={sold}
                                        readOnly={true}
                                    />
                                </td>
                                <td
                                    abbr="true"
                                    title={`${process.env.REACT_APP_API_URL}/${images}`}
                                    className="initialism text-decoration-underline"
                                >
                                    <input
                                        type="text"
                                        className="form-control"
                                        name={"inputPhotoUrl"}
                                        placeholder="URL"
                                        value="URL"
                                        readOnly={true}
                                    />
                                </td>
                                <td>
                                    <div className=" btn-group" role="group">
                                        <div className="addEmployee">
                                            <button
                                                type="button"
                                                className="btn btn-primary text-bg-light"
                                                onClick={() =>
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

                                        </div>
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
