import { useNavigate } from "react-router-dom";
import classes from "./styles/AboutUs.module.css";
import presentPhoto from "./imgs/icons/presentPhoto.webp";
import happyGirl from "./imgs/icons/happyGirl.avif";
import photoOfCaféPresentation from "./imgs/icons/Konditorei.jpg";
import servicePresentation from "./imgs/icons/present2.jpg";
import CustomButton from "./CustomButton";

export default function AboutUs() {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.ourMission}>
        <div className={classes.ourMission__textPart}>
          <h1>Our Mission</h1>
          <p>
            Our mission is to create unforgettable sweet moments that give Joy
            and warmth to each of our guests. At Sweet Escape Cafe, we strive to
            to offer not just confectionery, but real flavor masterpieces
            prepared with love and care. We believe that every The treat should
            be special, so we use only natural ingredients and put our heart and
            soul into each creation. We want Each visit to us was for you a
            small "sweet escape" from the hustle and bustle and cares, a moment
            of pleasure and comfort.
          </p>
        </div>
      </div>

      <div className={classes.aboutUs}>
        <div className={classes.informationBlock}>
          <div className={classes.informationBlock__textPart}>
            <h2>Our Company</h2>
            <p>
              <span>Sweet Escape Cafe</span> is a place where every dessert is
              created with love and attention to detail. We offer a wide range
              of fresh pastries, from airy cupcakes to unique made-to-order
              cakes and gourmet pastries. All our sweets are made from natural
              ingredients, without the use of artificial additives, so that
              every bite is not only tasty, but also healthy.
            </p>
          </div>
          <img src={presentPhoto} alt="" />
        </div>

        <div className={classes.informationBlock}>
          <img src={photoOfCaféPresentation} alt="" />
          <div className={classes.informationBlock__textPart}>
            <h2>Company history</h2>
            <p>
              The story of <span>Sweet Escape Cafe</span> began with a dream –
              to create a place where Everyone will be able to forget about the
              hustle and bustle of everyday life for a while and immerse
              themselves in the world sweet pleasures. The idea was born from
              our founder, who has always been passionate about the art of
              confectionery Skill. A small home bakery gradually turned into a A
              cozy store with an individual approach to each client. Our The
              team works every day to ensure that your sweet moments have become
              unforgettable.
            </p>
          </div>
        </div>
        <div className={classes.informationBlock}>
          <div className={classes.informationBlock__textPart}>
            <h2>Why choose us?</h2>
            <p>
              At Sweet Escape Cafe, we believe that sweets are not just food,
              they are emotions that you want to give. Therefore, it is
              important for us not only to create delicious desserts, but also
              to create an atmosphere of warmth and hospitality. Our clients
              appreciate us for:
            </p>
            <ul>
              <li>
                <span>Individual approach</span> - from classics to bold taste
                solutions.
              </li>
              <li>
                <span>High quality</span> – we use only proven ingredients.
              </li>
              <li>
                <span>Cozy atmosphere</span> - you can enjoy sweets directly in
                the café or take them with you.
              </li>
            </ul>
          </div>
          <img src={happyGirl} alt="" />
        </div>

        <div className={classes.informationBlock}>
          <img src={servicePresentation} alt="" />
          <div className={classes.informationBlock__textPart}>
            <h2>Come to us!</h2>
            <p>
              Come to <span>Sweet Escape</span> Cafe to enjoy moments of sweet
              joy! We are waiting for you every day at
              <span> 305 Oxford Street</span> and will be happy to become a part
              of your holidays, celebrations and ordinary everyday life.
            </p>
            <CustomButton onClick={() => navigate("/shop-sweet-escape/menu")}>
              Go to order
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
