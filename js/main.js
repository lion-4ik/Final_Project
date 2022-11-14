// Preloader

window.onload = function () {
    window.setTimeout(function () {
        const loader=document.querySelector('.loader');
        loader.classList.add('hidden');
        loader.classList.remove('visible');
    }, 5000);
  };

// Users noactivity

let noactiveTime=function(){
    let time;
    document.onload=resetTimer;
    document.onmousemove=resetTimer;
    document.onkeypress=resetTimer;
    document.onscroll=resetTimer;
    document.touchstart=resetTimer;
    let closeTime;
    let h2 = document.querySelector('#timer');
    let sec=30;
    let interval;
    let modalWindow=document.querySelector('.header__modal')
    
    function logout() {

        modalWindow.style.display='block';
        clearInterval(interval);
        sec = 30;
        h2.textContent = sec;
        interval = setInterval (count, 1000);
        function count (){
            if (sec<=30) {
            sec--;
            h2.textContent=sec;
            } else {return};
          }
          document.querySelector('#yes').addEventListener('click', function(){
            modalWindow.style.display='none';
            clearTimeout(closeTime)
          })
        closeTime=setTimeout(close, 30000)
        function close (){
          window.open('','_self').close()
        }
        }
       
    function resetTimer(){
        clearTimeout(time);
        time=setTimeout(logout, 60000);
    }
}
noactiveTime();




// Menu burger

const menuBtn = document.querySelector('.header__btn');
const menu = document.querySelector('.header__menu');
menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
});

// Change theme

let date=new Date();
let hour=date.getHours();
const changeTheme = document.querySelector(".themetoggle");

document.addEventListener('DOMContentLoaded', function(){
  if (hour>21 && hour<6){
    document.body.classList.add('dark-theme');
  }
})

changeTheme.addEventListener('click', function (){
  document.body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    document.querySelector('.themetoggle span').textContent = 'dark_mode';
  } else {
    document.querySelector('.themetoggle span').textContent = 'wb_sunny';
  }
})



  // Progress bar

  const progressBar=document.querySelector('.progress');
  window.addEventListener('scroll', progress);

  function progress (event){
    let windowScroll=document.body.scrollTop || document.documentElement.scrollTop;
    let windowHeight=document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let result = windowScroll/windowHeight*100;
    progressBar.style.width=result+'%';
  }


// Slider 

const images=document.querySelectorAll('.gallery-line img');
const sliderLine=document.querySelector('.gallery-line');
let count=0;
let width;

function move(){
    width=document.querySelector('.gallery').offsetWidth;
    sliderLine.style.width=width*images.length + 'px';
    images.forEach(item=>{
        item.style.width=width + 'px';
        item.style.height='auto';
    })
    moveSlider();
}
window.addEventListener('resize', move);
move();

document.querySelector('.gallery-prev').addEventListener('click', ()=>{
    count--;
    if (count<0){
        count=images.length-1;
    }
    moveSlider();
})
document.querySelector('.gallery-next').addEventListener('click', ()=>{
    count++;
    if (count>=images.length){
        count=0;
    }
    moveSlider();
})

function moveSlider(){
    sliderLine.style.transform='translate(-'+count*width + 'px)';
}

// Фільтр портфоліо (вирішив створити такий об'єкт, якщо буде потрібно - завжди можна отримати JSON по fetch, наприклад)

