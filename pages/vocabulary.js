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
    })
}