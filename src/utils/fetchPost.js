export async function fetchPost(url, params) {
  try {
    const stringifiedParams = Object.entries(params).reduce((acc, [key, value]) => {
      acc[key] = String(value);
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

    return await response.json();
  } catch (error) {
    console.error('Fetch POST error:', error);
    return null;
  }
}