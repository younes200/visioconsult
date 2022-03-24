import React,{ Component }from "react";
import {
  Create,
  DeleteButton,
  RefreshButton,
  ListButton,
  BooleanField,
  ImageField,
  CheckboxGroupInput,
  ReferenceManyField,
  FormTab,
  TabbedForm,
  DateInput,
  RadioButtonGroupInput,
  Tab,
  TabbedShowLayout,
  List,
  Datagrid,
  SimpleShowLayout,
  NumberField,
  Filter,
  SaveButton,
  Show,
  FormDataConsumer,
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  LongTextInput,
  DisabledInput,
  ImageInput,
  Toolbar,
  ArrayField,
  ChipField,
  SingleFieldList,
  FunctionField,
  ReferenceField,
  DateField,
  TextField,
  EditButton,
  Labeled,
  RichTextField,
  ShowButton,
} from "react-admin";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import QRCode from 'qrcode.react';
import moment from 'moment';
import {showNotification } from 'react-admin'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchJson, fetch } from '../fetch'
import AccessTokenActions from "./AccessTokenActions"
import ListRoles from "./Inputs/ListRoles"
import UserTabs from "./Inputs/UserTabs"
var momentDurationFormatSetup = require("moment-duration-format");
import DialogQrCode from "./Inputs/DialogQrCode"
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import UsersActions from "./UsersActions"
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Avatar,
  Button,
  Menu,
  IconButton,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListMenu from './ListMenu';

const cardStyle = {
  width: 300,
  maxHeight: 200,
  margin: "0.5em",
  display: "inline-block",
  verticalAlign: "top"
};

const UserGrid = ({ ids, data, basePath }) => (
  <div style={{ margin: "1em" }}>
    {ids.map(id => (
      <Card key={id} style={cardStyle}>
        <CardHeader
          title={
            <FunctionField
              label="Name"
              record={data[id]}
              render={record => `${record.firstname} (${record.username})`}
            />
          }
          subheader={<DateField record={data[id]} source="createdAt" />}
          avatar={<Avatar src={data[id].picture} />}
        />
        <CardContent>
          <NumberField
            label="Rides"
            record={data[id]}
            source="counters.rides.available"
          />
          <NumberField
            label="Test"
            record={data[id]}
            source="counters.rides.available"
          />
        </CardContent>
        {/* <CardContent>
            <TextField record={data[id]} source="bio"/>
        </CardContent> */}
        <CardActions style={{ textAlign: "right" }}>
          <EditButton
            label=""
            resource="users"
            basePath={basePath}
            record={data[id]}
          />
          <ShowButton
            label=""
            resource="users"
            basePath={basePath}
            record={data[id]}
          />
        </CardActions>
      </Card>
    ))}
  </div>
);

UserGrid.defaultProps = {
  data: {},
  ids: []
};

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="firstname" alwaysOn />
  </Filter>
);

