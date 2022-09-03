// function fetchData(){
//     fetch('https://openapi.programming-hero.com/api/news/categories')
//     .then(response =>{
//         console.log(response);
//     });
// }

// fetchData();

const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayCategories(data.data.news_category))
}

const displayCategories = newsCategories =>{
    //console.log(newsCategory);
    const newsCategoriesList =document.getElementById('news-categories');
     for(const newsCategory of newsCategories){        
        const newsCategoryName = document.createElement('div');
        newsCategoryName.classList.add('category');
        newsCategoryName.innerHTML = `
        <li><a>${newsCategory.category_name}</a></li>`;
        newsCategoriesList.appendChild(newsCategoryName);
     }
     
}

loadCategories();