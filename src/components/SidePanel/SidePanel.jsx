import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  drawerSide: {
    width: '300px',
  },
  button: {
    textAlign: 'right',
  },
  h4: {
    padding: '20px',
  },
};

class SidePanel extends Component {
  constructor() {
    super();
    this.state = {
      openDrawer: false,
    };
  }

  toggleDrawer() {
    this.setState(prevState => ({ openDrawer: !prevState.openDrawer }));
  }

  render() {
    const { title } = this.props;
    const { openDrawer } = this.state;
    return (
      <div>
        <button onClick={this.toggleDrawer.bind(this)} containerClassName="button" type="button"> Toggle Drawer</button>
        <Drawer open={openDrawer} containerClassName="drawer-side" openSecondary docked>
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
