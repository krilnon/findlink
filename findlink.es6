tryFindScroll()
document.addEventListener(`DOMContentLoaded`, tryFindScroll)
document.addEventListener(`load`, tryFindScroll)

function tryFindScroll(){
    if(location.hash){
        const query = parse(location.hash.substring(1))
        if(query){
            scrollToMatchingTextNode(query)
        }
    }
}

`
    Parses a URI fragment to find an occurrence of find(some search text)
`
function parse(fragment){
    const match = fragment.match(/find\((.*)\)/i)
    return match ? match[1] : undefined
}

`
    Takes a find query string and looks for text in the page matching it.
    If the query string is on the page, this function scrolls to the first match.
`
function scrollToMatchingTextNode(query){
    const textNodes = document.evaluate(`//text()`, document)

    for(let node of xpathIterator(textNodes)){
        if(node.wholeText.match(new RegExp(query, `i`))){
            `don't use Ranges yet because they're buggy`
            /*const range = document.createRange()
            range.selectNodeContents(node)

            const textBounds = range.getBoundingClientRect()*/
            document.body.scrollTop = /*textBounds.top*/ node.parentNode.getBoundingClientRect().top
            return true
        }
    }
    return false
}

`
    I don't think that XPathResults conform to the ES6 for..of iteration protocol,
    so this bridges the gap.
`
function* xpathIterator(xpathResult){
    let next
    while(next = xpathResult.iterateNext()) yield next
}
