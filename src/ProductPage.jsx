import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import classes from "./styles/ProductPage.module.css";
import cartIcon from "./imgs/icons/shopping-cart.gif";
import closeIco from "./imgs/icons/cross.png";
import ProdQuantityControl from "./ProdQuantityControl";

export default function ProductPage({ arrayProducts }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const modalWindowForCart = useRef();
  const currentProduct = arrayProducts?.find(
    (product) => product.name === name
  );
  const [defPrice, setDefPrice] = useState(currentProduct?.price);
  const [quantity, setQuantity] = useState(1);
  const [activeClassForModalWind, setActiveClassForModalWind] = useState(false);
  const [selectedSupplements, setSelectedSupplements] = useState([]);

  const handleCheckboxChange = (supplement) => {
    const isSelected = selectedSupplements.includes(supplement.id);

    if (isSelected) {
      setSelectedSupplements(
        selectedSupplements.filter((id) => id !== supplement.id)
      );
      setDefPrice((prevPrice) => prevPrice - supplement.price * quantity);
    } else {
      setSelectedSupplements([...selectedSupplements, supplement.id]);
      setDefPrice((prevPrice) => prevPrice + supplement.price * quantity);
    }
  };

  const calculateSupplementsPrice = () => {
    return selectedSupplements.reduce((total, supplementId) => {
      const supplement = currentProduct.supplements.find(
        (supp) => supp.id === supplementId
      );
      return total + (supplement ? supplement.price : 0);
    }, 0);
  };

  const productDataObject = {
    name: currentProduct?.name,
    price: defPrice,
    defPrice: currentProduct?.defprice,
    imgProd: currentProduct?.imgProd,
    quantity: quantity,
    typeProd: currentProduct?.typeProd,
  };

  function sendProductToCart() {
    let allProducts = JSON.parse(localStorage.getItem("product")) || [];

    if (!Array.isArray(allProducts)) {
      allProducts = [];
    }

    const searchForSimilarItem = allProducts.find(
      (elem) => elem.name === currentProduct.name
    );
    if (searchForSimilarItem) {
      searchForSimilarItem.quantity += 1;
      searchForSimilarItem.price += productDataObject.price;
    } else {
      allProducts.push(productDataObject);
    }
    localStorage.setItem("product", JSON.stringify(allProducts));
    setActiveClassForModalWind(true);
    setTimeout(() => setActiveClassForModalWind(false), 5000);
  }

  return (
    <>
      <div className={classes.dataProduct}>
        <div className={classes.dataProduct__incompleteProductDescription}>
          <div className={classes.wrapperPhoto}>
            <img src={currentProduct.imgProd} alt="product" />
          </div>
          <div className={classes.infoBlock}>
            <h2>{currentProduct.name}</h2>
            <p>{currentProduct.data}</p>
          </div>
        </div>

        <div className={classes.dataProduct__extendedData}>
          <ul>
            {currentProduct.ingredients && (
              <>
                <h3>Ingredients</h3>
                {currentProduct.ingredients.map((elem, index) => (
                  <li key={index}>- {elem}</li>
                ))}
              </>
            )}

            {currentProduct.supplements && (
              <>
                <h4>Additions or substitutions of ingredients</h4>
                {currentProduct.supplements.map((elem) => (
                  <li key={elem.id}>
                    <input
                      type="checkbox"
                      id="prodSelection"
                      checked={selectedSupplements.includes(elem.id)}
                      onChange={() => handleCheckboxChange(elem)}
                    />
                    <label htmlFor="prodSelection"> {elem.nameProd}</label>
                  </li>
                ))}
              </>
            )}
          </ul>

          <div className={classes.datProduct__priceBlcok}>
            <p className={classes.priceBlcok__price}>
              Final price:
              <span> {parseFloat(defPrice.toFixed(2))}$</span>
            </p>
          </div>

          <div className={classes.dataProduct__operationsWithGoods}>
            <ProdQuantityControl
              quantityProd={quantity}
              callbackFirst={() => {
                if (quantity > 1) {
                  setQuantity((q) => q - 1);
                  setDefPrice(
                    (prevPrice) =>
                      prevPrice -
                      (currentProduct.price + calculateSupplementsPrice())
                  );
                }
              }}
              callbackSecond={() => {
                setQuantity((q) => q + 1);
                setDefPrice(
                  (prevPrice) =>
                    prevPrice +
                    (currentProduct.price + calculateSupplementsPrice())
                );
              }}
            />

            <div className={classes.goodsProcessingOperations}>
              <button
                onClick={() =>
                  navigate("/shop-sweet-escape/checkout-page", {
                    state: productDataObject,
                  })
                }
              >
                Order
              </button>
              <button onClick={sendProductToCart}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          activeClassForModalWind
            ? classes.modalWindowWhenAddingCart
            : classes.hiddenModalWindow
        }
        ref={modalWindowForCart}
      >
        <div className={classes.content}>
          <button
            onClick={() => setActiveClassForModalWind(false)}
            className={classes.hideModalWind}
          >
            <img src={closeIco} alt="" className={classes.closeModal} />
          </button>
          <img src={cartIcon} alt="" />
          <h2>Item added to cart!</h2>
        </div>
      </div>
    </>
  );
}
