
import { NotificationType } from '../types/notification';
import { NotificationInstance } from 'antd/es/notification/interface';

export const _openNotification = (notification:NotificationInstance,type: NotificationType, message: string): void => {
    notification.open({
        type,
        message: message,
        duration: 5, 
        style: {
            paddingBottom: '0.75rem',
        },
        placement: 'topRight',
    });
};
