if (__DEV__) {
  import('./src/config/reactotron-config').then(() => console.log('Reactotron Configured'))
}

import { Navigation } from './navigation';

export default function App() {
  return (
    <Navigation />
  );
}
