document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.form');
    const body = document.querySelector('body');

    if (formContainer) {
        formContainer.innerHTML =  `
        <form id="answerform" method="POST">
            <label for="name">Skriv eposten din her</label><br>
            <input name="epost" type="text" id="name" placeholder="deg@afk.no"><br><br>
            <label for="answer">Skriv svaret ditt her</label><br>
            <input name="svar" type="text" id="answer"><br><br>
            <input type="submit" value="Send inn">
        </form>
    `;

        const form = document.querySelector('#answerform');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const url = window.location.href;
            console.log(url);
        });
    }
});