const apiKey = '5b3f64cf3cdb328d89d273c40a42be0c'
const pesquisa = 'https://api.themoviedb.org/3/search/movie'
const em_alta = `https://api.themoviedb.org/3/movie/popular?api_key=5b3f64cf3cdb328d89d273c40a42be0c&language=pt-BR&page=1`

const frmPesquisa = document.querySelector("form")

frmPesquisa.onsubmit = (ev) =>{
    ev.preventDefault()

    const pesquisa = ev.target.pesquisar.value

    if(pesquisa == ''){
        alert("Preencha este campo para pesquisar")
        return
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${pesquisa}`)
    .then(result => result.json())
    .then(json => carregaLista(json))

}

const carregaLista = (json) => {
    const lista = document.querySelector("div.lista")
    lista.innerHTML = ""
    json.results.forEach(element =>{
        console.log(element)

        let item = document.createElement("div")
        item.classList.add("filmes")

        item.innerHTML = `<img src="${element.poster_path}" /> <h2>${element.title}</h2>` 

        lista.appendChild(filmes)
    })
   
}


async function pesquisaEmAlta() {
    const resposta = await fetch(em_alta);
    const dados = await resposta.json();
    exibirCarrossel(dados.results);
}

function exibirCarrossel(filmes) {
    const carrosselContainer = document.querySelector('.carrossel');
    carrosselContainer.innerHTML = ''; 
    

    filmes.forEach(filme => {
     
        const imagem = document.createElement('img');
        imagem.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
        imagem.alt = filme.title;

        carrosselContainer.appendChild(imagem);
    });


    let index = 0;
    setInterval(() => {
        
        carrosselContainer.scrollLeft = index * carrosselContainer.clientWidth;
        index = (index + 1) % filmes.length; // 
    }, 3000); 
}

pesquisaEmAlta();

