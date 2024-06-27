const selectTag = document.querySelectorAll("select"),
fromText = document.querySelector(".from-text"),
translateBtn = document.querySelector("button"),
swapIcon = document.querySelector(".exchange");
const screen = document.querySelector(".to-text");
const copyFrom = document.querySelector("#from-copy");
const copyTo = document.querySelector("#to-copy");

let from_lang = "en-IN", to_lang = "hi-IN";

// Display All the languages
selectTag.forEach((tag, id) => {
    for (const code in countries) {
        let selected;
        if (id == 0 && code == 'en-GB') {
            selected = "selected";
        } else if (id == 1 && code == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${code}" id="${code}" ${selected}>${countries[code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
})

// Copy Text
const copyText = (inputElement) => {
    inputElement.select();  // Selects the text in the input element
    inputElement.setSelectionRange(0, 99999);  // For mobile devices

    // Copy the text inside the input element to the clipboard
    navigator.clipboard.writeText(inputElement.value)
}

// Translate Button Clicked
translateBtn.addEventListener("click", async () => {
    let text = fromText.value;
    let from_lang = selectTag[0].value;
    let to_lang = selectTag[1].value;
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from_lang}|${to_lang}`;
    let response = await fetch(url);
    let data = await response.json();
    displayText(data);
});

// Swap Icon Clicked
swapIcon.addEventListener("click", () => {
    console.log("swap icon working");
    let temptext = fromText.value;
    fromText.value = screen.value;
    screen.value = temptext;

    let temp = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = temp;
})

// From Copy Icon Clicked
copyFrom.addEventListener("click", () => {
    console.log("from copy icon working");
    copyText(fromText);
})

// To Copy Icon Clicked
copyTo.addEventListener("click", () => {
    console.log("to copy icon working");
    copyText(screen);
})

let displayText = (data) => {
    console.log(data.responseData.translatedText);
    screen.innerText = data.responseData.translatedText;
};



// Function to speak text using the Web Speech API
const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
};

// Event listeners for the speaker icons
document.getElementById('from').addEventListener('click', () => {
    const fromText = document.querySelector('.from-text').value;
    if (fromText) {
        speakText(fromText);
    }
});

document.getElementById('to').addEventListener('click', () => {
    const toText = document.querySelector('.to-text').value;
    if (toText) {
        speakText(toText);
    }
});

