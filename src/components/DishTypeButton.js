import "./DishTypeButton.css";

function DishTypeButton({imgSource, dishName, onClick}) {
  return (
    <div className="btn-background" onClick={onClick}>
       <input className="btn" alt="iconImage" type="image" src={imgSource} />
       <h5>{dishName}</h5>
    </div>
  );
}

export default DishTypeButton;
