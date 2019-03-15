import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import HelpIcon from '@material-ui/icons/Help';

const styles = ({
  icon: {
    height: '16px',
    width: '16px',
    marginLeft: '5px',
    marginTop: '1px',
  },
  typography: {
    height: '180px',
    width: '392px',
    fontFamily: 'IBM Plex Sans',
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  paper: {
    borderRight: 'none',
  },
});

class ScaleInfoIcon extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.icon}>
        <HelpIcon
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.icon}
        />
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography className={classes.typography}>The content of the Popover.</Typography>
        </Popover>
      </div>
    );
  }
}

ScaleInfoIcon.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ScaleInfoIcon);
