import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';

const styles = theme => ({
    empty: {
        padding: 20,
      }
});
 

function EmptyContent(props) {
  const { classes } = props;
  return (
    <div className={classes.empty}>
        <Typography variant="h5" component="h3" color="textSecondary">
          Fiche patient n'est pas renseignée.
        </Typography>
      </div>
  );
}

EmptyContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmptyContent);