/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let counter = 0;  // variable to keep track of sections number
const navbar_menu = document.getElementsByClassName("navbar__menu")[0];   //menu
const navbar_list = document.getElementById("navbar__list");              //ul
const to_top_btn = document.getElementById("to_top_btn");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


//funtion to create section dynamincally
function createNewSection(){
    //create section element
    counter++;
    const section = document.createElement("section");

    //add attributes to section for id, data-nav and class
    section.setAttribute('id', `section${counter}`);
    section.setAttribute('data-nav', `Section ${counter}`);

    //create div element to contain the header and the paragraphs
    const div = document.createElement("div");
    div.setAttribute("class","landing__container");

    //create header element
    const h2 = document.createElement("h2");
    h2.innerHTML = `Section ${counter}`;

    //create paragraph element
    const p = document.createElement("p");
    p.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";

    //another paragraph element
    const p2 = document.createElement("p");
    p2.innerText = "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";


    //attaching the created section to the page and appending div and paragraphs in order
    document.getElementsByTagName("main")[0].appendChild(section);
    section.appendChild(div); 
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(p2);

    //add link to the section in the navbar
    //send the number of the created section as a parameter
    createNavItem(counter);
    
}


// build the nav

//function to create nav link
function createNavItem(sectionNum){
    
    //create <li> tag
    const li = document.createElement("li");

    //create <a> tag
    const a_link = document.createElement("a");
    a_link.setAttribute("href", `#section${sectionNum}`);
    a_link.setAttribute("class", "menu__link");
    a_link.setAttribute("id",`num${sectionNum}`);
    a_link.innerText = `Section ${sectionNum}`;
    a_link.addEventListener("click",e=>{
        e.preventDefault();
        document.getElementById(`section${sectionNum}`).scrollIntoView({behavior:"smooth"});
    })
    //append <a> to <li>
    li.appendChild(a_link);

    //append <li> to <ul>
    navbar_list.appendChild(li);

}


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/

//creating four sections by default on page load
window.onload = function(){
    for(let i=0; i<4;i++){
        createNewSection();
    }

    navbar_list.style.display = "block";
    addButton();
    setActiveSection();
}

function addButton(){
    const add_section_btn = document.createElement("button");
    add_section_btn.setAttribute("class","");
    add_section_btn.setAttribute("title","Add New Section");
    add_section_btn.setAttribute("id","add_section_btn");
    add_section_btn.innerHTML = "&#10010;";
    navbar_list.insertAdjacentElement("beforeend", add_section_btn);
    add_section_btn.addEventListener("click", createNewSection);
}


// to make "to top" appears only when the user scrolls down 20px from the top of the page
window.onscroll = function(){

    setActiveSection();

    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        to_top_btn.style.display = "block";
      } else {
        to_top_btn.style.display = "none";
      }
}

// // hide navbar when not scrolling
//     setTimeout(() => {
//         navbar_list.style.display = "none";
//     }, 3000);




// Scroll to top of page
to_top_btn.addEventListener("click", function() {
    window.scrollTo(0, 0);
    navbar_list.style.display = "block";
});

function isInViewPort(rect){
    if( rect < 150 && rect >= -150 ){
            return true;
        }else{
            return false
        }
}
// Set sections as active
function setActiveSection(){
    let num = 0;
    Array.from(document.querySelectorAll("section")).forEach(element => {
        const rect = Math.floor(element.getBoundingClientRect().top);
        num = parseInt(element.getAttribute("data-nav").split(" ")[1]);  

        if(isInViewPort(rect)){
            element.classList.add("your-active-class");
            document.getElementById(`num${num}`).classList.add("active");
        }else{
            element.classList.remove("your-active-class");
            document.getElementById(`num${num}`).classList.remove("active");
        }
        
    });
}