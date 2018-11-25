import iconURL from './icons/notification_icon.png';

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
        Notification.requestPermission()
          .then((permission) => {
            if (permission !== 'granted') {
              this.isBrowserNotificationEnable = false;
            }
          });
      }
    }
  }

  update() {
    // Compare as strings for localStorage (contains data as string :( )
    const isSoundEnable = String(this.storage.get('isSoundEnabled')) === 'true';
    const isBrowserNotificationEnable = String(this.storage.get('isBrowserNotificationEnabled')) === 'true';

    this.isSoundEnable = isSoundEnable;
    this.isBrowserNotificationEnable = isBrowserNotificationEnable;
  }

  notify(params) {
    // TODO: Play sound
    if (this.isBrowserNotificationEnable) {
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
