function buildVocabulary() {
    var selected = document.getElementById("word-selected")
    var list = document.getElementById("word-list")

    list.innerHTML = list.innerHTML.repeat(vocabulary.length)
    for (let i = 0; i < vocabulary.length; i++) buildWord(list.children[i], vocabulary[i])

    var search = document.getElementById("word-search")
    var compare = (item, id, value) => item.childNodes[1].childNodes[id].innerText.toLowerCase().search(value)

    search.addEventListener("input", () => {
        var value = search.value.toLowerCase().trim()

        if (value == "")
            for (let item of list.children) item.style.display = "block"
        else
            for (let item of list.children) item.style.display = compare(item, 1, value) == -1 && compare(item, 3, value) == -1 ? "none" : "block"
    })
}

function buildWord(element, word) {
    element.children[0].children[0].innerHTML = word["word"]
    element.children[0].children[1].innerHTML = word[word["word"]]
    element.children[1].innerHTML = word["meaning"]
}
