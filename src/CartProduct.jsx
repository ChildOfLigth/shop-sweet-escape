import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./styles/CartProduct.module.css";
import ProdQuantityControl from "./ProdQuantityControl";
import CustomButton from "./CustomButton";
import visibleIco from "./imgs/icons/visible.png";
import cartEmpty from "./imgs/icons/empty-cart.png";

export default function CartProduct() {
  const navigate = useNavigate();
  const [goodsStoredInStorage, setGoodsStoredInStorage] = useState(
    JSON.parse(localStorage.getItem("product")) || []
  );
  const prices = goodsStoredInStorage?.map((elem) => elem.price);
  const allPrices = prices?.reduce((a, b) => a + b, 0);

  function removeItemFromCart(name) {
    const updatedProducts = goodsStoredInStorage.filter(
      (elem) => elem.name !== name
    );
    setGoodsStoredInStorage(updatedProducts);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
  }

  return (
    <>
      {goodsStoredInStorage && goodsStoredInStorage.length !== 0 ? (
        <div className={classes.wrapper}>
          <ul className={classes.productLict}>
            {goodsStoredInStorage?.map((elem) => (
              <li key={elem.name} className={classes.productLict__productCard}>
                <button
                  className={classes.productCard__removeProduct}
                  onClick={() => removeItemFromCart(elem.name)}
                >
                  X
                </button>

                <div className={classes.productCard__photoWrap}>
                  <button
                    className={classes.buttonToGoProductPage}
                    title="Go to product page"
                    onClick={() =>
                      navigate(`/shop-sweet-escape/product/${elem.name}`)
                    }
                  >
                    <img src={visibleIco} alt="" />
                  </button>

                  <img
                    src={elem.imgProd}
                    alt=""
                    className={classes.photoProduct}
                  />
                </div>
                <div className={classes.productCard__productInfo}>
                  <h3>{elem.name}</h3>
                  <p className={classes.price}>
                    {parseFloat(elem.price.toFixed(2))}$
                  </p>
                  <p>
                    {elem.typeProd.charAt(0).toUpperCase() +
                      elem.typeProd.slice(1)}
                  </p>
                  <ProdQuantityControl
                    quantityProd={elem.quantity}
                    callbackFirst={() =>
                      setGoodsStoredInStorage((prevProd) =>
                        prevProd.map((product) =>
                          product.name === elem.name
                            ? {
                                ...product,
                                price: product.price - elem.defPrice,
                                quantity: product.quantity - 1,
                              }
                            : product
                        )
                      )
                    }
                    callbackSecond={() => {
                      setGoodsStoredInStorage((prevProd) =>
                        prevProd.map((product) =>
                          product.name === elem.name
                            ? {
                                ...product,
                                price: product.price + elem.defPrice,
                                quantity: product.quantity + 1,
                              }
                            : product
                        )
                      );
                    }}
                  />
                </div>
              </li>
            ))}
            <div className={classes.cart_total}>
              <p>
                Total amount: <span>{parseFloat(allPrices.toFixed(2))}$</span>
              </p>
              <CustomButton
                onClick={() =>
                  navigate("/shop-sweet-escape/checkout-page", {
                    state: goodsStoredInStorage,
                  })
                }
              >
                Placing an order
              </CustomButton>
            </div>
          </ul>
        </div>
      ) : (
        <div className={classes.inCaseOfAnEmptyCart}>
          <h2>There's nothing in your cart</h2>
          <p>Fill it out now!</p>
          <img src={cartEmpty} alt="" />
          <CustomButton onClick={() => navigate("/shop-sweet-escape/menu")}>
            To the menu
          </CustomButton>
        </div>
      )}
    </>
  );
}
