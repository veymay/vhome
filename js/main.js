let searchInp = document.querySelector('.search_input')
let searchBtn = document.querySelector('.search_btn')
let addBookmarkBtn = document.querySelector('.add_bookmark')
let bookmarksList = document.querySelector('ul.bookmarks')
let modal = document.querySelector('.modal')
let modalBg = document.querySelector('.modal>.backdrop')
let addSiteImg = document.querySelector('.add_site>.avatar>img')
let addSiteInp = document.querySelector('.add_site>input')
let addSiteBtn = document.querySelector('.add_site>button')
let alertInfo = document.querySelector('.alert')
let items = document.querySelectorAll('ul.bookmarks>li>a')
let bookmarkUrlList = JSON.parse(localStorage.getItem('urls')) ? JSON.parse(localStorage.getItem('urls')) : []


document.addEventListener('dblclick', () => {
  items.forEach(item => {
    item.classList.toggle('edit')
  })
})

// Modal
addBookmarkBtn.addEventListener('click', () => {
  addSiteInp.focus()
  modal.classList.add('active')
})

modalBg.addEventListener('click', () => {
  modal.classList.remove('active')
})

document.addEventListener('keydown', () => {
  if (modal.classList.contains('active')) {
    addSiteInp.focus()
  }
})

// Add Site
addSiteBtn.addEventListener('click', () => {
  addBookmark()
})
document.addEventListener('keyup', (e) => {
  if (e.which == 107) {
    addSiteInp.focus()
    modal.classList.add('active')
  }
})
document.addEventListener('keyup', (e) => {
  e.which == 27 ? modal.classList.remove('active') : null
})
function addBookmark() {
  if (!bookmarkUrlList.includes(addSiteInp.value)) {
    bookmarkUrlList.push(addSiteInp.value)
    addSiteInp.value = ''
    addSiteImg.setAttribute('src', '')
    modal.classList.remove('active')
    localStorage.setItem('urls', JSON.stringify(bookmarkUrlList))
    showUrls()
  } else {
    alertInfo.classList.add('animate__flipInX')
    alertInfo.classList.add('active')
    setTimeout(() => {
      alertInfo.classList.remove('animate__flipInX')
      alertInfo.classList.add('animate__flipOutX')
      setTimeout(() => {
        alertInfo.classList.remove('animate__flipOutX')
        alertInfo.classList.remove('active')
      }, 1000)
    }, 3000)
  }
}
function showUrls() {
  bookmarksList.innerHTML = ''
  bookmarkUrlList.forEach((url, i) => {
    bookmarksList.innerHTML += `<li><a href="https://${url}"><img src="https://www.google.com/s2/favicons?sz=256&domain_url=${url}" alt=""><div class="edit"><i class="fi fi-br-pen-nib"></i> </div><div class="remove" onclick='event.preventDefault();remove(${i})'><i class="fi fi-br-cross-small"></i></div></a></li>`
  });
  itemRemove = document.querySelectorAll('.remove')
  items = document.querySelectorAll('ul.bookmarks>li>a')
}
showUrls()

// Remove Items
function remove(i) {
  bookmarkUrlList.splice(i, 1)
  localStorage.setItem('urls', JSON.stringify(bookmarkUrlList))
  showUrls()
}


addSiteInp.addEventListener('keyup', () => {
  addSiteImg.setAttribute('src', `https://www.google.com/s2/favicons?sz=128&domain_url=${addSiteInp.value}`)
})

searchInp.addEventListener('keyup', () => {
  if (searchInp.value.length > 0) {
    searchInp.classList.add('active')
    searchBtn.classList.add('active')
  } else {
    searchInp.classList.remove('active')
    searchBtn.classList.remove('active')
  }
})
