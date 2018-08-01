console.log(`Hello World from app.js! 
Change this message, and make sure it changes in the browser 
to verify that you're working in the right files.`)

//user types, presses send, messages appears
//user types, presses send, send message to server, message appears
//user types, presses send, get message from field, send message to server, message appears
//user types, presses send, get message from field, send message to server, [get message list from server, message appears]




let showMessagesOnDOM = function(messages){
    // console.log(`here are your messages`, messages)
    let messageUL = document.querySelector(`ul.messages`)
    let messagesOnDOM = []

    messageUL.innerHTML = ``

    // while (messagesUL.children.length){
    //     messagesUL.removeChild(messagesUL.children[0])
    // }

    messages.forEach(function(message) {
        let newMessage = document.createElement(`li`)

        newMessage.innerHTML = `${message.user} [${moment(message.time).format(`M-DD [at] h:mm:ss a`)}]: ${message.text} `

        let delButton = document.createElement(`button`)
        delButton.textContent = `delete`
        delButton.addEventListener(`click`, function(e) {
            axios.delete(`http://localhost:1337/message`, { data: { id: messages.indexOf(message) }})
            .then(function(response) {
                let index = messages.indexOf(message)
                console.log(`server responded`, response)
                messageUL.removeChild(messageUL.children[index])
            })
        })

        messagesOnDOM.push(message)

        newMessage.appendChild(delButton)
        messageUL.appendChild(newMessage)

    })
}

let messagesOnLoad = function(){
    axios.get(`http://localhost:1337/message`, 
    // { params: { id: time } }
    )
    .then(function(response){
    showMessagesOnDOM(response.data)
    })
}

setInterval(function() {
    axios.get(`http://localhost:1337/message`)
        .then(function(response){
        messagesOnLoad()
    })
}, 500); 

let sendMessage = function(){
    let field = document.querySelector(`input[name="new-message"]`)
    let username = document.querySelector(`input[name="username"]`)

    if (`field.value`){
        console.log(`send to server:`, field.value)
        axios.post(`http://localhost:1337/message`,{
            user: username.value,
            text: field.value,
            time: new Date(),
        })
        .then(function(response) {
            field.value = ``
            console.log(`server responded`, response)
        })
        .catch(function(error) {
            console.log(`no message sent`)
        })
    }
}


messagesOnLoad()
document.querySelector(`button.send`).addEventListener(`click`, sendMessage)
document.querySelector(`input[name="new-message"]`).addEventListener(`keypress`, function (e) {
    if (e.key === `Enter`) {
      sendMessage()
    }
});