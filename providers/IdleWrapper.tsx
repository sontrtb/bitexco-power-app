import { useLogout } from '@/hooks/useLogout';
import { useTimeLogout } from '@/stores/useTimeLogout';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { AppState, View } from 'react-native';

const IDLE_TIME = 30 * 60 * 1000; // 30 phút

function isOverTime(time?: number): boolean {
    if (!time) return true;
    return Date.now() - time >= IDLE_TIME;
}

export default function IdleWrapper({ children }: { children: ReactElement }) {
    const { timeLogout, setTimeLogout } = useTimeLogout()

    const onLogout = useLogout()

    const resetTimer = () => {
        setTimeLogout(Date.now());
    };

    const handleLogout = useCallback(() => {
        setTimeout(() => {
            onLogout(true)
        }, 500)
    }, [onLogout]);


    // Kiểm tra timeout
    useEffect(() => {
        const intervalCheck = setInterval(() => {
            if (timeLogout && isOverTime(timeLogout)) {
                handleLogout()
            }
        }, 1000);

        return () => {
            clearInterval(intervalCheck)
        };
    }, [handleLogout, timeLogout]);

    // kiểm tra thời gian khi vào app từ nền
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                nextAppState === 'active'
            ) {
                if (!timeLogout) {
                    handleLogout()
                }
                if (timeLogout && isOverTime(timeLogout)) {
                    handleLogout()
                }
            }
        });
        return () => {
            subscription.remove();
        };
    }, [handleLogout, setTimeLogout, timeLogout]);

    // lần đầu vào app
    useEffect(() => {
        if (!timeLogout) {
            handleLogout()
        }
        if (timeLogout && isOverTime(timeLogout)) {
            handleLogout()
        }
    }, [])

    return (
        <View
            style={{ flex: 1 }}
            onTouchStart={resetTimer}
        >
            {children}
        </View>
    );
}
