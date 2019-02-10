import { createAction } from 'redux-actions';
import ActionTypes from '../constants/action-types';

const [
  onCountryClick,
  fetchData,
  fetchingData,
  fetchedData,
  errorFetchingData,
] = [
  ActionTypes.COUNTRY_CLICK,
  ActionTypes.FETCH_DATA,
  ActionTypes.FETCHING_DATA,
  ActionTypes.FETCHED_DATA,
  ActionTypes.ERROR_FETCHING_DATA,
].map(action => createAction(action));

// Load data action
const loadData = url => ((dispatch) => {
  // Initialize fetching state
  dispatch(fetchData(url));

  // Fetch data from url
  fetch(url)
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
    .then(data => dispatch(fetchedData(data)))
    // set error
    .catch(err => dispatch(errorFetchingData(err)));
});

export {
  onCountryClick,
  fetchData,
  fetchingData,
  fetchedData,
  errorFetchingData,
  loadData,
};
