// #region build

function buildLearn() {
    var list = document.getElementById("alphabet").children[0]
    var btns = document.getElementsByName("alphabet-type")

    btns[0].onclick = () => buildAlphabet(list, "<div> # </div>", "printed")
    btns[1].onclick = () => buildAlphabet(list, "<img src=\"./language/alphabet/#\">", "written")
    btns[2].onclick = () => buildAlphabet(list, "<div> # </div>", "name")
    btns[0].onclick();
}

function buildAlphabet(list, template, key) {
    list.innerHTML = ""
    for (let char of alphabet) list.innerHTML += template.replace("#", char[key])
}

// #endregion
