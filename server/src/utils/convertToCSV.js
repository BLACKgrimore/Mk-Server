// utils/convertToCSV.js
const convertToCSV = (data = []) => {
    if (!Array.isArray(data) || data.length === 0) return "";

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj =>
        Object.values(obj)
            .map(val => `"${String(val).replace(/"/g, '""')}"`)
            .join(",")
    );

    return [headers, ...rows].join("\n");
};

export { convertToCSV };