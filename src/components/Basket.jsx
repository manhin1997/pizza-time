import { Button, IconButton, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import "./Basket.scss"
import CloseIcon from '@material-ui/icons/Close';
import { Fragment } from "react";
import {pizzaList} from "../variables/pizzaList";

function Basket(props){
    const {basketList, setBasketList} = props;

    function getPizzaSum(){
        let pizzaSum = 0;
        for (let index = 0; index < basketList.length; index++) {
            const pizza = pizzaList.find((x) => x.key === basketList[index].selectedPizza);
            pizzaSum += pizza.price
        }
        return pizzaSum;
    }

    return(
        <Paper elevation={2}>
            <div className="paper">
                <h2>Basket</h2>
                <hr/>
                {
                    //Display only if basket is empty
                    basketList.length === 0 && 
                    <div className="no-items">
                        No items in your basket
                    </div>
                }
                {
                   basketList.length !== 0 &&
                   <List>
                       {basketList.map((basket, index) => <BasketItem key={index} basket={basket} />)}
                   </List>
                }
                
                <hr style={{border: "1px dashed", marginBottom: "10px"}}/>
                <div className="sum">
                    <span style={{float: "left", fontWeight: "bold"}}>Total amount: </span>
                    <span style={{float: "right", fontWeight: "bold"}}>{`$${getPizzaSum()}`}</span>
                </div>
                <div className="ActionArea">
                    <Button variant="contained" color="secondary" style={{width: "100%"}} disabled = {basketList.length === 0}>Checkout</Button>
                </div>
            </div>
        </Paper>
    );

    function BasketItem(props){
    
        const {basket} = props;
        const pizza = pizzaList.find((x) => x.key === basket.selectedPizza);
        return(
            <ListItem>
                <IconButton aria-label="close" style={{marginRight: "10px"}} size="small" onClick={deleteBasketItem} name={props.className}>
                    <CloseIcon/>
                </IconButton>
                <ListItemText style={{marginRight: "10px"}} primary={pizza.title} secondary={
                    <Fragment>
                        Size: {basket.selectedsizes}<br/>
                        {basket.selectedtoppings.length > 0 && 
                        <span>Toppings: <br/>
                        {basket.selectedtoppings.map((topping) => <div style={{marginLeft: "2.5em"}}>{topping}</div>)}</span>}
                    </Fragment>
                }/>
                <div>{`$${pizza.price}`}</div>
            </ListItem>
        );
    
        function deleteBasketItem(){
            const newList = basketList.filter(x => x !== basket);
            setBasketList(newList);
        }
    }

}



export default Basket;