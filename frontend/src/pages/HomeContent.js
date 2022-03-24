import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { observer, inject } from "mobx-react";
import EmptyContent from "./components/EmptyContent";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = theme => ({
  th: {
    fontWeight: "bold",
    color: "#424949",
    width: "25%"
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  empty: {
    padding: 20
  }
});

@withStyles(styles)
@inject("session", "patients")
@observer
class CallContent extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {
      classes,
      patients: {
        current: { patientSheet }
      }
    } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          {patientSheet ? (
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
                    Ville
                  </TableCell>
                  <TableCell>{patientSheet.adresseCity}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Boulvard
                  </TableCell>
                  <TableCell>{patientSheet.adresseStreet}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Étage
                  </TableCell>
                  <TableCell>
                    {patientSheet.additionOfAddressDigiCode}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Numéro d'appartemant
                  </TableCell>
                  <TableCell>
                    {patientSheet.additionOfAddressDoor}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Code postal
                  </TableCell>
                  <TableCell>{patientSheet.adresseZipcode}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Digicode
                  </TableCell>
                  <TableCell>
                    {patientSheet.additionOfAddressDigiCode}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Système d'alarme
                  </TableCell>
                  <TableCell>
                    {patientSheet.alarmSystem ? "Oui" : "Non"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <EmptyContent />
          )}
        </Paper>
      </React.Fragment>
    );
  }
}

export default CallContent;
