/////////////////////////////////////////////////////////////
//////////////// Declaration des classes ///////////////////
///////////////////////////////////////////////////////////

class EnteteCS {

    constructor(tailleDeTab) {
        this.tailleDeTab = tailleDeTab;
    }

    Entete(i = 1) {
        if (i == 1) {
            return this.tailleDeTab;
        }
    }

    Aff_Entete(i = 1, param) {
        if (i == 1) {
            this.tailleDeTab = param;
        }
    }
}

//////////////////////////////////////////////////
/////////////////////////////////////////////////

class TenregCS {

    constructor(cle, champ) {
        this.cle = cle;
        this.champ = champ;
    }
}

//////////////////////////////////////////////////
/////////////////////////////////////////////////

class TblocCS {
    /// fields
    value
    listeChainee
    ///

    constructor(value, listeChainee) {
        this.value = value;
        this.listeChainee = listeChainee;
    }


}

/////////////////////////////////////////////////
////////////////////////////////////////////////

class hashCS {

    constructor() {
        this.tabCS = [];
        this.Entete = new EnteteCS(0);
    }

    hashCode(cle) {
        return cle % this.Entete.Entete();
    }
    async Initialisation(a) {
        this.Entete = new EnteteCS(a);
        await create_table_hachage(a, 3, "tab1", "table2");
        await create_table_hachage(a, 15, "tab2", "liste");


    }

    async intialiser(vals) {

        for (let val = 0; val < vals.length; val++) {

            await this.Insertion(new TenregCS(vals[val], ""));
            await sleep(500 * speed);
        }
    }
    async Recherche(cle, i = 1) {
        if (i == 0) {
            algoAnime(1);
            algoAnime(2);
        }

        let indice = this.hashCode(cle);
        if (i == 0)
            algoAnime(3);
        if (this.tabCS[indice] === undefined) {
            return false;
        } else {
            await animecasetab(indice, "#fff255");
            await sleep(400);
            if (i == 0)
                algoAnime(4);
            if (this.tabCS[indice].value.cle == cle) {
                await animecasetab(indice, "#66ff4d");
                if (i == 0)
                    algoAnime(5);
                await sleep(400);

                return {
                    trouve: true,
                    place: 1
                }
            } else {
                if (i == 0)
                    algoAnime(6);
                if (i == 0)
                    algoAnime(7);
                await animecasetab(indice, "#ff2427");
                if (i == 0) algoAnime(7);
                let k=i;
                for (let i = 0; i < this.tabCS[indice].listeChainee.length; i++) {
                    if (k == 0)
                        algoAnime(8);
                    await animecaseliste(indice, i, "#fff255");
                    if (this.tabCS[indice].listeChainee[i].cle == cle) {
                        await animecaseliste(indice, i, "#66ff4d");
                        return {
                            trouve: true,
                            place: 2
                        }
                    }
                    await animecaseliste(indice, i, "#ff2427");
                }
                if (i == 0)
                    algoAnime(9);
                return false;
            }
        }
    }

    async Insertion(enreg) {
        algoinsertion();
        let indice = enreg.cle % this.Entete.Entete();
        algoAnime(2);
        await sleep(500);
        let a = await this.Recherche(enreg.cle);
        if (a.trouve == true) {
            algoAnime(3);
            await sleep(500);
            algoAnime(8);
            await sleep(500);
            algoAnime(9);
            await sleep(500);
        }
        else {
            algoAnime(3);
            await sleep(500);
            algoAnime(4);
            await sleep(500);
            if (this.tabCS[indice] === undefined) {
                algoAnime(5);
                await Insertion_anime_main(enreg, indice);
                this.tabCS[indice] = new TblocCS(enreg, []);
            } else {
                algoAnime(6);
                await sleep(500);
                algoAnime(7);
                await sleep(500);
                this.tabCS[indice].listeChainee.push(enreg);
                await Insertion_anime_secon(enreg, indice, this.tabCS[indice].listeChainee.length - 1);
            }
        }
        algoAnime(0);
    }

    async Supression(cle) {
        algosupression();
        let indice = this.hashCode(cle);
        let result = await this.Recherche(cle);

        if (result.trouve == false) {
            console.log("enreg nexiste pas");
        } else {
            console.log(result.trouve, result.place);
            if (result.place == 1) {

                if (this.tabCS[indice].listeChainee.length > 0) {
                    await suprimmercasetab(indice, this.tabCS[indice].listeChainee.length - 1, 1);
                    this.tabCS[indice].value = this.tabCS[indice].listeChainee[this.tabCS[indice].listeChainee.length - 1];
                    this.tabCS[indice].listeChainee.pop();
                } else {
                    await suprimmercasetab(indice, this.tabCS[indice].listeChainee.length - 1, 2);
                    this.tabCS[indice] = undefined;
                }
            } else {
                console.log("ici");
                if (this.tabCS[indice].listeChainee.length == 1) {
                    await suprimmercaseliste(indice, 1, 0);
                    this.tabCS[indice].listeChainee.pop();
                } else {
                    for (let i = 0; i < this.tabCS[indice].listeChainee.length; i++) {
                        if (this.tabCS[indice].listeChainee[i].cle == cle) {
                            if (i == this.tabCS[indice].listeChainee.length - 1) {
                                await suprimmercaseliste(indice, 1, this.tabCS[indice].listeChainee.length - 1);
                                this.tabCS[indice].listeChainee.pop();
                            } else {
                                await suprimmercaseliste(indice, 2, i, this.tabCS[indice].listeChainee.length - 1);
                                this.tabCS[indice].listeChainee[i] = this.tabCS[indice].listeChainee[this.tabCS[indice].listeChainee.length - 1];
                                this.tabCS[indice].listeChainee.pop();
                            }
                        }
                    }
                }
            }
        }
    }
}



