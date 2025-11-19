import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export class NotificationService {
  static async init() {
    if (!Capacitor.isNativePlatform()) {
      console.log('Running in web, notifications disabled');
      return;
    }

    try {
      const permission = await LocalNotifications.requestPermissions();
      if (permission.display === 'granted') {
        console.log('Notification permissions granted');
        return true;
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
    return false;
  }

  static async showNowPlayingNotification(track) {
    if (!Capacitor.isNativePlatform()) return;

    try {
      // Annuler les notifications précédentes
      await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

      // Créer une nouvelle notification
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: '🎵 En cours de lecture',
            body: `${track.title} - ${track.artist}`,
            largeBody: `${track.title}\n${track.artist}\n⏱️ ${track.duration}`,
            summaryText: 'Anasheed Player',
            sound: null, // Pas de son pour ne pas interrompre la musique
            attachments: track.cover ? [{ id: 'cover', url: track.cover }] : [],
            actionTypeId: 'MUSIC_CONTROLS',
            extra: {
              trackId: track.id
            },
            ongoing: true, // Android: notification persistante
            autoCancel: false
          }
        ]
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }

  static async clearNotification() {
    if (!Capacitor.isNativePlatform()) return;
    
    try {
      await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
    } catch (error) {
      console.error('Error clearing notification:', error);
    }
  }

  static async registerActionTypes() {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await LocalNotifications.registerActionTypes({
        types: [
          {
            id: 'MUSIC_CONTROLS',
            actions: [
              {
                id: 'play-pause',
                title: '⏯️ Play/Pause'
              },
              {
                id: 'next',
                title: '⏭️ Suivant'
              },
              {
                id: 'previous',
                title: '⏮️ Précédent'
              }
            ]
          }
        ]
      });
    } catch (error) {
      console.error('Error registering action types:', error);
    }
  }

  static onNotificationAction(callback) {
    if (!Capacitor.isNativePlatform()) return;

    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      const actionId = notification.actionId;
      const trackId = notification.notification.extra?.trackId;
      
      callback(actionId, trackId);
    });
  }

  static async scheduleReminder(title, body, delayInMinutes) {
    if (!Capacitor.isNativePlatform()) return;

    const notificationTime = new Date();
    notificationTime.setMinutes(notificationTime.getMinutes() + delayInMinutes);

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Math.random() * 100000),
            title: title,
            body: body,
            schedule: { at: notificationTime },
            sound: 'default'
          }
        ]
      });
    } catch (error) {
      console.error('Error scheduling reminder:', error);
    }
  }
}
