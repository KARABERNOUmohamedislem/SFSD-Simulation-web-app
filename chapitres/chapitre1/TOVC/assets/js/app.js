/////////////////////////////////////////////////////////////////////////////
///////////  DECLARATION DES CLASSES ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


/////////// TYPE ENTETE //////////////////////////////////////////

class EnteteTOVC {

    constructor(nombreDeBlocs, tailleDeBlocs) {
        this.nombreDeBlocs = nombreDeBlocs;
        this.tailleDeBlocs = tailleDeBlocs;
    }

    Entete(i = 1) {
        if (i == 1) {
            return this.nombreDeBlocs;
        } else if (i == 2) {
            return this.tailleDeBlocs;
        }
    }

    Aff_Entete(i = 1, param) {
        if (i == 1) {
            this.nombreDeBlocs = param;
        } else if (i == 2) {
            this.tailleDeBlocs = param;
        }
    }

}

///////////// TYPE ENREGISTREMENT ///////////////////////////////////////

class TenregTOVC {

    constructor(cle, champ) {
        this.efface = 0;
        this.cle = cle;
        this.champ = champ;
        this.taille = 3 + this.champ.length;
        // remplace champ1 et 2 par champs qui contient plusieurs champs separes par un caractere speciale.
    }

}

//////////// TYPE BLOC ///////////////////////////////////////////////

class TblocTOVC {

    constructor() {
        this.taille = 15;
        this.chaineDeEnreg = [];
    }

}

/////////// TYPE FICHIER //////////////////////////////////////////
var intialisee = false;
class TOVC {

    constructor() {
        this.tab = [];
        this.Entete = new EnteteTOVC(0, 0);
        this.nbrMaxBlocs = 0;
        this.espaceVide = 0
    }

    /////////////////////////////////////////

    liredir(i, j = 1) {
        //lireDirAnime(i , j );
        //sleep(500);
        return this.tab[i];
    }

    ////////////////////////////////////////

    ecriredir(i, buf) {
        this.tab[i] = buf;
    }

    ////////////////////////////////////

    aff_entete(i, val) {
        this.Entete.Aff_Entete(i, val);
    }

    ////////////////////////////////////

    entete(i) {
        return this.Entete.Entete(i);
    }

    ////////////////////////////////////

    alloc_bloc() {
        let block = document.createElement("div");
        block.className = "Tblock";
        block.id = "bloc" + this.entete(1);

        for (let i = 0; i < this.entete(2); i++) {
            let enreg = document.createElement("div");
            enreg.className = "Tenreg";
            enreg.id = "enreg" + i + "bloc" + this.entete(1);
            enreg.style.visibility = 'hidden';
            block.appendChild(enreg);
        }

        let TOVC = document.getElementById("TOVC");
        TOVC.appendChild(block);
        this.tab.push(new TblocTOVC())
        this.aff_entete(1, this.entete(1) + 1);
        this.espaceVide += this.Entete.Entete(2);
    }

    ///////////////////////////////////

    intialiser2(nbrDesEnregDansBloc, nbrMaxBlocs) {
        this.nbrMaxBlocs = nbrMaxBlocs;
        this.nbrDesEnregDansBloc = nbrDesEnregDansBloc;
        this.aff_entete(2, nbrDesEnregDansBloc);
        intialisee = true;
        let root = document.documentElement;
        // root.style.setProperty('--bloc-width', (((nbrDesEnregDansBloc + 1) * 20) + ((nbrDesEnregDansBloc + 1) * 2)) + 'px');
        root.style.setProperty('--bloc-width', (nbrDesEnregDansBloc * 27 + 5) + 'px');
        root.style.setProperty('--bloc-height', 100 + 'px');


    }
    async intialiser(enregs) {

        let champs = [];
        for (let i = 0; i < enregs.length; i++) {

            if (enregs[i].length <= (this.Entete.Entete(2) - 3)) {
                champs.push(enregs[i]);
            }
        }

        for (let i = 0; i < champs.length; i++) {
            await this.Insertion(new TenregTOVC(i * 4, champs[i]));
        }

    }

