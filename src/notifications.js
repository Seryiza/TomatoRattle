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
    this.isSoundEnable = this.storage.get('isSoundEnabled');
    this.isBrowserNotificationEnable = this.storage.get('isBrowserNotificationEnabled');
  }

  notify(params) {
    // TODO: Play sound
    if (this.isBrowserNotificationEnable) {
      const { title, body } = params;
      const options = {
        body,
      };

      // eslint-disable-next-line no-unused-vars
      const notification = new Notification(title, options);
    }
  }
}
