let word;
let wrong = 0;
window.onload = function(){
  for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); ++i) {
    let button = document.createElement('button')
    button.className = "btn btn-primary button"
    button.id = String.fromCharCode(i)
    button.setAttribute('onclick','hide(id)')
    button.innerHTML = String.fromCharCode(i)

    let el = document.getElementById('alphabet')
    el.appendChild(button)
  }
  get_word()
}

function show_hidden(word){
  hidden_char = ''
  for(let i = 0; i < word.length; ++i){
    hidden_char += '_ '
  }
  document.getElementById('word').innerHTML = hidden_char
}
function hide(id) {
  let el = document.getElementById(id)
  el.style.visibility = 'hidden';
  guess(id);
}

function get_word(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      word = JSON.parse(this.responseText).word
      show_hidden(word)
    }
  }
  xhttp.open('get','/word',true)
  xhttp.send()
}

function guess(id){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange =  function(){
    if(this.readyState == 4 && this.status == 200){
      let payload = JSON.parse(this.responseText)
      grade(payload)
    }
  }
  let payload = JSON.stringify({
    id : id
  })
  xhttp.open('post','/guess',true)
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send('id='+id)
}

function grade(payload){
  let pos = payload.pos
  if(pos.length === 0){
    run_animation()
    return;
  }
  
  let id = payload.id
  let el = document.getElementById('word')
  let rem_char = el.innerHTML;
  let guess_char = ''
  for(let i = 0; i < word.length; ++i){
    if (pos.includes(i) && rem_char[i*2] == '_'){
      guess_char += id 
    }else{
      guess_char += rem_char[i*2]
    }
    guess_char += ' '
  }
  document.getElementById('word').innerHTML = guess_char
  if(!guess_char.includes('_')){
    alert('ANDA MENANG')
    window.location = '/'
  }
}

function run_animation(){
  wrong++;
  if(wrong > 6){
    alert('ANDA KALAH')
    window.location = '/'
  } 
  let img = document.getElementById('image')
  img.src = "images/hangman" + wrong + '.png'
}