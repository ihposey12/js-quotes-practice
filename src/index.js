getQuotes(quotesURL)
const rootURL = 'http://localhost:3000/quotes'
const quoteURL = `${rootURL}?_embed=likes`
const form = document.querySelector('form')
form.addEventListener('submit', handleSubmit)
function handleSubmit(e) {
    e.preventDefault
    fetch(rootURL, {
        method: "POST",
        header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            author: e.target.author.value
            quote: e.target.quote.value
            likes: []
        })
    })
    .then(res => res.json())
    .then(quote => {
        newCard = addQuoteToCard(quote, buildQuoteCard())
        document.querySelector('#quote-list').append(newCard)
    })
}
function getQuotes(url) {
    fetch(url)
    .then(res => res.json())
    .then(quotes => {
        quotes.forEach(quote => {
            newCard = addQuoteToCard(quote, buildQuoteCard())
            document.querySelector('#quote-list').append(newCard)
        })
    })
}
function addQuoteToCard(quote, card) {
    card.id = quote.id
    card.querySelector('p').textContent = quote.quote
    card.querySelector('footer').textContent = quote.author
    card.querySelector('span').textContent = quote.likes.length
    card.querySelector('.btn-danger').addEventListener('click', () => removeQuote(card))
    card.querySelector('.btn-success').addEventListener('click', () => addLike(card))
    return card
}
const removeQuote = card => {
    //OPTIMISTIC - document.getElementById(card.id).remove
    fetch(`${rootURL}/${card.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(() => {
        //PESIMISTIC - document.getElementById(card.id).remove
    }
}
function addLike(card) {
    fetch('http://localhost:3000/quotes/likes', {
        method: "POST",
        header: {
            'Content-Type'; 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            quoteId: parseInt(card.id)
        })
    })
    .then(res => res.json())
    .then(like => {
        quote = document.getElementById(like.quoteId)
        likes = quote.querySelector('span').textContent
        likeContainer = document.getElementById(like.quoteId).querySelector('span')
        likeContainer.textContent = parseInt(likes) + 1
    })
}
function buildQuoteCard() {
    const li = document.createElement('li')
    const bc = document.createElement('blockquote')
    const p = document.createElement('p')
    const footer = document.createElement('footer')
    const br = document.createElement('br')
    const btn1 = document.createElement('button')
    const span = document.createElement('span')
    const btn2 = document.createElement('button')
    li.className = 'quote-card'
    bc.className = 'blockquote'
    p.classname = 'mb-0'
    footer.className = 'blockquote-footer'
    btn1.className = 'btn-success'
    btn2.className = 'btn-danger'
    btn1.textContent = 'Likes: '
    btn2.textContent = 'Delete'
    btn2.addEventListener('click', removeQuote)
    li.appendChild(bc)
    btn1.appendChild(span)
    bc.append(p, footer, br, btn1, btn2)
}