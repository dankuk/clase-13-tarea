const socket = io();

let email = document.getElementById("email");
let msg = document.getElementById("msg");

let output = document.getElementById('output');
let escribiendo = document.getElementById('idEscribiendo');

let btn = document.getElementById("guardar");

if (btn) {
  btn.addEventListener("click", () => {
    if(email.value != "" && msg.value ){
      mensaje = {
        email: email.value,
        msg: msg.value,
        fecha: new Date(),
      };
      // console.log(mensaje);
      socket.emit("chat:nuevoMensaje", mensaje);
    }else{
      alert("Debe rellenar todos los campos")
    }
    
  });
}

msg.addEventListener('keypress', () => {
  socket.emit("chat:escribiendo", email.value);
})

socket.on("chat:MensajeParaTodos", (mensaje) => {
  console.log("refrezcar datos!!!");
  console.log(mensaje);
  escribiendo.innerHTML = "";
  output.innerHTML += `<p>
  <strong>${mensaje.email} : </strong> ${mensaje.msg}<br>
  <small>${mensaje.fecha}</small>
  </p>`;
});

socket.on('chat:escribiendo', (email) =>{
  escribiendo.innerHTML = `<small>el usuario ${email} esta escribiendo</small>`;
})
