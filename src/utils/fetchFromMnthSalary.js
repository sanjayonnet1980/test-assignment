
export async function fetchFromSalaryMnth() {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbwPzEZHZ1tgce4CKA52XXo4py7Eb2c7quZJyVmc9sbHs5qSPiedS5B9wpmfMn0lqzU9/exec'

  try {
    const response = await fetch(scriptUrl, {
      method: 'GET',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    debugger
    console.log('Response from Google Script:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}