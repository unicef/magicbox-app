import React from 'react';
import PropTypes from 'prop-types';

const ModalInfo = ({ content }) => (
  <span>
    { content.content.map(c => <p>{c.title}</p>) }
  </span>
);

ModalInfo.propTypes = {
  content: PropTypes.shape({}).isRequired,
};

export default ModalInfo;
