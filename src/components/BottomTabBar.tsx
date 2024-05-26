import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BottomTabLogo from './BottomTabLogo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getNotificationCount } from '../utils/apiservice';
import colors from '../utils/colors';

const BottomTabBar = ({ state, descriptors, navigation }) => {
  const { routes = [], index: activeIndex } = state;
  const [count, setCount] = useState('0');
  useEffect(() => {
    getNotificationCount().then(async r => {
      const result = await r.data;
      if (result.count < 999) {
        setCount(result.count.toString());
      }
      else {
        setCount('999+')
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <BottomTabLogo />
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const icon = getTabIcon(route.name);

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <View style={{ alignItems: 'center' }}>
                {route.name === 'Notification' && (
                  <View style={styles.badgeContainer}>
                    <Ionicons name={icon} size={24} color={isFocused ? '#673ab7' : '#222'} />
                    {count > '0' &&
                      (<View style={styles.badge}>
                        <Text style={styles.badgeText}>{count}</Text>
                      </View>)
                    }
                  </View>
                )}
                {route.name !== 'Notification' && (
                  <Ionicons name={icon} size={24} color={isFocused ? '#673ab7' : '#222'} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

function getTabIcon(routeName) {
  switch (routeName) {
    case 'Home':
      return 'home-outline';
    case 'Notification':
      return 'notifications-outline';
    case 'Profile':
      return 'person-outline';
    case 'Support':
      return 'call-outline';

    case 'Logout':
      return 'log-out-outline';
      person - outline

    default:

      return 'circle';
  }
}
export default BottomTabBar;
const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  },
  tabContainer: {
    backgroundColor: 'transparent',

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  imageIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    elevation: 10,
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'ios' ? 15 : 0,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.yellow,
    borderRadius: 50,
    width: 20,
    height: 20,
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});