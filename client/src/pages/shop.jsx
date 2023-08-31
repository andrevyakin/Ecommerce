import Footer from "../components/footer";
import Header from "../components/header";
import {Categories, ProductsList, SearchBar} from "../components/shop";

const Shop = () => (
    <>
        <div className="top-0">
            <div className="container ">
                <div className="row">
                    <header className="col-md-6 col-xl-12 order-md-1 order-xl-0">
                        <Header />
                    </header>
                    <div className="col-md-6 col-xl-12 order-md-0 order-xl-1">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
        <main>
            <div className="container">
                <div className="row">
                    <nav className="col-xl-2">
                        <Categories />
                    </nav>
                    <article className="col-md-12 col-xl-10">
                        <ProductsList />
                    </article>
                </div>
            </div>
        </main>
        <footer>
            <div className="container">
                <Footer />
            </div>
        </footer>
    </>
);

export default Shop;
