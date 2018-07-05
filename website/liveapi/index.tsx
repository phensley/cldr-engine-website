import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { State } from './reducers';
import { rootSaga } from './sagas';
import { setupStore } from './store';

import { App } from './components/App';

const store = setupStore({} as State);
store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
