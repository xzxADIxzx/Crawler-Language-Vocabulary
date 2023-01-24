var navs = document.querySelectorAll("nav > a")
navs.forEach(nav => nav.addEventListener("click", () => load(nav.href.split('#')[1])))

async function load(page) {
    await fetch("https://raw.githubusercontent.com/xzxADIxzx/Crawler-Language-Vocabulary/main/pages/" + page + ".html").then((response) => {
        document.getElementById("content").innerText = response.text()
    })
}