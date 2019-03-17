import { connect } from 'react-redux';
import Forecast from '../components/Forecast'
import {
  fetchForecasts,
  clearForecasts,
  getForecast,
  getIsLoading,
  getError,
  clearError
} from '../features/fetchForecasts/reducer';

const mapStateToProps = (appState) => ({
  forecast: getForecast(appState),
  loading: getIsLoading(appState),
  error: getError(appState)
})

const mapDispatchToProps = {
    fetchForecasts,
    clearForecasts,
    clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
