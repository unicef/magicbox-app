import { createAction } from 'redux-actions';
import { addDataToMap, onLayerClick } from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';
import { push } from 'connected-react-router';
import ActionTypes from '../constants/action-types';

const [
  noop,
  onCountrySelect,
  fetchData,
  fetchingData,
  fetchedData,
  errorFetchingData,
] = [
  ActionTypes.NOOP,
  ActionTypes.COUNTRY_SELECT,
  ActionTypes.FETCH_DATA,
  ActionTypes.FETCHING_DATA,
  ActionTypes.FETCHED_DATA,
  ActionTypes.ERROR_FETCHING_DATA,
].map(action => createAction(action));

// On country click action
const onCountryClick = info => (dispatch, getState) => {
  // dispatch country select action
  dispatch(onCountrySelect(info.object.properties));
  // dispatch usual kepler.gl action
  dispatch(onLayerClick(info));
  // get current state
  const { app: { data } } = getState();
  // dispatch push to change the url
  dispatch(push(data.path));
  // return noop because kepler is expecting a action
  return noop();
};

// Load data action
const loadData = (dataset = null, path = null) => ((dispatch, getState) => {
  // Initialize fetching state
  dispatch(fetchData({ dataset, path }));

  // fetch dataset from url
  const { app: { data } } = getState();
  const url = `${data.path}${data.datasetName}`;

  // eslint-disable-next-line
  console.log('Getting data from:', url);

  // Fetch data from url
  return fetch(url)
    .then((response) => {
      // get stream reader
      const reader = response.body.getReader();
      const totalSize = parseFloat(response.headers.get('Content-Length'), 10) || 0;
      let totalRead = 0;

      return new ReadableStream({
        start(controller) {
          // define function to pump data from stream
          const pump = () => reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            // add size of byte length to total of bytes read
            totalRead += value.byteLength;
            // dispatch fetching data with percentage read
            if (totalSize !== 0) {
              dispatch(fetchingData(totalRead / totalSize));
            }
            // Enqueue value
            controller.enqueue(value);
            // keep pumping
            pump();
          });

          return pump();
        },
      });
    })
    // transform stream into a response
    .then(stream => new Response(stream))
    // parse to json
    .then(response => response.json())
    // set fetching data with 1 -> 100%
    .then(responseJson => dispatch(fetchedData(responseJson)))
    // set error
    .catch(err => dispatch(errorFetchingData(err)));
});

// Load data to map
const loadDataToMap = (dataset = null, path = null) => ((dispatch, getState) => (
  dispatch(loadData(dataset, path))
    .then(() => getState().app.data.dataset)
    .then(Processors.processKeplerglJSON)
    .then(data => dispatch(addDataToMap(data)))
));

export {
  onCountrySelect,
  onCountryClick,
  fetchData,
  fetchingData,
  fetchedData,
  errorFetchingData,
  loadData,
  loadDataToMap,
};
