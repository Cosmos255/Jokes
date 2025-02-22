const url = "http://localhost:3000/jokes";
const button = document.getElementById("submit") as HTMLButtonElement;
const like =   document.getElementById("like")  as HTMLButtonElement;
const dislike =   document.getElementById("dislike") as HTMLButtonElement;

let jokes:any = [];

async function main() {
    try{
        const response = await fetch(url);
        const data:any = await response.json();

        jokes = data.map(x => ({
            id: x.id,
            joke: x.joke,
            punchine: x.punchline,
            likes: x.likes,
            dislikes: x.dislikes
        }));

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

let requestedJoke = jokes.find(x => x.id === 1);