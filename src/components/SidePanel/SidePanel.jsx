import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import SidePanelLegend from '../SidePanelLegend';
import SidePanelScale from '../SidePanelScale';


const styles = {
  root: {
    flexGrow: 1,
  },
  drawer: {
    width: '291px',
    borderRightWidth: '0px',
  },
  keyboardArrowRight: {
    position: 'fixed',
    zIndex: '1',
    color: 'gray',
    marginTop: '73px',
    marginLeft: '10px',
    height: '38px',
    width: '22px',
    paddingTop: '2px',
    paddingBottom: '2px',
    backgroundColor: '#000000',
    transition: 'ease',
  },
  keyboardArrowLeft: {
    position: 'fixed',
    color: 'gray',
    marginTop: '73px',
    marginLeft: '291px',
    height: '38px',
    width: '22px',
    backgroundColor: '#000000',
    zIndex: '1',
  },
  typography: {
    fontSize: '16px',
    fontWeight: 'bold',
    height: '57px',
    textAlign: 'center',
  },
  paper: {
    borderRight: 'none',
  },
};

const SidePanel = ({
  classes,
  open,
  title,
  toggleAction,
}) => (
  <div>
    { open ? (
      <KeyboardArrowLeft onClick={toggleAction} className={classes.keyboardArrowLeft} />
    ) : (
      <KeyboardArrowRight onClick={toggleAction} className={classes.keyboardArrowRight} />
    ) }
    <Drawer open={open} className={classes.drawer} classes={{ paper: classes.paper }} variant="persistent" anchor="left">
      <Typography className={classes.typography}>
        {title}
      </Typography>
      <SidePanelLegend title={title} />
      <SidePanelScale title={title} />
    </Drawer>
  </div>
);

SidePanel.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  toggleAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(SidePanel);
