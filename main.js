import $ from "jquery";

let gold = 0;
let equips = [""];
let huntInterval = 10;
let chanceIndex = 0;
let catchCount = 0;

const shopItems = [
  { name: "charm", price: 499, chanceIndex: 1 },
  { name: "amulet", price: 999, chanceIndex: 2 },
];
const monsters = [
  [{name: "Dong", gold: 10, index: '#m1', story: "Dong is just a friendly passerby.."},
   {name: "Booger", gold: 30, index: '#m2', story:"Booger has many boogers."},
   {name: "Stone Ghoul", gold: 45, index: '#m3', story: "He has a friend who is a friend of Thor."},
   {name: "Mutated Ant", gold: 60, index: '#m4', story: "They are everywhere! eeks!"}],

  [{name: "Mutated Ant", gold: 60, index: '#m4', story: "They are everywhere! eeks!"},
   {name: "Ugly Spider", gold: 85, index: '#m5', story:"Once not so ugly."},
   {name: "Prince Toad", gold: 100, index: '#m6', story:"A toad is still a toad. Ugly."},
   {name: "Slime Wormy", gold: 125, index: '#m7', story:"Green glowing worm with a stick. Fierce."}],

  [{name: "Slime Wormy", gold: 125, index: '#m7', story:"Green glowing worm stick. Fierce."},
   {name: "Cyborg Cubone", gold: 150, index: '#m8', story:"In Pokemon, they catch'em all too."},
   {name: "Horny Pork", gold: 180, index: '#m9', story:"What a name."},
   {name: "Dragon King", gold: 210, index: '#m10', story:"The Final Boss."}]
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
    if(($('#m1').css("visibility"))  === "visible" && 
    ($('#m2').css("visibility"))  === "visible" && 
    ($('#m3').css("visibility"))  === "visible" && 
    ($('#m4').css("visibility"))  === "visible" && 
    ($('#m5').css("visibility"))  === "visible" && 
    ($('#m6').css("visibility"))  === "visible" && 
    ($('#m7').css("visibility"))  === "visible" && 
    ($('#m8').css("visibility"))  === "visible" &&
    ($('#m9').css("visibility"))  === "visible" && 
    ($('#m10').css("visibility")) === "visible") {
        alert("Congratulations! You caught them all! Refresh to restart.")
    }
};

//BUY & SELL ITEMS
//CHANGE ALERT TO DIALOG BOX
//TOOLTIP FOR EQS & MONSTERS