const socket = io();

const handle = document.querySelector('#handle');
const message = document.querySelector('#message');
const btn = document.querySelector('#send-btn');
const output = document.querySelector('#output');

let feedback = document.createElement('p');



btn.addEventListener('click', (e) => {

    feedback.innerHTML = '';
    output.appendChild(feedback);

    if(message.value && handle.value) {

        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
    
    }

    message.value = '';
    handle.value = '';
});

message.addEventListener('keypress', (e) => {
    if(handle.value) {
        socket.emit('typing', handle.value);
    }
    
});

socket.on('chat', (data) => {
   let h = document.createElement('p');
   let m = document.createElement('p');
   let card = document.createElement('div');

   h.classList.add('handle-line');
   m.classList.add('message-line');
   card.classList.add('msg-card');

   h.textContent = data.handle;
   m.textContent = data.message;

   card.appendChild(h);
   card.appendChild(m);
   
   output.removeChild(feedback);
   output.appendChild(card);

   output.scrollTop = output.scrollHeight;
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
    output.appendChild(feedback);
});

