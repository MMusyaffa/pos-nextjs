import dummyData from "../data/dummy.json";

const ApiUrl = process.env.API_URL;
const token = process.env.TOKEN;
const usingDummyData = (process.env.IS_USE_DUMMY_DATA === "true") ? true : false;

export async function getCategories() {
    const promise = new Promise((resolve, reject) => {
        if (usingDummyData) {
            resolve(dummyData.data.categories);
        }
        else {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };
            fetch(`${ApiUrl}/categories`, options)
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

export async function addCategory(category) {
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
                body: JSON.stringify(category)
            };
            fetch(`${ApiUrl}/categories`, options)
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

export async function updateCategory(id, category) {
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
                body: JSON.stringify(category)
            };
            fetch(`${ApiUrl}/categories/${id}`, options)
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

export async function deleteCategory(categoriesId) {
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

            fetch(`${ApiUrl}/categories/${categoriesId}`, options)
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