import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  header: {
    marginLeft: '30px',
    marginRight: '57px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '31px',
  },
  title: {
    marginLeft: '30px',
    marginRight: '57px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '22px',
  },
  text: {
    marginLeft: '30px',
    marginRight: '57px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '18px',
  },
});

const ModalInfo = ({ classes, content }) => (
  <span className={classes.body}>
    { content.content.map(c => (
      <span key={c.id}>
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
