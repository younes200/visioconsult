import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import EmptyContent from "./components/EmptyContent";
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablePaginationActionsWrapped from './components/TablePaginationActions'
// import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';

// import { unstable_Box as Box } from '@material-ui/core/Box';
import moment from 'moment'

const lightColor = "rgba(255, 255, 255, 0.7)";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#CCD1D1",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  th: {
    fontWeight: "bold",
    color: "#424949",
    width: "25%"
  },
  progress: {
    margin: theme.spacing.unit * 2,
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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  button: {
    marginVertical: 50,
    marginBottom: 50,
  }
});


@withStyles(styles)
@inject("session", "patients")
@observer
class CallContent extends React.Component {
  state = {
    value: 0,
    open: false,
    page: 0,
    rowsPerPage: 3,
  };

  handleClickOpen= () => {
    this.setState({open: true})
  }

  handleClose= () => {
    this.setState({open: false})
    this.props.patients.cancelComment()
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  onMsgCommentChange = (event) =>{
    this.props.patients.setCommentMsg(event.target.value)
  }

  onDateCommentChange = (event) =>{
    this.props.patients.setCommentDate(event.target.value)
  }

  onSubmit = () => { 
    this.props.patients.userCreateComment()
    this.handleClose()
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  renderCommentForm = () => {
    const {classes} = this.props
    const {current} = this.props.patients
    return (
      <div className={[classes.root]}>
    <Button variant="outlined" color="primary" onClick={this.handleClickOpen} className={classes.button}>
      Laisser un commentaire
    </Button>
    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Renseignement de l'état de sante de {current.username}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Veuillez laisser une petite description de l'état de santé du patient
        </DialogContentText>
        <TextField 
           id="outlined-textarea"
           label="Description de l'état de santé"
           placeholder="Saisir la description"
           multiline
           className={[classes.textField]}
           margin="normal"
           variant="outlined"
           onChange={this.onMsgCommentChange}
      />

      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue={this.props.patients.dateComment}
        className={classes.textField}
        onChange = {this.onDateCommentChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Annuler
        </Button>
        <Button disabled={this.props.patients.disabled} onClick={this.onSubmit} color="primary">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  </div>
    )
  }

  renderCommentsList = () => {
    const {classes} = this.props
    const {current,loadingComment} = this.props.patients
    const { rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, current.patientSheet.comments.length - page * rowsPerPage);
      if (current.patientSheet.comments.length > 0 && !loadingComment) {
   
        return (<Paper className={[classes.root, classes.comments]}>
          <Toolbar className={classes.root}>
            <div className={classes.title}>      
              <Typography variant="h6" id="tableTitle">
                Commentaires
              </Typography>    
            </div>
            <div className={classes.spacer} />      
          </Toolbar>
          <Table className={{marginHorizontal: 15,}}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Operateur</CustomTableCell>
                <CustomTableCell>Commentaire</CustomTableCell>
                <CustomTableCell>Date</CustomTableCell>
              </TableRow>
            </TableHead>
           
            <TableBody>
            {current.patientSheet.comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(comment => (
                 <TableRow className={classes.row} key={comment.id}>
                 <CustomTableCell>{comment.operator.username}</CustomTableCell>
                 <CustomTableCell>{comment.message}</CustomTableCell>
                 <CustomTableCell>{moment(comment.date).format('YYYY-MM-DD HH:mm')}</CustomTableCell>
               </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={current.patientSheet.comments.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>)
      } else if(loadingComment) {
        return  <CircularProgress className={classes.progress} />
      }
      return null
  }


  render() {
    const {
      classes,
      patients: { current }
    } = this.props;
   
  
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          {current && current.patientSheet ? (
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
                    Phathologie
                  </TableCell>
                  <TableCell>{current.patientSheet.pathology}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Allergie
                  </TableCell>
                  <TableCell>
                    {current.patientSheet.allergy}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Le nom du docteur
                  </TableCell>
                  <TableCell>
                    {current.patientSheet.doctorName}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Numéro de téléphone du docteur
                  </TableCell>
                  <TableCell>
                    {current.patientSheet.doctorPhone}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Pharmacie habituelle
                  </TableCell>
                  <TableCell>
                    {current.patientSheet.usualPharmacyName}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Numéro de téléphone de la pharmacie
                  </TableCell>
                  <TableCell>
                    {current.patientSheet.usualPharmacyPhone}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row" className={classes.th}>
                    Traitement
                  </TableCell>
                  <TableCell>
                    {current.patientSheet.treatment}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <EmptyContent />
          )}
        </Paper>
        {current.patientSheet ? this.renderCommentsList() : null}        
        {this.renderCommentForm()}        
      </React.Fragment>
    );
  }
}

export default CallContent;
