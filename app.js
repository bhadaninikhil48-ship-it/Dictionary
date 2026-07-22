let input = document.querySelector("#input-box")
let searchBtn = document.querySelector(".search-box button")
let wordElement = document.querySelector(".word")
let pronunciation = document.querySelector(".pronunciation")
let partOfSpeech = document.querySelector(".part-of-speech")
let definition = document.querySelector(".definition")
let tags = document.querySelector(".tags")
let audioBtn = document.querySelector(".audio-btn")

let currentAudioURL = "";




searchBtn.addEventListener("click",async function(){
   let data = await getWord()
    await searchWord(data)
    
    
})

input.addEventListener("keydown", async function(event){
   if(event.code=="Enter"){
    
     await searchWord()
   
   }
    
})

async function searchWord(){
    let word = input.value
    word = word.toLowerCase().trim()
    
    if(word===""){
        alert("Please enter valid word.")
        return
    }

    let data = await getWord(word)
    // console.log(data)

    wordElement.innerHTML = data[0].word
  for (let phonetic of data[0].phonetics) {
    if (phonetic.text) {
        pronunciation.innerHTML = phonetic.text;
        break;
    }
}
    partOfSpeech.innerHTML = data[0].meanings[0].partOfSpeech
    let random = Math.floor(Math.random()*data[0].meanings[0].definitions.length)
    definition.innerHTML = data[0].meanings[0].definitions[random].definition

    tags.innerHTML = ""
    let synonyms = data[0].meanings[0].synonyms;
    for(let synonym of synonyms){
        if(synonyms.length===0){
            tags.innerHTML="<span> No synonyms found </span>"
        }else{
            let span = document.createElement("span")
            span.textContent=synonym
            tags.appendChild(span)
            
        }
    }

    for (let phonetic of data[0].phonetics) {

    if (phonetic.audio !== "") {

        currentAudioURL = phonetic.audio;

        break;

    }

}
    
     input.value=""

     

}

async function getWord(word){

    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    try{
        let res = await fetch(url)
        let data = await res.json()

        return data

    }catch(err){
        console.log("Error - ",err)
    }
}



audioBtn.addEventListener("click", function () {

    if (currentAudioURL !== "") {

        let player = new Audio(currentAudioURL);

        player.play();

    }

});