// #region build

var list

function buildLearn() {
    list = document.getElementById("alphabet").children[0]

    var radio = document.getElementsByName("alphabet-type")
    radio[0].onclick = buildPrinted
    radio[1].onclick = buildHandwritten
    radio[2].onclick = buildNames
}

function buildPrinted() {
    list.innerHTML = ""
    "A B C D E G H I J L M N O P R S T U W Y".split(" ").forEach(char => list.innerHTML += "<div>" + char + "</div>")
}

function buildHandwritten() {
    list.innerHTML = ""
}

function buildNames() {
    list.innerHTML = ""
}

// #endregion
