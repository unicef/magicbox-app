import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import ShareIcon from '@material-ui/icons/Share';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ModalInfo from '../ModalInfo';

const styles = theme => ({
  dataInfoContent: {
    height: '100%',
    backgroundColor: '#f1f1f1',
    width: '842px',
    paddingTop: '41px',
  },
  dataInfoContent__tabs: {
    paddingLeft: '46px',
    width: '215px',
    height: '100%',
    float: 'left',
    fontSize: '15px',
    paddingTop: '20px',
  },
  dataInfoContent__content: {
    overflow: 'auto',
    width: '570px',
    height: '90%',
  },
  buttonsArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '72px',
    transform: 'translateX(-100%)',
  },
  button: {
    margin: theme.spacing.unit,
  },
  openExploreButton: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  listItemNormal: {
    '&:hover, &:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      textDecoration: 'underline',
      transform: 'scale(1.05) translateX(3%)',
    },
  },
  listItemSelected: {
    backgroundColor: 'rgba(0, 0, 0, 0) !important',
    textDecoration: 'underline',
    transform: 'scale(1.05) translateX(3%)',
  },
  paper: {
    overflowY: 'visible',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300px',
    padding: theme.spacing.unit * 4,
    outline: 'none',
    transform: 'translate(-50%, -50%)',
  },
});

class DataInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      shareModalOpen: false,
    };
  }

  handleClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  toggleShareModal = () => {
    this.setState(prevState => ({ shareModalOpen: !prevState.shareModalOpen }));
  };

  render() {
    const {
      classes,
      open,
      toggleAction,
      content,
    } = this.props;
    const {
      selectedIndex,
      shareModalOpen,
    } = this.state;

    return (
      <React.Fragment>
        <Modal
          aria-labelledby="Share"
          aria-describedby="Share with your friends"
          open={shareModalOpen}
          onClose={this.toggleShareModal}
        >
          <Paper className={classes.modal}>
            <Typography variant="subtitle1">
              Share Link
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Teste
            </Typography>
            <Button color="secondary">Copy Link</Button>
          </Paper>
        </Modal>
        <Fab
          color="secondary"
          aria-label="Explore"
          className={classes.openExploreButton}
          onClick={toggleAction}
        >
          <MenuIcon />
        </Fab>
        <Drawer
          anchor="right"
          open={open}
          className={classes.dataInfo}
          classes={{ paper: classes.paper }}
          ModalProps={{ onBackdropClick: toggleAction }}
        >
          <div className={classes.buttonsArea}>
            <Fab
              color="secondary"
              aria-label="Close"
              className={classes.button}
              onClick={toggleAction}
            >
              <CloseIcon />
            </Fab>
            <a href="mailto:contact@magicbox.org">
              <Fab
                aria-label="E-mail"
                className={classes.button}
              >
                <EmailIcon />
              </Fab>
            </a>
            <Fab
              aria-label="Share"
              className={classes.button}
              onClick={this.toggleShareModal}
            >
              <ShareIcon />
            </Fab>
          </div>
          <div className={classes.dataInfoContent}>
            <div className={classes.dataInfoContent__tabs}>
              {content.map((item, i) => (
                <ListItem
                  button
                  key={item.order}
                  selected={i === selectedIndex}
                  onClick={event => this.handleClick(event, i)}
                  dense
                  classes={{
                    dense: classes.listItemNormal,
                    selected: classes.listItemSelected,
                  }}
                >
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </div>
            <div className={classes.dataInfoContent__content}>
              <Typography component="span">
                {
                  content.length
                    ? <ModalInfo content={content[selectedIndex]} key={selectedIndex} />
                    : 'Loading...'
                }
              </Typography>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

DataInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  toggleAction: PropTypes.func.isRequired,
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withStyles(styles)(DataInfo);
