import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChoosePlanScreen } from './src/screens/ChoosePlanScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SetDurationScreen } from './src/screens/SerDurationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ChoosePlan" component={ChoosePlanScreen} />
        <Stack.Screen name="SetDuration" component={SetDurationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
