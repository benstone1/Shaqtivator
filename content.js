var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var fullNodeText = node.nodeValue;

            if (fullNodeText.indexOf("}") !== -1 || fullNodeText.indexOf("\\") !== -1) {
              break
            }

            var words = fullNodeText.split(" ")
            var finalWords = []

            for (wordIndex = 0; wordIndex < words.length; wordIndex++) {
              var text = words[wordIndex]
              var skippableCharSequences = ["ace", "ach", "aci", "acy"]
              var shouldReplace = true
              for (k = 0; k < skippableCharSequences.length; k++) {
                var sequence = skippableCharSequences[k]
                var sequenceIndex = text.indexOf(sequence)
                if (sequenceIndex !== -1) {
                  shouldReplace = false
                }
              }

              var shaqedText = text.replace("ac", "Shaq")            
              shaqedText = shaqedText.replace("hak","Shaq")

              var shaqIndex = shaqedText.indexOf("Shaq")

              var shouldTruncateBeginning = true


              for (letterIndex = 0; letterIndex < shaqIndex; letterIndex++) {
                var letter = shaqedText.charAt(letterIndex).toLowerCase()
                if (letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u") {
                  shouldTruncateBeginning = false
                }
              }

              if (shouldTruncateBeginning) {
                shaqedText = shaqedText.substring(shaqIndex, shaqedText.length)
              }

              if (shouldReplace) {
                finalWords.push(shaqedText)
              }
            }
            var newText = finalWords.join(" ")
            element.replaceChild(document.createTextNode(newText), node);
        }
    }
}
