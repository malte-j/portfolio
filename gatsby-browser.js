import "./src/styles/global.scss"
import "./src/styles/space-mono.scss"
const theme = localStorage.getItem('theme') || "light";
document.body.dataset.theme = theme