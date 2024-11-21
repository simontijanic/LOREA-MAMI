const path = require('path');

const finn_Dato = (req, res) => {
    const day = parseInt(req.params.day, 10);
    const month = req.params.month;
    const currentDate = new Date();

    if (day && month) {
        if ((month === 'november' || month === 'december') && day <= currentDate.getDate()) {
            const filePath = path.resolve(__dirname, '..', 'public', 'luker', String(day), 'index.html');
            res.sendFile(filePath);
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
};

module.exports = finn_Dato;
