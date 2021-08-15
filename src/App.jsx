import { useState } from 'react';
import './App.scss';
import PizzaCard from './components/Card';
import SelectPopup from './components/SelectPopup';
import Basket from './components/Basket';
import {PopUpSelection, BasketSelection} from './variables/stateInit';
import {pizzaList} from './variables/pizzaList';
import {IconButton } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  //This state controls the basket button on responsive
  const [basketEnabled, setBasketEnable] = useState(false);

  const showBasket = () => {
    const setbool = !basketEnabled;
    if(setbool){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    setBasketEnable(setbool);
  }

  const matches = useMediaQuery('(min-width:700px)');

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
        <div className = {"Basket " + (basketEnabled && "active")}>

          <Basket setBasketList = {setBasketList} basketList = {basketList}/>
        </div>
        <div className = "Basket-Space"></div>
        {!matches &&
            <IconButton style={{
              backgroundColor: "#f50057", position: "fixed", right: "15px", bottom: "15px", zIndex: "2"
              }} onClick={showBasket}>
                <ShoppingBasketIcon style={{color: "#eeeeee"}}/>
            </IconButton>
        }

      </div>
    </div>
  );
}

export default App;
