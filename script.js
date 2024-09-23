var root = "https://raw.githubusercontent.com/xzxADIxzx/Crawler-Language-Vocabulary/main"
var content = document.getElementById("content")

fetch(root + "/language/alphabet.json").then(response => response.json()).then(json => this.alphabet = json)
fetch(root + "/language/vocabulary.json").then(response => response.json()).then(json => this.vocabulary = json)

// #region build

var navs = document.querySelectorAll("nav > a")
navs.forEach(nav => nav.addEventListener("click", () => load(nav.href.split('#')[1])))

function load(page) {
    fetch(root + "/pages/" + page + ".html")
        .then(response => response.text())
        .then(html => content.innerHTML = html.replace("<details>", "<details open><summary><div></div></summary>"))
        .finally(() => {
            if (page == "learn") buildLearn()
            if (page == "vocabulary") buildVocabulary()
        })
}

// #endregion

load("about")
