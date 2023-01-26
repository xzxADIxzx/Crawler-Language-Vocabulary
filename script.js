var root = "https://raw.githubusercontent.com/xzxADIxzx/Crawler-Language-Vocabulary/main";
var content = document.getElementById("content");

// #region language

var vocabulary;
fetch(root + "/language/vocabulary.json").then(response => vocabulary = response.json())

// #endregion
// #region build

var navs = document.querySelectorAll("nav > a")
navs.forEach(nav => nav.addEventListener("click", () => load(nav.href.split('#')[1])))

async function load(page) {
    await fetch(root + "/pages/" + page + ".html")
        .then(response => response.text())
        .then(html => content.innerHTML = html)

    if (page == "vocabulary") buildVocabulary();
}

function buildVocabulary() {
    var list = document.getElementById("word-list")
    var template = list.innerHTML

    list.innerHTML = ""
    vocabulary.forEach(word => {
        list.innerHTML += template.replace("#word", word.word).replace("#translation", word.noun)
    });
}

// #endregion

load("about")