    ///////////////////////////////////

    async inserer(enreg, numBloc, indiceDebut) {
        // await and async
        //console.log(numBloc , indiceDebut);
        await lireDirAnime(numBloc);
        var Buf = this.liredir(numBloc);

        for (let i = 0; i < enreg.taille; i++) {
            if (indiceDebut + i > this.entete(2) - 1) {
                this.ecriredir(numBloc, Buf);
                await ecrireDirAnime(numBloc);
                numBloc++;
                Buf = this.liredir(numBloc);
                await lireDirAnime(numBloc);
                indiceDebut = (-1) * i;
            }

            switch (i) {
                case 0:

                    await insererAnime(numBloc, indiceDebut + i, enreg.taille);
                    document.getElementById('enreg'+(indiceDebut+i)+'bloc'+numBloc).style.borderColor='#193ded';
                    await sleep(300);
                    Buf.chaineDeEnreg[indiceDebut + i] = enreg.taille;
                    break;
                case 1:

                    await insererAnime(numBloc, indiceDebut + i, enreg.efface);
                    document.getElementById('enreg'+(indiceDebut+i)+'bloc'+numBloc).style.borderColor='#ed6658';
                    await sleep(300);
                    Buf.chaineDeEnreg[indiceDebut + 1] = enreg.efface;
                    break;
                case 2:

                    await insererAnime(numBloc, indiceDebut + i, enreg.cle);
                    document.getElementById('enreg'+(indiceDebut+i)+'bloc'+numBloc).style.borderColor='#1e9611';
                    await sleep(300);
                    Buf.chaineDeEnreg[indiceDebut + 2] = enreg.cle;
                    break;
                default:

                    await insererAnime(numBloc, indiceDebut + i, enreg.champ[i - 3]);
                    await sleep(300);
                    Buf.chaineDeEnreg[indiceDebut + i] = enreg.champ[i - 3];
                    break;
            }
        }
        await ecrireDirAnime(numBloc);

    }

    ///////////////////////////////////

    async translateInsertion(sensDeDecalage, numBlocDeDepart, indiceDeDepart, nombreDeCases) {

        var Buf1, Buf2 = undefined;
        var k = undefined;
        var i = this.entete(1) - 1;
        var j = 0;


        if (numBlocDeDepart == this.entete(1) - 1) {
            if (indiceDeDepart == this.entete(2) - this.espaceVide) {
                //console.log(numBlocDeDepart, indiceDeDepart, "hhh");
                return;
            }
        }

        Buf2 = this.liredir(this.entete(1) - 1);
        await lireDirAnime(this.entete(1) - 1);
        //debugger;
        if (Buf2.chaineDeEnreg.length != 0) {
            for (let i = Buf2.chaineDeEnreg.length - 1; i >= 0; i--) {
                Buf2.chaineDeEnreg[i + nombreDeCases] = Buf2.chaineDeEnreg[i]; // translation du dernier bloc
                await translateAnime(this.entete(1) - 1, i + nombreDeCases, this.entete(1) - 1, i, Buf2.chaineDeEnreg[i])
                await sleep(300);
            }
        }

        var BlocBuf2 = this.entete(1) - 1;
        for (let i = this.entete(1) - 2; i >= numBlocDeDepart; i--) {
            await lireDirAnime(i);
            Buf1 = this.liredir(i);
            k = 0;
            for (let j = this.entete(2); j >= 0; j--) {

                if (Buf1.chaineDeEnreg[j] !== undefined) {
                    Buf2.chaineDeEnreg[nombreDeCases + k] = Buf1.chaineDeEnreg[j];

                    await translateAnime(BlocBuf2, nombreDeCases + k, i, j, Buf1.chaineDeEnreg[j]);
                    await sleep(300);
                }
                k = k - 1;
                if ((nombreDeCases + k) < 0) {
                    this.ecriredir(BlocBuf2, Buf2);
                    await ecrireDirAnime(BlocBuf2);
                    BlocBuf2 = i;
                    Buf2 = this.liredir(i);
                    await lireDirAnime(i);
                    k = this.entete(2) - nombreDeCases - 1;
                }
                if ((i == numBlocDeDepart) && (j == indiceDeDepart)) {
                    // await ecrireDirAnime(BlocBuf2);

                    return;
                }
            }
            if (BlocBuf2 != i) {
                await ecrireDirAnime(i);
            }
            // await ecrireDirAnime(i);
            this.ecriredir(i, Buf1);

        }
        await ecrireDirAnime(i);
    }

