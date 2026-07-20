let input = document.querySelector("#input-box")
let searchBtn = document.querySelector(".search-box button")
let wordElement = document.querySelector(".word")
let pronunciation = document.querySelector(".pronunciation")
let partOfSpeech = document.querySelector(".part-of-speech")
let definition = document.querySelector(".definition")

searchBtn.addEventListener("click",async function(){
   let data = await getWord()
    await searchWord(data)
    
})

input.addEventListener("keydown", function(event){
   if(event.code=="Enter"){
    
     searchWord()
   
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
    console.log(data)

    wordElement.innerHTML = data[0].word
    pronunciation.innerHTML = data[0].phonetics[1].text
    partOfSpeech.innerHTML = data[0].meanings[0].partOfSpeech
    let random = Math.floor(Math.random()*data[0].meanings[0].definitions.length)
    definition.innerHTML = data[0].meanings[0].definitions[random].definition

    
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