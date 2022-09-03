

const loadCategories = () =>{
    toggleLoader();
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayCategories(data.data.news_category))
}

const displayCategories = newsCategories =>{
   // console.log(newsCategories.length);
    const newsCategoriesList =document.getElementById('news-categories');

    newsCategories.forEach(newsCategory =>{
        const newsCategoryName = document.createElement('div');
        newsCategoryName.classList.add('category');
        newsCategoryName.innerHTML = `
        <li onclick="categoryDetails('${newsCategory.category_id}')" id="${newsCategory.category_id}"><a>${newsCategory.category_name}</a></li>`;
        newsCategoriesList.appendChild(newsCategoryName);

       
    })
     
}

let categoryGlobal = '';

const categoryDetails = category_id => {
    toggleLoader(true);
    //console.log(category_id);
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(response => response.json())
    .then(data => displayCategoryDetails(data.data))

    
}


const displayCategoryDetails = categoryDetails =>{
   
    categoryGlobal= categoryDetails;
    console.log(categoryGlobal);

     const newsCategoriesDetails =document.getElementById('category-details');
     
     newsCategoriesDetails.innerHTML ='';

    if(categoryDetails.length == 0){
          
       const noDataMsg = document.getElementById('noDataMessage');
       noDataMsg.innerHTML = '';
       const  noDataMsgDiv = document.createElement('div');
       noDataMsgDiv.innerHTML =`
      <div class="text-center ml-30 font-semibold">
        <div>
            <span class="">No News available.</span>
        </div>
     </div> `;

        noDataMsg.appendChild(noDataMsgDiv);
        toggleLoader(false);
    }
    else{
        categoryDetails.forEach(newsDetails =>{
            
           const newsDetailsDiv = document.createElement('div');
           newsDetailsDiv.classList.add("card");
           newsDetailsDiv.classList.add("mt-3");
           newsDetailsDiv.innerHTML =`
           <div class="text-center">
             <p class="font-bold text-lg text-yellow-700"><span class="text-lg text-rose-700">${categoryDetails.length}</span> Items found from News</p>
           </div>
           <div class="row g-0">
           <div class="col-md-4">
                <img class="img-fluid h-80 p-4 rounded-5" src="${newsDetails.thumbnail_url}" alt="thumbnail">
           </div>
           <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title">${newsDetails.title ? newsDetails.title: "No Title Found"}</h2>
                  <p>${newsDetails.details ? newsDetails.details : "No details available" }</p>
                </div>
                <div class="flex ml-5 p-4 gap-5">
                    <div class="w-10 rounded-full">
                    <img src="${newsDetails.author.img ? newsDetails.author.img: "No Image Found"}" />                
                    </div>
            
                    <h3>${newsDetails.author.name ? newsDetails.author.name: "No Found author"}</br><p>${newsDetails.author.published_date ? newsDetails.author.published_date : "No publish date available"}</p></h3>
                    <h3>${newsDetails.total_view ? newsDetails.total_view: "No View Yet"}</h3>
                    
                    <button onclick="modalDetails('${newsDetails._id}')" style="margin-left:100px" for="my-modal" class="btn modal-button btn-sm btn-primary">Details</button> 
                    
                    </div>
           
           </div>
           </div>
           `;
           
    
         newsCategoriesDetails.appendChild(newsDetailsDiv);
           
         })
         toggleLoader(false);
    }
     
     
}

const modalDetails = Id => {
    const madalDetails =document.getElementById('details-modal');
    madalDetails.innerHTML ='';
    document.getElementById('my-modal').checked = true;
     const modalData = categoryGlobal.filter(x=>x._id=== Id);
     const modalDetailsDiv = document.createElement('div');
     modalDetailsDiv.innerHTML =`
     <h3 class="font-bold text-lg">${modalData[0].title ? modalData[0].title: "No Found Title"}</h3>
     <p>Author Name: ${modalData[0].author.name?modalData[0].author.name : "No Found Name"}</p>
     <p>Total View: ${modalData[0].total_view ? modalData[0].total_view: "No View"}</p>
     <div class="modal-action">
         <label for="my-modal" class="btn">close</label>
     </div>`;

     madalDetails.appendChild(modalDetailsDiv);
    

    
    
};

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