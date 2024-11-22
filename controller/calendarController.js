const path = require('path');

const getAccessibleDays = (req, res) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    res.json({ accessibleDays: Array.from({ length: currentDay }, (_, i) => i + 1) });
};

const serveCalendarDay = (req, res) => {
    const { day } = req.params;
    const currentDate = new Date();

    if (day <= currentDate.getDate()) {
        const filePath = path.resolve(__dirname, '..', 'restricted', 'luker', String(day), 'index.html');
        res.sendFile(filePath);
    } else {
        res.status(403).json({ error: "Access denied. This day is not yet available." });
    }
};

module.exports = { getAccessibleDays, serveCalendarDay };
