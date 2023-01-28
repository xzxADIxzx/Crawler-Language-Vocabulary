var root = "https://raw.githubusercontent.com/xzxADIxzx/Crawler-Language-Vocabulary/main";
var content = document.getElementById("content");

// #region language

class Word {

    constructor(data) {
        this.data = data;
        this.building = null;
    }

    build(building) {
        this.building = building;

        var original = building.children[0].children[0]
        var translation = building.children[0].children[1]
        var get = i => building.children[1].children[i]

        var verb = get(0)
        var perfect = get(1)
        var participle = get(2)
        var adjective = get(3)
        var forced = get(4)

        var rebuild = () => {
            var options = []

            if (adjective.checked) options.push("adj")
            if (verb.checked) options.push(perfect.checked ? "perfect-verb" : "verb")

            original.innerHTML = (adjective.checked ? "la" : "") + this.data.word + (verb.checked ? (perfect.checked ? "`in" : "`i") : "")
            translation.innerHTML = this.data[options.length == 0 ? "noun" : options.join("#")]
        }
        rebuild()

        verb.onclick = () => {
            perfect.disabled = participle.disabled = !verb.checked
            rebuild()
        }
        perfect.onclick = rebuild
        participle.onclick = rebuild

        adjective.onclick = () => {
            forced.disabled = !verb.checked
            rebuild()
        }
        forced.onclick = rebuild
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

    for (let i = 0; i < vocabulary.length; i++) vocabulary[i].build(list.children[i])

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

// load("about")