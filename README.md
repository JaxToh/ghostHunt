# Developing a Click Hunt Game -Jax

## Project Brief

### MVP

MVP - Minimum Viable Product

 * Built with HTML, CSS and JavaScript (jQuery is strongly optional)
 * Use Javascript for DOM manipulation
 * Hosted on Github pages
 * Commits to Github frequently
 * A README.md file with explanations of the technologies used, the approach taken, a link to your live site, installation instructions, unsolved problems, etc.
 * Be displayed in the browser
 * Have some kind of user interaction via mouseclick or keypress


## Technologies & Tools Used

* HTML
* CSS
* JavaScript
* Git & GitHub


## Description

A spin-off of a popular click-hunt rpg game, Mouse Hunt, where the player slowly hunts for a whole collection of mices from different maps once every 15 minutes, using and upgrading their traps and cheese along the way. Mouse Hunt has a feature where it catches mice for you at every interval even if you are offline, until your cheese runs out. I named my version Monster Hunter, which is a shorter and easier-to-complete version; short interval of a few seconds and less catches to win.


## Deployment

The game is deployed on GitHub pages, and you can play the game here:
https://monster-hunter-mocha.vercel.app/


## How To Play

The mechanics of the game is pretty simple. Player just need to click on the 'Hunt' button at each interval whenever it becomes available to click again. Each catch awards some gold. When there is sufficient gold, player can purchase some equips to activate for the next hunt which will increase the chances of catching more rewarding monsters. Repeated catches can be sold for a small amount of gold. Catch all 10 monsters to win.


## Challenges & Learning Points

1. Main 'Hunt' button issue with countdown
    The most important part of the code is setting up the hunt button which will only appear when the countdown reaches 0, and disappear once clicked and the countdown will only start at that point. I spent some time trying to make it work, using setInterval() to toggle visibility and huntButton click handler that will run the countdown() again and catchResult().

2. Monsters' algorithms with equipments


3. Interactivity & visual feedbacks



## Future Developments & Improvements

* Random loot drops
* Click on images to have a pop-up with details, instead of using tooltips
* Able to move to new map with new monsters
* Deeper story of each map and monsters
* Clean up hard codes to MVC model


## Game Asset Attributions
The game assets in this project does not belong to me. All rights belong to the original artists and owners. Below are the links to the game assets used in this project:

* Background image - https://www.artofmtg.com/art/swamp-35/
* Game icons - https://free-game-assets.itch.io/free-39-portraits-pixel-art-game-assets