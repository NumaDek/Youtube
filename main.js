// Création de "contenu" youtube. À remplacer par un fetch un jour.

const videos = [];

const categoryList = [
  "tous",
  "Musique",
  "En direct",
  "Jeux vidéo",
  "Mix",
  "Musiques de bande annonce"
]

const createContent = (videoNbr) => {
  for (i = 0; i < videoNbr; i++) {
    videos.push({
      thumbnail:
        "https://havecamerawilltravel.com/wp-content/uploads/2020/01/youtube-thumbnails-size-header-1-800x450.png",
      title: "Summer of Math Exposition #2",
      youtuber: "3Blue1Brown",
      infos: "26 k vues il y a 3 heures",
      category : categoryList[Math.floor(Math.random() * 10)  % 5 + 1]
    });
  }
};

createContent(50);

// Création de l'élement et intégration au parent. 

configElement = (htmlElement, cssClass, htmlParent) => {
  const element = document.createElement(htmlElement);
  element.classList.add(cssClass);
  htmlParent.appendChild(element);
  return element;
};

// Injection des présentations vidéos.

class VideoCard {
  constructor(video) {
    this.thumbnail = video.thumbnail;
    this.title = video.title;
    this.youtuber = video.youtuber;
    this.infos = video.infos;
    this.category = video.category;
    this.videoCard = null;
  }

  injectVideoCard = () => {
    const videoSection = document.getElementById("video-section");

    this.videoCard = configElement("div", "video-card", videoSection);
    const videoThumbnail = configElement("img", "video-thumbnail", this.videoCard);
    const videoTitle = configElement("h3", "video-title", this.videoCard);
    const videoYoutuber = configElement("h4", "video-youtuber", this.videoCard);
    const videoInfos = configElement("p", "video-infos", this.videoCard);
    const videoCategory = configElement("p", "video-category", this.videoCard);

    videoThumbnail.src = this.thumbnail;
    videoTitle.innerHTML = this.title;
    videoYoutuber.innerHTML = this.youtuber;
    videoInfos.innerHTML = this.infos;
    videoCategory.innerHTML = this.category;
  };
}

const injectVideoCards = (videos) => {
  const videoCardList = [];

  videos.map((video) => {
    videoCardList.push(new VideoCard(video));
    videoCardList[videoCardList.length - 1].injectVideoCard();
  });
  return (videoCardList);
};

const videoCardList = injectVideoCards(videos);

// Barre de navigation selection de catégories.

class NavBar {
  constructor(categoryList, videoCardList) {
    this.categoryList = categoryList;
    this.categoryButton = [];
    this.videoCardList = videoCardList;
  }

  categoryEventListener(event) {
    const category = event.target.innerHTML;
    if (category === "tous")
      videoCardList.map(videoCardElement => videoCardElement.videoCard.style.display = "block");
    else {
      const categoryCuredVideoList = this.videoCardList.filter(videoCard => videoCard.category === category);
      categoryCuredVideoList.map(videoCardElement => videoCardElement.videoCard.style.display = "block");
      const notSelectedCategoryVideoList = this.videoCardList.filter(videoCard => videoCard.category !== category);
      notSelectedCategoryVideoList.map(videoCardElement => videoCardElement.videoCard.style.display = "none");
    }  
  }
  
  injectNavBar() {
    const navSection = document.getElementById("category-bar");
    const navBar = configElement("nav", "nav-bar", navSection);

    for (i = 0; i < categoryList.length; i++) {
      this.categoryButton[i] = configElement("button", "category-button", navBar);
      this.categoryButton[i].innerHTML = categoryList[i];
      this.categoryButton[i].addEventListener("click", (event) => this.categoryEventListener(event));
    }
  }
}

const navBar = new NavBar(categoryList, videoCardList);
navBar.injectNavBar();

// barre de recherche sur les catégories.

const videoCardProperty = [
  "title",
  "youtuber",
  "category"
];

const videoCardValeur = [
  "Titre",
  "Youtuber",
  "Categorie"
];

class SearchBar {
  constructor(videoCardList) {
    this.videoCardList = videoCardList;
  }

  injectSearchBar() {
    const categoryBar = document.getElementById("search-bar");
    const searchInput = configElement("input", "input-search", categoryBar);

    const selectOption = document.getElementById("select-option");
    let selectedOption = "Title";
    let propertyIndex = 0;
    selectOption.addEventListener("change", (event) => {
      selectedOption = event.target.value;
      propertyIndex = videoCardValeur.indexOf(selectedOption);
      console.log("VideoCard[%s] = videoCardValeur[%s]  %s donne %s", videoCardProperty[propertyIndex], propertyIndex, selectedOption, videoCardList[0][videoCardProperty[propertyIndex]]);
    });

    searchInput.placeholder = "Rechercher...";
    searchInput.addEventListener("input", (event) => {
      const searchInputValue = event.target.value.toLowerCase();

      const categoryCuredVideoList = this.videoCardList.filter(videoCard => videoCard[videoCardProperty[propertyIndex]].toLowerCase().includes(searchInputValue));
      categoryCuredVideoList.map(videoCardElement => videoCardElement.videoCard.style.display = "block");
      const missingCategoryCuredVideoList = this.videoCardList.filter(videoCard => !videoCard[videoCardProperty[propertyIndex]].toLowerCase().includes(searchInputValue));
      missingCategoryCuredVideoList.map(videoCardElement => videoCardElement.videoCard.style.display = "none");
    });
  }
}

const searchBar = new SearchBar(videoCardList);
searchBar.injectSearchBar();