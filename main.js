import $ from "jquery";

let gold = 0;
let huntInterval = 5;
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
  {name: "Dong", gold: 10, price: 5, index: '#m1', count: 0, story: "Dong is just a friendly passerby.. They live in groups of 5-12, usually grazing on stones."},
  {name: "Booger", gold: 30, price: 5, index: '#m2', count: 0, story:"Booger has many boogers. According to folktales, they were created by a mad sorceror."},
  {name: "Stone Ghoul", gold: 45, price: 5, index: '#m3', count: 0, story: "He has a friend who is a friend of Thor. They are descended from a lost civilization."},
  {name: "Mutated Ant", gold: 60, price: 5, index: '#m4', count: 0, story: "They are everywhere! eeks! Their eggs are powerful alchemical ingredients."},
  {name: "Ugly Spider", gold: 85, price: 5, index: '#m5', count: 0, story:"This tiny arachnoid beast lairs in deep canyons. It attacks with dizzying blows & venom."},
  {name: "Prince Toad", gold: 100, price: 10, index: '#m6', count: 0, story:"They are not always violent, and sometimes merely play tricks on the unwary."},
  {name: "Slime Wormy", gold: 125, price: 10, index: '#m7', count: 0, story:"Angsty green glowing worm with a stick. It seems to brighten up when closer to metals.."},
  {name: "Cyborg Cubone", gold: 150, price: 10, index: '#m8', count: 0, story:"In Pokemon, they catch'em all too. But this guy could have went through the multiverse."},
  {name: "Horny Boar", gold: 180, price: 20, index: '#m9', count: 0, story:"Once hunted for their horns, they are sometimes kept as pets by evil arcanists. It dislikes certain talismans."},
  {name: "Dragon King", gold: 210, price: 20, index: '#m10', count: 0, story:"A rarely seen and mysterious dweller in the lair. Local folktales say that they can be negotiated with, though their demands are unusual."}
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
    $('#gold').css("color", "rgb(25, 215, 25)");
    setTimeout(() => {
        $('#gold').css("color", "goldenrod");
        }, 1000);
    $('#count').text(`${catchCount}`);
    $('#text').text(`You caught a ${thisCatch.name}! Gold +$${thisCatch.gold}`)
    $('#story').text(thisCatch.story);
    $('#gold').text(gold);
    $(thisCatch.index).css("visibility", "visible");
    thisCatch.count += 1;
    $(`${thisCatch.index}qty`).text(thisCatch.count);
    $(`${thisCatch.index}`).addClass("animated flash");
    if (activeItem) {removeActiveItem(activeItem, equips)};
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
    $('#useCharm').text("USE");
    $('#useAmulet').text("USE");
    countDown();
    catchResult();
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
        $('#gold').css("color", "brown");
        setTimeout(() => {
            $('#gold').css("color", "goldenrod");
            }, 500);
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
        $('#gold').css("color", "grey");
        setTimeout(() => {
            $('#gold').css("color", "goldenrod");
            }, 250);
    }
})

const buyAmulet = $('#amulet').on("click", () => {
    let item = shopItems[1];
    if (gold > item.price) {
        gold -= item.price;
        equips.push(item.name);
        $('#gold').text(gold);
        $('#gold').css("color", "brown");
        setTimeout(() => {
            $('#gold').css("color", "goldenrod");
            }, 500);
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
        $('#gold').css("color", "grey");
        setTimeout(() => {
            $('#gold').css("color", "goldenrod");
            }, 250);
    }
})

const useCharm = $('#useCharm').on("click", () => {
    if (activeItem === "" || activeItem === "amulet") {
        $('#e2').css("background-color", "");
        $('#e2').css("color", "white");
        $('#e2').css("font-weight", "");
        $('#e1').css("background-color", "gold");
        $('#e1').css("color", "black");
        $('#e1').css("font-weight", "bold");
        $('#useCharm').text("cancel");
        $('#useAmulet').text("USE");
        if (activeItem !== "charm") {
        activeItem = "charm";}
        chanceIndex = shopItems[0].chanceIndex;
        charmEffect = 2;
        amuletEffect = 0;
    } else {
        $('#e1').css("background-color", "");
        $('#e1').css("color", "white");
        $('#e1').css("font-weight", "");
        $('#useCharm').text("USE");
        activeItem = "";
        chanceIndex = 0;
        charmEffect = 0;
    }
});

const useAmulet = $('#useAmulet').on("click", () => {
    if (activeItem === "" || activeItem === "charm") {
        $('#e1').css("background-color", "");
        $('#e1').css("color", "white");
        $('#e1').css("font-weight", "");
        $('#e2').css("background-color", "gold");
        $('#e2').css("color", "black");
        $('#e2').css("font-weight", "bold");
        $('#useCharm').text("USE");
        $('#useAmulet').text("cancel");
        if (activeItem !== "amulet") {
            activeItem = "amulet";}
        chanceIndex = shopItems[1].chanceIndex;
        charmEffect = 0;
        amuletEffect = 4;
    } else {
        $('#e2').css("background-color", "");
        $('#e2').css("color", "white");
        $('#e2').css("font-weight", "");
        $('#useAmulet').text("USE");
        activeItem = "";
        chanceIndex = 0;
        amuletEffect = 0;
    }
});

const sellMonster = $('.sell').on("click", (e) =>{
     let soldMonster = monsters[e.target.id];
     if (soldMonster.count > 1) {
     soldMonster.count -= 1;
     gold += soldMonster.price;
     $('#gold').text(gold);
     $('#gold').css("color", "rgb(25, 215, 25)");
     $(`${soldMonster.index}qty`).text(soldMonster.count);
     $(`${soldMonster.index}`).css("background-color", "rgb(25, 215, 25)");
     $(`${soldMonster.index}`).css("color", "black");
        setTimeout(() => {
        $(`${soldMonster.index}`).css("background-color", "");
        $(`${soldMonster.index}`).css("color", "white");
        $('#gold').css("color", "goldenrod");
        }, 500);
     $("#text").text(`You sold a ${soldMonster.name}. +$${soldMonster.price}.`);
    } else {
    $(`${soldMonster.index}`).css("background-color", "grey");
    $('#gold').css("color", "grey");
        setTimeout(() => {
        $(`${soldMonster.index}`).css("background-color", "");
            $('#gold').css("color", "goldenrod");
        }, 250);
     $("#text").text("You cannot sell the last one of each.");
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
        alert("Congratulations! You have caught them all! Refresh to restart.")
    }
}


//README
//CLEANUP CODES/ REMOVE HARD CODES -> USE MVC UPDATE() AND RENDER()