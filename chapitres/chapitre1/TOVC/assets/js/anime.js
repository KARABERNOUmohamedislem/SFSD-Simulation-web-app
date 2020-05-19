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

///////////////////////////////////////////
//////////////////////////////////////////


/////////////////////////////////////////////
////////////////////////////////////////////

function getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

function moveTo(numBloc, numBuf) {
    var buffer = document.getElementById("buf" + numBuf);
    var bufPos = getPosition(buffer);

    var bloc = document.getElementById("bloc" + numBloc + "clone");
    var blocPos = getPosition(bloc);

    var distance = {
        x: bufPos.x - blocPos.x,
        y: bufPos.y - blocPos.y
    }

    anime({
        targets: bloc,
        keyframes: [
            { translateY: distance.y },
            { translateX: distance.x },
        ],
        duration: 1000,
        delay: 400
    });

}

async function insererAnime(numBloc, indice, text) {
    let enreg = document.getElementById("enreg" + indice + "bloc" + numBloc);
    enreg.style.visibility = "visible";
    let color = enreg.style.backgroundColor;

    //sleep(1000);
    animation = anime({
        targets: enreg,
        width: [{ value: 21, duration: 300 },
        { value: 20 }],
        height: [{ value: 21, duration: 300 },
        { value: 20 }],
        backgroundColor: [{
            value: "#8E8E93",
            duration: 300,
        },
        {
            value: "#F2F2F7",
        }]
    });
    enreg.innerText = text;

}

async function translateAnime(numBlocRec, indiceRec, numBlocSen, indiceSen, textTrans) {
    let enregRec = document.getElementById("enreg" + indiceRec + "bloc" + numBlocRec);
    enregRec.style.visibility = "visible";
    let color = enregRec.style.backgroundColor;
    let enregSen = document.getElementById("enreg" + indiceSen + "bloc" + numBlocSen);
    enregSen.style.visibility = "visible";
    //await sleep(100);
    animation = anime({
        targets: [enregRec, enregSen],
        backgroundColor: [{
            value: "#8E8E93",
            duration: 300,
        },
        {
            value: "#F2F2F7"
        }]
    });
    enregRec.innerHTML = textTrans;
    await sleep(100 * speed);

}

async function lireDirAnime(numBloc, numBuf) {

    var bloc = document.getElementById("bloc" + numBloc);
    animation = anime({
        targets: bloc,
        // translateY: 200,
        backgroundColor: "#0084FF",
        duration: 400,
        delay: 100,
        easing: 'easeInOutExpo'
    });

    await sleep(600);
}

async function ecrireDirAnime(numBloc, numBuf) {

    var bloc = document.getElementById("bloc" + numBloc);


    animation = anime({
        targets: bloc,
        // translateY: -0,
        backgroundColor: "#F2F2F7",
        duration: 400,
        delay: 100,
        easing: 'easeInOutExpo'
    });

    await sleep(600 * speed);
}


async function enregcouleur(numBloc, indice, couleur) {
    let enreg = document.getElementById("enreg" + indice + "bloc" + numBloc);

    animation = anime({
        targets: enreg,
        width: [{ value: 21, duration: 300 },
        { value: 20 }],
        height: [{ value: 21, duration: 300 },
        { value: 20 }],
        backgroundColor: [{
            value: couleur,
            duration: 300,
        },
        {
            value: "#F2F2F7",
        }]
    });
}
async function suprimmenreg(numBloc, indice) {
    let enreg = document.getElementById("enreg" + indice + "bloc" + numBloc);
    enreg.style.visibility = "visible";
}



async function supBlockAnime(numBloc) {
    let block = document.getElementById("bloc" + numBloc);
    let width = block.style.width;
    let height = block.style.height;

    await sleep(200 * speed);
    block.parentNode.removeChild(block);

}
async function supEnregAnime(numBloc, indice) {
    let enreg = document.getElementById("enreg" + indice + "bloc" + numBloc);
    let width = enreg.style.width;
    let height = enreg.style.height;

    enreg.style.visibility = "hidden";
    enreg.innerText = "";


}



function algo_rech() {
    let algo = document.getElementById("algorech");
    let algodisplay = document.getElementById("algo");
    algodisplay.innerHTML = algo.innerHTML;
}



function algo_insertion() {
    let algo = document.getElementById("algoinsertion");
    let algodisplay = document.getElementById("algo");
    algodisplay.innerHTML = algo.innerHTML;
}
function algo_supression() {
    let algo = document.getElementById("algosupression");
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

    if (numLigne == 0) {
        return
    }


    let p = children[numLigne - 1];
    p.className = "ligneactive";

}

