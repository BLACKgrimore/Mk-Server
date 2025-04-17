// utils/parseQueryFilters.js
const parseQueryFilters = (query, allowedFields = []) => {
    const filters = {};

    for (const key in query) {
        if (allowedFields.includes(key)) {
            filters[key] = query[key];
        }
    }

    return filters;
};

export { parseQueryFilters };
