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

///////////////////////////
//////////////////////////

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

function moveTo(numBloc, buf) {
    var buffer = document.querySelector(".buf" + buf);
    var bufPos = getPosition(buffer);

    var bloc = document.querySelector(".bloc" + numBloc);
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
        duration: 3000,
        delay: 1000
    });

}
/////////////////////////////
////////////////////////////

function create_table_liste(rowNumber) {
    let div = document.getElementById("tab1");
    let table = document.createElement("table");
    table.className = "table table-bordered";
    table.id = "liste";
    let thead = document.createElement("thead");
    let theadrow = document.createElement("tr");
    for (let i = 0; i < 3; i++) {
        let th = document.createElement("th");
        theadrow.appendChild(th);
    }
    thead.append(theadrow);
    let tbody = document.createElement("tbody");
    for (let j = 0; j < rowNumber; j++) {
        let tbodyrow = document.createElement("tr");
        tbodyrow.id = "listerow" + j;
        tbodyrow.className = "row";
        for (let k = 0; k < 3; k++) {
            let tbodyel = document.createElement("td");
            tbodyel.classList = "llc";
            tbodyel.innerText = "aaas";
            tbodyrow.appendChild(tbodyel);
        }
        tbody.append(tbodyrow);
    }
    table.append(thead, tbody);
    div.append(table);

}

function create_table_hachage(rowNumber, colnumber, div, id) {



    let div2 = document.getElementById(div);
    let table = document.createElement("table");
    table.className = "table table-bordered";
    table.id = id;
    let caption = document.createElement("caption");
    id != "liste" ? caption.innerText = "table de hachage" : caption.innerText = "liste lineaire chainee";
    table.appendChild(caption);
    let thead = document.createElement("thead");
    let theadrow = document.createElement("tr");
    for (let i = 0; i < colnumber; i++) {
        let th = document.createElement("th");
        if (id != "liste") {
            if (i == 0) {
                th.innerText = "Case";
                th.className = "case";
            }
            else if (i == 1) {
                th.innerText = "Cle";
                th.className = "cle";
            }
            else if (i == 2) {
                th.innerText = "Lien";
                th.className = "lien";
            }
        }
        theadrow.appendChild(th);
    }
    thead.append(theadrow);
    let tbody = document.createElement("tbody");
    for (let j = 0; j < rowNumber; j++) {
        let tbodyrow = document.createElement("tr");
        tbodyrow.id = "hashrow" + j;
        for (let k = 0; k < colnumber; k++) {
            let tbodyel = document.createElement("td");
            tbodyel.id = id + "row" + j + "el" + k;
            if (id != "liste") {
                if (k == 0) {
                    tbodyel.innerText = j;

                }
                else if (k == 1) {
                    tbodyel.innerText = "vide";

                }
                else if (k == 2) {
                    let img = document.createElement("img");
                    img.className = "cover";
                    img.src = "assets/img/images/vide.png";
                    tbodyel.appendChild(img);
                }
            }
            tbodyrow.appendChild(tbodyel);
        }
        tbody.append(tbodyrow);
    }
    table.append(thead, tbody);
    div2.appendChild(table);
}
async function Insertion_anime_main(enreg, indice) {

    let row = document.getElementById("hashrow" + indice);
    let clss = row.className;
    row.className += " activerow";
    await sleep(400 * speed);


    let champ = document.getElementById("table2row" + indice + "el1");
    champ.innerText = enreg.cle;
    await sleep(400 * speed);


    row.className = clss;

}

async function Insertion_anime_secon(enreg, indice, emplacement) {
    let lien = document.getElementById("table2row" + indice + "el2");
    lien.innerHTML = "";
    let img2 = document.createElement("img");
    img2.className = "cover";
    img2.src = "assets/img/images/plein.png";
    lien.appendChild(img2);
    //
    let row = document.getElementById("listerow" + indice);
    let imgcase = document.getElementById("listerow" + indice + "el" + (2 * emplacement));
    let img = document.createElement("img");
    img.className = "cover2";
    img.src = "assets/img/images/link4.png";
    imgcase.append(img);

    let case2 = document.getElementById("listerow" + indice + "el" + (2 * emplacement + 1));
    let block = document.createElement("div");
    case2.appendChild(block);
    block.classList.add("block");
    anime({
        targets: block,
        backgroundColor: [{ value: "red", duration: 150 * speed },
        { value: "" }]
    })
    block.innerText = enreg.cle;

}

async function animecaseliste(indice, emplacement, color) {
    let case3 = document.getElementById("listerow" + indice + "el" + (2 * emplacement + 1));
    let case2 = case3.firstChild;
    let color2 = case2.style.backgroundColor;
    case2.style.backgroundColor = color;
    await sleep(400 * speed);
    case2.style.backgroundColor = color2
}


async function animecasetab(row, color) {
    let case2 = document.getElementById("hashrow" + row);

    let color2 = case2.style.backgroundColor;
    case2.style.backgroundColor = color;
    await sleep(400 * speed);
    case2.style.backgroundColor = color2

}

async function suprimmercasetab(row, indice, i) {
    let case2 = document.getElementById("hashrow" + row);
    let cle = case2.children[1];
    cle.innerText = "vide";
    if (i == 1) {
        let case3 = document.getElementById("listerow" + row + "el" + (2 * indice + 1));
        let bloc = case3.firstChild;


        animecasetab(row);
        animecaseliste(row, indice);

        cle.innerText = bloc.innerText;
        case3.innerHTML = "";
        case3 = document.getElementById("listerow" + row + "el" + (2 * indice));
        case3.innerHTML = "";
    }



}

async function suprimmercaseliste(indice, i = 1, emplacement, emplacement2 = 0) {
    switch (i) {
        case 1:
            let case3 = document.getElementById("listerow" + indice + "el" + (2 * emplacement + 1));
            case3.innerHTML = "";
            case3 = document.getElementById("listerow" + indice + "el" + (2 * emplacement));
            case3.innerHTML = "";
            break;

        case 2:
            let case5 = document.getElementById("listerow" + indice + "el" + (2 * emplacement2 + 1))
            let case4 = document.getElementById("listerow" + indice + "el" + (2 * emplacement + 1));
            case4.innerHTML = case5.innerHTML;
            case5.innerHTML = "";
            case5 = document.getElementById("listerow" + indice + "el" + (2 * emplacement2));
            case5.innerHTML = "";

            break;


    }


}

function algorech() {
    let algo = document.getElementById("algorecherche");
    let algodisplay = document.getElementById("algo");
    algodisplay.innerHTML = algo.innerHTML;
}
function algoinsertion() {
    let algo = document.getElementById("algoinsertion");
    let algodisplay = document.getElementById("algo");
    algodisplay.innerHTML = algo.innerHTML;
}
function algosupression() {
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
    if (numLigne == 0)
        return

    let p = children[numLigne - 1];
    p.className = "ligneactive";

}
