import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// importing Provider component to wrap the app
import { Provider } from 'react-redux';
// importing store from the store file
import store from './store/store';

// store.subscribe(() => {
//   console.log(store.getState());
// });

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

