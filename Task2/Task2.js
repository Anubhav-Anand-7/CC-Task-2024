let arr = ["section1", "section2", "section3", "section4", "section5", "section6", "section7", "section8", "section9", "section10"];
let img= ["img1","img2","img3","img4","img5","img6"];

class Basket {
    async cartItems() {
        try {
            let result = await fetch('https://coding-week-2024-api.onrender.com/api/data');
            let data = await result.json();

            // Destructuring data
            data = data.map(item => {
                const { id, type, headline, date, image, author, content } = item;
                return { id, type, headline, date, image, author, content };
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}

class Display {
    constructor() {
        this.result = [];
    }

    displayBasket(basket) {
        this.result = basket;
    }

    getResult() {
        return this.result;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const basket = new Basket();
    const display = new Display();

    await basket.cartItems().then(basket => display.displayBasket(basket));

    const result = display.getResult();

    for (let i = 0; i < 4; i++) {
        let elements = document.getElementsByClassName(arr[i]);
        let final = result[i];
        let append = `
            <h6 style="display:inline;border-radius:5px; border:2px white;background-color:black;color:white;">${final.type}</h6>
            <h5 style="color:white;">${final.headline}</h5>
            <p style="color:white;"><bold>${final.author}</bold></p>
            <div class="date">
                <svg style="margin:0px;padding:0px;height:20px;width:20px;color:white;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <p style="color:white;">${final.date}</p>
            </div>`;
        elements[0].innerHTML = append;
        elements[0].style.backgroundImage = `url('${final.image}')`;
    }
    for (let i = 4; i < 10; i++) {
        let elements = document.getElementsByClassName(arr[i]);
        let final = result[i];
        let append = `
        <img style="height:125px;width:125px;display:inline;border-radius:10px;margin-right:10px;float:left;" src="${final.image}">
        <div class="text1" style="padding:10px;">${final["headline"]}</div>
        <div class="date">
            <svg style="margin:0px;padding:0px;height:20px;width:20px;color:black;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <h4 style="color:black;">${final["date"]}</h4>
        </div><br>`;
        elements[0].innerHTML = append;
    }
});