const projects=[
{
  "name": "Project1",
  "date": "2017.08.17",
  "price": "2500",
  "type":['html', 'css'],
  "isRender":false,
  "icon":"item1.jpg"
},
{
  "name":"Project2",
  "date":"2018.03.07",
  "price":"3500",
  "type":['html','css','js'],
  "isRender":false,
  "icon":"item2.jpg"
},
{
  "name":"Project3",
  "date":"2018.05.17",
  "price":"2500",
  "type":['js'],
  "isRender":false,
  "icon":"item3.jpg"
},
{
  "name":"Project4",
  "date":"2019.05.18",
  "price":"500",
  "type":['html'],
  "isRender":false,
  "icon":"item4.jpg"
},
{
  "name":"Project5",
  "date":"2020.08.17",
  "price":"1500",
  "type":['html','css','js'],
  "isRender":false,
  "icon":"item5.jpg"
},
{
  "name":"Project6",
  "date":"2022.08.19",
  "price":"300",
  "type":['html','js'],
  "isRender":false,
  "icon":"item6.jpg"
},
{
  "name":"Project7",
  "date":"2017.12.23",
  "price":"7500",
  "type":['html','css','js', 'react'],
  "isRender":false,
  "icon":"item7.jpg"
},
{
  "name":"Project8",
  "date":"2018.04.05",
  "price":"6500",
  "type":['html','css','js', 'react'],
  "isRender":false,
  "icon":"item8.jpg"
},
{
  "name":"Project9",
  "date":"2019.11.07",
  "price":"200",
  "type":['html','css','js', 'react'],
  "isRender":false,
  "icon":"item9.jpg"
},
{
  "name":"Project10",
  "date":"2019.10.10",
  "price":"300",
  "type":['js', 'react'],
  "isRender":false,
  "icon":"item10.jpg"
}]

function filter (arr, value){
  let result=[];
      copy=[...arr];
  for (let item of copy){
    if (String(item.type).includes(value)==true) result.push(item)
  }
  return result
}
  
function sortByDate(arr) {
  let copy=[...arr];
  copy.sort((a, b) => new Date(b.date)-new Date(a.date));
  return copy
}

function render (item){
  const div=document.createElement('div');
  let addProject = `<div class="portfolio__item" >
  <div class="portfolio__image">
  <img src="images/section-portfolio/${item.icon}" />
  <div class="portfolio__image-info">
  <span>${item.name}. Date:${item.date}. Type:${item.type}. Price:${item.price}</span>
  </div>
  </div>
  <div class="portfolio__icon ${item.name}">
  <img src="images/section-portfolio/icon.png" alt="icon" />
  </div>
  <p>${item.name}</p>
  </div>`
  div.innerHTML=addProject;
  mainBlock.append(div)
}

const projectSortByDateArray=sortByDate(projects);
document.addEventListener('DOMContentLoaded', latestProjects);
const allPortfolio=document.querySelector('#all-portfolio');
let filterValueArray=[];
const mainBlock=document.querySelector('.portfolio__body');
const portfolioListItems=document.querySelectorAll('.portfolio__list-item');

portfolioListItems.forEach(elem => {
   elem.addEventListener('click', function () {
   mainBlock.innerHTML = '';
   elem.classList.toggle('portfolio-active');
   if (!elem.classList.contains('portfolio-active')) {
    filterValueArray.splice(filterValueArray.indexOf(elem.dataset.filter), 1);
   } else {
    filterValueArray.push(elem.dataset.filter);
   } 
   projectSortByDateArray.forEach(item => {
    item.isRender = false;
    if (filterValueArray.length > 0) {
     filterValueArray.forEach(el => {
      if (item.type.indexOf(el) > -1 && !item.isRender) {
       render(item);
       item.isRender = true;
      } 
     })
    } else {
     render(item);
    }
   })
  })
 })

 allPortfolio.addEventListener('click', function(e){
  mainBlock.innerHTML = '';

  if (allPortfolio.textContent === 'browse less'){
    projectSortByDateArray.slice(0,6).forEach(elem=>{
      render(elem);
      allPortfolio.textContent='browse all';
    });
  } else {

  allPortfolio.textContent='browse less';
  projectSortByDateArray.forEach(elem=>{
    render(elem);
  });}
  portfolioListItems.forEach(elem=>{
    elem.classList.remove('portfolio-active')
  })
  
})

