const url = "https://739c-188-237-141-73.ngrok-free.app/jokes";
const joke_likes =   document.getElementById("like") as HTML;
const joke_dislikes =   document.getElementById("dislike") as HTMLElement;
const joke_text = document.getElementById("joke") as HTMLInputElement;
const joke_punchline = document.getElementById("punchline") as HTMLInputElement;
const next_joke = document.getElementById("next") as HTMLButtonElement;

let jokes:any = [];

let current_joke = jokes[Math.floor(Math.random() * jokes.length)];


class Joke{
    id: number;
    joke: string;
    punchline: string;
    likes: number;
    dislikes: number;
    constructor(id: number, joke: string, punchline: string, likes: number, dislikes: number){
        this.id = id;
        this.joke = joke;
        this.punchline = punchline;
        this.likes = likes;
        this.dislikes = dislikes;
    }

    setJoke(){
        joke_text.innerHTML = this.joke;
        joke_punchline.innerHTML = this.punchline;
        joke_likes.innerHTML = this.likes.toString();
        joke_dislikes.innerHTML = this.dislikes.toString();
    }

    like(){
        this.likes++;
        this.setJoke();
        this.patchJoke();
    }

    dislike(){
        this.dislikes++;
        this.setJoke();
        this.patchJoke();
    }

    static nextJoke(){
        current_joke = jokes[Math.floor(Math.random() * jokes.length)];
        current_joke.setJoke();
    }

    patchJoke(){
        
    }

}


async function main() {
    try{
        const response = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            }),
        });

        if(!response.ok){
            throw new Error("Server is down");
        }

        const data:any = await response.json();

        jokes = data.map(x => new Joke(x.id, x.setup, x.punchline, x.likes, x.dislikes));
        
        if(jokes.length === 0){
            throw new Error("No jokes found");
        }else if(jokes.length > 0){
            current_joke = jokes[Math.floor(Math.random() * jokes.length)];
            current_joke.setJoke();
        }

        console.log(jokes);

        for (let x in jokes){
            console.log(x);
        }

        console.log(jokes[0].id);
        
        console.log(jokes);

        
    }catch(error){
        console.error(error);
    }


}

main();

for(let x = 0; x < jokes.length; x++){
    if(jokes.id[x] === 1){
        console.log(jokes[x]);
    }
}


next_joke.addEventListener("click", Joke.nextJoke);
joke_likes.addEventListener("click", current_joke.like);
joke_dislikes.addEventListener("click", current_joke.dislike);
