// #region build

var list

function buildLearn() {
    list = document.getElementById("alphabet").children[0]
    buildAlphabet("<div> I </div>", "printed")

    var radio = document.getElementsByName("alphabet-type")
    radio[0].onclick = () => buildAlphabet("<div> I </div>", "printed")
    radio[1].onclick = () => buildAlphabet("<img src=\"./language/alphabet/I\">", "written")
    radio[2].onclick = () => buildAlphabet("<div> I </div>", "name")
}

function buildAlphabet(template, key) {
    list.innerHTML = ""
    for (let char of alphabet) list.innerHTML += template.replace("I", char[key])
}

// #endregion
