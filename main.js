import $ from "jquery";

let gold = 300;
let huntInterval = 9;
let equips = [];
let activeItem = "";
let amuletEffect = 0;
let charmEffect = 0;
let chanceIndex = 0;
let catchCount = 0;

const shopItems = [
  { name: "charm", price: 99, chanceIndex: 2 },
  { name: "amulet", price: 299, chanceIndex: 4 },
];

const monsters = [
  {name: "Dong", gold: 10, index: '#m1', count: 0, story: "Dong is just a friendly passerby.."},
  {name: "Booger", gold: 30, index: '#m2', count: 0, story:"Booger has many boogers."},
  {name: "Stone Ghoul", gold: 45, index: '#m3', count: 0, story: "He has a friend who is a friend of Thor."},
  {name: "Mutated Ant", gold: 60, index: '#m4', count: 0, story: "They are everywhere! eeks!"},
  {name: "Ugly Spider", gold: 85, index: '#m5', count: 0, story:"Once not so ugly."},
  {name: "Prince Toad", gold: 100, index: '#m6', count: 0, story:"A toad is still a toad. Ugly."},
  {name: "Slime Wormy", gold: 125, index: '#m7', count: 0, story:"Green glowing worm with a stick. Fierce."},
  {name: "Cyborg Cubone", gold: 150, index: '#m8', count: 0, story:"In Pokemon, they catch'em all too."},
  {name: "Horny Boar", gold: 180, index: '#m9', count: 0, story:"What a name."},
  {name: "Dragon King", gold: 210, index: '#m10', count: 0, story:"The Final Boss."}
];
/*
It is believed that they seek out and attack a particular kind of person.
According to folktales, they were created by a mad sorceror.
Rumor holds that they migrate every once in a long while to a place no one has found.
They are not always violent, and sometimes merely play tricks on the unwary.
monster lives in places touched by otherworldly power.
It dislikes certain talismans
This tiny arachnoid beast lairs in deep canyons. It attacks with dizzying blows & venom
their eggs are powerful alchemical ingredients.
they are sometimes kept as pets by evil arcanists.
they are descended from a lost civilization.
This towering fiendish creature lairs in places touched by dark powers.
Local folktales say that they can be negotiated with, though their demands are unusual.

*/

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
            $('td').removeClass("animated flash");
        } 
    }, 1000);
};

const catchResult = () => {
    const randomIndex = Math.floor(Math.random() * (monsters.length - 4));
    let thisCatch = monsters[randomIndex];
    if (activeItem === "amulet") {
        thisCatch = monsters[randomIndex + amuletEffect];
    } else if (activeItem === "charm" && randomIndex < 2) {
        thisCatch = monsters[randomIndex + charmEffect];
    } else {
        thisCatch = monsters[randomIndex + chanceIndex]};
    catchCount += 1;
    gold += thisCatch.gold;
    $('#count').text(`${catchCount}`);
    $('#text').text(`You caught a ${thisCatch.name}! Gold +$${thisCatch.gold}`)
    $('#story').text(thisCatch.story);
    $('#gold').text(gold);
    $(thisCatch.index).css("visibility", "visible");
    thisCatch.count += 1;
    $(`${thisCatch.index}qty`).text(thisCatch.count);
    $(`${thisCatch.index}`).addClass("animated flash");
    if (activeItem) {removeActiveItem(activeItem, equips)};
    console.log(equips);
    amuletEffect = 0;
    charmEffect = 0;
    chanceIndex = 0;
    activeItem = "";
    $('#e1').css("background-color", "");
    $('#e1').css("color", "white");
    $('#e1').css("font-weight", "");
    $('#e2').css("background-color", "");
    $('#e2').css("color", "white");
    $('#e2').css("font-weight", "");

     let countCharm = 0;
     for (const eq of equips) {
         if (eq === "charm") {
        countCharm++;}
        };
     $('#e1qty').text(countCharm);

     let countAmulet = 0;
     for (const eq of equips) {
            if (eq === "amulet") {
             countAmulet++;}
        };
    $('#e2qty').text(countAmulet);
    winCheck();
}

