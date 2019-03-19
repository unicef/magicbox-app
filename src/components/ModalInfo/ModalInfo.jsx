import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  header: {
    marginLeft: '30px',
    marginRight: '30px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '24px',
  },
  title: {
    marginLeft: '30px',
    marginRight: '30px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '22px',
  },
  text: {
    marginLeft: '30px',
    marginRight: '30px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '16px',
  },
});

const ModalInfo = ({ classes, content }) => (
  <span>
    { content.content.map(c => (
      <span>
        { c.header && <p className={classes.header}>{c.header}</p>}
        { c.title && <p className={classes.title}>{c.title}</p>}
        { c.content && <p className={classes.text}>{c.content}</p>}
      </span>
    ))
    }
  </span>
);

ModalInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  content: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ModalInfo);
