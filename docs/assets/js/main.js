"use strict";const inputSearch=document.querySelector(".js-input-search"),btnSearch=document.querySelector(".js-button-search");let characterList=document.querySelector(".js-characters-list"),favouritesList=document.querySelector(".js-favourites-list");const btnReset=document.querySelector(".js-button-reset");let allCharacters=[],favouriteCharacters=[],characterCard="",textInput="";const renderAllCharacters=()=>{let e="";characterCard="",characterList.innerHTML="";for(const a of allCharacters){let r="";r=-1===favouriteCharacters.findIndex(e=>e.char_id===parseInt(a.char_id))?"":"selected",e=`<li>\n        <article class="js-character ${r} character" id="${a.char_id}">\n        <img src='${a.img}' alt="Foto de personaje" class="photo">\n        <h3 class="name">${a.name}</h3>\n        <p class="status">${a.status}</p>\n        </article>\n        </li>`,characterCard+=e,characterList.innerHTML=characterCard}addCharactersListeners()};function renderFavouritesCharacters(){let e="";characterCard="",favouritesList.innerHTML="";for(const a of favouriteCharacters)e=`<li>\n        <article class="js-character-favourite character" id="${a.char_id}">\n        <img src='${a.img}' alt="Foto de personaje" class="photo">\n        <h3 class="name">${a.name}</h3>\n        <p class="status">${a.status}</p>\n        </article>\n        </li>`,characterCard+=e,favouritesList.innerHTML=characterCard}const getApiData=()=>{allCharacters=[],fetch("https://breakingbadapi.com/api/characters").then(e=>e.json()).then(e=>{allCharacters.push(...e),renderAllCharacters()})},searchCharacter=e=>{e.preventDefault(),textInput=inputSearch.value;let a=allCharacters.filter(e=>e.name.includes(textInput));allCharacters=a,renderAllCharacters()};function handleClickCard(e){e.currentTarget.classList.toggle("selected");const a=allCharacters.find(a=>a.char_id===parseInt(e.currentTarget.id)),r=favouriteCharacters.findIndex(a=>a.char_id===parseInt(e.currentTarget.id));-1===r?favouriteCharacters.push(a):favouriteCharacters.splice(r,1),localStorage.setItem("localFavouriteCharacters",JSON.stringify(favouriteCharacters)),renderFavouritesCharacters()}function deleteFavourites(e){e.preventDefault(),favouritesList.innerHTML="",favouriteCharacters=[],localStorage.clear(),renderAllCharacters()}function addCharactersListeners(){const e=document.querySelectorAll(".js-character");for(const a of e)a.addEventListener("click",handleClickCard)}btnSearch.addEventListener("click",searchCharacter),btnReset.addEventListener("click",deleteFavourites);const savedFavourites=JSON.parse(localStorage.getItem("localFavouriteCharacters"));null!==savedFavourites&&(//!== es ≠
favouriteCharacters=savedFavourites,renderFavouritesCharacters()),allCharacters=[],fetch("https://breakingbadapi.com/api/characters").then(e=>e.json()).then(e=>{allCharacters.push(...e),renderAllCharacters()}),handleClickCard();