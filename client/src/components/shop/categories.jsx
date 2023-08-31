import Loader from "../common/loader";
import {useGetCategoriesQuery} from "../../slices/endpoints/shopApiSlice";
import {PRODUCT_ROUTE} from "../../utils/consts";
import {useLocation} from "react-router-dom";
import useNavigateSearch from "../../hooks/useNavigateSearch";

const Categories = () => {
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery();

    const {search} = useLocation();
    const navigateSearch = useNavigateSearch();

    let content;
    if (isLoading) {
        content = <Loader />;
    } else if (isSuccess) {
        content = (
            <aside className="p-2 bg-light d-none d-sm-block">
                <h1 className="text-center fw-bold lead">Категории</h1>
                <nav className="nav flex-column text-center">
                    {categories.map(({_id: id, name}) => (
                        <button
                            key={id}
                            onClick={() =>
                                navigateSearch(PRODUCT_ROUTE, {
                                    category: id,
                                    page: "1"
                                })
                            }
                            className={`btn btn-outline-secondary fs-5 fw-bold mt-2 p-3 bg-success-subtle border border-primary-subtle rounded-3 ${
                                search.includes(id) ? "bg-danger-subtle" : ""
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </nav>
            </aside>
        );
    } else if (isError) {
        content = <div>{error.toString()}</div>;
    }

    return content;
};

export default Categories;
