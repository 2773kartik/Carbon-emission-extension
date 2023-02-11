/** @private */
const PAGES_KEY = 'pages';

/** Shared logic */
class PageService {    
    /**
     * 
     * @returns {Promise<Array>}
     */
    static getPages = () => {
        const promise = toPromise((resolve, reject) => {
            chrome.storage.local.get([PAGES_KEY], (result) => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);

                const researches = result.pages ?? [];
                resolve(researches);
            });
        });

        return promise;
    }

    static savePage = async (title, url, memory) => {
        const pages = await this.getPages();
        
        const a = new co2.co2;
        memory = await a.perByte(memory).toFixed(3);
        alert(memory);
        const updatedPages = [...pages, { title, url, memory }];

        const promise = toPromise((resolve, reject) => {
            
            chrome.storage.local.set({ [PAGES_KEY]: updatedPages }, () => {          
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                resolve(updatedPages);
            });
        });

        return promise;
    }

    static clearPages = () => {
        const promise = toPromise((resolve, reject) => {
            chrome.storage.local.remove([PAGES_KEY], () => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);

                resolve();
            });
        });

        return promise;
    }
}

/**
 * Promisify a callback.
 * @param {Function} callback 
 * @returns {Promise}
 */
const toPromise = (callback) => {
    const promise = new Promise((resolve, reject) => {
        try {
            callback(resolve, reject);
        }
        catch (err) {
            reject(err);
        }
    });
    return promise;
}