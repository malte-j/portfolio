import "./src/styles/global.scss"
const theme = localStorage.getItem('theme') || "light";
document.body.dataset.theme = theme