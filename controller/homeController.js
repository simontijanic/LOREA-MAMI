const browser = require('browser-detect');

const index = (req, res) => {
    const browserInfo = browser(req.headers['user-agent']);
    const isMobile = browserInfo.mobile || browserInfo.os.includes('Android') || browserInfo.os.includes('iOS');

    res.render('index', { isMobile });
};

module.exports = index;