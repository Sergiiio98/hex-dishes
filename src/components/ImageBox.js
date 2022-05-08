import "./ImageBox.css";

function ImageBox() {
  return (
    <div>
        <img className="pizza" alt="Boximage" src={require("../imgs/pizza.png")}></img>
    </div>
  );
}

export default ImageBox;