var h = new hashCS();
h.Initialisation(7);

function alertt(i,msg) {
    switch (i) {
        case 1:{
            document.getElementById('initialiser-alert').innerText='*'+msg;
            break;
        }
        case 2:{
            document.getElementById('rechercher-alert').innerText='*'+msg;
            break;
        }
        case 3:{
            document.getElementById('inserer-alert').innerText='*'+msg;
            break;
        }
        case 4:{
            document.getElementById('supprimer-alert').innerText='*'+msg;
            break;
        }
    }
}
function verif(tab) {
    let verifier=true;
    let i=0;
    while ( verifier && i<tab.length){
        if (isNaN(tab[i]) || tab[i]==''){
            verifier=false
        }
        i++;
    }
    return verifier;
}
function vider_alertt() {

    document.getElementById('initialiser-alert').innerText = '';

    document.getElementById('rechercher-alert').innerText = '';

    document.getElementById('inserer-alert').innerText = '';

    document.getElementById('supprimer-alert').innerText = '';

}
document.getElementById("sim-init").addEventListener("click", async () => {
    vider_alertt();

    let inputtaille = document.getElementById("taille-tab").value;
    let vals = inputtaille.split(",");
    if (verif(vals)) {
        vals = parser(vals);
        hide_form_box(1);
        box_shown = 0;
        await h.intialiser(vals);
    }
    else {
        alertt(1,'l\'un des clés n\'est pas un nombre')
    }
});

document.getElementById("sim-rech").addEventListener("click", async () => {
    vider_alertt();
    let input = document.getElementById("cle-rech").value;
    if (input!='') {
        hide_form_box(2);
        box_shown = 0;
        algorech();
        let a = await h.Recherche(input, 0);
    }



});

document.getElementById("sim-insrt").addEventListener("click", async () => {
    vider_alertt();
    let inputcle = document.getElementById("cle-insrt").value;
    if (inputcle!='') {
        hide_form_box(3);
        box_shown = 0;
        await h.Insertion(new TenregCS(inputcle, ""))
    }
});

document.getElementById("sim-sup").addEventListener("click", async () => {
    vider_alertt();
    let inputcle = document.getElementById("cle-sup").value;
    if (inputcle!='') {
        hide_form_box(4);
        box_shown = 0;
        await h.Supression(inputcle);
    }
});





console.log(h);








function parser(liste) {

    for (let i = 0; i < liste.length; i++) {
        liste[i] = parseInt(liste[i], 10);
    }
    return liste;
}


function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>Chainage Séparé</p>\n' +
        '                        </div>\n' +
        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Information sur la structure:</h3>\n' +
        '                        - Le principe de hachage est de Stocker des données (x) dans une table (T)\n' +
        '                        <br>\n' +
        '                         en utilisant une fonction (h) pour la localisation rapide.\n' +
        '                        <br>\n' +
        '                        - Chainage Séparé : Les données en débordement (en cas de collisions)\n' +
        '                        <br>\n' +
        '                       sont stockées dans un espace non « adressable » par la fonction de\n' +
        '                        <br>\n' +
        '                       hachage.\n' +

        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            - Chaque case a deux informations: la clé et un lien.\n' +
        '                            <br>\n' +
        '                            - En cas de collision, on insere la clé dans une liste \n' +
        '                            <br>\n' +
        '                            liée a la case par le lien.\n' +
        '                            <br>\n' +
        '                            <img class="mt-1" src="assets/img/struct.JPG" width="550">\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div id="buttons" class="guide-control">\n' +
        '                            <button id="previous" class="previous-btn" onclick="previousguide()"><i class="fas fa-arrow-left"></i> précédent</button>\n' +
        '                            <button id="next"  class="next-btn" onclick="nextguide()">Suivant <i class="fas fa-arrow-right"></i></button>\n' +
        '                        </div>\n' +
        '\n' +
        '\n' +
        '                    </div>\n' +
        '\n' +
        '                    </div>';
    guideAffiche=1;
    nbrDeGuideAffiche=nbrDeguideStruct;
    document.getElementById('guide'+guideAffiche).style.display='block';
    document.getElementById('previous').style.display='none';
}
affich_guide_struct();

