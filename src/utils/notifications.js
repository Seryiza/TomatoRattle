import iconURL from '../icons/notification_icon.png';

export default class Notifications {
  constructor(storage) {
    this.storage = storage;
    this.update();
    this.requestPermission();
  }

  requestPermission() {
    switch (Notification.permission) {
      case 'granted':
      case 'denied': {
        return;
      }
      default: {
        // TODO: Fix Safari and refactoring it
        Notification.requestPermission()
          .then((permission) => {
            if (permission !== 'granted') {
              this.isBrowserNotificationEnabled = false;
            }
          });
      }
    }
  }

  update() {
    // Compare as strings for localStorage (contains data as string :( )
    const isSoundEnabled = String(this.storage.get('isSoundEnabled')) === 'true';
    const isBrowserNotificationEnabled = String(this.storage.get('isBrowserNotificationEnabled')) === 'true';
    const soundURL = this.storage.get('soundURL');
    const soundVolume = parseFloat(this.storage.get('soundVolume'));

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