    ///////////////////////////////////////////////////////

    async Insertion(enreg) {
        algo_insertion();
        //document.writeln(enreg.cle);

        if (intialisee) {
            if (enreg.taille <= this.entete(2)) {
                var resultat = undefined;
                if (this.tab.length != 0) {
                    algoAnime(2);
                    resultat = await this.Recherche(enreg.cle, 1);

                } else {
                    resultat = {
                        trouve: false,
                        numBloc: 0,
                        indiceDebut: 0
                    }
                }

                algoAnime(3);
                await sleep(500);
                if (!resultat.trouve) {
                    algoAnime(4);
                    await sleep(500);
                    if (this.espaceVide >= enreg.taille) {
                        algoAnime(5);
                        await this.translateInsertion(0, resultat.numBloc, resultat.indiceDebut, enreg.taille);
                        algoAnime(6);
                        await this.inserer(enreg, resultat.numBloc, resultat.indiceDebut);

                        this.espaceVide -= enreg.taille;
                        algoAnime(0);


                    } else {
                        algoAnime(7);
                        algoAnime(8);
                        await sleep(500);
                        await this.alloc_bloc();
                        algoAnime(9);
                        await this.translateInsertion(0, resultat.numBloc, resultat.indiceDebut, enreg.taille);
                        algoAnime(10);
                        await this.inserer(enreg, resultat.numBloc, resultat.indiceDebut); // await and async

                        this.espaceVide -= enreg.taille;
                        algoAnime(0);


                    }

                } else {
                    algoAnime(11);
                    algoAnime(12);
                    algoAnime(0);
                }
            } else {
                //toolong();
            }
        } else {
            //intiailise();
        }

    }


