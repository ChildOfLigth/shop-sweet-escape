import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import MainPage from "./MainPage";
import "./styles/App.css";
import AboutUs from "./AboutUs";
import Menu from "./Menu";
import Footer from "./Footer";
import CartProduct from "./CartProduct";
import ProductPage from "./ProductPage";
import { cakes, cake, chocolate, candies, macaroon } from "./listProducts";
import OrderForm from "./OrderForm";
import Register from "./Register";
import UserDataProvider from "./UserDataProvider";
import IsNotDefined from "./IsNotDefined";
import ScrollToTop from "./ScrollTop";

function AppContent() {
  const allProducts = [...cakes, ...cake, ...chocolate, ...candies, ...macaroon];
  return (
    <>
      <div className="wrapper">
        <UserDataProvider>
          <Header />
          <ScrollToTop />
          <main className="App">
            <Routes>
              <Route path="/shop-sweet-escape" element={<MainPage />} />
              <Route
                path="/shop-sweet-escape/registration"
                element={<Register />}
              />
              <Route
                path="/shop-sweet-escape/product/:name"
                element={<ProductPage arrayProducts={allProducts} />}
              />

              <Route
                path="/shop-sweet-escape/about-us"
                element={<AboutUs />}
              />
              <Route path="/shop-sweet-escape/menu" element={<Menu />} />

              <Route
                path="/shop-sweet-escape/shopping-cart"
                element={<CartProduct />}
              />
              <Route
                path="/shop-sweet-escape/checkout-page"
                element={<OrderForm />}
              />
              <Route path="*" element={<IsNotDefined />} />
            </Routes>
          </main>
          <Footer />
        </UserDataProvider>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
