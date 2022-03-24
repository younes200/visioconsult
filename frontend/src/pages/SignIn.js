import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import { Paper} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from "./components/Typography"
import FormFeedback from "./components/FormFeedback"
import TextField from "./components/TextField"
import { withStyles } from '@material-ui/core/styles';
import {observer, inject} from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  paper: {
    maxWidth: 300,
    margin: 'auto',
    overflow: 'hidden',

  },
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center', 
    padding:'auto'
  },
  spinner: {
    margin: 'auto',
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  form: {
    marginTop: theme.spacing.unit * 6,
  },
  button: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1,
  },
  feedback: {
    marginTop: theme.spacing.unit * 2,
  },
  error: {
    backgroundColor: "#EC7063",
  },
  message: {
    // display: 'flex',
    alignItems: 'center',
  },
});

@withStyles(styles)
@inject('session')
@observer
class SignIn extends React.Component {


  onSubmit = async values => {
    await this.props.session.logInWithEmail(values)
  }

  renderSpinner = ()=>{
    const {classes} = this.props
    return (
      <div className={classes.container}>
         <CircularProgress disableShrink className={classes.spinner}/>
      </div>
    )
  }

  render(){
  const { classes, submitting, sent, session } = this.props;
  const { logInWithEmai, authenticating} = session

  if(authenticating) {
    return this.renderSpinner()
  }

  return (
    <div className={classes.container}>
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
      <Form
            onSubmit={this.onSubmit}
            subscription={{ submitting: true }}
            // validate={this.validate}
          >
            {({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoComplete="email"
                  autoFocus
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="username"
                  required
                  size="large"
                  component={TextField}
                />
                <Field
                  fullWidth
                  size="large"
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                  component={TextField}
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <Button
                  variant="contained" color="primary"
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  type="submit"
                  fullWidth
                >
                  {submitting || sent ? 'In progress…' : 'Sign In'}
                </Button>
              </form>
            )}
          </Form>
          
          <Typography
            component={linkProps => (
              <Button
                {...linkProps}
                href="/forgot-password"
              />
            )}
            align="center"
          >
            Forgot password?
          </Typography>   
          
         
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.props.session.isNotOperator}
        autoHideDuration={6000}
        // onClose={handleClose}
      >
    <SnackbarContent
      className={classes.error}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>      
          {this.props.session.roleMessage}
        </span>
      }
    />
    </Snackbar>
       
    </Paper>
    </div>
  );
}
}


export default SignIn