function createTreeHtml (arr) {
    var treeHtml = `<ul>` ;

        arr.forEach(function (item) {
            treeHtml += `<li><span>${item.title}</span>`

            if (item.children) {
                treeHtml += createTreeHtml(item.children)
            }

            treeHtml += `</li>`
        })

    treeHtml += `</ul>`

    return treeHtml ;
}