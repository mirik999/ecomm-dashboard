import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MockedProvider } from '@apollo/client/testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
//reducer
import { rootReducer } from '../../redux/store';

const render = (
  ui: React.ReactElement,
  {
    initialState = {},
    store = configureStore({
      reducer: rootReducer,
    }),
    route = '/',
    ...renderOptions
  } = {},
) => {
  function Wrapper({ children }: any) {
    const mocks: any[] = [];
    const history = createMemoryHistory();
    return (
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={store.getState().theme}>
            <MockedProvider mocks={mocks} addTypename={false}>
              {children}
            </MockedProvider>
          </ThemeProvider>
        </Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export render method
export { render };
