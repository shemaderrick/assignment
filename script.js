const main = document.querySelector('main')
const header = document.querySelector('thead')
const spinner = document.querySelector('.loader')
const posts = document.getElementById('user_post')
let btnid = 1
const tbodyRef = document.querySelector('table').getElementsByTagName('tbody')[0];
const table = document.querySelector('table')
main.style.display = "none"
posts.setAttribute('id', 'user_post')

//fetch users on load
window.addEventListener('load', (event) => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((data) => {
      if (!data) {
        throw new Error()
      }
      main.style.display = 'flex'
      spinner.style.display = 'none'
      data.forEach(element => {
        const { name, email, id, phone, website, company } = element

        const btn = document.createElement('button')
        btn.innerHTML = "Get User’s Posts"
        btn.setAttribute('id', btnid)
        btnid++;
        let row = tbodyRef.insertRow()
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2)
        cell1.innerHTML = name;
        cell2.innerHTML = email;
        cell3.appendChild(btn)
        //fetch posts on button click event
        btn.addEventListener('click', (e) => {
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${e.target.id}`)
            .then(response => response.json().then((posts) => {
              const details = document.getElementById('user_details')
              details.innerHTML = ''
              var username = document.createElement('H3')
              var usernameContent = document.createTextNode(`Name:   ${name}`)
              username.appendChild(usernameContent)
              details.appendChild(username)
              var phoneNumber = document.createElement('H3')
              phoneNumber.textContent = `Tel: ${phone}`
              details.appendChild(phoneNumber)
              const webSite = document.createElement('H3')
              webSite.textContent = ` Website: ${website}`
              details.appendChild(webSite)
              const companyName = document.createElement('H3')
              companyName.textContent = `Company: ${company.name}`
              details.appendChild(companyName)
              posts.forEach((post) => {
                const posts = document.getElementById('user_post')
                posts.removeChild(posts.childNodes[1])
                let { title, body } = post
                var post_title = document.createElement("H3")
                var post_content = document.createTextNode(`Title: ${title}`);
                post_title.appendChild(post_content)
                var post_body = document.createElement("P")
                var post_body_content = document.createTextNode(body)
                post_body.appendChild(post_body_content)
                // articleOwner.textContent = name
                posts.appendChild(post_title)
                posts.appendChild(post_body)

              })

            }))

        })
      });
    })
})

