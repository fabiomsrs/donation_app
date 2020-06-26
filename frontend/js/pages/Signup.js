import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { Link as LinkMaterialUI } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

import FormValidator from '../utils/FormValidator'
import ApiService from '../utils/services/ApiService'

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.inputListener = this.inputListener.bind(this)
    this.validator = new FormValidator([
      {
        field: 'first_name',
        method: 'isEmpty',
        valid_if: false,
        message: 'Campo nome vazio'
      },
      {
        field: 'last_name',
        method: 'isEmpty',
        valid_if: false,
        message: 'Campo sobrenome vazio'
      },
      {
        field: 'email',
        method: 'isEmail',
        valid_if: true,
        message: 'Campo email invalido'
      },
      {
        field: 'confirm_email',
        method: 'equals',        
        is_comparison: true,
        valid_if: true,
        message: 'Campo confirmação de email invalida'
      },
      {
        field: 'password',
        method: 'isEmpty',
        valid_if: false,
        message: 'Campo senha vazio'
      },
      {
        field: 'confirm_password',
        method: 'equals',        
        is_comparison: true,
        valid_if: true,
        message: 'Campo confirmação de senha invalido'
      },
    ]);
    this.initState = {
      first_name: "",
      last_name: "",
      email: "",
      confirm_email: "",
      password: "",
      confirm_password: "",
      validation: this.validator.valid(),
    }
    this.state = this.initState
  }

  inputListener(event) {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  submit() {
    const validation = this.validator.validate(this.state)
    if (validation.isValid) {
      const body = {
        first_name : this.state.first_name, 
        last_name : this.state.last_name,
        email : this.state.email,
        password : this.state.password
      }
      console.log(body)
      ApiService.createUser(body).then(res => {
        this.setState(this.initState)
      });
    }
    else {
      const { first_name, last_name, email, confirm_email, password, confirm_password } = validation;
      const fields = [first_name, last_name, email, confirm_email, password, confirm_password];
      const invalidFields = fields.filter(elem => {
        return elem.isInvalid;
      })
      console.log(invalidFields)
    }
  }


  render() {

    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <IconButton color="secondary" to="/">
                <Link
                  color="inherit"                  
                  to='/'>
                  <HomeIcon></HomeIcon>
                </Link>
              </IconButton>
            </Grid>
          </Grid>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="first_name"
                  value={this.state.first_name}
                  variant="outlined"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  onChange={this.inputListener}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="last_name"
                  value={this.state.last_name}
                  label="Last Name"
                  name="last_name"
                  autoComplete="lname"
                  onChange={this.inputListener}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  value={this.state.email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.inputListener}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="confirm_email"
                  value={this.state.confirm_email}
                  label="Confirm Email Address"
                  name="confirm_email"
                  autoComplete="email"
                  onChange={this.inputListener}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  autoComplete="current-password"
                  onChange={this.inputListener}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  value={this.state.confirm_password}
                  autoComplete="current-password"
                  onChange={this.inputListener}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <LinkMaterialUI color="inherit" href="https://material-ui.com/">
              Your Website
            </LinkMaterialUI>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SignUp)