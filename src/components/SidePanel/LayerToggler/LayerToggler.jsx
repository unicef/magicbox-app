import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setVisibleLayers } from '../../../actions';

const styles = theme => ({
  root: {
    backgroundColor: '#e3e3e3',
    height: '238px',
    width: '291px',
    margin: `${theme.spacing.unit}px 0`,
    padding: theme.spacing.unit,
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
});

class LayerToggler extends Component {
  constructor(props) {
    super(props);

    const selectedValue = props.layers[0].id;

    this.state = {
      selectedValue,
    };

    props.selectLayer(selectedValue);
  }

  handleChange = (event) => {
    const {
      selectLayer,
    } = this.props;

    this.setState({
      selectedValue: event.target.value,
    }, () => {
      const { selectedValue } = this.state;
      selectLayer(selectedValue);
    });
  };

  render() {
    const {
      classes,
      title,
      layers,
    } = this.props;
    const {
      selectedValue,
    } = this.state;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend" className={classes.title}>{title}</FormLabel>
          <RadioGroup
            aria-label={title}
            name={`layer-selector-${title}`}
            value={selectedValue}
            onChange={this.handleChange}
          >
            {
              layers.map(layer => (
                <FormControlLabel
                  value={layer.id}
                  control={<Radio />}
                  label={layer.label}
                  key={layer.id}
                />
              ))
            }
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

LayerToggler.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  selectLayer: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  selectLayer: layerId => dispatch(setVisibleLayers([layerId])),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LayerToggler));