function latestProjects(){
  let result=projectSortByDateArray;
  result=result.slice(0,6);
  result.forEach(elem=>{
    render(elem)
  })
  
};


 // Animation


 const animBlocks=document.querySelectorAll('.blog__content');
 window.addEventListener('scroll', animOnScroll)

 function animOnScroll(){
  for (let i=0; i<animBlocks.length; i++){
    const animBlock=animBlocks[i];
    const animBlockHeight=animBlock.offsetHeight;
    const animBlockOffset=offset(animBlock).top;
    const animStart=4;

    let animBlockPoint=window.innerHeight-animBlockHeight/animStart;
    if (animBlockHeight>window.innerHeight){
      animBlockPoint=window.innerHeight-window.innerHeight/animStart;
    }
    if ((pageYOffset>animBlockOffset-animBlockPoint) && pageYOffset<(animBlockOffset+animBlockHeight)){
      animBlock.classList.add('active')
    } else {
      animBlock.classList.remove('active')
    }
    }
 }

 function offset (el){
  const rect=el.getBoundingClientRect(),
    scrollLeft=window.pageXOffset||document.documentElement.scrollLeft,
    scrollTop=window.pageYOffset||document.documentElement.scrollTop;
  return {top:rect.top+scrollTop, left:rect.left+scrollLeft}
 }


  // Show all (blog) scroll

 let button=document.querySelector('.blog__browseall button');
 let blogItems=document.querySelector('.blog__content');
 let blogBody=document.querySelector('.blog__body');

button.addEventListener('click', function(){
    for (let i=0; i<12; i++){
      let clone=blogItems.cloneNode(true);
      clone.classList.add('active')
    blogBody.insertAdjacentElement('beforeend', clone);
    }
})

    

// Form

const form=document.querySelector('.form');
const nameInput=document.querySelector('#name');
const mailInput=document.querySelector('#email');
const subjectInput=document.querySelector('#subject');
const submitBtn=document.querySelector('#submit');

nameInput.oninput=function(){
  this.value=this.value.replace(/\s+/gi, ''); 
}

nameInput.addEventListener("input", function () {
  if (nameInput.validity.patternMismatch) {
    nameInput.setCustomValidity("Лише латинські літери, перша літера - велика. Наявність  цифр, пробілів – недопустима. ");
  } else {
    nameInput.setCustomValidity("");
  }
});

subjectInput.addEventListener("input", function () {
  if (subjectInput.validity.patternMismatch) {
    subjectInput.setCustomValidity("Лише літери");
  } else {
    subjectInput.setCustomValidity("");
  }
});

form.addEventListener('submit',function(event){
  event.preventDefault();
  console.log('click on validate')
  
  if (subjectInput.value.includes('зробити замовлення')) {
    let animation=document.querySelector('.contact__animation');
    animation.classList.add('hide');
    function animationClear (){
      animation.classList.remove('hide')
    }
    setTimeout(animationClear, 4000)
  }
  localStorage.setItem('name', nameInput.value);
  localStorage.setItem('email', mailInput.value);
  localStorage.setItem('subject', subjectInput.value);
  }
  
)

// Widget weather

const weatherBlock=document.querySelector('#weather');
async function loadWeather (e){
  const server='https://api.openweathermap.org/data/2.5/weather?lat=46.482952&lon=30.712481&appid=f61bc32ec6086ac175976d98ff39bf92';
  
  const response=await fetch(server, {
    method:'GET',
  });
  const responseResult=await response.json();
  if (response.ok){
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML=responseResult.message;
  }
}

function getWeather(data){
  console.log(data)
  const location=data.name;
  const temp=Math.round(data.main.temp-273.15)+'C';
  const feelsLike=Math.round(data.main.feels_like-273.15)+'C';
  const weatherStatus=data.weather[0].main;
  const weatherIcon=data.weather[0].icon;
  
  const template = `<div class="footer__weather-header">
  <div class="footer__weather-main">
    <div class="footer__weather-city">${location}</div>
    <div class="footer__weather-status">${weatherStatus}</div>
  </div>
 
</div>
<div class="footer__weather-temp">${temp}</div>
<div class="footer__weather-feelslike">Feels like:${feelsLike}</div>`

weatherBlock.innerHTML=template;
}
if (weatherBlock) {
  loadWeather();
}
