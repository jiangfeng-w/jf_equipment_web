const loseFocus = () => {
    let target = event.target
    if (target.nodeName == 'SPAN' || target.nodeName == 'I') {
        target = event.target.parentNode
    }
    target.blur()
}

export default loseFocus
