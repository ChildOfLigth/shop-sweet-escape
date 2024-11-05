import classes from "./styles/CustomButton.module.css";

export default function CustomButton({ children, buttonWidth, ...props }) {
  return <button className={classes.customButton} {...props}>{children}</button>;
}