    async Recherche(cle, ia = 0) {

        if (intialisee || true) {
            if (ia == 0) {
                algoAnime(2);
            }
            var trouve = false;
            var numBloc = 0;
            var indiceDebut = 0;
            var indiceTab = 0;
            var i = 0;
            var Buf = this.liredir(i);
            await lireDirAnime(i);

            //await lireDirAnime(i, 2);
            //sleep(800);

            while (i < this.tab.length && !trouve) {

                if (Buf.chaineDeEnreg.length > 0) {

                    let taille = Buf.chaineDeEnreg[indiceTab];
                    if (taille === undefined) {
                        console.log("sortie1");
                        await ecrireDirAnime(i);
                        if (ia == 0) {
                            algoAnime(0);
                        }
                        return {
                            trouve: false,
                            numBloc: i,
                            indiceDebut: indiceTab
                        }
                    }
                    if (ia == 0) {
                        algoAnime(4);
                    }

                    let indiceCle = indiceTab + 2;
                    var j = i;
                    if (indiceCle > this.entete(2) - 1) {
                        j = i;
                        if (i + 1 <= this.entete(1) - 1) {
                            j = i + 1;
                            await ecrireDirAnime(i);
                            Buf = this.liredir(i + 1);
                            await lireDirAnime(i + 1);
                            if (ia == 0)
                                algoAnime(4);
                        }
                        indiceCle %= this.entete(2);
                    }
                    await enregcouleur(j, indiceCle, "#fff255");
                    await sleep(300);
                    let cleGenerale = Buf.chaineDeEnreg[indiceCle];
                    if (ia == 0) {
                        algoAnime(5);
                    }
                    if (cle == cleGenerale) {
                        trouve = true;
                        //await enregcouleur(i, ((indiceTab + 2) % this.entete(2)), "#66ff4d");
                        await enregcouleur(j, indiceCle, "#66ff4d");
                        if (ia == 0) {
                            algoAnime(6);
                        }
                        await sleep(500);

                        console.log("sortie2");
                        await ecrireDirAnime(i);
                        if (ia == 0) {
                            algoAnime(0);
                        }
                        return {
                            trouve: trouve,
                            numBloc: i,
                            indiceDebut: indiceTab
                        };

                    } else if (cle < cleGenerale) {
                        console.log(cle, cleGenerale);
                        if (ia == 0) {
                            algoAnime(7);
                        }
                        await enregcouleur(j, indiceCle, "#ff2427");
                        if (ia == 0) {
                            algoAnime(8);
                        }
                        await sleep(300);
                        numBloc = i;
                        indiceDebut = indiceTab;
                        console.log("sortie3");
                        await ecrireDirAnime(numBloc);
                        if (ia == 0) {
                            algoAnime(0);
                        }
                        return {
                            trouve: false,
                            numBloc: numBloc,
                            indiceDebut: indiceDebut
                        }
                    }
                    if (ia == 0) {
                        algoAnime(9);
                    } else {
                        console.log("ashk");
                    }
                    await enregcouleur(j, indiceCle, "#ff2427");
                    await sleep(300);
                    if (ia == 0) {
                        algoAnime(10);
                    }
                    indiceTab += taille;

                    if (indiceTab >= this.entete(2)) {

                        indiceTab = indiceTab % this.entete(2);

                        await ecrireDirAnime(i);
                        i++;
                        if (ia == 0) {
                            algoAnime(4);
                        }
                        await lireDirAnime(i);

                        Buf = this.liredir(i);
                    }
                } else {
                    console.log("sortie4");
                    await enregcouleur(i, 0, "#ff2427");
                    sleep(300);
                    await ecrireDirAnime(i);
                    if (ia == 0)
                        algoAnime(0);
                    return {
                        trouve: false,
                        numBloc: i,
                        indiceDebut: 0
                    };
                }
            }
            console.log("sortie5");
            if (trouve) {
                if (ia == 0) {
                    algoAnime(5);
                }

                await enregcouleur(i, indiceDebut, "#66ff4d");
                if (ia== 0) {
                    algoAnime(6);
                }
            } else {
                if (ia == 0) {
                    algoAnime(9);
                }
                await enregcouleur(i, indiceDebut, "#ff2427");
                if (ia == 0) {
                    algoAnime(10);
                }
            }
            await sleep(300);
            await ecrireDirAnime(i);
            if (ia == 0) {
                algoAnime(0);
            }
            return {
                trouve: trouve,
                numBloc: i,
                indiceDebut: indiceDebut
            };

        } else {

        }

    }

    /////////////////////////////////////////////////

