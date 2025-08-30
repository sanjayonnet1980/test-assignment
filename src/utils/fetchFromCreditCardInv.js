
export async function fetchFromCreditCardInv() {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzrLLDnuAt9J4pVtZa9jOvDit3B-1ifRwea3yw8Eks0UENJzkmhUvya9BoG0TLw3Ag/exec'

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