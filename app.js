const container = document.querySelector(".squares-container")
var number = Math.floor(Math.random() * 101);


function generateSquares(){
    for (i = 1; i <= 100; i++) {
        const square = document.createElement("button");
        square.classList.add("square", `btn${i}`);
        square.textContent = i.toString();
        container.appendChild(square);
    }
}


function dropSquares(start, end, number) {
    for (i = start; i <= end; i++) {
        if (i === number) { continue; }
        const s = document.querySelector(`.btn${i}`);
        s.classList.add("drop");
    }

    anime({
        targets: '.drop',
        backgroundColor: "#D05353",
        rotate: '1turn'
    });
}


function restartGame() {
    number = Math.floor(Math.random() * 101);

    document.querySelectorAll(".drop").forEach(d => {
        d.classList.remove("drop");
    }); 
    const a = document.querySelector(".answer");
    a.classList.remove("answer");

    anime({
        targets: '.square',
        backgroundColor: "#A2ABAB",
        rotate: '2turn',
        duration: 1000
    });
}


generateSquares();

const squares = document.querySelectorAll(".square");

squares.forEach(square => {
    square.addEventListener('click', (event) => {
    const pickedNumber = parseInt(event.target.textContent);
    const start = parseInt(container.firstElementChild.textContent);
    const end = parseInt(container.lastElementChild.textContent);


    if (pickedNumber < number) {
        dropSquares(start, pickedNumber, number);
    }
    else if (pickedNumber > number) {
        dropSquares(pickedNumber, end, number);
    }
    else {
        dropSquares(1, 100, number);
        document.querySelector(`.btn${number}`).classList.add("answer");
        anime({
            targets: '.answer',
            backgroundColor: "#37FF8B",
            scale: [1.5, 1],
            duration: 1000
        });
    }
    })
})

document.querySelector(".restart").addEventListener('click', restartGame);