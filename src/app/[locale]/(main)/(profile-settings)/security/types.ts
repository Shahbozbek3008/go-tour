export interface IProfileDevices {
    id: string
    platform: string
    device_model: string
    location: string
    last_activity: string
    is_current_device: boolean
}

export interface IUpdatePassword {
    old_password: string
    new_password1: string
    new_password2: string
}
