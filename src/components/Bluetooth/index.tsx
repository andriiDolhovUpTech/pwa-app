import React, { useState, useEffect } from 'react';
/// <reference types="web-bluetooth" />
const BluetoothComponent: React.FC = () => {
    const [device, setDevice] = useState<any | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

    // Function to request Bluetooth device
    const requestDevice = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['battery_service'] }], // Filter for devices with a specific service (battery service in this case)
                optionalServices: ['battery_service'], // Optional services you may need
            });

            setDevice(device);
            connectToDevice(device);
        } catch (error) {
            console.error('Bluetooth device request failed:', error);
        }
    };

    // Function to connect to the selected Bluetooth device
    const connectToDevice = async (device: any) => {
        try {
            const server = await device.gatt?.connect();
            if (server) {
                setIsConnected(true);
                console.log('Connected to device:', device.name);
                readBatteryLevel(server);
            }
        } catch (error) {
            console.error('Failed to connect to Bluetooth device:', error);
        }
    };

    // Function to read battery level
    const readBatteryLevel = async (server: any) => {
        try {
            const service = await server.getPrimaryService('battery_service');
            const characteristic = await service.getCharacteristic('battery_level');
            const value = await characteristic.readValue();
            const battery = value.getUint8(0);
            setBatteryLevel(battery);
        } catch (error) {
            console.error('Failed to read battery level:', error);
        }
    };

    // Function to disconnect from the device
    const disconnectFromDevice = () => {
        if (device && device.gatt?.connected) {
            device.gatt?.disconnect();
            setIsConnected(false);
            console.log('Disconnected from device');
        }
    };

    // Request permission on component mount for PWA compatibility
    useEffect(() => {
        if ('bluetooth' in navigator) {
            console.log('Bluetooth is supported');
        } else {
            console.error('Bluetooth is not supported in this browser.');
        }

        return () => {
            if (device && device.gatt?.connected) {
                disconnectFromDevice();
            }
        };
    }, [device]);

    return (
        <div>
            <h2>Bluetooth Device</h2>
            {!isConnected ? (
                <button onClick={requestDevice}>Connect to Bluetooth Device</button>
            ) : (
                <>
                    <p>Device Connected: {device?.name}</p>
                    {batteryLevel !== null && (
                        <p>Battery Level: {batteryLevel}%</p>
                    )}
                    <button onClick={disconnectFromDevice}>Disconnect</button>
                </>
            )}
        </div>
    );
};

export default BluetoothComponent;
