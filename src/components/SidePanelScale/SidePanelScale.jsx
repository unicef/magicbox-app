import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  scale: {
    height: '100px',
    width: '300px',
    margin: '0px',
    backgroundColor: 'white',
  },
};

class SidePanelScale extends Component {
  constructor() {
    super();
    this.state = {
      content: 'scale',
    };
  }

  render() {
    const { classes, title } = this.props;
    const { content } = this.state;
    return (
      <div className={classes.scale}>
        <h4>{title}</h4>
        <h4>{content}</h4>
      </div>
    );
  }
}

SidePanelScale.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(SidePanelScale);
