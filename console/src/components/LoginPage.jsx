import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Avatar, Card, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/LockOutlined';

import {Notification, defaultTheme} from 'ra-ui-materialui';

import DefaultLoginForm from './LoginForm';

import Logo from "../images/logo.png"

const styles = theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '1px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#002058'
    },
    paper: {
      marginTop: theme.spacing.unit * 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px`,
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary[500],
    },
    logo: {
        marginTop: '6em',
        width: 100,
        padding: 10
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
      },
});

const sanitizeRestProps = ({
    classes,
    className,
    location,
    title,
    array,
    theme,
    staticContext,
    ...rest
}) => rest;

/**
 * A standalone login page, to serve as authentication gate to the admin
 *
 * Expects the user to enter a login and a password, which will be checked
 * by the `authProvider` using the AUTH_LOGIN verb. Redirects to the root page
 * (/) upon success, otherwise displays an authentication error message.
 *
 * Copy and adapt this component to implement your own login logic
 * (e.g. to authenticate via email or facebook or anything else).
 *
 * @example
 *     import MyLoginPage from './MyLoginPage';
 *     const App = () => (
 *         <Admin loginPage={MyLoginPage} authProvider={authProvider}>
 *             ...
 *        </Admin>
 *     );
 */
const Login = ({ classes, className, loginForm, ...rest }) => (
    <div
        className={classnames(classes.main, className)}
        {...sanitizeRestProps(rest)}
    >
        <img src={Logo} className={classes.logo} />
        <Paper className={classes.paper}>
            {loginForm}
        </Paper>
        <Notification />
    </div>
);

Login.propTypes = {
    className: PropTypes.string,
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    input: PropTypes.object,
    meta: PropTypes.object,
    previousRoute: PropTypes.string,
    loginForm: PropTypes.element,
};

Login.defaultProps = {
    theme: defaultTheme,
    loginForm: <DefaultLoginForm />,
};

export default withStyles(styles)(Login);