export async function getLogin(username, password, router, setErrorMessage) {
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
    
        if (data.success) {
            router.push("/dashboard");
        } 
        else {
            setErrorMessage(data.message || "Invalid username or password");
        }
    }
    catch (error) {
        console.error("Login error", error);
        setErrorMessage("An error occurred. Please try again.");
    }
}
  