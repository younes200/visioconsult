// in posts.js
import React from 'react'
import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    ImageField,
    UrlField,
    BooleanField,
    EditButton,
    ShowButton,
    SelectField,
    DisabledInput,
    TextInput,
    LongTextInput,
    DateInput,
    NumberField,
    ReferenceManyField,
    Show,
    SimpleShowLayout
} from 'admin-on-rest'

export UserIcon from 'material-ui/svg-icons/action/book'

export const UserIdentityList = props => (
    <List {...props}>
        <Datagrid>
            <ImageField source="profile.photos[0].value" title="Picture" />
            <TextField title="Family Name" source="profile.name.familyName" />
            <TextField tille="Given Name" source="profile.name.givenName" />
            <TextField title="Email" source="profile.emails[0].value" />
            <TextField source="provider" />
            <ShowButton basePath="/userIdentities" />
        </Datagrid>
    </List>
)

const UserIdentityTitle = ({ record }) => {
    return <span>Identity {record ? `"${record.provider}"` : ''}</span>
}

export const UserIdentityShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <BooleanField source="provider" />
            <ImageField source="profile.photos[0].value" title="Picture" />
            <TextField source="profile.name.familyName" />
            <TextField source="profile.name.givenName" />
            <TextField source="externalId" />
            <UrlField source="profileprofileUrl" />
        </SimpleShowLayout>
    </Show>
)
