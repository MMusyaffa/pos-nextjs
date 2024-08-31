import dummyData from "../data/dummy.json";

const ApiUrl = process.env.API_URL;
const token = process.env.TOKEN;
const usingDummyData = (process.env.IS_USE_DUMMY_DATA === "true") ? true : false;

export async function getProducts() {
    const promise = new Promise((resolve, reject) => {
        if (usingDummyData) {
            resolve(dummyData.data.products);
        }
        else {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            fetch(`${ApiUrl}/products`, options)
                .then(async (res) => {
                    const result = await res.json();
                    if (res.ok) {
                        // HTTP OK return data
                        resolve(result.data);
                    }
                    else {
                        // HTTP error return empty []
                        reject(result.message);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
    return promise;
}

export async function addProduct(product) {
    const promise = new Promise((resolve, reject) => {
        if (usingDummyData) {
            resolve();
        } else {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(product)
            };
            fetch(`${ApiUrl}/products`, options)
                .then(async (res) => {
                    const result = await res.json();
                    if (res.ok) {
                        // HTTP OK return data
                        resolve(result);
                    }
                    else {
                        // HTTP error return empty []
                        reject(result.message);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
    return promise;
}

export async function updateProduct(id, product) {
    const promise = new Promise((resolve, reject) => {
        if (usingDummyData) {
            resolve();
        } else {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(product)
            };
            fetch(`${ApiUrl}/products/${id}`, options)
                .then(async (res) => {
                    const result = await res.json();
                    if (res.ok) {
                        // HTTP OK return data
                        resolve(result);
                    }
                    else {
                        // HTTP error return empty []
                        reject(result.message);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
    return promise;
}

export async function deleteProduct(productId) {
    const promise = new Promise((resolve, reject) => {
        if (usingDummyData) {
            resolve();
        } else {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            fetch(`${ApiUrl}/products/${productId}`, options)
                .then(async (res) => {
                    const result = await res.json();
                    if (res.ok) {
                        // HTTP OK return data
                        resolve(result);
                    }
                    else {
                        // HTTP error return empty []
                        reject(result.message);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
    return promise;
}