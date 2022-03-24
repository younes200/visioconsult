import React from 'react';
import {
    Typography,
    Card,
    CardContent,
    CardMedia,
    Paper,
    CardHeader,
    Button,
    Grid,
  } from '@material-ui/core'
  import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    Toolbar,
    ExportButton,
    DeleteButton,
    crudCreate,
    BooleanInput,
    SaveButton,
    TextField,
    ImageField,
    RefreshButton,
    NumberInput,
    CardActions,
    ListButton,
    UrlField,
    BooleanField,
    ImageInput,
    EditButton,
    ShowButton,
    SelectField,
    DisabledInput,
    RadioButtonGroupInput,
    TextInput,
    LongTextInput,
    NumberField,
    UPDATE,
    ReferenceField,
    ReferenceManyField,
    ReferenceArrayField,
    FunctionField,
    SelectInput,
    Filter,
    Show,
    TabbedShowLayout,
    Tab
   
  } from 'react-admin'
  import { DateInput } from 'react-admin-date-inputs'
  import UsersInput from './Inputs/UsersInput'
  import { unparse as convertToCSV } from 'papaparse/papaparse.min';


  
  export const PatientSheetCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>
        <UsersInput  source="userId" />
            <TextInput label="Prénom" source="firstname" />
            <TextInput label="Nom" source="lastname" />
            <RadioButtonGroupInput
            source="gender"
            choices={[{ id: 'male', name: 'Male' }, { id: 'female', name: 'Female' }]}
          />
           <TextInput label="Téléphone" source="phone" />
           <TextInput label="Poids" source="weight" />
           <TextInput label="Taille" source="height" />
                <DateInput
                label="Date de naissance"
          source="birthday"
          options={{ month: 'numeric', day: 'numeric', year: 'numeric' }}
        />
                <TextInput label="Nom du docteur" source="doctorName" />
                <TextInput label="Téléphone du docteur" source="doctorPhone" />
                <TextInput label="Pharmacie habituelle" source="usualPharmacyName" />
                <TextInput label="Téléphone de la pharmacie" source="usualPharmacyPhone" />
                <TextInput label="pathologie" source="pathology" />
                <TextInput label="Traitement" source="treatment" />
                <TextInput label="allergie" source="allergy" />
                <TextInput label="Rue" source="adresseStreet" />
                <TextInput label="Code zip" source="adresseZipcode" />
                <TextInput label="Ville" source="adresseCity" />
                <TextInput label="Étage" source="additionOfAddressFloor" />
                <NumberInput label="Numéro de la porte" source="additionOfAddressDoor" />
                <NumberInput label="DigiCode" source="additionOfAddressDigiCode" />
                <BooleanInput label="Système de l'alarme" source="alarmSystem" />


                <TextInput label="Animaux de la compagnie" source="petsOfCompany" />
        </SimpleForm>
    </Create>
);

const ListActions = ({
  currentSort,
  exporter,
  filterValues,
  resource,
  total
}) => (
  <CardActions>     
      <ExportButton
          disabled={total === 0}
          resource={resource}
          sort={currentSort}
          filter={filterValues}
          exporter={exporter}
      />
      
  </CardActions>
);

export const PatientSheetList = (props) => (
  <List actions={<ListActions />} {...props}>
      <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField label="Prénom" source="firstname" />
        <TextField label="Nom" source="lastname" />
       

      </Datagrid>
  </List>
);
export const PatientSheetShow = props => (
    <Show redirect={redirect}   {...props}>
      <TabbedShowLayout>
        <Tab label="summary">
        <TextField label="userId" source="userId" />
        <TextField label="Prénom" source="firstname" />
        <TextField label="Nom" source="lastname" />
                <TextField label="Genre" source="gender" />
                <TextField label="Téléphone" source="phone" />
                <TextField label="Poids" source="weight" />
                <TextField label="Taille" source="height" />
                <DateField
          source="Date de naissance"
          options={{ month: 'numeric', day: 'numeric', year: 'numeric' }}
        />


                <TextField label="Nom de docteur" source="doctorName" />
                <TextField label="Téléphone du docteur" source="doctorPhone" />
                <TextField label="Pharmacie habituelle" source="usualPharmacyName" />
                <TextField label="Téléphone de la pharmacie" source="usualPharmacyPhone" />
                <TextField label="Phathologie" source="pathology" />
                <TextField label="Traitement" source="treatment" />
                <TextField label="Allergie" source="allergy" />
                <TextField label="Rue" source="adresseStreet" />
                <TextField label="Code zip" source="adresseZipcode" />
                <TextField label="Ville" source="adresseCity" />
                <TextField label="Étage" source="additionOfAddressFloor" />
                <TextField label="Numéro de la porte" source="additionOfAddressDoor" />
                <TextField label="Digicode" source="additionOfAddressDigiCode" />
                <BooleanField label="Système de l'alarme" source="alarmSystem" />

                <TextField label="Animaux de la compagnie" source="petsOfCompany" />


        </Tab>
  

      </TabbedShowLayout>
    </Show>
  )
  const redirect = (basePath, id, data) => `/patientsheets/${id}/show`;

  export const PatientSheetEdit = props => (
    <Edit   {...props}>
    <SimpleForm redirect={redirect} >
<Tab label="summary">
<UsersInput   {...props} source="userId" />
          <TextInput label="Prénom" source="firstname" />
          <TextInput label="Nom" source="lastname" />
          <TextInput label="Numéro de téléphone" source='phone' />
          <DateInput label="Date de naissance" source="birthday" options={{ format: 'dd/MM/YYYY' }} />
          <RadioButtonGroupInput
            source="gender"
            choices={[{ id: 'male', name: 'Male' }, { id: 'female', name: 'Female' }]}
          />
          <NumberInput label="Poids" source="weight"  />
                <TextInput label="Taille" source="height" />
                <TextInput label="Nom de docteur" source="doctorName" />
                <TextInput label="Téléphone du docteur" source="doctorPhone" />
                <TextInput label="Pharmacie habituelle" source="usualPharmacyName" />
                <TextInput label="Téléphone de la pharmacie" source="usualPharmacyPhone" />
                <TextInput label="Pathologie" source="pathology" />
                <TextInput label="Traitement" source="treatment" />
                <TextInput label="allergie" source="allergy" />
                <TextInput label="Rue" source="adresseStreet" />
                <TextInput label="Code zip" source="adresseZipcode" />
                <TextInput label="Ville" source="adresseCity" />
                <TextInput label="Étage" source="additionOfAddressFloor" />
                <TextInput label="Numéro de la porte" source="additionOfAddressDoor" />
                <TextInput label="DigiCode" source="additionOfAddressDigiCode" />
                <BooleanInput label="Système de l'alarme" source="alarmSystem" />
                <TextInput label="Animaux de la compagnie" source="petsOfCompany" />
        </Tab>
        </SimpleForm>
    </Edit>
    
  )