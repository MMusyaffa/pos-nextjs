export default async function handler(req, res) {

  const endpoint = process.env.BACKEND || '';

  if (req.method === 'POST') {
    // console.log(req.body);
    try {
      // Fetch data from the external API
      const response = await fetch(`${endpoint}/sales`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': process.env.AUTHORIZATION
        },
        body: JSON.stringify(req.body.orders)
      });

      const data = await response.json();
      // data.endpoint = process.env.ENDPOINT;

      // console.log(data);
      if (data.error) {
        throw new Error(data.message);
      }

      // Return the data
      res.status(200).json(data);

    } catch (error) {
      // Handle errors
      res.status(500).json({ error: false, message: 'Error fetching data', data: null });
    }
  }
}