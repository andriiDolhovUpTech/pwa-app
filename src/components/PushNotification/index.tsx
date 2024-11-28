import React, { useState } from 'react';

const PushNotificationButton: React.FC = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

    const subscribeToPushNotifications = async () => {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                const swRegistration = await navigator.serviceWorker.ready;

                if (swRegistration.pushManager) {
                    // Mocking a subscription object as if we had successfully subscribed the user
                    const mockSubscription = {
                        endpoint: 'mocked-endpoint',
                        expirationTime: null,
                        keys: {
                            p256dh: 'mocked-p256dh-key',
                            auth: 'mocked-auth-key',
                        },
                    };

                    // You would normally send the subscription to the backend, but here we'll mock it
                    console.log('Mocked subscription:', mockSubscription);

                    setIsSubscribed(true);
                    console.log('Successfully subscribed to push notifications');
                }
            } else {
                console.error('Notification permission denied');
            }
        }
    };

    const sendPushNotification = () => {
        if (isSubscribed) {
            // Push notifications are mocked, so we're simply triggering the push event manually
            const mockData = {
                title: 'Mocked Push Notification',
                body: 'This is a mocked notification triggered from the frontend.',
            };

            // Manually trigger the push event (simulating a push notification)
            if (navigator.serviceWorker) {
                navigator.serviceWorker.ready.then((swRegistration) => {
                    swRegistration.showNotification(mockData.title, {
                        body: mockData.body,
                    });
                });
            }

            console.log('Mocked push notification triggered');
        } else {
            console.log('User is not subscribed to push notifications.');
        }
    };

    return (
        <div>
            <button onClick={subscribeToPushNotifications}>Subscribe to Notifications</button>
            <button onClick={sendPushNotification}>Send Mock Push Notification</button>
        </div>
    );
};

export default PushNotificationButton;
