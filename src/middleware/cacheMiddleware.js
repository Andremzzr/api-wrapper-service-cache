const cacheService = require('../services/cacheService'); 

async function initializeCache(req, res, next) {
    try {
        await cacheService.setup();
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { initializeCache }