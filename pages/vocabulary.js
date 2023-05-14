var selected, data
var original, translation, verb, perfect, participle, adjective, forced

function update() {
    verb.disabled = data == null;
    perfect.disabled = participle.disabled = !verb.checked || verb.disabled

    adjective.disabled = data == null || participle.checked;
    forced.disabled = !adjective.checked || adjective.disabled || !verb.checked

    if (data == null) {
        original.innerHTML = "Word"
        translation.innerHTML = "Translation"

        return;
    }

    var builder = []

    if (participle.checked && !participle.disabled) builder.push("na")
    if (adjective.checked && !adjective.disabled) builder.push(forced.checked && !forced.disabled ? "tha" : "la")
    builder.push(data.word)
    if (verb.checked && !verb.disabled) builder.push(perfect.checked ? "`in" : "`i")

    var word = builder.join("")

    original.innerHTML = word
    translation.innerHTML = data[word]
}

function select(element) {
    element.style.borderColor = selected == element ? "" : "#bf92f9"

    if (selected == element)
        selected = data = null
    else {
        if (selected != null) selected.style.borderColor = "";

        selected = element
        data = vocabulary.find(data => data.word == element.children[0].children[0].innerHTML)
    }

    update()
}

// #region build

function buildVocabulary() {
    buildForm(document.getElementById("word-form"))
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

    update()
}

function buildForm(form) {
    var get = (i, j) => {
        var checkbox = form.children[i].children[j]
        checkbox.onclick = update
        return checkbox
    }

    original = get(0, 0)
    translation = get(0, 1)
    verb = get(1, 0)
    perfect = get(1, 1)
    participle = get(1, 2)
    adjective = get(1, 3)
    forced = get(1, 4)
}

function buildWord(element, word) {
    element.children[0].children[0].innerHTML = word["word"]
    element.children[0].children[1].innerHTML = word[word["word"]]
    element.children[1].innerHTML = word["meaning"]

    element.onclick = () => select(element)
}

// #endregion
