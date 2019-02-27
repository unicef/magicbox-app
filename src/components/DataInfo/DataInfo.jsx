import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  exploreButton: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    top: 0,
    'z-index': 1,
  },
});

const DataInfo = ({ classes }) => (
  <Fab
    color="secondary"
    aria-label="Explore"
    className={classes.exploreButton}
  >
    <MenuIcon />
  </Fab>
);

DataInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(DataInfo);
