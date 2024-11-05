import classes from "./styles/MainPage.module.css";
import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "./UserDataProvider";
import { useNavigate } from "react-router-dom";
import { recomendedProduct } from "./listProducts";
import presentChoco from "./imgs/icons/presentChocolate.jpg";
import presentMaffins from "./imgs/icons/imgPresentProdMuffins.jpg";
import presentMacaron from "./imgs/icons/presentMacaron.jpg";
import presentCakes from "./imgs/icons/presentCakes.png";
import presentCake from "./imgs/icons/presentCake.jpg";
import fraisierCake from "./imgs/icons/сakes.jpg";
import homemadeChoco from "./imgs/icons/homemadeChocolate.jpg";
import craftCandy from "./imgs/icons/craftCandy.jpg";
import macaroonsForCard from "./imgs/icons/presentMacaronForCard.png";
import icoNaturalProduct from "./imgs/icons/ingredients.png";
import icoDelivery from "./imgs/icons/delivery-man.png";
import icoHealth from "./imgs/icons/protection.png";
import user1 from "./imgs/icons/manPhoto.jpg";
import user2 from "./imgs/icons/manPhoto2.jpg";
import user3 from "./imgs/icons/girlPhoto.jpg";
import CustomButton from "./CustomButton";

const arrayPresentProdPhoto = [
  presentCake,
  presentChoco,
  presentMacaron,
  presentMaffins,
];

const dataProductCategories = [
  {
    id: 1,
    nameCategory: "Cakes & Muffins",
    data: "  Our cakes and delicious muffins are famous for their tenderness, charming taste and enchanting aroma. For each person, we will find a way to cook something that will suit him and will not harm his health",
    img: presentCakes,
    types: "cakes",
  },
  {
    id: 2,
    nameCategory: "Cakes",
    data: "If you have a party coming up, or you or your family have a birthday soon, then we suggest you order a cake from us! We will bake a cake with any of your desires to further brighten up your day",
    img: fraisierCake,
    types: "cake",
  },
  {
    id: 3,
    nameCategory: "Chocolate",
    data: "  Want the delicious chocolate of your dreams? We'll help you with that. You can find a diverse selection of our chocolates,  or products from popular companies. But beyond that, you can order your own personal recipe and we'll make it!",
    img: homemadeChoco,
    types: "chocolate",
  },
  {
    id: 4,
    nameCategory: "Candies",
    data: "In addition to all the goodies, we have something that children love very much - Candy. Different flavors, colors, variations we can provide for you. Don't forget that you can order something from your preferences!",
    img: craftCandy,
    types: "candies",
  },
  {
    id: 5,
    nameCategory: "Macaroons",
    data: "Macarons are gourmet desserts consisting of two crispy almond cakes filled with delicate cream, ganache or jam. Their bright colors and diverse flavors, such as vanilla, chocolate, raspberry, or pistachio, make pasta the perfect treat for any occasion",
    img: macaroonsForCard,
    types: "macaroon",
  },
];

