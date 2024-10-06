
// Define an interface for the query parameters
interface QueryParams {
  symbol: string;
  interval: string;
  theme: string;
}

interface MessageObject {
    message: string;
  }

// Async function to fetch chart data
export const fetchChartData = async (message: Partial<{ [key: string]: string | string[]; }>): Promise<void> => {
  // Replace with your actual API key or securely store it in environment variables
  const apiKey = process.env.CHART_API;
  const discordWebhook = process.env.DISCORD_API || ''
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

    const data = await response.json();
    const imgLink = data.url;
    const further = JSON.stringify(message)
    // Step 1: Check if 'buy' or 'sell' is in the message

    let action = '';

    if (further.includes('buy')) {
      action = 'buy';
    } else if (further.includes('sell')) {
      action = 'sell';
    } else {
      action = 'unknown';
    }

    // Step 2: Prepare the payload for Discord webhook
    const payload = {
      content: '', // Leave empty when using embeds
      embeds: [
        {
          title: 'Trade Alert',
          description: message.message,
          color: action === 'buy' ? 0x00ff00 : action === 'sell' ? 0xff0000 : 0x0000ff,
          fields: [
            {
              name: 'Action',
              value: action.toUpperCase(),
              inline: true,
            },
          ],
          image: {
            url: imgLink,
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Stringify the payload
    const body = JSON.stringify(payload);

    // Step 3: Send the payload to Discord webhook
    try {
      const discordResponse = await fetch(discordWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!discordResponse.ok) {
        throw new Error(`Error sending message to Discord: ${discordResponse.statusText}`);
      }

      console.log('Message sent to Discord webhook successfully.');
    } catch (error) {
      console.error('Error sending message to Discord webhook:', error);
    }

    // Return the data if needed
    return data;

    // Log the response data
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching chart data:', error);
  }
};

// Call the function to execute the fetch request
