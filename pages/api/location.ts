import type { NextApiRequest, NextApiResponse } from 'next';

const getCoordinates = async (location: string) => {
    const apiKey = process.env.GEOCODING_API_KEY;

    if (!apiKey) {
        throw new Error('Geocoding API key not found');
    }

    const response = await fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(location)}&api_key=${apiKey}`);
    console.log('API Response Status:', response.status);

    if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response Error:', errorText);
        throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response Data:', data);

    if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        return { lat, lon };
    } else {
        throw new Error('Location not found');
    }
};

const getLocalLeads = async (lat: number, lon: number) => {
    const url = `https://local-business-data.p.rapidapi.com/search-in-area?query=pizza&lat=${lat}&lng=${lon}&zoom=13&limit=20&language=en&region=us&extract_emails_and_contacts=true`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
            'x-rapidapi-host': 'local-business-data.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Local Leads API Response Error:', errorText);
        throw new Error(`Failed to fetch local leads: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data; // Return the array of businesses
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log('Request Body:', req.body);
        const { location } = req.body;

        if (!location) {
            res.status(400).json({ success: false, error: 'Location not provided' });
            return;
        }

        const coordinates = await getCoordinates(location);
        const localLeads = await getLocalLeads(coordinates.lat, coordinates.lon);

        res.status(200).json({ success: true, coordinates, localLeads });
    } catch (error) {
        console.error('Errors:', "error.message");
        res.status(500).json({ success: false, error: "error.message" });
    }
}
