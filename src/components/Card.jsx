import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {PopUpSelection} from '../variables/stateInit'

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: props => props.maxWidth,
    },
    media: {
        height: 220,
    },
    button: {
        width: props => props.maxWidth - 50,
    }
})


function PizzaCard(props){
    const {card, setpopupEnabled, setPopup} = props;
    const handlePopUp = (event) => {
        setPopup({
            ...PopUpSelection,
            selectedPizza: parseInt(event.currentTarget.id, 10)
        });
        setpopupEnabled(true);
        //Reset all state from form
    }
    const classes = useStyles({maxWidth : 345});
    return(
        <Card className= {classes.root}>
            <CardMedia className={classes.media} image={`${process.env.PUBLIC_URL}/img/pizza/${card.img}.png`} title={card.title}/>
            <CardContent style={{flexGrow: "1"}}>
                <Typography gutterBottom variant="h5">
                    {card.title}
                </Typography>
                <Typography variant="h6" color="textPrimary" component="p">
                    {`$${card.price}`}
                </Typography>
            </CardContent>
            <CardActions style={{display: "flex", justifyContent: "center"}}>
                <Button variant="contained" color="primary" className={classes.button} onClick={handlePopUp} id={card.key}>
                    Choose
                </Button>
            </CardActions>
        </Card>
    );
}

export default PizzaCard;