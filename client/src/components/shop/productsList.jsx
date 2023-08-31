import {Link, useLocation} from "react-router-dom";
import Loader from "../common/loader";
import {useGetProductQuery} from "../../slices/endpoints/shopApiSlice";
import Pagination from "./pagination";

const ProductsList = () => {
    const {pathname, search} = useLocation();
    const {
        data: productsList,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductQuery(pathname + search);

    let content;
    if (isLoading) {
        content = <Loader />;
    } else if (isSuccess) {
        content = (
            <section className="p-2 d-flex flex-shrink-1 bg-primary-subtle">
                <div className="row">
                    {productsList.products.map(
                        ({_id: id, title, images, price, category}) => (
                            <div
                                key={id}
                                className="d-flex justify-content-around align-content-center card border-primary mb-2 ms-2 col-lg-4 col-md-6 col-sm-6 col-xs-12"
                                style={{
                                    minWidth: "530px",
                                    maxHeight: "350px",
                                    height: "300px"
                                }}
                            >
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex align-items-center">
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/${images}`}
                                            className="img-fluid rounded-start"
                                            alt="Фото товара"
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {title}
                                            </h5>
                                            <small className="card-text">{`Id товара: ${id}`}</small>
                                            <p className="card-text">
                                                {`Цена: ${price} руб.`}
                                            </p>
                                            <p className="card-text text-end">
                                                <Link
                                                    className="btn btn-outline-success btn-sm"
                                                    to={`/product/${id}`}
                                                >
                                                    <small className="text-body-secondary">
                                                        Открыть карточку
                                                    </small>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                    <Pagination />
                </div>
            </section>
        );
    } else if (isError) {
        content = <div>{error.toString()}</div>;
    }

    return content;
};

export default ProductsList;
