import {Link, useLocation} from "react-router-dom";
import Loader from "./common/loader";
import {useGetProductQuery} from "../slices/endpoints/shopApiSlice";

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
            <section className="col-9 p-2 flex-shrink-1 bg-primary-subtle">
                <div className="row">
                    {productsList.products.map(
                        ({_id: id, title, images, price, category}) => (
                            <div
                                key={id}
                                className="card mb-3 col-lg-4 col-md-6 col-sm-6 col-xs-12"
                                style={{width: "540px", minWidth: "540px"}}
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
                                            <p className="card-text">{`Id товара: ${id}`}</p>
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
                </div>
            </section>
        );
    } else if (isError) {
        content = <div>{error.toString()}</div>;
    }

    return content;
};

export default ProductsList;
