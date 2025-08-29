
export async function fetchPost(url, params) {
  try {
    const stringifiedParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {});

    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(stringifiedParams).toString(),
    });

    if (!response.ok) {
      console.error(`HTTP error: ${response.status}`);
      return null;
    }

    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('Fetch POST error:', error);
    return null;
  }
}