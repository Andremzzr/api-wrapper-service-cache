const { createClient } = require('redis');

class CacheService {
    client = undefined;

    constructor(client) {
        this.client = createClient();
        this.client.on('error', err => console.log('Redis Client Error', err));

    }

    async setup() {
        if (!this.client.isOpen) {
            await this.client.connect();
            console.log('Redis connected successfully.');
        }    
    }

    async setValue(key, value) {
        this.client.set(key, value)
    }

    async getValue(key){
        return this.client.get(key);
    }

}

const cacheService = new CacheService();

module.exports = cacheService