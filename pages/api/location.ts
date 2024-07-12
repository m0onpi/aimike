import type { NextApiRequest, NextApiResponse } from 'next';

const getCoordinates = async (location: string) => {
    const apiKey = process.env.GEOCODING_API_KEY; // Use a geocoding API service like OpenCage, MapQuest, or Google Maps
    if (!apiKey) {
        throw new Error('Geocoding API key not found');
    }

    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { lat, lng };
    } else {
        throw new Error('Location not found');
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { location } = req.body;

        if (!location) {
            res.status(400).json({ success: false, error: 'Location not provided' });
            return;
        }

        const coordinates = await getCoordinates(location);
        res.status(200).json({ success: true, coordinates });
    } catch (error) {
        console.error('Error fetching coordinates:', 'Internal Server Error');
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
