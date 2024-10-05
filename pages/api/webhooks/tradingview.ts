
// Define an interface for the query parameters
interface QueryParams {
  symbol: string;
  interval: string;
  theme: string;
}

// Async function to fetch chart data
export const fetchChartData = async (): Promise<void> => {
  // Replace with your actual API key or securely store it in environment variables
  const apiKey = process.env.CHART_API;

  // Define the API endpoint
  const url = 'https://api.chart-img.com/v1/tradingview/advanced-chart/storage';

  // Set up query parameters
  const params: QueryParams = {
    symbol: 'SKILLING:XBRUSD',
    interval: '1h',
    theme: 'dark',
  };

  // Serialize query parameters
  const queryString = new URLSearchParams(params as unknown as Record<string, string>).toString();

  // Construct the full URL with query parameters
  const fullUrl = `${url}?${queryString}`;

  try {
    // Make the GET request using fetch
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        // Optionally include other headers
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response data as JSON
    const data = await response.json();

    // Log the response data
    console.log(data);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching chart data:', error);
  }
};

// Call the function to execute the fetch request
