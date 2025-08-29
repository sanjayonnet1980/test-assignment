
export async function fetchFromCreditCardInv() {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxsmd82M_YmA3EE-69-0UdTt0JypEbXjue7pT-5Ub9UAYYQaYs1R_zcLru70vGJ_yhB/exec'

  try {
    const response = await fetch(scriptUrl, {
      method: 'GET',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log('Response from Google Script:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}