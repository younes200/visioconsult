import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import {  addField } from 'react-admin'
import QRCode from 'qrcode.react';


const styles = theme => ({
  qrcode: {
   textAlign:'center'
  }
 
});

class DialogQrCode extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'sm',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMaxWidthChange = event => {
    this.setState({ maxWidth: event.target.value });
  };

  handleFullWidthChange = event => {
    this.setState({ fullWidth: event.target.checked });
  };

  render() {
    const { classes ,record} = this.props;
    return (
      <React.Fragment>
        <Button   onClick={this.handleClickOpen}>
        <QRCode
                          value={`${record.id}`}
                          size={100}
                          fgColor="#000000"
                          bgColor="#FFFFFF"
                          level='L'
                          renderAs='svg'
                          includeMargin
                        />
        </Button>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Qrcode</DialogTitle>
          <DialogContent className={classes.qrcode} >
          <QRCode
                          value={`${record.id}`}
                          size={300}
                          fgColor="#000000"
                          bgColor="#FFFFFF"
                          level='L'
                          renderAs='svg'
                          includeMargin
                        />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

DialogQrCode.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogQrCode)