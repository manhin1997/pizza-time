import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {Button, Checkbox, Dialog, DialogActions, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Radio, RadioGroup}  from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { pizzaList } from '../variables/pizzaList';

const DialogTitle = ((props) => {
    const { children, onClose, ...other } = props;
    return (
      <MuiDialogTitle  {...other} style={{position: "relative"}}>
        {children}
        <IconButton aria-label="close" onClick={onClose} style={{position: "absolute", right: "10px", top: "10px"}}>
        <CloseIcon/>
        </IconButton>
      </MuiDialogTitle>
    );
});

function SelectPopup(props){
    const {OptionList, popup, setPopup, setBasket, basket, popupEnabled, setpopupEnabled} = props;
    const handleToppingsChange = (event) => {
        if(event.target.checked){
            setPopup({
                ...popup,
                selectedtoppings: [event.target.name, ...popup.selectedtoppings]
            });
        }
        else{
            let currentToppings = popup.selectedtoppings.filter(x => x !== event.target.name);
            setPopup({
                ...popup,
                selectedtoppings: currentToppings
            });
        }
    }
    const handleSizeChange = (event) => {
        setPopup({
            ...popup,
            selectedsizes: event.target.name
        });
    }

    const submitPopupResult = (event) => {
        setBasket(
            [...basket, popup]
        );
        setpopupEnabled(false);
    }

    const closePopUp = (event) => {
        setpopupEnabled(false);
    }

    const pizza = pizzaList.find(pizza => pizza.key === popup.selectedPizza);


    
    return(
        <Dialog fullWidth={true} open={popupEnabled}>
            <DialogTitle id="customized-dialog-title" onClose={closePopUp}>
                {pizza && pizza.title}
            </DialogTitle>
            <FormControl style = {{margin: "15px"}}>
                <FormLabel component="legend">Toppings</FormLabel>
                <FormGroup aria-label="toppings" name="toppings" 
                style={{marginBottom : "15px", display: "grid", gridTemplateColumns: "auto auto auto"}}>
                {
                    OptionList.toppings.map((topping) => <FormControlLabel key={topping} value={topping} label={topping} 
                    control={<Checkbox checked={popup.selectedtoppings.includes(topping)} onChange={handleToppingsChange} name={topping}/>}/>)
                }
                </FormGroup>
                <FormLabel component="legend">Sizes</FormLabel>
                <RadioGroup aria-label="sizes" name="sizes" style={{marginBottom : "15px"}}>
                {
                    OptionList.sizes.map((size) => <FormControlLabel key={size} value={size} label={size} 
                    control={<Radio checked={popup.selectedsizes === size} onChange={handleSizeChange} name={size}/>}/>)
                }
                </RadioGroup>
            </FormControl>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={submitPopupResult}>Submit</Button>
            </DialogActions>

        </Dialog>
    )
}

export default SelectPopup;