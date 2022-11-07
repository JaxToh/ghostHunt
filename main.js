import $ from "jquery";

let gold = 0;
let equips = ["stick"];
let huntInterval = 3;
let chanceIndex = 0;

const shopItems = [
  { name: "charm", price: 500, chanceIndex: 1 },
  { name: "amulet", price: 999, chanceIndex: 2 },
];
const monsters = [
  [{name: 1, gold: 10, index: '#m1'}, {name: 2, gold: 20, index: '#m2'}, {name: 3, gold: 30, index: '#m3'}, {name: 4, gold: 40, index: '#m4'}],
  [{name: 4, gold: 40, index: '#m4'}, {name: 5, gold: 50, index: '#m5'}, {name: 6, gold: 60, index: '#m6'},{name: 7, gold: 70, index: '#m7'}],
  [{name: 7, gold: 70, index: '#m7'}, {name: 8, gold: 80, index: '#m8'}, {name: 9, gold: 90, index: '#m9'},{name: 10, gold: 100, index: '#m10'}]
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
    $('#result').text(`${thisCatch.name}`);//or img w400h230
    $('#text').text(`You caught a ${thisCatch.name}! Gold +$${thisCatch.gold}`)
    gold += thisCatch.gold;
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

//WIN CONDITION BUG - ?m9 not considered?
//CHANGE ALERT TO DIALOG BOX
//ADD BACKGROUND AND IMAGES
//TOOLTIP FOR EQS & MONSTERS
//START PAGE WITH README
