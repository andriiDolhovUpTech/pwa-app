import { useCallback, useEffect, useState } from 'react';

type DeviceOrientation = {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
};

type UseDeviceOrientationData = {
    orientation: DeviceOrientation | null;
    requestAccess: () => Promise<boolean>;
    revokeAccess: () => Promise<void>;
};

export const useDeviceOrientation = (): UseDeviceOrientationData => {
    const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);

    const onDeviceOrientation = (event: DeviceOrientationEvent): void => {
        setOrientation({
            alpha: Number(event.alpha?.toFixed()),
            beta: Number(event.beta?.toFixed()),
            gamma: Number(event.gamma?.toFixed()),
        });
    };

    const revokeAccessAsync = async (): Promise<void> => {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
        setOrientation(null);
    };

    const requestAccessAsync = async (): Promise<boolean> => {
        if (!DeviceOrientationEvent) {
            return false;
        }

        if (
            (DeviceOrientationEvent as any).requestPermission &&
            typeof (DeviceOrientationEvent as any).requestPermission === 'function'
        ) {
            let permission: PermissionState;
            try {
                permission = await (DeviceOrientationEvent as any).requestPermission();
            } catch (err) {
                return false;
            }
            if (permission !== 'granted') {
                return false;
            }
        }

        window.addEventListener('deviceorientation', onDeviceOrientation);

        return true;
    };

    const requestAccess = useCallback(requestAccessAsync, []);
    const revokeAccess = useCallback(revokeAccessAsync, []);

    useEffect(() => {
        return (): void => {
            revokeAccess();
        };
    }, [revokeAccess]);

    return {
        orientation,
        requestAccess,
        revokeAccess,
    };
};

const GyroscopeComponent = (): React.ReactElement => {
    const { orientation, requestAccess, revokeAccess } = useDeviceOrientation();

    const onToggle = (toggleState: boolean): void => {
        const result = toggleState ? requestAccess() : revokeAccess();
    };

    const orientationInfo = orientation && (
        <ul>
            <li>
                ɑ: <code>{orientation.alpha}</code>
            </li>
            <li>
                β: <code>{orientation.beta}</code>
            </li>
            <li>
                γ: <code>{orientation.gamma}</code>
            </li>
        </ul>
    );

    return (
        <>
            <button onClick={() => onToggle(true)}>Toggle</button>
            {orientationInfo}
        </>
    );
};

export default GyroscopeComponent;
