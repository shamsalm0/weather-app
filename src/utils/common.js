const dateFormat = (date) => {
    const parsed = new Date(date);
    if (isNaN(parsed)) return 'Invalid date';
    
    return parsed.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export { dateFormat };