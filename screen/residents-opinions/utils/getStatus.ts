const getStatus = (status: number) => {
    let statusColor = "#f59e0b"
    let text = 'Chờ phản hồi'
    switch (status) {
        case 1:
            statusColor = '#f59e0b';
            text = 'Chờ phản hồi';
            break;
        case 2:
            statusColor = '#3b82f6';
            text = 'Đã phản hồi';
            break
        case 3:
            statusColor = '#10b981';
            text = 'Đã xác nhận';
            break;
    }

    return { color: statusColor, text }
};

export {
    getStatus
};
