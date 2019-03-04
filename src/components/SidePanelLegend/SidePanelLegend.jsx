import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Instructions from './Instructions_icon.svg';

const styles = {
  legend: {
    height: '238px',
    width: '291px',
    marginBottom: '5px',
    backgroundColor: '#e3e3e3',
    fontColor: 'black',
  },
  image: {
    paddingTop: '30px',
    paddingLeft: '96px',
  },
  content: {
    marginTop: '22px',
    paddingLeft: '22px',
  },
};

const SidePanelLegend = ({ classes }) => (
  <div className={classes.legend}>
    <img src={Instructions} alt="Pointer clicking on country outlined in red" className={classes.image} />
    <div className={classes.content}>
      Click on the countries with a red outline to explore the HDI at municipality level.
    </div>
  </div>
);

SidePanelLegend.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(SidePanelLegend);