const styles = {
  bio: { 
    width: 200,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
};


const userListMenu = (record) => ListMenu({ 
    items: [
      { 
        name:'View', 
        path: `/users/${record.id}/show`
      },
      { 
        name:'Edit', 
        path: `/users/${record.id}`
      }
    ]
})

export const UserCreate = (props) => (
  <Create {...props}>
      <SimpleForm>
          <TextInput source="username" />
          <TextInput source="firstname"/>
          <TextInput source="lastname"/>
          <TextInput source="email" />
          <TextInput source="password" />
      </SimpleForm>
  </Create>
);

export const UserList = props => (
  <List
    title="Users"
    sort={{ field: "createdAt", order: "DESC" }}
    perPage={20}
    filters={<UserFilter />}
    {...props}
  > 
    <Datagrid rowClick="show">
    <TextField source="id" />
      <ImageField source="photo.url" label="Photo" />
      <TextField source="username" />
      <TextField source="firstname"/>
      <TextField source="lastname"/>
      <TextField source="email"  />
      <DateField
        source="updatedAt"
      />
      <DateField
        source="createdAt"
      />
      <ArrayField source="roles">
          <SingleFieldList>
            <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);

const TabPatientSheet = ({ record }) => {
  if(record && record.roles.find(role => role.name == 'patient')) {
    return (
      <Tab label="PatientSheet">
      <ReferenceManyField label="Patient Sheet" reference="patientsheets" target="userId" record={record} basePath={props.basePath} resource={props.resource}>
          <Datagrid rowClick="show">
          <TextField label="Firtname" source="firstname" />
              <TextField label="Lastname" source="lastname" />
              <TextField label="gender" source="gender" />
              <TextField label="Phone" source="phone" />
              <TextField label="Weight" source="weight" />
              <DateField
        source="birthday"
        options={{ month: 'numeric', day: 'numeric', year: 'numeric' }}
      />
              <TextField label="DoctorName" source="doctorName" />
              <TextField label="DoctorPhone" source="doctorPhone" />
              <TextField label="usualPharmacyName" source="usualPharmacyName" />
              <TextField label="usualPharmacyPhone" source="usualPharmacyPhone" />
              <TextField label="pathology" source="pathology" />
              <TextField label="treatment" source="treatment" />
              <TextField label="allergy" source="allergy" />
              <TextField label="adresseStreet" source="adresseStreet" />
              <TextField label="adresseZipcode" source="adresseZipcode" />
              <TextField label="adresseCity" source="adresseCity" />
              <TextField label="additionOfAddressFloor" source="additionOfAddressFloor" />
              <TextField label="additionOfAddressDoor" source="additionOfAddressDoor" />
              <TextField label="additionOfAddressDigiCode" source="additionOfAddressDigiCode" />
              <TextField label="alarmSystem" source="alarmSystem" />
              <TextField label="petsOfCompany" source="petsOfCompany" />  
              <DateField
                source="birthday"
                options={{ month: 'numeric', day: 'numeric', year: 'numeric' }}
              />
              <ShowButton label="" />
          </Datagrid>
      </ReferenceManyField>
       <Button variant="contained" color="primary" href={`/patientsheets/create?userId=${props.id}`}>Ajouter une fiche patient</Button>
      
     
    </Tab>
  )
  }
  return null
  
}

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.firstname}"` : ""}</span>;
};

const required = (message = "Required") => value =>
  value ? undefined : message;
const UserActions = ({ basePath, data, resource }) => (
  <CardActions>
    <EditButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} />
    <RefreshButton />
  </CardActions>
);



