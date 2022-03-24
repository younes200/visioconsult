import React from 'react';
import {
    Typography,
    Card,
    CardContent,
    CardMedia,
    Paper,
    CardHeader,
    Grid,
  } from '@material-ui/core'
  import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    ExportButton,
    DateField,
    Toolbar,
    DeleteButton,
    crudCreate,
    SaveButton,
    TextField,
    RefreshButton,
    NumberInput,
    CardActions,
    ListButton,
    UrlField,
    BooleanField,
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
    Labeled,
    ImageField,
    TabbedShowLayout,
    Tab,
    ImageInput
  } from 'react-admin'
  import { DateInput } from 'react-admin-date-inputs'
  import UsersInput from './Inputs/UsersInput'


  export const PatientContactShow = props => (
    <Show   {...props}>
      <TabbedShowLayout>
        <Tab label="summary">
        <TextField label="Firtname" source="firstname" />
        <TextField label="Lastname" source="lastname" />
        {/* <TextField label="Phone" source="phone" /> */}
        <TextField label="Mobile phone" source="mobilePhone" /> 
        <TextField label="Domicile phone" source="domicilePhone" />
        <TextField label="Office phone" source="officePhone" /> 
        <TextField label="relationshipType" source="relationshipType" />
        <Labeled label="Photo">
        <ImageField source="photo.url"  />
        </Labeled>

        </Tab>
     
      </TabbedShowLayout>
    </Show>
  )


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

  
  export const PatientContactList = (props) => (
    <List actions={<ListActions />} {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <ImageField source="photo.url" label="Photo" />
            <TextField label="Firtname" source="firstname" />
            <TextField label="Lastname" source="lastname" />
            {/* <TextField label="Phone" source="phone" /> */}
            <TextField label="Mobile phone" source="mobilePhone" /> 
            <TextField label="Domicile phone" source="domicilePhone" />
            <TextField label="Office phone" source="officePhone" /> 
            <TextField label="relationshipType" source="relationshipType" />

        </Datagrid>
    </List>
);
 

export  const PatientContactCreate = (props) => (
  <Create {...props}>
      <SimpleForm redirect={redirect}>
      <UsersInput  source="userId" />
      <TextInput label="Firtname" source="firstname" />
          <TextInput label="Lastname" source="lastname" />
          <TextInput source="mobilePhone" />
          <TextInput source="domicilePhone" />
          <TextInput source="officePhone" />
          <SelectInput source="relationshipType" choices={[
    { id: 'husband', name: 'Husband' },
    { id: 'brother', name: 'Brother' },
    { id: 'sister', name: 'Sister' },
    { id: 'child', name: 'Child' },
    { id: 'grandchildren', name: 'Grandchildren' },
    { id: 'neighbors', name: 'Neighbors' },
    { id: 'guardian', name: 'Guardian' },
    { id: 'other', name: 'Other' }
]} />
      </SimpleForm>
  </Create>
);

  const redirect = (basePath, id, data) => `/patientcontacts/${id}/show`;
  export const PatientContactEdit = props => (
    <Edit     {...props}>
   <SimpleForm redirect={redirect}>
<Tab label="summary">
          <TextInput label="Firtname" source="firstname" />
          <TextInput label="Lastname" source="lastname" />
          <TextInput label="Mobile phone" source="mobilePhone" />
          <TextInput label="Domicile phone" source="domicilePhone" />
          <TextInput label="Office phone" source="officePhone" />
          <ImageInput source="photo" label="Image" accept="image/*">
          <ImageField source="photo.url" label="Photo" />
</ImageInput>
<Labeled label="Photo">
    <ImageField source="photo" title="image" />
    </Labeled>

          <SelectInput source="relationshipType" choices={[
    { id: 'husband', name: 'Husband' },
    { id: 'brother', name: 'Brother' },
    { id: 'sister', name: 'Sister' },
    { id: 'child', name: 'Child' },
    { id: 'grandchildren', name: 'Grandchildren' },
    { id: 'neighbors', name: 'Neighbors' },
    { id: 'guardian', name: 'Guardian' },
    { id: 'other', name: 'Other' }
]} />
        </Tab>
        </SimpleForm>
    </Edit>
    
  )