"use strict";
const addJoke = document.getElementById("addJoke");
const joke = document.getElementById("joke");
const punchline = document.getElementById("punchline");
addJoke.addEventListener("click", async () => {
    console.log("Button clicked");
    try {
        if (joke.value === "" || punchline.value === "") {
            throw new Error("Please fill out both fields");
        }
        const Jokeadd_data = {
            setup: joke.value,
            punchline: punchline.value
        };
        const response = await fetch("https://739c-188-237-141-73.ngrok-free.app/jokes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(await Jokeadd_data)
        });
        if (response.ok) {
            window.alert("Joke added successsfully");
        }
        else {
            alert("Joke not added");
        }
    }
    catch (error) {
        console.error("Error submiting data server might be down" + error);
    }
});
