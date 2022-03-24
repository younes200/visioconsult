import React from 'react';
import {
    ReferenceInput,
    SelectInput
  } from "react-admin";
const ListRoles = ({ record = {}, source }) => {
    return(
        <ReferenceInput defaultValue={record.roles && record.roles.length>0 ? record.roles[0].id : ""} label="Role"  source="role" reference="roles">
                            <SelectInput   
                          
                            optionText="name" />
                           </ReferenceInput>
    )
}

export default ListRoles;
