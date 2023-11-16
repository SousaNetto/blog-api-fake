async function readPosts() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'CARREGANDO...'

    let response = await fetch ('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if (json.length > 0) {
        postArea.innerHTML = ''

        for(let i in json) {
            let postHtml = `<div><h1>${json[i].title}</h1>${json[i].body}</div>`
            postArea.innerHTML += postHtml;
        }
    } else {
        postArea,innerHTML = 'Nenhum post para exibir'
    }

}
async function addNewPost(title, body) {
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        }
    );

    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';
    
    readPosts();
}
document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if(title && body) {
        addNewPost(title, body)
    } else {
        alert('Preencha todos os campos.')
    }
})


// modo escuro
let botaoCor = document.querySelector('#modoEscuro')
let body = document.querySelector('body')
let darkmode = false;

botaoCor.addEventListener('click', trocarCor);

function trocarCor() {
    if(darkmode != false) {
        body.classList.remove('dark-mode');
        // body.classList.add('posts-dark');
        darkmode = false
    } else {  
        body.classList.add('dark-mode');
        darkmode = true;
    }
}

readPosts();