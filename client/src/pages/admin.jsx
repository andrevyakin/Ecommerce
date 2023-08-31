import Header from "../components/header";
import Footer from "../components/footer";
import {AddProduct, AdminPanel} from "../components/admin";

const Admin = () => (
    <>
        <div className="top-0">
            <div className="container ">
                <div className="row">
                    <header className="col-md-6 col-xl-12 order-md-1 order-xl-0">
                        <Header />
                    </header>
                </div>
            </div>
        </div>
        <main>
            <div className="container">
                <div className="row">
                    <nav className="col-xl-2">
                        <AddProduct />
                    </nav>
                    <article className="col-md-12 col-xl-10">
                        <AdminPanel />
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

export default Admin;
