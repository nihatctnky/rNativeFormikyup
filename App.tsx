import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigatior from './src/router/rootNavigatior';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <RootNavigatior />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;