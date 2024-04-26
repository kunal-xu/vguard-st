import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const notificationListener = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('Received a new message:', remoteMessage);
    try {
      await onDisplayNotification(remoteMessage);
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  });

  const onDisplayNotification = async data => {
    try {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Required for iOS
      // See https://notifee.app/react-native/docs/ios/permissions
      await notifee.requestPermission();

      const notificationId = await notifee.displayNotification({
        id: '123',
        title: data.notification.title,
        body: data.notification.body,
        android: {
          channelId,
          smallIcon: 'ic_launcher_round',
        },
      });
      console.log('Notification displayed successfully:', notificationId);
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };
};

export default notificationListener;
