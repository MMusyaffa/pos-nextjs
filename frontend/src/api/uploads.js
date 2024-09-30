const ApiUrl = process.env.API_URL;
const token = process.env.TOKEN;
const usingDummyData = (process.env.IS_USE_DUMMY_DATA === "true") ? true : false;

// return a promise<id> of the uploaded file
export async function uploadFile(file) {
  const promise = new Promise((resolve, reject) => {
    if (usingDummyData) {
      resolve("dummy-id");
    } else {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("image", file);

      // Create the fetch options
      const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      };

      // Make the fetch request
      fetch(`${ApiUrl}/uploads`, options)
        .then(async (res) => {
          const result = await res.json();
          if (res.ok) {
            // HTTP OK return data
            if (result.success) {
              resolve(result.data.id);
            }
            reject(result);
          }
          else {
            // HTTP error
            reject('Error uploading file');
          }
        })
        .catch(error => {
          reject(error);
        });
    }
  });

  return promise;
}