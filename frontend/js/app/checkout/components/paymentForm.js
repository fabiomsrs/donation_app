import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { connect } from 'react-redux';
import CieloApiService from '../../../utils/services/CieloApiService'
import * as creditCardActions from '../../../actions/credit_card'


class PaymentForm extends React.Component{
  
  constructor(props){    
    super(props)
    const selectedDate = new Date()
    const initialState = {        
        credit_card: {
          Holder: "",
          CardNumber: "",
          ExpirationDate: (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear(),
          SecurityCode: "",
        }
      }
    this.state = initialState 
  }  

  componentDidMount(){      
    if(this.props.credit_card.length != 0){
      this.setState({        
        credit_card: this.props.credit_card
      })
      this.selectedDate = new Date(this.props.credit_card.ExpirationDate.replace('/','/1/'))
    }else{
      this.props.addCreditCard(this.state.credit_card) 
    }
  }

  async handleCardChange(event){
    const { name, value } = event.target
    await this.setState({
      credit_card: {...this.state.credit_card, [name]: value}
    })    
    this.props.addCreditCard(this.state.credit_card)
  }

  async handleDateChange(event){
    this.selectedDate = event
    await this.setState({
      credit_card: {...this.state.credit_card, 'ExpirationDate': (event.getMonth() + 1) + '/' + event.getFullYear()}
    })    
    this.props.addCreditCard(this.state.credit_card)
  }

  render(){
    const { Holder,CardNumber,ExpirationDate,SecurityCode } = this.state.credit_card
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required 
              id="Holder" 
              name="Holder" 
              label="Name on card" 
              fullWidth
              value={Holder}
              onChange={this.handleCardChange.bind(this)}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="CardNumber"
              name="CardNumber"
              label="Card number"
              value={CardNumber}
              fullWidth
              locale="pt-BR"
              autoComplete="cc-number"              
              onChange={this.handleCardChange.bind(this)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker required 
              id="ExpirationDate"
              name="ExpirationDate"
              label="Expiry date" 
              views={["year", "month"]}
              fullWidth 
              clearable
              value={this.selectedDate}
              placeholder="10/2018"                        
              format="MM/yyyy"                        
              onChange={this.handleDateChange.bind(this)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="SecurityCode"
              name="SecurityCode"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              value={SecurityCode}              
              onChange={this.handleCardChange.bind(this)}
            />
          </Grid>        
        </Grid> 
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(creditCardActions, dispatch)
const mapStateToProps = state => ({
  tithe: state.tithe,
  credit_card: state.credit_card
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);