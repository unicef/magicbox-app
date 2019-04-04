import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MoreInfoIcon from '../MoreInfoIcon/MoreInfoIcon';

const styles = {
  legend: {
    height: '238px',
    width: '291px',
    marginBottom: '5px',
    backgroundColor: '#e3e3e3',
    fontColor: 'black',
  },
  content: {
    marginTop: '22px',
    paddingLeft: '22px',
  },
};

const Legend = ({ classes, text }) => (
  <div className={classes.legend}>
    <MoreInfoIcon style={{ marginLeft: '5px' }} />
    <div className={classes.content}>
      {text}
    </div>
  </div>
);

Legend.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(Legend);
