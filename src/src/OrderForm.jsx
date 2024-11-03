import { useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import closeModalIco from "./imgs/icons/cross.png";
import deliveryConfirm from "./imgs/icons/delivery-scooter.gif";
import classes from "./styles/OrderForm.module.css";
import ProdQuantityControl from "./ProdQuantityControl";
import CustomButton from "./CustomButton";
import { UserDataContext } from "./UserDataProvider";

export default function OrderForm() {
  const location = useLocation();
  const { userDataFromStorage } = useContext(UserDataContext);
  const modalWindCompletingAnOrder = useRef();
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const patronymicInput = useRef();
  const chengeAdress = useRef();
  const addressUpdateInput = useRef();
  const receivedData = location.state;
  const [activeClass, setActiveClass] = useState(false);
  const [products, setProducts] = useState(
    Array.isArray(receivedData) ? receivedData : []
  );

  const [quantityOfGoods, setQuantityOfGoods] = useState(
    !Array.isArray(receivedData) ? receivedData.quantity : null
  );

  const [productPrice, setProductPrice] = useState(
    !Array.isArray(receivedData) ? receivedData.price : null
  );
  const [userAdress, setUserAdress] = useState(userDataFromStorage.homeAdress);

  const allPrices = products?.map((elem) => elem.price);
  const totalAmount = allPrices?.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (activeClass) {
      chengeAdress.current.style.display = "flex";
    } else {
      chengeAdress.current.style.display = "none";
    }
  }, [activeClass]);

  return (
    <div className={classes.orderingBlock}>
      {!Array.isArray(receivedData) ? (
        <div
          className={classes.orderingBlock_productDataBlock}
          key={receivedData.name}
        >
          <div className={classes.productDataBlock__productInfo}>
            <img src={receivedData.imgProd} alt="" />
            <h3>{receivedData.name}</h3>
            <p>{productPrice}$</p>
            <ProdQuantityControl
              quantityProd={quantityOfGoods}
              callbackFirst={() => {
                setQuantityOfGoods((data) => data - 1);
                setProductPrice((price) => price - receivedData.defPrice);
              }}
              callbackSecond={() => {
                setQuantityOfGoods((data) => data + 1);
                setProductPrice((price) => price + receivedData.defPrice);
              }}
            />
          </div>

          <div className={classes.productDataBlock__checkout}>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label htmlFor="firstName">Your first name</label>
              <input type="text" id="firstName" required ref={firstNameInput} />

              <label htmlFor="lastName">Your last name</label>
              <input type="text" id="lastName" required ref={lastNameInput} />

              <label htmlFor="patronymic">Your patronymic</label>
              <input
                type="text"
                id="patronymic"
                required
                ref={patronymicInput}
              />
              <div className={classes.homeAdressData}>
                <label>Your home address:</label>
                <p>{userAdress}</p>
                <button onClick={() => setActiveClass(!activeClass)}>
                  Change address
                </button>

                <div
                  className={classes.homeAdressData__addressChangeField}
                  ref={chengeAdress}
                >
                  <label htmlFor="adressChengeField">
                    Enter the street name and house number
                  </label>
                  <input
                    type="text"
                    id="adressChengeField"
                    ref={addressUpdateInput}
                  />
                  <button
                    onClick={() => {
                      setUserAdress(addressUpdateInput.current.value);
                      setActiveClass(false);
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>

              <div className={classes.completionOfPayment}>
                <p>
                  For payment:{" "}
                  <span>{parseFloat(productPrice.toFixed(2))}$</span>
                </p>
                <CustomButton
                  onClick={() => {
                    if (
                      firstNameInput.current.value &&
                      lastNameInput.current.value.length &&
                      patronymicInput.current.value.length
                    ) {
                      modalWindCompletingAnOrder.current.style.display = "flex";
                      setTimeout(
                        () =>
                          (modalWindCompletingAnOrder.current.style.display =
                            "none"),
                        7000
                      );
                    }
                  }}
                >
                  Order
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={classes.orderingBlock__wrapper}>
          <ul className={classes.wrapper__productListBlock}>
            {products?.map((prod) => (
              <li className={classes.productListBlock__elem} key={prod.name}>
                <img src={prod.imgProd} alt="" />
                <div className={classes.elem__productInfo}>
                  <h3>{prod.name}</h3>
                  <p className={classes.price}>
                    {parseFloat(prod.price.toFixed(2))}$
                  </p>
                  <ProdQuantityControl
                    quantityProd={prod.quantity}
                    callbackFirst={() => {
                      setProducts((prevProd) =>
                        prevProd.map((product) =>
                          product.name === prod.name
                            ? {
                                ...product,
                                price: product.price - prod.defPrice,
                                quantity: product.quantity - 1,
                              }
                            : product
                        )
                      );
                    }}
                    callbackSecond={() => {
                      setProducts((prevProd) =>
                        prevProd.map((product) =>
                          product.name === prod.name
                            ? {
                                ...product,
                                price: product.price + prod.defPrice,
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
          </ul>

          <div className={classes.productDataBlock__checkout}>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label htmlFor="firstName">Your first name</label>
              <input type="text" id="firstName" required ref={firstNameInput} />

              <label htmlFor="lastName">Your last name</label>
              <input type="text" id="lastName" required ref={lastNameInput} />

              <label htmlFor="patronymic">Your patronymic</label>
              <input
                type="text"
                id="patronymic"
                required
                ref={patronymicInput}
              />
              <div className={classes.homeAdressData}>
                <label>Your home address:</label>
                <p>{userAdress}</p>
                <button onClick={() => setActiveClass(!activeClass)}>
                  Change address
                </button>

                <div
                  className={classes.homeAdressData__addressChangeField}
                  ref={chengeAdress}
                >
                  <label htmlFor="adressChengeField">
                    Enter the street name and house number
                  </label>
                  <input
                    type="text"
                    id="adressChengeField"
                    ref={addressUpdateInput}
                  />
                  <button
                    onClick={() => {
                      setUserAdress(addressUpdateInput.current.value);
                      setActiveClass(false);
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>

              <div className={classes.completionOfPayment}>
                <p>
                  For payment:{" "}
                  <span>{parseFloat(totalAmount.toFixed(2))}$</span>
                </p>
                <CustomButton
                  onClick={() => {
                    if (
                      firstNameInput.current.value &&
                      lastNameInput.current.value.length &&
                      patronymicInput.current.value.length
                    ) {
                      modalWindCompletingAnOrder.current.style.display = "flex";
                      setTimeout(
                        () =>
                          (modalWindCompletingAnOrder.current.style.display =
                            "none"),
                        7000
                      );
                    }
                  }}
                >
                  Order
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      )}
      <div
        className={classes.orderingBlock__modalWindow_completingAnOrder}
        ref={modalWindCompletingAnOrder}
      >
        <button>
          <img
            src={closeModalIco}
            alt=""
            onClick={() =>
              (modalWindCompletingAnOrder.current.style.display = "none")
            }
          />
        </button>
        <img src={deliveryConfirm} alt="" />
        <div className={classes.modalWindow_completingAnOrder__textContent}>
          <h3>The order has been placed!</h3>
          <p>Our counrier will contact you.</p>
          <p>
            If you have any questions, call our main number:{" "}
            <span>+44 20 7946 1234</span>
          </p>
        </div>
      </div>
    </div>
  );
}
