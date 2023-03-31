document.addEventListener("DOMContentLoaded", function() {
    const ul = document.getElementById('list')
    const userUl = document.createElement('ul')
    const showPanel = document.getElementById('show-panel')
    
    function fetchBooks() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => data.forEach(element => {
        populateList(element)
    }))
  }
  function populateList(element) {
    const li = document.createElement('li')
    li.innerText = element.title
    ul.appendChild(li)
    li.addEventListener('click', () => displayBook(element) )
  }
  function displayBook(element) {
        showPanel.innerHTML = ''
        const img = document.createElement('img')
        img.src = element.img_url
        showPanel.appendChild(img)
        const p = document.createElement('p')
        p.innerText = element.description
        showPanel.appendChild(p)
        showPanel.appendChild(userUl)
        const likeButton = document.createElement("button")
        likeButton.innerText = "like"
        showPanel.appendChild(likeButton)
        likeButton.addEventListener('click', () => newLike(element))
        userUl.innerHTML = ''
        element.users.forEach(user => {
            listUser(user)
        });
  }
  function listUser(user) {
    
    const userLi = document.createElement('li')
    userLi.innerText = user.username
    userUl.appendChild(userLi)
  }
  function newLike(element) {
    fetch(`http://localhost:3000/books/${element.id}`, {
        method:'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json",
        },
        body: JSON.stringify({
         users: [...element.users, {
            id:11,
            username: 'joshua'}]
    })
    }).then(res => res.json())
    .then(data => displayBook(data))
  }
  fetchBooks()
});
