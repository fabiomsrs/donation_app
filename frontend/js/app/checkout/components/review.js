import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CieloApiService from '../../../utils/services/CieloApiService'

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function Review(props) {
  const classes = useStyles();

  console.log(props)
  
  
  const products = [
    { name: 'Dízimo', price: props.tithe.value },    
  ];
  
  const payments = [    
    { name: 'Card holder:', detail: props.credit_card.Holder },
    { name: 'Card number:', detail: props.credit_card.CardNumber.replace(/ /g,"") },
    { name: 'Expiry date:', detail: props.credit_card.ExpirationDate },
  ];
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name + ':'} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total:" />
          <Typography variant="subtitle1" className={classes.total}>
            {props.tithe.value}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>        
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  tithe: state.tithe,
  credit_card: state.credit_card
})

export default connect(mapStateToProps)(Review);
