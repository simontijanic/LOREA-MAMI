let form = document.querySelector(".form")
const body = document.querySelector("body")

html = `<form id="answerform" method='POST'>
    <label for="name">Skriv eposten din her</label><br>
    <input name="epost" type="text" for="name" placeholder="deg@afk.no"><br><br>
    <label for="answer">Skriv svaret ditt her</label><br>
    <input name="svar" type="text" for="svar"><br><br>
    <input type="submit" value="Send inn">
</form>`

form.innerHTML = html;
form.addEventListener('submit', (event)=> {
    const url = window.location;
    console.log(url);
});