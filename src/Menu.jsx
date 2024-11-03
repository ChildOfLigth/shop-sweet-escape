import { popularProd, candies, chocolate, cake, cakes } from "./listProducts";
import presentPhotoCakes from "./imgs/icons/cakesPresentForMenu.jpg";
import presentPhotoCandies from "./imgs/icons/candiesPresentForMenu.jpg";
import searchIco from "./imgs/icons/magnifying-glass.png";
import classes from "./styles/Menu.module.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDataContext } from "./UserDataProvider";

export default function Menu() {
  const allProducts = [cakes, cake, candies, chocolate];
  const location = useLocation();
  const [productsArray, setProductArray] = useState(allProducts);
  const [indexLi, setIndexLi] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const inputElement = useRef(null);
  const searchIcoElem = useRef(null);
  const { dataAvailabilityCheck } = useContext(UserDataContext);

  function generateLiElementForLists(products) {
    return products.map((elem) => (
      <li
        key={elem.id}
        onClick={() =>
          dataAvailabilityCheck
            ? navigate(`/shop-sweet-escape/product/${elem.name}`)
            : navigate("/shop-sweet-escape/registration")
        }
      >
        <div className={classes.productImgBlock}>
          <img src={elem.imgProd} alt="" />
        </div>
        <div className={classes.productInfo}>
          <h3>
            {elem.name.length >= 30
              ? elem.name.slice(0, 30) + "..."
              : elem.name}
          </h3>
          <p className={classes.price}>{elem.price}$</p>
          <p>{elem.data.slice(0, 100) + "..."}</p>
        </div>
      </li>
    ));
  }

  const filterProductsArrayByCategory = useCallback((category) => {
    setIsSearching(false);
    if (category === "all") {
      setProductArray(allProducts);
      setIndexLi("all");
      return;
    }
    const filterArr = allProducts.map((array) =>
      array.filter((product) => product.typeProd === category)
    );
    setProductArray(filterArr);
    setIndexLi(category);
  }, [allProducts]);

  useEffect(() => {
    if (location.state) {
      filterProductsArrayByCategory(location.state);
    }
  }, [location.state]);

  function searchProductByName() {
    if (inputElement.current.tagName === "INPUT") {
      const currentValue = inputElement.current.value.toLowerCase();
      const filterArrByInputValue = allProducts
        .flat()
        .filter((product) =>
          product.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(currentValue)
          )
        );
      setIsSearching(true);
      setProductArray(filterArrByInputValue);
    }
  }

  return (
    <>
      <div className={classes.presentableUnit}>
        <div className={classes.presentableUnit__card}>
          <div className={classes.wrapperImg}>
            <img src={presentPhotoCakes} alt="" />
          </div>
          <h1>
            A variety of sweets at
            <span> Sweet Escape Cafe</span>
          </h1>
        </div>
        <div className={classes.presentableUnit__card}>
          <div className={classes.wrapperImg}>
            <img src={presentPhotoCandies} alt="" />
          </div>
          <h1>
            <span>Shop-Café Sweet Escape Cafe</span> - will make your dreams
            come true!
          </h1>
        </div>
      </div>

      <div className={classes.popularProducts}>
        <h2>Popular dishes</h2>
        <ul className={classes.popularProducts__listElems}>
          {popularProd.map((elem) => (
            <li
              key={elem.name}
              className={classes.listElems__elem}
              style={{ backgroundImage: `url(${elem.imgProd})` }}
            >
              <div className={classes.elem__productData}>
                <h3>{elem.name}</h3>
                <p>{elem.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.productFinder}>
        <div className={classes.content}>
          <div className={classes.inputBlock}>
            <img src={searchIco} alt="" ref={searchIcoElem} />
            <input
              type="text"
              placeholder="Search"
              className={classes.searchInput}
              ref={inputElement}
              onChange={searchProductByName}
              onClick={() => {
                if (searchIcoElem.current) {
                  searchIcoElem.current.style.opacity = "1";
                }
              }}
              onBlur={() => {
                if (searchIcoElem.current) {
                  searchIcoElem.current.style.opacity = "0.4";
                }
              }}
            />
          </div>

          <ul className={classes.listSortingOptions}>
            <li
              onClick={() => filterProductsArrayByCategory("all")}
              className={
                indexLi === "all"
                  ? `${classes.categoryLink} ${classes.active}`
                  : classes.categoryLink
              }
            >
              All
            </li>
            <li
              onClick={() => filterProductsArrayByCategory("cakes")}
              className={
                indexLi === "cakes"
                  ? `${classes.categoryLink} ${classes.active}`
                  : classes.categoryLink
              }
            >
              Cakes
            </li>
            <li
              onClick={() => filterProductsArrayByCategory("cake")}
              className={
                indexLi === "cake"
                  ? `${classes.categoryLink} ${classes.active}`
                  : classes.categoryLink
              }
            >
              Cake
            </li>
            <li
              onClick={() => filterProductsArrayByCategory("candies")}
              className={
                indexLi === "candies"
                  ? `${classes.categoryLink} ${classes.active}`
                  : classes.categoryLink
              }
            >
              Candies
            </li>
            <li
              onClick={() => filterProductsArrayByCategory("chocolate")}
              className={
                indexLi === "chocolate"
                  ? `${classes.categoryLink} ${classes.active}`
                  : classes.categoryLink
              }
            >
              Chocolate
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.wrapperAllListsProducts}>
        {isSearching ? (
          <div className={classes.wrapperListProds}>
            <h2>Search Results</h2>
            <ul className={classes.listProducts}>
              {generateLiElementForLists(productsArray)}
            </ul>
          </div>
        ) : (
          allProducts.map((_, index) => (
            <div
              key={index}
              className={
                productsArray[index].length !== 0
                  ? classes.wrapperListProds
                  : `${classes.wrapperListProds} ${classes.hidden}`
              }
            >
              <div className={classes.wrapperListProds__textContent}>
                <h2>{["Cakes", "Cake", "Candies", "Chocolate"][index]}</h2>
                <p>
                  {
                    [
                      "Delicate, fluffy cupcakes with a variety of fillings and glazes. The perfect treat to pair with tea!",
                      "Cakes for any celebration from classic recipes to unique flavors with juicy fillings and smooth cream.",
                      "An assortment of candies with nuts, fruits, and creamy fillings. Little delights for every day!",
                      "Our natural chocolate with a rich taste and unique add-ins. Pure enjoyment in every bite!",
                    ][index]
                  }
                </p>
              </div>
              <ul className={classes.listProducts}>
                {generateLiElementForLists(productsArray[index])}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
}