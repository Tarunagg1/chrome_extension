let jokeElement = document.getElementById("joke");

fetch('https://icanhazdadjoke.com/slack').then((data) => data.json())
.then((response) =>{
    console.log(response);
    const jsonText = response.attachments[0].text;
    jokeElement.innerHTML = jsonText;
})
.catch((error) => {
    console.log(error);
})


