import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {observer, inject} from 'mobx-react';
import EmptyContent from './components/EmptyContent';

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
  }
});

@withStyles(styles)
@inject('session', 'patients')
@observer
class CallContent extends React.Component {
  state={
    value: 0
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, patients: { current: {patientSheet} } } = this.props;
  return (
    <React.Fragment>
      <Paper className={classes.root}>
      { patientSheet ? 
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell align="right">Information</TableCell>    
            </TableRow>
          </TableHead>
        
          <TableBody>           
            <TableRow>
              <TableCell component="th" scope="row" className={classes.th}>
                Prénom
              </TableCell>
              <TableCell>{patientSheet.firstname}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row" className={classes.th}>
                Nom
              </TableCell>
              <TableCell>{patientSheet.lastname}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row" className={classes.th}>
                Age
              </TableCell>
              <TableCell>{patientSheet.age}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row" className={classes.th}>
                Genre
              </TableCell>
              <TableCell>{patientSheet.gender}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row" className={classes.th}>
                Phone
              </TableCell>
              <TableCell>{patientSheet.phone}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row" className={classes.th}>
                birthday
              </TableCell>
              <TableCell>{patientSheet.birthday}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row" className={classes.th}>
                poids
              </TableCell>
              <TableCell>{patientSheet.weight}</TableCell>
            </TableRow>
          
          </TableBody>
        </Table>
        :
        <EmptyContent/>
    }
      </Paper>
    </React.Fragment>
  );
}
}
 
export default CallContent;