import { useEffect } from 'react';
import { useState } from 'react';
import './App.scss';
import PizzaCard from './components/Card';
import SelectPopup from './components/SelectPopup';
import Basket from './components/Basket';
import {PopUpSelection, BasketSelection} from './variables/stateInit';
import {pizzaList} from './variables/pizzaList';

//Currently all pizza have the same option list
const OptionList = {
  toppings: ["Pizza Topping #1", "Pizza Topping #2" ,"Pizza Topping #3" 
  ,"Pizza Topping #4" ,"Pizza Topping #5", "Pizza Topping #6", "Pizza Topping #7" ,"Pizza Topping #8" 
  ,"Pizza Topping #9"],
  sizes: ["Pizza Size #1", "Pizza Size #2", "Pizza Size #3"]
}



function App() {
  //This state controls whether the pop-up is open or closed
  const [popupEnabled, setpopupEnabled] = useState(false);
  //This state controls the display and input of the pop-up
  const [popup, setPopup] = useState(PopUpSelection);
  //This state controls the basket's inventory
  const [basketList, setBasketList] = useState(BasketSelection);

  return (
    <div className="App">
      <SelectPopup OptionList = {OptionList} 
      popup = {popup} setPopup = {setPopup} setBasket = {setBasketList} basket = {basketList} 
      popupEnabled = {popupEnabled} setpopupEnabled={setpopupEnabled}/> 
      <div className = "Purchase">
        <div className = "CardGrid">
          {
            pizzaList.map((card) => <PizzaCard key={card.key} card ={card} setpopupEnabled={setpopupEnabled}
            popup = {popup} setPopup = {setPopup}/>)
          }
        </div>
        <div className = "Basket">
          <Basket setBasketList = {setBasketList} basketList = {basketList}/>
        </div>
      </div>
    </div>
  );
}

export default App;
