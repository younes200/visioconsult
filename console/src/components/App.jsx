import React, { Component } from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { Route, Link, Switch, withRouter } from "react-router-dom";
import { Admin, Resource, EditGuesser, ListGuesser } from "react-admin";
import LoginPage from "./LoginPage";
import { authClient } from "../authClient";
import restClient from '../restClient';
import createHistory from "history/createBrowserHistory";
import UserIcon from "@material-ui/icons/AccountBox";

// import customRoutes from './customRoutes';
import { UserCreate, UserList, UserEdit, UserShow } from "./Users";
import {PatientSheetList,PatientSheetCreate,PatientSheetShow,PatientSheetEdit} from "./PatientSheet"
import {PatientContactCreate,PatientContactList,PatientContactShow,PatientContactEdit} from "./PatientContact"

import AppBar from "./AppBar"
import { Sidebar, Layout, UserMenu, MenuItemLink } from 'react-admin';

const reducers = {} 
const MySidebar = props => <Sidebar {...props} size={150} width='xs' />;
const MyLayout = props => <Layout {...props} appBar={AppBar}  sidebar={MySidebar}/>;
const history = createHistory();

import blue from '@material-ui/core/colors/blue';
const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      //disableRipple: true
    },
  },
  typography: {
    // In Japanese the characters are usually larger.
    fontSize: 11,
    button: {
      fontSize: "0.7rem"
    }
  },
  palette: {
    primary: {
      main: '#002058'
    },
    secondary: {
      main: '#34a9fe',
    }
  },
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        fontSize: 9,
        '& svg': { fontSize: 14 },
        minWidth: 30
      }
    },
    MuiIconButton: {
      root: { // Name of the rule
        fontSize: 10,
        minWidth: 30
      },
    }
  },

});

// const MySidebar = props => <Sidebar {...props}  width={100} open={false} />;
// const MyLayout = props => <Layout {...props}  sidebar={<MySidebar />}    />;

export default class AdminApp extends Component {



  render() {
    return (
      <Admin
        theme={theme}
        history={history}
        appLayout={MyLayout}
        title="VisioConsult"
        loginPage={LoginPage}
        dataProvider={restClient}
        authProvider={authClient(
          `${process.env.API_URL}/users/login?include=user`
        )}
      >
        <Resource
          options={{ label: "Users" }}
          name="users"
          create={UserCreate}
          list={UserList}
          edit={UserEdit}
          show={UserShow}
          icon={UserIcon}
        />
        <Resource   icon={UserIcon}  list={PatientSheetList}    create={PatientSheetCreate} edit={PatientSheetEdit} show={PatientSheetShow}   name="patientsheets" />
        <Resource   create={PatientContactCreate}  icon={UserIcon}    list={PatientContactList}   edit={PatientContactEdit}  show={PatientContactShow}  name="patientcontacts" />
        
        <Resource name="devices" />
        <Resource name="roles" />
        <Resource name="accessToken"/>

      </Admin>
    );
  }
}
