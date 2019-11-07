import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator  } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Tutorial from './../screens/Tutorial'; 
import Home from '../screens/Home';
import DataDetailScreen from '../screens/DataDetailScreen';
import InputDataScreen from '../screens/InputDataScreen';
import Login from './../screens/Login';
import Signup from './../screens/Signup'; 
import TabBar from './../components/TabBar';
import LoginTab from './../components/LoginTab';

const MinhasDenunciasNavigator = createStackNavigator({
  HomeScreen: Home,
  DataDetailScreen: {
    screen: DataDetailScreen
  }
});

MinhasDenunciasNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index != 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};


const LoginNavigator = createMaterialTopTabNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup }
  },
  {
    tabBarComponent: LoginTab
  }
)

const DenunciarNavigator = createMaterialTopTabNavigator(
  {
    HomeTabs: { screen: MinhasDenunciasNavigator },
    InputDataScreen: { screen: InputDataScreen },
  },
  {
    tabBarComponent: TabBar
  }
);

const appNavigator = createDrawerNavigator({
  Tutorial: {
    screen: Tutorial,
    navigationOptions: {
      drawerLockMode: "locked-closed",
      disableGestures: true,
      header: null
    }
  },
  Login: {
    screen: LoginNavigator,
    navigationOptions: {
      drawerLockMode: "locked-closed",
      disableGestures: true,
      header: null
    }
  },
  HomeNav: {
    screen: DenunciarNavigator,
    navigationOptions: {
      drawerLockMode: "locked-closed",
      disableGestures: true,
      header: null
    }
  }
});

export default createAppContainer(appNavigator);
