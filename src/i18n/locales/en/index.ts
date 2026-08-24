import navbar from './navbar.json';
import views from './views.json';
import components from './components.json';
import schemas from './schemas.json';

export default {
  navbar,
  schemas,
  ferry: {
    ...views,
    ...components,
  },
};
