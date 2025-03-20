document.addEventListener("DOMContentLoaded", () => {
    let index = 1;
    const slidesContainer = document.querySelector(".slides");
    let slides = document.querySelectorAll(".slide"); 
    const slideCount = slides.length;

  
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slideCount - 1].cloneNode(true);


    firstClone.id = "first-clone";
    lastClone.id = "last-clone";

  
    slidesContainer.appendChild(firstClone);
    slidesContainer.prepend(lastClone);


    slides = document.querySelectorAll(".slide");


    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

  
    const moveSlide = () => {
        slidesContainer.style.transition = "transform 0.5s ease-in-out";
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    };

  
    const resetTransition = () => {
        if (slides[index].id === "first-clone") {
            slidesContainer.style.transition = "none";
            index = 1;
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        }
        if (slides[index].id === "last-clone") {
            slidesContainer.style.transition = "none";
            index = slideCount;
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        }
    };

    
    const nextSlide = () => {
        if (index >= slides.length - 1) return;
        index++;
        moveSlide();
    };


    const prevSlide = () => {
        if (index <= 0) return;
        index--;
        moveSlide();
    };


    let autoSlide = setInterval(nextSlide, 3000);


    document.querySelector(".next").addEventListener("click", nextSlide);
    document.querySelector(".prev").addEventListener("click", prevSlide);


    slidesContainer.addEventListener("transitionend", resetTransition);

   
    slidesContainer.addEventListener("mouseover", () => clearInterval(autoSlide));
    slidesContainer.addEventListener("mouseleave", () => autoSlide = setInterval(nextSlide, 3000));

 
    document.addEventListener("keydown", ({ key }) => {
        if (key === "ArrowRight") nextSlide();
        if (key === "ArrowLeft") prevSlide();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const inputs = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        message: document.getElementById("message"),
    };

  
    Object.keys(inputs).forEach(key => {
        if (localStorage.getItem(key)) inputs[key].value = localStorage.getItem(key);
        
    
        inputs[key].addEventListener("input", () => {
            localStorage.setItem(key, inputs[key].value);
        });
    });

   
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        alert(`Thank you, ${inputs.name.value}! Your message has been sent.`);

  
        Object.keys(inputs).forEach(key => localStorage.removeItem(key));
        form.reset();
    });
});


