import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/ui/Header";
import MainPage from "./components/pages/MainPage";
import "./styles/App.css";
import AboutUs from "./components/pages/MainPage";
import Menu from "./components/pages/Menu";
import Footer from "./components/ui/Footer";
import CartProduct from "./components/pages/CartProduct";
import ProductPage from "./components/pages/ProductPage";
import { cakes, cake, chocolate, candies, macaroon } from "./listProducts";
import OrderForm from "./components/pages/OrderForm";
import UserDataProvider from "./components/UserDataProvider";
import IsNotDefined from "./components/pages/IsNotDefined";
import ScrollToTop from "./components/ui/ScrollTop";

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
              <Route path="/" element={<MainPage />} />
              <Route
                path="/product/:name"
                element={<ProductPage arrayProducts={allProducts} />}
              />

              <Route
                path="/about-us"
                element={<AboutUs />}
              />
              <Route path="/menu" element={<Menu />} />

              <Route
                path="/shopping-cart"
                element={<CartProduct />}
              />
              <Route
                path="/checkout-page"
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
