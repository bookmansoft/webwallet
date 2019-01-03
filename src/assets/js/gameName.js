function introduce() {
    var xianq = document.getElementById("introduce");
    var img = document.getElementById("gameNameImg");
    var game = document.getElementById("gameProps");
    var txtXianq = document.getElementById("inIntroduce");
    var txtImg = document.getElementById("inGameNameImg");
    var txtGame = document.getElementById("inGameProps");
    txtImg.className = "";
    txtXianq.className = "bottom-orange";
    txtGame.className = "";
    game.style.display = "none";
    xianq.style.display = "block";
    img.style.display = "none";
}
function gameNameImg() {
    var xianq = document.getElementById("introduce");
    var img = document.getElementById("gameNameImg");
    var game = document.getElementById("gameProps");
    var txtXianq = document.getElementById("inIntroduce");
    var txtImg = document.getElementById("inGameNameImg");
    var txtGame = document.getElementById("inGameProps");
    img.style.display = "block";
    xianq.style.display = "none";
    game.style.display = "none";
    txtXianq.className = "";
    txtImg.className = "bottom-orange";
    txtGame.className = "";
}
function gameProps() {
    var xianq = document.getElementById("introduce");
    var img = document.getElementById("gameNameImg");
    var game = document.getElementById("gameProps");
    var txtXianq = document.getElementById("inIntroduce");
    var txtImg = document.getElementById("inGameNameImg");
    var txtGame = document.getElementById("inGameProps");
    img.style.display = "none";
    xianq.style.display = "none";
    game.style.display = "block";
    txtXianq.className = "";
    txtImg.className = "";
    txtGame.className = "bottom-orange";
}
export {
    introduce, gameNameImg,gameProps
}