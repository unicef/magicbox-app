import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


const styles = {
  scale: {
    height: '118px',
    width: '291px',
    margin: '0px',
    backgroundColor: '#e3e3e3',
  },
  chip: {
    marginLeft: '22px',
    marginTop: '22px',
    backgroundColor: 'gray',
    width: '242px',
    height: '10px',
    borderRadius: '5px',
    backgroundImage: 'linear-gradient(to right, #e4e6ea, #7280c7 44%, #182fab)',
  },
  title: {
    paddingTop: '17px',
    paddingLeft: '22px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '13px',
    fontWeight: 'bold',
    letterSpacing: '0.9px',
    color: '#000000',
  },
  scaleNumbers: {
    paddingLeft: '22px',
    paddingRight: '60px',
    fontFamily: 'IBM Plex Sans',
    lineHeight: '2.6',
    color: '#000000',
    fontSize: '15px',
  },
};

const SidePanelScale = ({ classes, title }) => (
  <div className={classes.scale}>
    <div className={classes.title}>{title}</div>
    <Chip className={classes.chip} />
    <span className={classes.scaleNumbers}>0.1</span>
    <span className={classes.scaleNumbers}>0.5</span>
    <span className={classes.scaleNumbers}>0.9</span>
  </div>
);

SidePanelScale.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(SidePanelScale);
