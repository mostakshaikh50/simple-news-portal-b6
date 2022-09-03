// function fetchData(){
//     fetch('https://openapi.programming-hero.com/api/news/categories')
//     .then(response =>{
//         console.log(response);
//     });
// }

// fetchData();

const loadCategories = () =>{
    toggleLoader();
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
    toggleLoader(true);
    console.log(category_id);
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(response => response.json())
    .then(data => displayCategoryDetails(data.data))
}

const displayCategoryDetails = categoryDetails =>{
    //console.log(categoryDetails[0].author)
     const newsCategoriesDetails =document.getElementById('category-details');
     
     newsCategoriesDetails.innerHTML ='';
     categoryDetails.forEach(newsDetails =>{
        console.log(newsDetails);
       
        
       const newsDetailsDiv = document.createElement('div');
       newsDetailsDiv.classList.add("card");
       newsDetailsDiv.classList.add("mt-3");
       newsDetailsDiv.innerHTML =`
       <div class="row g-0">
       <div class="col-md-4">
            <img class="img-fluid h-80 p-4 rounded-5" src="${newsDetails.thumbnail_url}" alt="thumbnail">
       </div>
       <div class="col-md-8">
            <div class="card-body">
              <h2 class="card-title">${newsDetails.title}</h2>
              <p>${newsDetails.details}</p>
            </div>
            <div class="flex ml-5 p-4 gap-5">
                <div class="w-10 rounded-full">
                <img src="${newsDetails.author.img}" />                
                </div>
        
                <h3>${newsDetails.author.name}</br><p>${newsDetails.author.published_date}</p></h3>
                <h3>${newsDetails.total_view}</h3>
                <button class="btn btn-primary">Details</button> 
            </div>
       
       </div>
       </div>
       `;
       

     newsCategoriesDetails.appendChild(newsDetailsDiv);
       
     })
     toggleLoader(false);
}

const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
       
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


loadCategories();