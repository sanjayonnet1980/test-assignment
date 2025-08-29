
export async function fetchFromScript() {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxYahhLhJpu8fCmOxiyNj1jpY_ntK8qGhL2r5Q35BI6DyHMdbYNTknfips3ggGYP7I_/exec'; // Replace with your actual URL

  try {
    const response = await fetch(scriptUrl, {
      method: 'GET', // or 'POST'
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