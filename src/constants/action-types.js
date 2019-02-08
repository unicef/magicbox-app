// All action types
const ActionTypes = Object.keys({
  COUNTRY_CLICK: null,
}).reduce((acc, el) => ({ ...acc, [el]: el }), {});

export default ActionTypes;
