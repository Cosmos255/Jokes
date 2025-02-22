const addJoke = document.getElementById("addJoke") as HTMLButtonElement;
const joke = document.getElementById("joke") as HTMLInputElement;
const punchline = document.getElementById("punchline") as HTMLInputElement;

addJoke.addEventListener("click", async () => {
    try{
        if(joke.value === "" || punchline.value === ""){
            throw new Error("Please fill out both fields");
        }
        const Jokeadd_data = {
            Joke: joke.value,
            Punchline: punchline.value
        };

        const response = await fetch("https://739c-188-237-141-73.ngrok-free.app",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Jokeadd_data)
        })

        if(response.ok){
            window.alert("Joke added successsfully");
        }else{
            alert("Joke not added");
        }


    }
    catch(error){
        console.error("Error submiting data server might be down" + error);
    }
});