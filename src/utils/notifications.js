import iconURL from '../icons/notification_icon.png';

const getBool = (storage, key) => String(storage.get(key)) === 'true';
const getFloat = (storage, key) => parseFloat(storage.get(key));

export default class Notifications {
  constructor(storage) {
    this.storage = storage;
    this.update();
    this.requestPermission();
  }

  requestPermission() {
    // For older browsers
    if (typeof Notification === 'undefined') {
      this.setAndSaveBrowserNotifications(false);
      return;
    }

    // Skip requesting if permission is set
    if (Notification.permission === 'granted'
     || Notification.permission === 'denied') {
      return;
    }

    const notificationRequestCallback = (permission) => {
      const isGranted = permission === 'granted';
      this.setAndSaveBrowserNotifications(isGranted);
    };

    try {
      Notification.requestPermission().then(notificationRequestCallback);
    } catch (error) {
      // For Safari
      if (error instanceof TypeError) {
        Notification.requestPermission(notificationRequestCallback);
      } else {
        throw error;
      }
    }
  }

  setAndSaveBrowserNotifications(isEnabled) {
    this.isBrowserNotificationEnabled = isEnabled;
    this.storage.set('isBrowserNotificationEnabled', isEnabled);
  }

  update() {
    const isSoundEnabled = getBool(this.storage, 'isSoundEnabled');
    const isBrowserNotificationEnabled = getBool(this.storage, 'isBrowserNotificationEnabled');
    const soundURL = this.storage.get('soundURL');
    const soundVolume = getFloat(this.storage, 'soundVolume');

    this.isSoundEnabled = isSoundEnabled;
    this.isBrowserNotificationEnabled = isBrowserNotificationEnabled;
    this.notificationSound = new Audio(soundURL);
    this.notificationSound.volume = soundVolume;
  }

  notify(params) {
    if (this.isSoundEnabled) {
      this.notificationSound.play();
    }

    if (this.isBrowserNotificationEnabled) {
      const { title, body } = params;
      const options = {
        body,
        icon: iconURL,
      };

      // eslint-disable-next-line no-unused-vars
      const notification = new Notification(title, options);
    }
  }
}
