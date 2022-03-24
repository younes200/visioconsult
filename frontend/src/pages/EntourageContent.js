



import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Avatar from "@material-ui/core/Avatar";
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { Link } from "react-router-dom";
import {observer, inject} from 'mobx-react';
import Content from './Content'
import green from '@material-ui/core/colors/green';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  th: {
    fontWeight: 'bold',
    color: "#424949",
    width: "25%"
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  empty: {
    padding: 20,
  },
  avatar: {
    margin: 0,
    color: "#fff",
    backgroundColor: green[500]
  },
});

@withStyles(styles)
@inject('session', "patients")
@observer
class CallContent extends React.Component {
  state={
    value: 0
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, patients: { current } } = this.props;
    console.log(current)
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            <TableCell> </TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Type de relation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { current ? current.patientContact.map(contact => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Avatar
                  alt={current.username}
                  src={current.picture}
                  className={classes.avatar}
                  >
                    {current.username[0].toUpperCase()}
                  </Avatar>
                </TableCell>
                <TableCell>{contact.firstname}</TableCell>
                <TableCell>{contact.lastname}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.relationshipType}</TableCell>
              </TableRow>
            ))
          :
          null}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
}
}
 
export default CallContent;
