import classes from "./styles/ProdQuantityControl.module.css";
export default function ProdQuantityControl({
  quantityProd,
  callbackFirst,
  callbackSecond,
}) {
  return (
    <div className={classes.productQuantityControl}>
      <button
        onClick={() => {
          if (quantityProd === 1) {
            return;
          }
          callbackFirst();
        }}
      >
        -
      </button>
      <p>{quantityProd}</p>
      <button
        onClick={() => {
          callbackSecond();
        }}
      >
        +
      </button>
    </div>
  );
}
