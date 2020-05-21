var animation = anime({

});
var animationpaused = false;
var speed, timeouta;
function getspeed() {

    speed = (document.getElementById('speed').value) / 100;
    speed += 0.2;
    requestAnimationFrame(getspeed);
}
getspeed();

function deleya(delay) {
    return new Promise(resolve => {
        timeouta = setTimeout(async () => {
            resolve('resolved');

        }, speed * delay);

    });
}

async function sleep(delay) {
    let a = animationpaused;
    while (a) {
        await deleya(1000);
        console.log(animationpaused);
        a = animationpaused;
    }
    await deleya(delay);
    a = animationpaused;
    while (a) {
        await deleya(1000);
        console.log(animationpaused);
        a = animationpaused;
    }

    return 0;

}
function pause() {
    animation.pause();
    animationpaused = true;
}
function play() {
    animationpaused = false;
    animation.play();
}
document.getElementById('pause').onclick = pause;
document.getElementById('play').onclick = play;

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


async function lireDireAnime(numFich, numBlock, numBuf) {
    let block = document.getElementById("fich" + numFich + "block" + numBlock);
    let blockClone = block.cloneNode(true);
    blockClone.id += "clone";
    block.id += " clone";
    let buffer = document.getElementById("buff" + numBuf);
    buffer.appendChild(blockClone);
    await sleep(500 * speed);
}

async function ecrireDireAnime(numFich, numBuf) {
    let buffer = document.getElementById("buff" + numBuf);

    let block = buffer.firstChild;

    let fich = document.getElementById("fich" + numFich);

    fich.appendChild(block)

    //block.parentNode.removeChild(block);
    // let id = block.id.substring(block.id.length - 5, block.id.length);
    // if (id == "clone") {
    //     block.parentNode.removeChild(block);
    // } else {

    // }
    await sleep(1000 * speed);

    //fich.scrollTop = fich.scrollHeight;

}

async function removeBlockAnime(numBuf) {
    let buffer = document.getElementById("buff" + numBuf);

    buffer.removeChild(buffer.firstChild);
    await sleep(500 * speed);
}


async function allouerBlockAnime(numBlock, numBuf) {

    let buffer = document.getElementById("buff" + numBuf);

    let block = document.createElement("div");
    block.className = "block";
    block.id = "fich" + numBuf + "block" + numBlock;

    buffer.appendChild(block);
    animation = await anime({
        targets: block,
        backgroundColor: [{ value: "#8E8E93", duration: 100 * speed }, { value: "#F2F2F7", duration: 100 * speed }]

    });
    // block.classList.add("inserting");
    // await sleep(200);
    await sleep(500 * speed);

    // block.classList.remove("inserting");
    // await sleep(200);

}

async function insererEnregAnime(numBuf, numEnreg, cle) {
    let buffer = document.getElementById("buff" + numBuf);
    let block = buffer.firstChild;

    let enreg = document.createElement("div");

    enreg.className = "enreg";
    enreg.id = block.id + "enreg" + numEnreg;
    // animation = await anime({
    //     targets: enreg,
    //     backgroundColor: { value: "#8E8E93", duration: 100 }

    // });

    // animation = await anime({
    //     targets: enreg,
    //     backgroundColor: { value: "#F2F2F7", duration: 100 }
    // });

    block.appendChild(enreg);
    enreg.classList.add("inserting");

    enreg.innerText = cle;
    await sleep(100 * speed);


    enreg.classList.remove("inserting");
    await sleep(100 * speed);

}

async function inserting(numBuf, numblock, numenreg) {
    let buffer = document.getElementById("buff" + numBuf);
    let block = buffer.firstChild;
    let id = "fich" + numBuf + "block" + numblock + "enreg" + numenreg;
    let enreg = document.querySelectorAll('[id=' + id + '');

    console.log(enreg);

    enreg[1].className += " inserting";

}

async function removeinserting(numBuf, numblock, numenreg) {
    let buffer = document.getElementById("buff" + numBuf);
    let block = buffer.firstChild;
    let id = "fich" + numBuf + "block" + numblock + "enreg" + numenreg;
    let enreg = document.querySelectorAll('[id=' + id + '');

    enreg[1].classList.remove("inserting");

}


function algoinitialisation() {
    let algo = document.getElementById("algoinitialisation");
    let algodisplay = document.getElementById("algo");
    algodisplay.innerHTML = algo.innerHTML;
}
function algofusion() {
    let algo = document.getElementById("algofusion");
    let algodisplay = document.getElementById("algo");
    algodisplay.innerHTML = algo.innerHTML;
}


function algoAnime(numLigne) {
    let algodisplay = document.getElementById("algo");
    let lignes = algodisplay.children.length;
    let children = algodisplay.children;
    for (let i = 0; i < lignes; i++) {
        let p = children[i];
        p.className = "";
    }
    if (numLigne == 0)
        return

    let p = children[numLigne - 1];
    p.className = "ligneactive";

}

algoAnime(0);
// algoinitialisation();