function get(key: string): any {
    if (!window) {
        return null;
    }

    const value = localStorage.getItem(key);

    let parsedValue;

    try {
        parsedValue = JSON.parse(value || 'null');
    } catch (e) {
        parsedValue = value || null;
    }

    if (parsedValue === 'true') {
        parsedValue = true;
    } else if (parsedValue === 'false') {
        parsedValue = false;
    }

    return parsedValue;
};

function set(key: string, value: any): void {
    if (!window) {
        return;
    }

    if (typeof value === 'function') {
        value = value.toString();
    } else if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
};

function remove(key: string): void {
    if (!window) {
        return;
    }

    localStorage.removeItem(key);
};

function reset(): void {
    if (!window) {
        return;
    }

    localStorage.clear();
};

export {
    get,
    set,
    remove,
    reset,
};