
export const fetchPostSIP = async (form) => {
    try {
        const response = await fetch("http://localhost:3001/mutualfund", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            throw new Error(`Failed to post: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Error posting SIP:", error);
    }
};