const canvas = document.getElementById('testscene');
const ctx = canvas.getContext('2d');
const size = 30;
ctx.fillStyle = 'blue';

let x = 0;
const id = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.fillRect(x, 50, size, size);
  x += size;

  if (x >= canvas.width) {
    clearInterval(id);
  }
}, 200);