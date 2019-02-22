import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class AppBar extends Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad(this.divContainer);
  }

  render() {
    const { classes, title } = this.props;

    return (
      <div className={classes.root} ref={(div) => { this.divContainer = div; }}>
        <MaterialAppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {title}
            </Typography>
          </Toolbar>
        </MaterialAppBar>
      </div>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppBar);
