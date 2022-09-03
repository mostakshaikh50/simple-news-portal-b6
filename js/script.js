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
    //console.log(newsCategories);
    const newsCategoriesList =document.getElementById('news-categories');

    newsCategories.forEach(newsCategory =>{
        const newsCategoryName = document.createElement('div');
        newsCategoryName.classList.add('category');
        newsCategoryName.innerHTML = `
        <li onclick="categoryDetails('${newsCategory.category_id}')" id="${newsCategory.category_id}"><a>${newsCategory.category_name}</a></li>`;
        newsCategoriesList.appendChild(newsCategoryName);
    })

    //  for(const newsCategory of newsCategories){        
    //     const newsCategoryName = document.createElement('div');
    //     newsCategoryName.classList.add('category');
    //     newsCategoryName.innerHTML = `
    //     <li onclick="categoryDetails('${newsCategory.category_id}')" id="${newsCategory.category_id}"><a>${newsCategory.category_name}</a></li>`;
    //     newsCategoriesList.appendChild(newsCategoryName);
    //  }
     
}

const categoryDetails = category_id => {
    console.log(category_id);
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(response => response.json())
    .then(data => displayCategoryDetails(data.data))
}

const displayCategoryDetails = categoryDetails =>{
    console.log(categoryDetails)
     const newsCategoriesDetails =document.getElementById('category-details');
     newsCategoriesDetails.innerHTML ='';
     categoryDetails.forEach(newsDetails =>{
        const newsDetailsDiv = document.createElement('div');
        newsDetailsDiv.classList.add('newsDetails');
        newsDetailsDiv.classList.add('card-body');
        newsDetailsDiv.classList.add('card-title');
        newsDetailsDiv.classList.add('card-actions');
        newsDetailsDiv.classList.add('justify-end');
       // newsDetailsDiv.classList.add('btn btn-primary');
        
        newsDetailsDiv.innerHTML = `
        <img src="${newsDetails.thumbnail_url}" alt="Album">
        <div class="card-body">
          <h2 class="card-title">${newsDetails.title}</h2>
          <p>${newsDetails.details}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Listen</button>
          </div>
        </div>`;

        newsCategoriesDetails.appendChild(newsDetailsDiv);
       
     })
     
}


loadCategories();