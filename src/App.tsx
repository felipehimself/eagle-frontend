import 'react-photo-view/dist/react-photo-view.css';
import { AppProviders } from './providers';
import { AppRoutes } from './routes';

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