    async translateSuppression(sensDeDecalage, numBlocDeDepart, indiceDeDepart, nombreDeCases) {
        var Buf1;
        var Buf2;

        Buf1 = this.liredir(numBlocDeDepart);
        await lireDirAnime(numBlocDeDepart);
        Buf2 = this.liredir(numBlocDeDepart);


        var indiceBuf2 = indiceDeDepart + nombreDeCases;
        var numBlocBuf2 = numBlocDeDepart;

        if (indiceBuf2 > this.entete(2) - 1) {
            indiceBuf2 %= this.entete(2);
            numBlocBuf2 = numBlocDeDepart + 1;
            if (numBlocBuf2 < this.entete(1)) {
                Buf2 = this.liredir(numBlocBuf2);
            } else {
                Buf2 = undefined;
            }
        } else {
            numBlocBuf2 = numBlocDeDepart;
            Buf2 = this.liredir(numBlocDeDepart);
        }

        if ((Buf2 === undefined) || (Buf2.chaineDeEnreg[indiceBuf2] === undefined)) {//(Buf2.chaineDeEnreg[indiceBuf2] === undefined) || (Buf2 === undefined)) {
            // A refaire cette partie .
            // algoAnime(5);
            if (indiceDeDepart + nombreDeCases > this.entete(2)) {
                this.tab.pop();
                // algoAnime(6);

                supBlockAnime(this.entete(1) - 1);
                await sleep(200);
                this.aff_entete(1, this.entete(1) - 1);
            }
            for (let i = this.entete(2) - 1; i >= indiceDeDepart; i--) {
                await supEnregAnime(numBlocDeDepart, i);
                await sleep(150);
                Buf1.chaineDeEnreg.pop();
            }
            this.espaceVide = this.entete(2) - Buf1.chaineDeEnreg.length;
            return;

        } else {
            let j = 0;
            let i = 0;
            //console.log(numBlocBuf2);
            //Buf2 = this.liredir(numBlocBuf2);

            await lireDirAnime(numBlocBuf2);
            while (true) {

                if (Buf2.chaineDeEnreg[indiceBuf2 + i] !== undefined) {
                    Buf1.chaineDeEnreg[indiceDeDepart + j] = Buf2.chaineDeEnreg[indiceBuf2 + i];
                    await translateAnime(numBlocDeDepart, indiceDeDepart + j, numBlocBuf2, indiceBuf2 + i, Buf2.chaineDeEnreg[indiceBuf2 + i]);
                    await sleep(300);
                }
                j++;
                if (indiceDeDepart + j > this.entete(2) - 1) {
                    if (numBlocDeDepart != numBlocBuf2)
                        await ecrireDirAnime(numBlocDeDepart);
                    numBlocDeDepart++;
                    Buf1 = this.liredir(numBlocDeDepart);
                    await lireDirAnime(numBlocDeDepart);
                    j = (-1) * indiceDeDepart;
                }

                i++;
                if ((numBlocBuf2 == this.entete(1) - 1) && ((indiceBuf2 + i) == (this.entete(2) - this.espaceVide))) {
                    ecrireDirAnime(numBlocBuf2);
                    ecrireDirAnime(numBlocDeDepart);
                    break;
                }
                if (indiceBuf2 + i > this.entete(2) - 1) {
                    if (numBlocDeDepart != numBlocBuf2)
                        await ecrireDirAnime(numBlocBuf2);
                    numBlocBuf2++;
                    Buf2 = this.liredir(numBlocBuf2);
                    await lireDirAnime(numBlocBuf2);
                    i = (-1) * indiceBuf2;
                }
            }
            this.espaceVide += nombreDeCases;
            // algoAnime(5);
            if (this.espaceVide == this.entete(2)) {
                this.tab.pop();
                // algoAnime(6);

                await supBlockAnime(this.entete(1) - 1);
                await sleep(200);
                this.aff_entete(1, this.entete(1) - 1);
                this.espaceVide = 0;
                ///erreur ici

            } else if (this.espaceVide > this.entete(2)) {
                this.tab.pop();
                // algoAnime(6);
                await supBlockAnime(this.entete(1) - 1);
                await sleep(200);
                this.aff_entete(1, this.entete(1) - 1);
                this.espaceVide -= this.entete(2);

                Buf2 = this.liredir(this.entete(1) - 1);
                await lireDirAnime(this.entete(1) - 1);
                for (let i = this.entete(2) - 1; i >= this.entete(2) - this.espaceVide; i--) {
                    Buf2.chaineDeEnreg.pop();

                    await supEnregAnime(this.entete(1) - 1, i);
                    await sleep(150);
                }
                await ecrireDirAnime(this.entete(1) - 1);

            } else if (this.espaceVide < this.entete(2)) {

                Buf2 = this.liredir(this.entete(1) - 1);
                await lireDirAnime(this.entete(1) - 1);
                for (let i = this.entete(2) - 1; i >= this.entete(2) - this.espaceVide; i--) {
                    await supEnregAnime(this.entete(1) - 1, i);
                    await sleep(150);
                    Buf2.chaineDeEnreg.pop();
                }
                for (let i = 0; i < this.entete(1); i++) {
                    await ecrireDirAnime(i);
                }

            }

        }
    }

