import './style.css';
import App from './pages/app';
import { connect } from './api/websocket';

document.addEventListener('DOMContentLoaded', () => {
  connect();
  const app = new App();
  app.run();
});
