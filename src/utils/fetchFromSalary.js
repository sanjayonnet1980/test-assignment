
export async function fetchFromSalary() {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzewlYB2zoP_7Bcc9nC9y5Q_YuN7uXbwLNA7M38DQ-ISlkDrgd9mx82_U75cM5y4H0y/exec'

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