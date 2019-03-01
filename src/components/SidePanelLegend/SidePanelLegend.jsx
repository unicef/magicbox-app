import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  legend: {
    height: '238px',
    width: '291px',
    marginBottom: '5px',
    backgroundColor: '#e3e3e3',
    fontColor: 'black',
  },
};

class SidePanelLegend extends Component {
  constructor() {
    super();
    this.state = {
      content: 'legend',
    };
  }

  render() {
    const { classes, title } = this.props;
    const { content } = this.state;
    return (
      <div className={classes.legend}>
        <h4>{title}</h4>
        <h4>{content}</h4>
      </div>
    );
  }
}

SidePanelLegend.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(SidePanelLegend);
