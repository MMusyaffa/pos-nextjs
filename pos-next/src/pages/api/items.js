export default async function handler(req, res) {

  const endpoint = process.env.BACKEND || '';

  try {
    // Fetch data from the external API
    const response = await fetch(`${endpoint}/items?name=${req.query.name || ''}&${req.query.category === 'all' ? '' : `category=${req.query.category || ''}`}`);
    const data = await response.json();
    data.endpoint = process.env.ENDPOINT;

    if (data.error) {
      throw new Error(data.message);
    }

    // Return the data
    res.status(200).json(data);

  } catch (error) {
    // Handle errors
    res.status(500).json({ error: true, message: 'Error fetching data', data: null });
  }
}