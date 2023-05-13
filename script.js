var root = "https://raw.githubusercontent.com/xzxADIxzx/Crawler-Language-Vocabulary/main"
var content = document.getElementById("content")

// #region language

class Word {

    constructor(data) {
        this.data = data
        this.building = null
    }

    build(building) {
        this.building = building

        var original = building.children[0].children[0]
        var translation = building.children[0].children[1]
        var get = i => building.children[1].children[i]

        var verb = get(0)
        var perfect = get(1)
        var participle = get(2)
        var adjective = get(3)
        var forced = get(4)

        var rebuild = () => {
            var builder = []

            if (participle.checked && !participle.disabled) builder.push("na")
            if (adjective.checked && !adjective.disabled) builder.push(forced.checked ? "tha" : "la")
            builder.push(this.data.word)
            if (verb.checked && !verb.disabled) builder.push(perfect.checked ? "`in" : "`i")

            var word = builder.join("")

            original.innerHTML = word
            translation.innerHTML = this.data[word]
        }
        rebuild()

        verb.onclick = () => {
            perfect.disabled = participle.disabled = !verb.checked
            rebuild()
        }
        perfect.onclick = rebuild
        participle.onclick = () => {
            adjective.disabled = participle.checked
            forced.disabled = participle.checked || !adjective.checked
            rebuild()
        }
        adjective.onclick = () => {
            forced.disabled = !adjective.checked
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
            if (page == "vocabulary") buildVocabulary()
        })
}

// #endregion

load("about")