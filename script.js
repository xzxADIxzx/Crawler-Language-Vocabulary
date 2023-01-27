var root = "https://raw.githubusercontent.com/xzxADIxzx/Crawler-Language-Vocabulary/main";
var content = document.getElementById("content");

// #region language

class Word {

    constructor(data) {
        this.data = data;
        this.building = null;

        this.get = (i) => this.building.children[1].children[i].checked
        this.set = (i, value) => this.building.children[1].children[i].checked = value
    }

    build() {
        for (let child of this.building.children[1].children) child.onclick = () => this.rebuild()
        this.rebuild()
    }

    rebuild() {
        var original = this.building.children[0].children[0]
        var translation = this.building.children[0].children[1]

        var verb = this.get(1)
        var perfectVerb = this.get(3)
        var adjective = this.get(5)

        original.innerHTML = (adjective ? "la" : "") + this.data.word + (verb ? "`i" : perfectVerb ? "`in" : "")
        translation.innerHTML = this.data[
                verb ? (adjective ? "adj#verb" : "verb") :
                perfectVerb ? (adjective ? "adj#perfect-verb" : "perfect-verb") : "noun"]
    }
}

fetch(root + "/language/vocabulary.json").then(response => response.json()).then(json => this.vocabulary = json.map(data => new Word(data)))

// #endregion
// #region build

var navs = document.querySelectorAll("nav > a")
navs.forEach(nav => nav.addEventListener("click", () => load(nav.href.split('#')[1])))

function load(page) {
    fetch(root + "/pages/" + page + ".html")
        .then(response => response.text())
        .then(html => content.innerHTML = html)
        .finally(() => {
            if (page == "vocabulary") buildVocabulary();
        })
}

function buildVocabulary() {
    var list = document.getElementById("word-list")
    list.innerHTML = list.innerHTML.repeat(vocabulary.length)

    for (let i = 0; i < vocabulary.length; i++) vocabulary[i].building = list.children[i]
    vocabulary.forEach(word => word.build())

    var search = document.getElementById("word-search")
    var compare = (item, id, value) => item.childNodes[1].childNodes[id].innerText.toLowerCase().search(value)

    search.addEventListener("input", () => {
        var value = search.value.toLowerCase().trim()
        var items = document.getElementsByClassName("word")

        if (value == "")
            for (let item of items) item.style.display = "block"
        else
            for (let item of items) item.style.display = compare(item, 1, value) == -1 && compare(item, 3, value) == -1 ? "none" : "block"

        let i = 0;
        for (let item of items) {
            if (item.style.display == "none") continue;
            item.style.marginRight = i++ % 2 == 0 ? "32px" : "0px"
        }
    })
    search.dispatchEvent(new Event("input"))
}

// #endregion

load("about")