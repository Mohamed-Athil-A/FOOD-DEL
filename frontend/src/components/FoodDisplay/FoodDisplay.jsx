import { useContext } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodCard from "../FoodCard/FoodCard";

const FoodDisplay = ({ category }) => {
  const { food_list, data } = useContext(StoreContext);
  // console.log(food_list);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {data?.map((list) => {
          if (category === "All" || category === list.category) {
            return (
              <FoodCard
                key={list?._id}
                id={list?._id}
                name={list?.name}
                description={list?.description}
                image={list?.image}
                price={list?.price}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
