import Footer from "../components/footer";
import Header from "../components/header";
import ProductsList from "../components/productsList";
import Categories from "../components/categories";
import SearchBar from "../components/searchBar";

const Shop = () => (
    <div
        className="container-fluid d-flex gap-2 flex-column overflow-y-auto vh-100 p-2 font-roboto bg-danger-subtle"
        style={{minWidth: "320px"}}
    >
        <Header />
        <SearchBar/>
        <main className="d-flex flex-grow-1 justify-content-center">
            <div className="row gap-2 flex-nowrap w-100 p-0">
                <aside className="col-2 p-2 bg-light d-none d-sm-block">
                    <Categories />
                </aside>
                <section className="col-10 p-2 flex-shrink-1 bg-primary-subtle">
                    <ProductsList />
                </section>
            </div>
        </main>
        <Footer />
    </div>
);

export default Shop;
