import React from 'react';
import {
    Tab,
    ReferenceManyField,
    TextField,
    DateField,
    ShowButton,
    Datagrid
  } from "react-admin";
  import {
    Button,
  } from "@material-ui/core";
  import { fetchJson, fetch } from '../../fetch'

  class UserTabs extends React.Component {
    state = {
        user: null,
        isPatient: false
    }
    componentWillMount() {
        console.log(this.props)
        fetchJson(`${process.env.API_URL}/users/${this.props.id}`, { method: 'GET' }).then(
            response => {
                console.log(response.json)
              this.setState({ 
                  isPatient: response.json.roles.find(role => role.name === 'patient'),
                  user: response.json
                })
            }
        )
    }

    render() {
        const {id, basePath, resource} = this.props
        if(!this.state.isPatient) {
             return null
        }
       
        return (            
            <Tab label="PatientSheet">
            <ReferenceManyField label="Patient Sheet" reference="patientsheets" target="userId" resource={resource} basePath={basePath} record={this.state.user}>
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
        <Button variant="contained" color="primary" href={`/patientsheets/create?userId=${id}`}>Ajouter une fiche patient</Button>
        </Tab>       
        )
    }
  }
 
export default UserTabs;
