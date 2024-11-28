"use client"
import styles from "./page.module.css";
import GyroscopeComponent from "@/components/Gyroscope";
import BluetoothComponent from "@/components/Bluetooth";
import PushNotificationComponent from "@/components/PushNotification";

export default function Home() {
  return (
    <div className={styles.page}>
      <GyroscopeComponent />
      <BluetoothComponent />
      <PushNotificationComponent />
    </div>
  );
}
