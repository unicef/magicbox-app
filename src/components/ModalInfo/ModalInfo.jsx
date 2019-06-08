import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const marginRightMobile = '1px';
const marginLeftMobile = '15px';
const marginRight = '57px';
const fontSizeMobile = '12px';
const styles = ({
  header: {
    marginRight,
    fontFamily: 'IBM Plex Sans',
    fontSize: '31px',
    lineHeight: '10px',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      lineHeight: '30px',
      fontSize: '18px',
      marginLeft: marginLeftMobile,
      marginRight: marginRightMobile,
    },
  },
  title: {
    marginRight,
    fontFamily: 'IBM Plex Sans',
    fontSize: '22px',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      marginLeft: marginLeftMobile,
      marginRight: marginRightMobile,
      fontSize: fontSizeMobile,
    },
  },
  link: {
    marginRight,
    fontFamily: 'IBM Plex Sans',
    fontSize: '18px',
    textDecoration: 'none',
    color: '#000000',
    '&:hover': {
      textDecoration: 'underline',
    },
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: fontSizeMobile,
      marginLeft: marginLeftMobile,
      marginRight: marginRightMobile,
    },
  },
  text: {
    marginRight,
    fontFamily: 'IBM Plex Sans',
    fontSize: '18px',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: fontSizeMobile,
      marginLeft: marginLeftMobile,
      marginRight: marginRightMobile,
    },
  },
  textGray: {
    marginRight,
    fontFamily: 'IBM Plex Sans',
    fontSize: '18px',
    color: '#828282',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: fontSizeMobile,
      marginLeft: marginLeftMobile,
      marginRight: marginRightMobile,
    },
  },
});

const ModalInfo = ({ classes, content }) => (
  <span className={classes.body}>
    { content && content.content && content.content.map && content.content.map(c => (
      <span key={c.id}>
        { c.header && <p className={classes.header}>{c.header}</p> }
        { c.titleLink && <p><a href={c.href} className={classes.link}>{c.titleLink}</a></p> }
        { c.title && <p className={classes.title}>{c.title}</p> }
        { c.content && <p className={classes.text}>{c.content}</p> }
        { c.emailLink && <a href={c.href} className={classes.link}>{c.emailLink}</a> }
        { c.contentGray && <p className={classes.textGray}>{c.contentGray}</p> }
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
