import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';


const styles = {
  root: {
    flexGrow: 1,
  },
  drawerSide: {
    width: '300px',
  },
  keyboardArrowRight: {
    zIndex: '10000',
  },
};

class SidePanel extends Component {
  constructor() {
    super();
    this.state = {
      openDrawer: false,
    };
  }

  toggleDrawer = () => {
    this.setState(prevState => ({ openDrawer: !prevState.openDrawer }));
  }

  render() {
    const { title } = this.props;
    const { openDrawer } = this.state;
    return (
      <div>
        <KeyboardArrowRight onClick={this.toggleDrawer} color="secondary" />
        <Drawer open={openDrawer} containerClassName="drawer-side" openSecondary docked>
          <KeyboardArrowLeft onClick={this.toggleDrawer} color="secondary" />
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Drawer>
      </div>
    );
  }
}

SidePanel.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(SidePanel);
