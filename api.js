const keyPublic = "0671475225f026f0bd7d6ead263762b7"
const keyPrivate = "8e7bf8cfcb15f0ba57542c36bc24bc053dcf4338"

function createHash(ts){
  /* const transformHash = ts + keyPrivate + keyPublic */
  const hashMessage = md5(ts + keyPrivate + keyPublic)
  return hashMessage

}

function buildHeros(heros){
  // heros.name
  // heros.description
  // heros.thumbnail.extension
  // heros.thumbnail.path

    // heros.stories.items.name
    // heros.stories.items.type

    // heros.comics.items.name

  heros.forEach(hero => {
    const heroSection = document.createElement('section')
    heroSection.classList.add('hero__info')
    const heroDiv = document.createElement('div')
    heroDiv.classList.add('contain')

    heroSection.appendChild(heroDiv)


    const heroSubTitle = document.createElement('h2')
    heroSubTitle.classList.add('hero__subtitle')
    heroSubTitle.textContent = 'Personagem Marvel'
    heroDiv.appendChild(heroSubTitle)

    const heroH1 = document.createElement('h1')
    heroH1.classList.add('hero__title')
    heroH1.textContent = hero.name

    heroDiv.appendChild(heroH1)

    const heroP = document.createElement('p')

    heroDiv.appendChild(heroP)

    heroP.classList.add('hero__history')
    heroP.textContent = hero.description



    const heroFigure = document.createElement('figure')
    heroFigure.classList.add('hero-img')

    heroDiv.appendChild(heroFigure)

    const heroImg = document.createElement('img')
    heroImg.classList.add('img-hero-marvel')
    heroFigure.appendChild(heroImg)

    heroImg.src = hero.thumbnail.path + '.' + hero.thumbnail.extension
    const heroTable = document.createElement('table')
    heroTable.classList.add('hero__tb')
    const heroCaption = document.createElement('caption')
    heroCaption.textContent = "Histórias"
    
    heroTable.appendChild(heroCaption)
    const comicsAside = document.createElement('aside')
    comicsAside.classList.add('comics')
    const asideTitle = document.createElement('h3')
    asideTitle.classList.add('comics__title')
    asideTitle.textContent = 'Lista de Aparições (comics)'
    comicsAside.appendChild(asideTitle)
    heroSection.appendChild(comicsAside)

    // document.createElement Header da Table


    hero.stories.items.forEach(storie => {
      const tableTr = document.createElement('tr')
      const tdId = document.createElement('td')
      tdId.textContent = storie.resourceURI.split('/').reverse()[0]
      const tdTitle = document.createElement('td')
      tdTitle.textContent = storie.name
      const tdType = document.createElement('td')
      tdType.textContent = storie.type

      tableTr.appendChild(tdId)
      tableTr.appendChild(tdTitle)
      tableTr.appendChild(tdType)

      heroTable.appendChild(tableTr)
      
      
    })
    
    hero.comics.items.forEach(comic => {
      //Create the Aside
     
      
      //Create Nav
      const asideNav = document.createElement('nav')
      asideNav.classList.add('comics__nav')
      comicsAside.appendChild(asideNav)
      //Create ul
      const asideUl = document.createElement('ul')
      asideUl.classList.add('comicas__list')
      asideNav.appendChild(asideUl)
      //Create li
      const asideLi = document.createElement('li')
      asideLi.classList.add('comics__item')
      asideUl.appendChild(asideLi)
      //Create A
      const asideA = document.createElement('a')
      asideA.classList.add('comics__link')

      asideA.textContent = comic.name
      //Append Child the elements
      asideLi.appendChild(asideA)      
    })

    heroDiv.appendChild(heroTable)
    const render = document.getElementById('listHeros')
    render.appendChild(heroSection)
    
  });

  
  console.log(heros)

}

function getHero (){
  const ts = Date.now().toString()
  const heroAleatory = Math.random() * 250;
  const hash = createHash(ts) 

  const urlAPI = `http://gateway.marvel.com/v1/public/characters?limit=1&offset=${heroAleatory}&ts=${ts}&apikey=${keyPublic}&hash=${hash}`

  const oReq = new XMLHttpRequest();
  oReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        buildHeros(data.data.results);
      }
    };
    oReq.open("GET", urlAPI, true);
    oReq.send();
}



getHero()

