import autodux from 'autodux';

export const {
  reducer,
  slice,
  actions: {
    fetchForecasts,
    fetchForecastsSuccess,
    clearForecasts,
    setError,
    clearError
  },
  selectors: {
    getError,
    getIsLoading,
    getForecast
  }
} = autodux({
  slice: 'ForecastsReducer',
  actions: {
    clearForecasts: (state) => ({
      ...state,
      forecast: {
        forecast: [],
        city: undefined,
        state: undefined
      }
    }),
    fetchForecasts: (state) => ({
      ...state,
      isLoading: true
    }),
    fetchForecastsSuccess: (state, forecast) => ({
      ...state,
      isLoading: false,
      forecast: forecast
    }),
    setError: (state, payload) => ({
      ...state,
      isLoading: false,
      error: {
        status: true,
        message: payload
      },
    }),
    clearError: (state) => ({
      ...state,
      error: {
        status: false,
        message: ''
      }
    })
  },
  initial: {
    isLoading: false,
    forecast: {
      forecast: [],
      city: undefined,
      state: undefined
    },
    error: {
      status: false,
      message: ''
    }
  }
});
