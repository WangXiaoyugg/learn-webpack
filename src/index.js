import './style/index.css'
import './style/index.less'
import pic from './img/pic.jpeg'
import axios from 'axios'
axios.get('/api/info').then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})

let img = new Image()
img.src = pic;
document.body.appendChild(img)