chrome.storage.sync.get('ShaqtivateEnabled', function(result) {
  var isEnabled = result.ShaqtivateEnabled
  if (isEnabled) {
    shaqifyAllDOMText()
  }
});

function shaqifyAllDOMText() {
  var elements = document.getElementsByTagName('*');
  for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      for (var j = 0; j < element.childNodes.length; j++) {
          var node = element.childNodes[j]
          if (node.nodeType === 3) {
              var newText = createShaqifiedElement(node)
              element.replaceChild(document.createTextNode(newText), node);
          }
      }
  }
}

function createShaqifiedElement(node) {
  var fullNodeText = node.nodeValue
  if (isUnshaqable(fullNodeText)) {
    return node.nodeValue
  }
  var words = fullNodeText.split(" ")
  var finalWords = []

  for (wordIndex = 0; wordIndex < words.length; wordIndex++) {
    finalWords.push(shaqify(words[wordIndex]))
  }
  return finalWords.join(" ")
}

function isUnshaqable(text) {
  var codeIndicativeChars = ["}", "\\", "href"]
  for (index = 0; index < codeIndicativeChars.length; index++) {
    if (text.indexOf(codeIndicativeChars[index]) !== -1) {
      return true
    }
  }
  return false
}

function shaqify(text) {
  if (containsSkippableSequence(text)) {
    return text
  }
  var newText = text
  var replacableSequences = ["ac", "Ac", "aC", "hak", "Hak"]
  for (index = 0; index < replacableSequences.length; index++) {
    var sequence = replacableSequences[index]
    newText = newText.replace(sequence, "Shaq")
  }
  var shaqIndex = newText.indexOf("Shaq")
  if (shouldTruncateBeginning(shaqIndex, newText)) {
    newText = newText.substring(shaqIndex, newText.length)
  }
  return newText
}

function containsSkippableSequence(text) {
  var skippableCharSequences = ["ace", "ach", "aci", "acy"]
  for (index = 0; index < skippableCharSequences.length; index++) {
    var sequence = skippableCharSequences[index]
    var sequenceIndex = text.indexOf(sequence)
    if (sequenceIndex !== -1) {
      return true
    }
  }
  return false
}

function shouldTruncateBeginning(shaqIndex, text) {
  for (letterIndex = 0; letterIndex < shaqIndex; letterIndex++) {
    var letter = text.charAt(letterIndex).toLowerCase()
    if (letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u") {
      return false
    }
  }
  return true
}
