import $ from "jquery";

let gold = 0;
let equips = ["stick"];
let huntInterval = 20;
let chanceIndex = 0;
let catchCount = 0;

const shopItems = [
  { name: "charm", price: 500, chanceIndex: 1 },
  { name: "amulet", price: 999, chanceIndex: 2 },
];
const monsters = [
  [{name: "Dong", gold: 10, index: '#m1', story: "Dong is just a passerby.."}, {name: "Booger", gold: 20, index: '#m2'}, {name: "Stone Ghoul", gold: 30, index: '#m3'}, {name: "Mutated Ant", gold: 40, index: '#m4'}],
  [{name: "Mutated Ant", gold: 40, index: '#m4'}, {name: "Ugly Spider", gold: 50, index: '#m5'}, {name: "Prince Toad", gold: 60, index: '#m6'},{name: "Slime Worm", gold: 70, index: '#m7'}],
  [{name: "Slime Worm", gold: 70, index: '#m7'}, {name: "Cyborg Cubone", gold: 80, index: '#m8'}, {name: "Horny Pork", gold: 90, index: '#m9'},{name: "Dragon King", gold: 100, index: '#m10'}]
];

const shopToggle = $("#shopButton").on("click", () => {
  if ($("#shop").css("visibility") === "hidden")
    $("#shop").css("visibility", "visible");
  else $("#shop").css("visibility", "hidden");
});

const countDown = () => {
    let i = huntInterval;
    setInterval(() => {
        if (i < 0) {clearInterval(this);
        } else $("#countDown").text(i--);
        if ($("#countDown").text() === "0") {
            $("#countDown").text("");
            $("#huntButton").css("visibility", "visible");
            $("#text").text("You are ready to hunt again!");
        }
    }, 1000);
};

const catchResult = () => {
    const randomIndex = Math.floor(Math.random() * monsters[0].length);
    let thisCatch = monsters[chanceIndex][randomIndex];
    catchCount += 1;
    gold += thisCatch.gold;
    $('#count').text(`${catchCount}`);//or img w400h230
    $('#text').text(`You caught a ${thisCatch.name}! Gold +$${thisCatch.gold}`)
    $('#story').text(thisCatch.story);
    $('#gold').text(gold);
    $(thisCatch.index).css("visibility", "visible");
    winCheck();
}

const huntButton = $("#huntButton").on("click", () => {
    $("#huntButton").css("visibility", "hidden");
    catchResult();
    countDown();
});

const buyCharm = $('#charm').on("click", () => {
    let item = shopItems[0];
    if(chanceIndex < item.chanceIndex) {
        if (gold > item.price) {
            gold -= item.price;
            chanceIndex = item.chanceIndex;
            $('#gold').text(gold);
            equips.push(item.name);
            $("#e1").css("visibility", "visible");
            $('#text').text(`You purchased a ${item.name}.`)
        } else {
            $('#text').text("You do not have enough gold.");
        }
    } else {
        $('#text').text("You already have this item.");
    }
})

const buyAmulet = $('#amulet').on("click", () => {
    let item = shopItems[1];
    if(chanceIndex < item.chanceIndex) {
        if (gold > item.price) {
            gold -= item.price;
            chanceIndex = item.chanceIndex;
            $('#gold').text(gold);
            equips.push(item.name);
            $("#e2").css("visibility", "visible");
            $('#text').text(`You purchased a ${item.name}.`)
        } else {
            $('#text').text("You do not have enough gold.");
        }
    } else {
        $('#text').text("You already have this item.");
    }
})

const winCheck = () => {
    if( $('#m1').css("visibility") && $('#m2').css("visibility") && $('#m3').css("visibility") && $('#m4').css("visibility") && $('#m5').css("visibility") && $('#m6').css("visibility") && $('#m7').css("visibility") && $('#m8').css("visibility") && $('#m9').css("visibility") && $('#m10').css("visibility") === "visible") {
        alert("Congratulations! You caught them all! Refresh to restart.")
    }
};

//WIN CONDITION BUG
//CHANGE ALERT TO DIALOG BOX
//TOOLTIP FOR EQS & MONSTERS
