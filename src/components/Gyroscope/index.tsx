'use client'
import React, { useState, useEffect } from 'react';

const GyroscopeComponent: React.FC = () => {
    const [motionData, setMotionData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    useEffect(() => {
        const handleMotion = (event: DeviceMotionEvent) => {
            if (event.rotationRate) {
                const { alpha: x = 0, beta: y = 0, gamma: z = 0 } = event.rotationRate;
                setMotionData({ x, y, z });
            }
        };

        if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
            window.addEventListener('devicemotion', handleMotion);
        } else {
            console.error('DeviceMotion API is not supported by your browser.');
        }

        return () => {
            window.removeEventListener('devicemotion', handleMotion);
        };
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Gyroscope Readings</h2>
            <p>
                <strong>X:</strong> {motionData.x?.toFixed(2)}
            </p>
            <p>
                <strong>Y:</strong> {motionData.y?.toFixed(2)}
            </p>
            <p>
                <strong>Z:</strong> {motionData.z?.toFixed(2)}
            </p>
        </div>
    );
};

export default GyroscopeComponent;