export default function MainPage() {
  const navigate = useNavigate();
  const { dataAvailabilityCheck } = useContext(UserDataContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % arrayPresentProdPhoto.length
      );
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={classes.presentingUnit}
        style={{
          backgroundImage: `url(${arrayPresentProdPhoto[currentImageIndex]})`,
        }}
      >
        <div className={classes.decorationBlock}></div>
        <div className={classes.infoBlock}>
          <h1>Welcome to Sweet Escape Cafe!</h1>
          <h2>
            We are glad that you are here and ready to share our story. Our
            store is a corner of sweet happiness, for those who appreciate
            taste, quality and a cozy atmosphere.
          </h2>
          <CustomButton onClick={() => navigate("/shop-sweet-escape/menu")}>
            Order now
          </CustomButton>
        </div>
      </div>

      <div className={classes.listRecomendedProduct}>
        <h2>Try dishes that everyone loves</h2>
        <p>
          perhaps they will be included in the list of your favorite goodies
        </p>
        <ul className={classes.listProduct}>
          {recomendedProduct.map((product) => (
            <li key={product.id} className={classes.listProduct_elem}>
              <div className={classes.wrapperByPhoto}>
                <img
                  src={product.imgProd}
                  alt="product"
                  title="Go to the product page"
                  onClick={() =>
                    dataAvailabilityCheck
                      ? navigate(
                          `/shop-sweet-escape/product/${product.fullName}`
                        )
                      : navigate("/shop-sweet-escape/registration")
                  }
                />
              </div>
              <h3
                title="Go to the product page"
                onClick={() =>
                  dataAvailabilityCheck
                    ? navigate(`/shop-sweet-escape/product/${product.fullName}`)
                    : navigate("/shop-sweet-escape/registration")
                }
              >
                {product.name}
              </h3>

              <p className={classes.price}>{product.price}</p>

              <p className={classes.dataProduct}>{product.data}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.presentGalery}>
        <div className={classes.presentGalery_textBlock}>
          <h2>Look at the products we made ourselves</h2>
          <p>you can also order any product to your taste!</p>
        </div>
        <ul className={classes.presentGalery_listElems}>
          {dataProductCategories.map((obg) => (
            <li className={classes.listElems_elem} key={obg.id}>
              <img src={obg.img} alt="" />
              <div className={classes.infoProduct}>
                <h3>{obg.nameCategory}</h3>
                <p>{obg.data}</p>
                <CustomButton
                  onClick={() => {
                    navigate("/shop-sweet-escape/menu", {
                      state: { types: obg.types, scrollPosition: 1480 },
                    });
                  }}
                >
                  Order
                </CustomButton>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ul className={classes.featuring}>
        <h2>How are we different from others?</h2>
        <div className={classes.featuring_wrapperElem}>
          <li className={classes.featuring_elem}>
            <h3>Natural ingredients</h3>
            <img src={icoNaturalProduct} alt="" />
            <p>
              For the preparation of dishes, we use natural and high-quality
              ingredients tested by experts
            </p>
          </li>
          <li className={classes.featuring_elem}>
            <h3>Fast and safe delivery</h3>
            <img src={icoDelivery} alt="" />
            <p>
              We will deliver your order to any point safe and sound in a short
              time at a low cost
            </p>
          </li>
          <li className={classes.featuring_elem}>
            <h3>For your health</h3>
            <img src={icoHealth} alt="" />
            <p>
              We have products that will not harm your health and support your
              lifestyle
            </p>
          </li>
        </div>
      </ul>

      <div className={classes.reviews}>
        <h2>We hope you will be as happy as our recent customers!</h2>
        <div className={classes.listBlock}>
          <div className={classes.listBlock_comentBlock}>
            <div className={classes.userAccount}>
              <div className={classes.wrapperPhoto}>
                <img src={user1} alt="Cenedi J." />
              </div>
              <h3>Cenedi J.</h3>
            </div>
            <p>
              These brownies are so delicious! I have a lot of blood sugar, but
              these cakes didn't hurt me. Delicate, airy and the cream melts in
              your mouth and smells good! Thank you, I will order more
            </p>
          </div>

          <div className={classes.listBlock_comentBlock}>
            <div className={classes.userAccount}>
              <div className={classes.wrapperPhoto}>
                <img src={user2} alt="Thompson J." />
              </div>
              <h3>Thompson J.</h3>
            </div>
            <p>
              My family and I have come to London to celebrate my son's birthday
              at your establishment! The whole building was literally filled
              with pleasant smells. It was very tasty and more, thank you for
              the gift!
            </p>
          </div>

          <div className={classes.listBlock_comentBlock}>
            <div className={classes.userAccount}>
              <div className={classes.wrapperPhoto}>
                <img src={user3} alt="Mila T." />
              </div>
              <h3>Mila T.</h3>
            </div>
            <p>
              My husband and I are vegans, and we have been looking for a place
              to buy for a long time, but recently we met your café and were in
              seventh place with happiness! Your cupcakes are very tasty and
              fragrant
            </p>
          </div>
        </div>
      </div>
      <div className={classes.ourLocation}>
        <div className={classes.ourLocation_infoLocation}>
          <h2>Our location</h2>
          <p>
            Our stores are located almost all over London, but here is the most
            popular
          </p>
        </div>

        <div className={classes.ourLocation_locationPopularEstablishm}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.889001107581!2d-0.1446150228012483!3d51.51525237181512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad554c335c1%3A0xda2164b934c67c1a!2zT3hmb3JkIFN0LCBMb25kb24sINCS0LXQu9C40LrQvtCx0YDQuNGC0LDQvdC40Y8!5e0!3m2!1sru!2sua!4v1724779657603!5m2!1sru!2sua"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location of our café"
          ></iframe>

          <div className={classes.contactDetails}>
            <h3>Address</h3>
            <p>305 Oxford Street</p>

            <h3>Schedule</h3>
            <p>From 10:00-19:00 days off Saturday-Sunday</p>

            <h3>Contacts</h3>
            <p>+44 20 7946 1234</p>
            <p>sweetesc@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
