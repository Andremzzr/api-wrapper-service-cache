class CacheService {
    cacheClient = undefined;
    constructor(cacheClient) {
        this.cacheClient = cacheClient;
    }

    async setup() {
        this.cacheClient.connect();
    }

    async setValue(key, value) {
        this.cacheClient.set(key, value)
    }

    async getValue(key){
        return this.cacheClient.get(key);
    }

}

module.exports = CacheService