var root = "https://raw.githubusercontent.com/xzxADIxzx/Crawler-Language-Vocabulary/main"
var content = document.getElementById("content")

fetch(root + "/language/vocabulary.json").then(response => response.json()).then(json => this.vocabulary = json)

// #region build

var navs = document.querySelectorAll("nav > a")
navs.forEach(nav => nav.addEventListener("click", () => load(nav.href.split('#')[1])))

function load(page) {
    fetch(root + "/pages/" + page + ".html")
        .then(response => response.text())
        .then(html => content.innerHTML = html)
        .finally(() => {
            if (page == "vocabulary") buildVocabulary()
        })
}

// #endregion

load("about")