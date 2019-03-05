import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import SidePanelLegend from '../SidePanelLegend';
import SidePanelScale from '../SidePanelScale';
import SidePanelHeader from '../SidePanelHeader';

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
  paper: {
    borderRight: 'none',
    backgroundColor: '#292929',
  },
};

const SidePanel = ({
  classes,
  open,
  toggleAction,
  content,
}) => (
  <div>
    { open ? (
      <KeyboardArrowLeft onClick={toggleAction} className={classes.keyboardArrowLeft} />
    ) : (
      <KeyboardArrowRight onClick={toggleAction} className={classes.keyboardArrowRight} />
    ) }
    <Drawer open={open} className={classes.drawer} classes={{ paper: classes.paper }} variant="persistent" anchor="left">
      <SidePanelHeader />
      <SidePanelLegend text={content.legend.text} />
      <SidePanelScale title={content.scale.title} range={content.scale.range} />
    </Drawer>
  </div>
);

SidePanel.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  content: PropTypes.shape({}).isRequired,
  toggleAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(SidePanel);