const removeActiveItem = (value, arr) => {
        const index = arr.indexOf(value);
        arr.splice(index, 1);
}

const huntButton = $("#huntButton").on("click", () => {
    $("#huntButton").css("visibility", "hidden");
    catchResult();
    countDown();
    if (($('#e1qty').text()) === "0") {
        $("#e1").removeClass("animated fadeIn");
        $("#e1").css("visibility", "hidden");
    }  
    if (($('#e2qty').text())=== "0") {
        $("#e2").removeClass("animated fadeIn");
        $("#e2").css("visibility", "hidden");
    }
});

const buyCharm = $('#charm').on("click", () => {
    let item = shopItems[0];
    if (gold > item.price) {
        gold -= item.price;
        equips.push(item.name);
        $('#gold').text(gold);
        $("#e1").css("visibility", "visible");
        $("#e1").addClass("animated fadeIn");
        $('#text').text(`You purchased a ${item.name}.`)
        let counter = 0;
        for (const eq of equips) {
            if (eq === item.name) {
                counter++;}
            };
        $('#e1qty').text(counter);

    } else {
        $('#text').text("You do not have enough gold.");
    }
})

const buyAmulet = $('#amulet').on("click", () => {
    let item = shopItems[1];
    if (gold > item.price) {
        gold -= item.price;
        equips.push(item.name);
        $('#gold').text(gold);
        $("#e2").css("visibility", "visible");
        $("#e2").addClass("animated fadeIn");
        $('#text').text(`You purchased a ${item.name}.`)
        let counter = 0;
        for (const eq of equips) {
            if (eq === item.name) {
                counter++;}
            };
        $('#e2qty').text(counter);
    } else {
        $('#text').text("You do not have enough gold.");
    }
})

const useCharm = $('#useCharm').on("click", () => {
    let counter = 0;
    for (const eq of equips) {
        if (eq === "charm") {
            counter++;}
        };
    if (counter > 0) {
        $('#e2').css("background-color", "");
        $('#e2').css("color", "white");
        $('#e2').css("font-weight", "");
        $('#e1').css("background-color", "gold");
        $('#e1').css("color", "black");
        $('#e1').css("font-weight", "bold");
        if (activeItem !== "charm") {
        activeItem = "charm";}
        chanceIndex = shopItems[0].chanceIndex;
        charmEffect += 2;
    } else {
        $('#text').text("You do not have any.");
    }
});

const useAmulet = $('#useAmulet').on("click", () => {
    let counter = 0;
    for (const eq of equips) {
        if (eq === "amulet") {
            counter++;}
        };
    if (counter > 0) {
        $('#e1').css("background-color", "");
        $('#e1').css("color", "white");
        $('#e1').css("font-weight", "");
        $('#e2').css("background-color", "gold");
        $('#e2').css("color", "black");
        $('#e2').css("font-weight", "bold");
        if (activeItem !== "amulet") {
            activeItem = "amulet";}
        chanceIndex = shopItems[1].chanceIndex;
        amuletEffect += 4;
    } else {
        $('#text').text("You do not have any.");
    }
});

function winCheck() {
    if (($('#m1').css("visibility")) === "visible" &&
        ($('#m2').css("visibility")) === "visible" &&
        ($('#m3').css("visibility")) === "visible" &&
        ($('#m4').css("visibility")) === "visible" &&
        ($('#m5').css("visibility")) === "visible" &&
        ($('#m6').css("visibility")) === "visible" &&
        ($('#m7').css("visibility")) === "visible" &&
        ($('#m8').css("visibility")) === "visible" &&
        ($('#m9').css("visibility")) === "visible" &&
        ($('#m10').css("visibility")) === "visible") {
        alert("Congratulations! You caught them all! Refresh to restart.")
    }
}

//MONSTERS DESCRIPTIONS
//DESELECT EQUIPS USE
//CHANGE ALERT TO DIALOG BOX
//TOOLTIP FOR EQS & MONSTERS
//README