export const UserEdit = props => {
  return (
    <Edit  {...props}>
     <TabbedForm 
>
        <FormTab label="Profil">
      
            <DisabledInput label="Id" source="id" />
            <TextInput source="username" validate={required()} />
            <TextInput source="email"/>
            <TextInput source="firstname"/>
            <TextInput source="lastname"/>
            <ImageInput source="photo" label="Photo" accept="image/*">
        <ImageField source="photo.url" title="Photo" />
      </ImageInput>
      <Labeled label="Photo">
        <ImageField source="photo.url"  />
        </Labeled>
       <ListRoles source="role"/>
        </FormTab>
        <FormTab label="Devices">
        </FormTab>
        <FormTab label="AccessToken">
        <AccessTokenActions/>
        <ReferenceManyField reference="accessToken" target="userId">
       
            <Datagrid> 
            <DialogQrCode source="qrcode" /> 
               <FunctionField
            label="ttl"
                        render={record =>  
                          moment.duration(record.ttl, "minutes").format()

                        }           
                />
                <DateField label="Created" source="created"/>
               <UsersActions/>
            </Datagrid> 
        </ReferenceManyField>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};



export const UserShow = props => (
  <Show actions={<UserActions />} title={<UserTitle />} {...props}>
   
    <TabbedShowLayout>

      <Tab label="Profil">
        <TextField  source="email" />
        <TextField source="username" />
        <TextField source="firstname"/>
      <TextField source="lastname"/>
        <ArrayField source="roles">
      
          <SingleFieldList>
            <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
          <Labeled label="Photo">
        <ImageField source="photo.url"  />
        </Labeled>

      </Tab>
      {/* <UserTabs {...props} /> */}
      {/* <TabPatientSheet /> */}
      <Tab label="PatientSheet">
        <ReferenceManyField label="Patient Sheet" reference="patientsheets" target="userId">
            <Datagrid rowClick="show">
            <TextField label="Firtname" source="firstname" />
                <TextField label="Lastname" source="lastname" />
                <TextField label="gender" source="gender" />
                <TextField label="Phone" source="phone" />
                <TextField label="Weight" source="weight" />
                <DateField
          source="birthday"
          options={{ month: 'numeric', day: 'numeric', year: 'numeric' }}
        />
                <TextField label="DoctorName" source="doctorName" />
                <TextField label="DoctorPhone" source="doctorPhone" />
                <TextField label="usualPharmacyName" source="usualPharmacyName" />
                <TextField label="usualPharmacyPhone" source="usualPharmacyPhone" />
                <TextField label="pathology" source="pathology" />
                <TextField label="treatment" source="treatment" />
                <TextField label="allergy" source="allergy" />
                <TextField label="adresseStreet" source="adresseStreet" />
                <TextField label="adresseZipcode" source="adresseZipcode" />
                <TextField label="adresseCity" source="adresseCity" />
                <TextField label="additionOfAddressFloor" source="additionOfAddressFloor" />
                <TextField label="additionOfAddressDoor" source="additionOfAddressDoor" />
                <TextField label="additionOfAddressDigiCode" source="additionOfAddressDigiCode" />
                <TextField label="alarmSystem" source="alarmSystem" />
                <TextField label="petsOfCompany" source="petsOfCompany" />

                <DateField
          source="birthday"
          options={{ month: 'numeric', day: 'numeric', year: 'numeric' }}
        />
                <ShowButton label="" />
            </Datagrid>
        </ReferenceManyField>
        <FunctionField
        label=' '
        render= {record => record.roles.find(role => role.name == 'patient') ? <Button variant="contained" color="primary" href={`/patientsheets/create?userId=${props.id}`}>Ajouter une fiche patient</Button> : null}
        />
       
      </Tab>
      <Tab label="Contacts">
           
        <ReferenceManyField label="PatientContact" reference="patientcontacts" target="userId">
        
            <Datagrid rowClick="show">          
                <TextField label="Firtname" source="firstname" />
                <TextField label="Lastname" source="lastname" />
                <TextField label="Mobile phone" source="mobilePhone" /> 
                <TextField label="Domicile phone" source="domicilePhone" />
                <TextField label="Office phone" source="officePhone" /> 
                <ShowButton label="" />
            </Datagrid>
        </ReferenceManyField>
        <FunctionField
        label=' '
        render= {record => record.roles.find(role => role.name == 'patient') ? <Button variant="contained" color="primary" href={`/patientcontacts/create?userId=${props.id}`}> Ajouter un contact</Button> : null}
        />        
      </Tab>

      <Tab label="Devices">
        <ReferenceManyField reference="devices" target="userId">
            <Datagrid>
                <TextField label="Type" source="type" />
                <TextField label="Last Login" source="updatedAt" />
            </Datagrid>
        </ReferenceManyField>
      </Tab>


      <Tab label="AccessToken">
        <ReferenceManyField reference="accessToken" target="userId">
            <Datagrid>
            <DialogQrCode source="qrcode" /> 
               <FunctionField
            label="ttl"
                        render={record =>  
                          moment.duration(record.ttl, "minutes").format()

                        }           
                />
                <DateField label="Created" source="created"/>
               
            </Datagrid>
        </ReferenceManyField>
      </Tab>

    </TabbedShowLayout>
  </Show>
);
