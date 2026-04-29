import axios from 'axios'
import { PERMISSIONS, check, request, openSettings } from 'react-native-permissions'
import Toast from 'react-native-root-toast'
import { Platform, Alert } from 'react-native'

type PermissionStatus = 'unavailable' | 'denied' | 'blocked' | 'granted' | 'limited' | string

const Helper = {
    async checkPermission(cb?: (status: PermissionStatus | '') => void): Promise<void> {
        try {
            const perm: any = Platform.select({
                android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            })

            const result = await check(perm)

            if (result === 'granted') {
                cb?.(result)
                return
            }

            if (result === 'blocked' || result === 'unavailable') {
                Helper.permissionConfirm(
                    'Access to the files has been prohibited; please enable it in the Settings app to continue.',
                    status => {
                        if (status) {
                            openSettings().catch(() => {
                            })
                        }
                    }
                )
                cb?.('')
                return
            }

            const status = await request(perm)
            if (status === 'granted') {
                cb?.(status)
            } else {
                cb?.(status)
            }
        } catch (e) {
            cb?.('')
        }
    },

    async permissionConfirm(alertMessage: string, cb?: (agree: boolean) => void): Promise<void> {
        Alert.alert(
            'AcademicArchitect',
            alertMessage,
            [
                {
                    text: 'NOTNOW',
                    onPress: () => cb?.(false),
                    style: 'cancel',
                },
                {
                    text: 'SETTINGS',
                    onPress: () => cb?.(true),
                },
            ],
            { cancelable: false }
        )
    },

    showToast(msg: string, position?: number) {
        Toast.show(msg, {
            duration: Toast.durations.SHORT,
            position: position ?? Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            containerStyle: { backgroundColor: 'rgba(0,0,0,0.7)', width: '70%' },
        })
    },

    getCurrencySymbol(currencyCode: string): string {
        return (0)
            .toLocaleString('en', {
                style: 'currency',
                currency: currencyCode,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })
            .replace(/\d/g, '')
            .trim()
    },

    async currency_Location(): Promise<string | undefined> {
        const res = await axios.get('https://api.ipify.org/?format=json')
        return res?.data?.ip
    },
}

export default Helper
