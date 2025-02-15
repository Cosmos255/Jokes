const url = "http://localhost:3000/jokes";
const button = document.getElementById("submit");
const like =   document.getElementById("like");
const dislike =   document.getElementById("dislike");



async function main() {
    try{
        const response = await fetch(url);
        const data = response.json();

        let jokes = data.map(joke => joke.joke);
        
        console.log(jokes);

        for (let x in jokes){
            console.log(x);
        }

        console.log(data);
        
        

    }catch(error){
        console.error(error);
    }


}

