
// we are using this app to fetch the data

// function phoneHunterAPI() {
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//         .then(res => res.json())
//         .then(data => console.log(data.data))
// }

// phoneHunterAPI();

const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phoneInformation = data.data;
    // console.log(phoneInformation);
    phoneDisplay(phoneInformation, isShowAll);
}

const phoneDisplay = (phoneInformation, isShowAll) => {

    // div identify

    const phoneContainer = document.getElementById('phone-card');
    phoneContainer.textContent = '';

    // using loop to show button hidden or not to multiple card 
    const showButton = document.getElementById('showButton');
    if (phoneInformation.length > 12 && !isShowAll) {
        showButton.classList.remove('hidden');
    }
    else {
        showButton.classList.add('hidden')
    }

    console.log("the button is show ", isShowAll);

    // slice
    if (!isShowAll) {
        phoneInformation = phoneInformation.slice(0, 12);
    }


    // console.log(phoneInformation);
    phoneInformation.forEach(phoneInformation => {
        console.log(phoneInformation);
        // div created 
        const phoneCard = document.createElement('div');

        phoneCard.classList = `card p-4 mt-4 mb-4 bg-base-100 shadow-xl`;

        // inner html 
        phoneCard.innerHTML = `
        <figure><img src= ${phoneInformation.image} alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phoneInformation.brand}</h2>
        <h3 class = "card-title"> ${phoneInformation.phone_name} </h3> 
          <p>There are many variation of passengers of available but the majority have suffered</p>
          <div class="text-center">
            <button onclick = "showDetailsButton('${phoneInformation.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>

        `;

        // appendchild 
        phoneContainer.appendChild(phoneCard);

    });
    toggleSpinerLoader(false);
}

// detalis work

showDetailsButton = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    const phone = data.data
    showModalDisplay(phone);

}

showModalDisplay = (phone) => {


    const phoneName = document.getElementById('show_details_phone_name');
    phoneName.innerText = phone.brand;

    // card display

    const phoneContainer = document.getElementById('phone_container');
    phoneContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <h4>${phone.slug}</h4>

    `;

    // modal display
    my_modal_5.showModal();

}


// handle search button 

const handleSearch = (isShowAll) => {
    toggleSpinerLoader(true);
    const searchField = document.getElementById('searchField');

    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleSpinerLoader = (isloaderSpiner) => {
    const loaderSpiner = document.getElementById('spinner-loader');
    if (isloaderSpiner) {
        loaderSpiner.classList.remove('hidden');
    }
    else {
        loaderSpiner.classList.add('hidden');
    }
}

// button visible 

const showButton = () => {
    handleSearch(true);
}


loadPhone();