    ///////////////////////////////////

    async Supression(cleEnreg) {
        algo_supression();
        if (intialisee) {
             algoAnime(2);
            var a = await this.Recherche(cleEnreg, 8);
            console.log("asjhas");
          algoAnime(3);
            if (a.trouve) {

                var buf = this.liredir(a.numBloc);
           algoAnime(4);
                await this.translateSuppression(0, a.numBloc, a.indiceDebut, buf.chaineDeEnreg[a.indiceDebut]);

            } else {

                algoAnime(8);
            }
        } else {

        }
    }

}

////////// MAIN PROGRAM /////////////////////////////////////////

var t = new TOVC();
t.intialiser2(10, 5);

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
        if (tab[i].length>=8){
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
    let enregs = document.getElementById("enregs").value;
    enregs = enregs.split(",");
    vider_alertt();

    hide_form_box(1);
    box_shown=0;
    await t.intialiser(enregs);




});

document.getElementById("sim-rech").addEventListener("click", async () => {
    let input = document.getElementById("cle-rech").value;
    vider_alertt();
    if (input!='') {
        input = parseInt(input);
        hide_form_box(2);
        box_shown=0;
        algo_rech();
        let a = await t.Recherche(input, 0);
        if (!a.trouve) {

        } else {

        }
        //console.log(a.numBloc, a.indiceDebut);

    }
});

document.getElementById("sim-insrt").addEventListener("click", async () => {
    let inputcle = document.getElementById("cle-insrt").value;
    if (inputcle!='') {
        inputcle = parseInt(inputcle);
        let inputenreg = document.getElementById("enreg-insrt").value;

        hide_form_box(3);
        box_shown = 0;
        await t.Insertion(new TenregTOVC(inputcle, inputenreg));
    }
});

document.getElementById("sim-sup").addEventListener("click", async () => {
    let inputcle = document.getElementById("cle-sup").value;
    if (inputcle!='') {
        inputcle = parseInt(inputcle);
        hide_form_box(4);
        box_shown=0;
        await t.Supression(inputcle);
    }
});

function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    document.getElementById('TOVC').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>TOVC</p>\n' +
        '                        </div>\n' +
        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Information sur la structure:</h3>\n' +
        '                        T (pour fichier vu comme tableau)\n' +
        '                        <br>\n' +
        '                        O (pour fichier ordonné), Ob (non ordonné)\n' +
        '                        <br>\n' +
        '                        F (pour format fixe des enreg), V (pour format variable)\n' +
        '                        <br>\n' +
        '                        C (pour chevauchement des enreg entre blocs), Cb (pour pas de chevauchement)\n' +
        '                        <br>\n' +
        '                        <br>\n' +
        '                        Donc  TOVC représente l\'organisation d\'un fichier vu comme tableau, ordonné,\n' +

        '                        <br>\n' +
        '                         avec des enregistrements de taille variables avec chevauchements entre blocs.\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            L\'enregistrement est vue comme une chaine de caractères organise comme suit:\n' +
        '                            <br>\n' +
        '                            (taille , effacement , cle , une chaine de caractères qui represente le contenu \n' +
        '                            <br>\n' +
        '                            de l\'enregistrement ) chevauché entre les blocs.\n' +
        '                            <br>\n' +
        '                            <img class="mt-5" src="assets/img/struct.JPG">\n' +
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
