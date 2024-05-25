import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./foodCard.css";
import { StoreContext } from "../../context/StoreContext";

//this component takes images id name price description all the items from the food_list

const FoodCard = ({ name, id, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-card">
      <div className="food-card-img-container">
        {/* Set the url image */}
        <img className="food-card-img" src={url + "/images/" + image} alt="" />
        {!cartItems[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            alt="add-icon"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="remove-icon"
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="add-icon"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="food-card-info">
        <div className="food-card-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating-star" />
        </div>
        <p className="food-card-desc">{description}</p>
        <p className="food-card-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodCard;
