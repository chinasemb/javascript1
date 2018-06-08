function createTreeHtml() {
    var treeHtml =  `<ul>` ;

    arr.forEach(function (item) {
        treeHtml += `<li><span>${item.title}</span>`

        if (item.children) {
            treeHtml += creatrTreeHtml(item.children)
        }

        treeHtml += `</li>`
    })

    treeHtml += `</ul>`

    return treeHtml ;
}