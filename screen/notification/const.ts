
const getIconByType = (type?: string) => {
    switch (type) {
        case 'success':
            return 'circle-check';
        case 'warning':
            return 'circle-exclamation';
        default:
            return 'circle-info';
    }
};

const getColorByType = (type?: string) => {
    switch (type) {
        case 'success':
            return '#2E7D32';
        case 'warning':
            return '#F57C00';
        default:
            return '#1976D2';
    }
};

export { getColorByType, getIconByType };
