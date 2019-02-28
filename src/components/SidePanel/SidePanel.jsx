import React, { Component } from 'react';
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
    width: '300px',
  },
  keyboardArrowRight: {
    position: 'fixed',
    zIndex: '1',
    color: 'gray',
    marginTop: '100px',
    marginLeft: '10px',
    paddingTop: '2px',
    paddingBottom: '2px',
    backgroundColor: 'black',
  },
  keyboardArrowLeft: {
    position: 'fixed',
    color: 'gray',
    marginTop: '100px',
    marginLeft: '310px',
    paddingTop: '2px',
    paddingBottom: '2px',
    backgroundColor: 'black',
    zIndex: '1',
  },
  typography: {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '10px',
    textAlign: 'center',
  },
  scale: {
    height: '100px',
    width: '300px',
    margin: '0px',
    backgroundColor: 'white',
  },
};

class SidePanel extends Component {
  constructor() {
    super();
    this.state = {
      openDrawer: true,
    };
  }

  toggleDrawer = () => {
    this.setState(prevState => ({ openDrawer: !prevState.openDrawer }));
  }

  render() {
    const { classes, title } = this.props;
    const { openDrawer } = this.state;
    return (
      <div>
        { openDrawer ? (
          <KeyboardArrowLeft onClick={this.toggleDrawer} className={classes.keyboardArrowLeft} />
        ) : (
          <KeyboardArrowRight onClick={this.toggleDrawer} className={classes.keyboardArrowRight} />
        )}
        <Drawer open={openDrawer} className={classes.drawer} variant="persistent" anchor="left">
          <Typography className={classes.typography}>
            {title}
          </Typography>
          <SidePanelLegend title={title} />
          <SidePanelScale title={title} />
        </Drawer>
      </div>
    );
  }
}

SidePanel.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(SidePanel);
