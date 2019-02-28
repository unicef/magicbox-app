import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  dataInfo: {
  },
  closeExploreButton: {
    margin: theme.spacing.unit,
    position: 'absolute',
    left: 0,
    top: 0,
    transform: `translateX(-100%) translate(-${2 * theme.spacing.unit}px)`,
  },
  openExploreButton: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  paper: {
    overflowY: 'visible',
  },
});

const DataInfo = ({ classes, open, toggleAction }) => (
  <React.Fragment>
    <Fab
      color="secondary"
      aria-label="Explore"
      className={classes.openExploreButton}
      onClick={toggleAction}
    >
      <MenuIcon />
    </Fab>
    <Drawer
      anchor="right"
      open={open}
      className={classes.dataInfo}
      classes={{ paper: classes.paper }}
    >
      <Fab
        color="secondary"
        aria-label="Close"
        className={classes.closeExploreButton}
        onClick={toggleAction}
      >
        <CloseIcon />
      </Fab>
      This is just a simple text
    </Drawer>
  </React.Fragment>
);

DataInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  toggleAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataInfo);
