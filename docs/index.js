"use strict";
const url = "https://739c-188-237-141-73.ngrok-free.app/jokes";
const button = document.getElementById("submit");
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");
let jokes = [];
async function main() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            }),
        });
        if (!response.ok) {
            throw new Error("Server is down");
        }
        const data = await response.json();
        jokes = data.map(x => ({
            id: x.id,
            joke: x.joke,
            punchine: x.punchline,
            likes: x.likes,
            dislikes: x.dislikes
        }));
        console.log(jokes);
        for (let x in jokes) {
            console.log(x);
        }
        console.log(jokes[0].id);
        console.log(jokes);
    }
    catch (error) {
        console.error(error);
    }
}
main();
for (let x = 0; x < jokes.length; x++) {
    if (jokes.id[x] === 1) {
        console.log(jokes[x]);
    }
}
let requestedJoke = jokes.find(x => x.id === 1);
