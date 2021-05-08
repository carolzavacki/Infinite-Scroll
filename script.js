// Unsplash API
const count = 30;
const apiKey = "Ztk0oYKWoagACszcGjgwxuwT0I72HjHTXKYOKG3uMeI"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// check if all images were loaded
function imageLoaded() {
    // console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready = ', ready);
        loader.hidden = true;
        
    }
}

// Create Elements
function displayPhotos(){
    imagesLoaded = 0; //otherwise imagesLoaded !=== totalImages
    totalImages = photosArray.length;
    console.log('total images = ', totalImages);
    //run function for each object in photosArray
    photosArray.forEach((photo)=> {
        // create <a> to link to Unsplash;
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        //create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // Put <img> in the <a>, inside imageContainer

        item.appendChild(img);
        imageContainer.appendChild(item);


        
    //Event listener to check if finished loading
    img.addEventListener('load', imageLoaded);

    });
}



// Get photos from Unsplash Api

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        

    } catch(error){
        // Catch error here
    }
}

// Infinite Scroll
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        
    }
})

getPhotos();