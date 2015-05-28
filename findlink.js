"use strict";

var marked0$0 = [xpathIterator].map(regeneratorRuntime.mark);
tryFindScroll();
document.addEventListener("DOMContentLoaded", tryFindScroll);
document.addEventListener("load", tryFindScroll);

function tryFindScroll() {
    if (location.hash) {
        var query = parse(decodeURIComponent(location.hash.substring(1)));
        if (query) {
            scrollToMatchingTextNode(query);
        }
    }
}

"\n    Parses a URI fragment to find an occurrence of find(some search text)\n";
function parse(fragment) {
    var match = fragment.match(/find\((.*)\)/i);
    return match ? match[1] : undefined;
}

"\n    Takes a find query string and looks for text in the page matching it.\n    If the query string is on the page, this function scrolls to the first match.\n";
function scrollToMatchingTextNode(query) {
    var textNodes = document.evaluate("//text()", document);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = xpathIterator(textNodes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var node = _step.value;

            if (node.wholeText.match(new RegExp(query, "i"))) {
                "don't use Ranges yet because they're buggy";
                /*const range = document.createRange()
                range.selectNodeContents(node)
                 const textBounds = range.getBoundingClientRect()*/
                document.body.scrollTop = /*textBounds.top*/node.parentNode.getBoundingClientRect().top;
                return true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return false;
}

"\n    I don't think that XPathResults conform to the ES6 for..of iteration protocol,\n    so this bridges the gap.\n";
function xpathIterator(xpathResult) {
    var next;
    return regeneratorRuntime.wrap(function xpathIterator$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                next = undefined;

            case 1:
                if (!(next = xpathResult.iterateNext())) {
                    context$1$0.next = 6;
                    break;
                }

                context$1$0.next = 4;
                return next;

            case 4:
                context$1$0.next = 1;
                break;

            case 6:
            case "end":
                return context$1$0.stop();
        }
    }, marked0$0[0], this);
}