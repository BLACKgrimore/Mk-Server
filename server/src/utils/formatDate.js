// utils/formatDate.js
const formatDate = (date = new Date(), locale = "en-US", options = {}) => {
    const defaultOptions = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };

    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
};

export { formatDate };
