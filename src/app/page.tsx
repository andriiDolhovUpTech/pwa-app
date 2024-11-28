"use client"
import styles from "./page.module.css";
import GyroscopeComponent from "@/components/Gyroscope";

export default function Home() {
  return (
    <div className={styles.page}>
      <GyroscopeComponent />
    </div>
  );
}
