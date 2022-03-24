import React, { Component } from 'react';
import { connect } from 'react-redux';
import { crudUpdate, SaveButton, Toolbar } from 'react-admin';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import moment from "moment"

class MyCustomDate extends Component {


    render() {
        const { input: { value, onChange } } = this.props

        return (
            <div>
                <DateTimePicker format="DD/MM/YYYY hh:mm" label="travelStartAt" onChange={(e) => onChange(moment(e).toISOString())} value={value} />
            </div>
        )
    }
}


export default MyCustomDate;