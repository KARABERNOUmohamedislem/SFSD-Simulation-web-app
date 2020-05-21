function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}
function partition(items, left, right) {

    var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;


    while (i <= j) {

        while (items[i] < pivot) {
            i++;
        }

        while (items[j] > pivot) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }

    return i;
}

function quickSort(items, left, right) {

    var index;

    if (items.length > 1) {

        index = partition(items, left, right);

        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }

        if (index < right) {
            quickSort(items, index, right);
        }

    }

    return items;
}



///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

class TblocFus {

    constructor() {
        this.tabDeCles = [];
    }

}


////////////////////////////////////////////////////////
///////////////////////////////////////////////////////

class FichierFusion {

    constructor() {
        this.tab = [];
        this.nbrMaxBlocs = 5;
        this.tailleDeBloc = 5;

    }

    liredir(i, fichier) {
        //lireDirAnime(i , j );
        //sleep(500);
        return fichier.tab[i];
    }

    ////////////////////////////////////////

    ecriredir(i, buf) {
        this.tab[i] = buf;
    }

    allouerBlock() {
        return new TblocFus();
    }

    ///////////////////////////////////////

    async intialiser(tabDeCles, fichier) {
        algoinitialisation();
        if (tabDeCles.length <= this.nbrMaxBlocs * this.tailleDeBloc) {
            algoAnime(2);
            let sortedlist = quickSort(tabDeCles, 0, tabDeCles.length - 1);
            console.log(sortedlist);
            let i = 0;
            let j = 0;
            algoAnime(3);
            while (j < this.nbrMaxBlocs) {
                let k = 0;
                let block = this.allouerBlock();
                await allouerBlockAnime(j, fichier);
                while (k < this.tailleDeBloc) {
                    block.tabDeCles.push(sortedlist[i]);
                    algoAnime(4);
                    await insererEnregAnime(fichier, k, sortedlist[i])
                    i++;
                    algoAnime(5);
                    if (i == sortedlist.length) {

                        this.tab.push(block);
                        algoAnime(7);
                        await ecrireDireAnime(fichier, fichier);
                        return;
                    }
                    k++;
                }
                algoAnime(7);
                this.tab.push(block);
                await ecrireDireAnime(fichier, fichier);
                j++;
            }
            algoAnime(8);
        } else {
            console.log("liste is too big");
        }
        algoAnime(0);
    }

    //////////////////////////////////////////

    fusion_non_ordonne(fichier1, fichier2) {
        let indFich1 = 0;
        let indFich2 = 0;
        let indiceFich3 = 0;

        let buf1 = this.liredir(indFich1, fichier1);
        let buf2 = this.liredir(indFich2, fichier2);

        while (indFich1 < fichier1.tab.length) {
            let buf1 = this.liredir(indFich1, fichier1);
            if (indFich1 != fichier1.tab.length - 1) {
                this.ecriredir(indiceFich3, buf1);
                indiceFich3++;
                indFich1++;
            } else {
                if (fichier1.tab[indFich1].length == this.tailleDeBloc) {
                    this.ecriredir(indiceFich3, buf1);
                    indiceFich3++;
                    while (indFich2 < fichier2.tab.length) {
                        let buf2 = this.liredir(indFich2, fichier2);
                        this.ecriredir(indiceFich3, buf2);
                        indiceFich3++;
                        indFich2++;
                    }
                } else {
                    buf2 = this.liredir(indFich2, fichier2);
                    buf3 = this.allouerBlock();
                    /// a finir;
                }
            }

        }

    }

    ///////////////////////////////////////////////
    async fusion_ordonne(fichier1, fichier2) {
        algofusion();
        let indFich1 = 0;
        let indFich2 = 0;
        let indiceFich3 = 0;
        let fich1finis = false;
        let fich2finis = false;

        let i = 0;
        let j = 0;
        let k = 0;
        algoAnime(1);
        algoAnime(0);
        algoAnime(2);
        let buf1 = this.liredir(indFich1, fichier1);
        let buf2 = this.liredir(indFich2, fichier2);
        await lireDireAnime(1, indFich1, 1);
        algoAnime(0);
        algoAnime(3);
        await lireDireAnime(2, indFich2, 2);

        let buf3 = this.allouerBlock();
        await allouerBlockAnime(indiceFich3, 3);

        while ((indFich1 < fichier1.tab.length) || (indFich2 < fichier2.tab.length)) {
            algoAnime(0);
            algoAnime(4);
            inserting(1, indFich1, i);
            inserting(2, indFich2, j);
            if (buf1.tabDeCles[i] < buf2.tabDeCles[j]) {
                buf3.tabDeCles[k] = buf1.tabDeCles[i];
                await insererEnregAnime(3, k, buf1.tabDeCles[i]);
                i++;
                k++;
            } else if (buf1.tabDeCles[i] > buf2.tabDeCles[j]) {
                buf3.tabDeCles[k] = buf2.tabDeCles[j];
                await insererEnregAnime(3, k, buf2.tabDeCles[j]);
                j++;
                k++;
            } else if (buf1.tabDeCles[i] == buf2.tabDeCles[j]) {
                buf3.tabDeCles[k] = buf2.tabDeCles[j];
                await insererEnregAnime(3, k, buf2.tabDeCles[j]);
                j++;
                i++;
                k++;
            }

            if (i == buf1.tabDeCles.length) {
                i = 0;
                indFich1++;
                if (indFich1 == fichier1.tab.length) {
                    fich1finis = true;
                } else {
                    await removeBlockAnime(1);
                    buf1 = this.liredir(indFich1, fichier1);
                    algoAnime(0);
                    algoAnime(3);
                    await lireDireAnime(1, indFich1, 1);
                }
            }

            if (j == buf2.tabDeCles.length) {
                j = 0;
                indFich2++;
                if (indFich2 == fichier2.tab.length) {
                    fich2finis = true;
                } else {
                    await removeBlockAnime(2);
                    buf2 = this.liredir(indFich2, fichier2);
                    algoAnime(0);
                    algoAnime(3);
                    await lireDireAnime(2, indFich1, 2);
                }
            }

            if (k == this.tailleDeBloc) {
                this.ecriredir(indiceFich3, buf3);
                algoAnime(0);
                algoAnime(5);
                await ecrireDireAnime(3, 3);
                indiceFich3++;
                buf3 = this.allouerBlock();
                await allouerBlockAnime(indiceFich3, 3);

                k = 0;

            }

            if (fich1finis && fich2finis) {
                if (buf3.tabDeCles.length != 0) {
                    this.ecriredir(indiceFich3, buf3);
                    algoAnime(0);
                    algoAnime(5);
                    await ecrireDireAnime(3, 3);
                    await removeBlockAnime(1);
                    await removeBlockAnime(2);
                    algoAnime(0);
                    return;
                }
            }

            if (fich1finis) {
                await removeBlockAnime(1);
                while (indFich2 < fichier2.tab.length) {
                    while (j < buf2.tabDeCles.length) {
                        buf3.tabDeCles[k] = buf2.tabDeCles[j];
                        await insererEnregAnime(3, k, buf2.tabDeCles[j]);
                        k++;
                        if (k == this.tailleDeBloc) {
                            this.ecriredir(indiceFich3, buf3);
                            algoAnime(0);
                            algoAnime(5);
                            await ecrireDireAnime(3, 3);
                            indiceFich3++;
                            buf3 = this.allouerBlock();
                            await allouerBlockAnime(indiceFich3, 3);
                            k = 0;
                        }
                        j++;
                    }
                    j = 0;
                    indFich2++;
                    if (indFich2 == fichier2.tab.length) {
                        if (buf3.tabDeCles.length != 0) {
                            this.ecriredir(indiceFich3, buf3);
                            algoAnime(0);
                            algoAnime(5);
                            await ecrireDireAnime(3, 3);
                            await removeBlockAnime(2);
                            algoAnime(0);
                            return;
                        }
                    } else {
                        await removeBlockAnime(2);
                        buf2 = this.liredir(indFich2, fichier2);
                        algoAnime(0);
                        algoAnime(3);
                        await lireDireAnime(2, indFich2, 2);
                    }
                }

            }

            if (fich2finis) {
                await removeBlockAnime(2);
                while (indFich1 < fichier1.tab.length) {
                    while (i < buf1.tabDeCles.length) {
                        buf3.tabDeCles[k] = buf1.tabDeCles[i];
                        await insererEnregAnime(3, k, buf1.tabDeCles[i]);
                        k++;
                        if (k == this.tailleDeBloc) {
                            this.ecriredir(indiceFich3, buf3);
                            algoAnime(0);
                            algoAnime(5);
                            await ecrireDireAnime(3, 3);
                            indiceFich3++;
                            buf3 = this.allouerBlock();
                            await allouerBlockAnime(indiceFich3, 3);
                            k = 0;
                        }
                        i++;
                    }
                    i = 0;
                    indFich1++;
                    if (indFich1 == fichier1.tab.length) {
                        if (buf3.tabDeCles.length != 0) {
                            this.ecriredir(indiceFich3, buf3);
                            algoAnime(0);
                            algoAnime(5);
                            await ecrireDireAnime(3, 3);
                            await removeBlockAnime(1);
                            algoAnime(0);
                            return;
                        }
                    } else {
                        await removeBlockAnime(1);
                        buf1 = this.liredir(indFich1, fichier1);
                        algoAnime(0);
                        algoAnime(3);
                        await lireDireAnime(1, indFich1, 1);
                    }
                }

            }
        }

    }


}

// async function main() {
//     let f1 = new FichierFusion();
//     await f1.intialiser([0, 12, 19, 15, 24, 10, 89, 0932, 37, 38, 2, 1, 3, 5, 32, 98], 1);
//     let f2 = new FichierFusion();
//     await f2.intialiser([2, 1, 7, 3, 9, 4, 6, 8, 5, 99], 2);

//     let f3 = new FichierFusion();
//     await f3.fusion_ordonne(f1, f2);
// }

let initialise = false;
let f1 = new FichierFusion();
let f2 = new FichierFusion();
let f3 = new FichierFusion();

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





}
document.getElementById("sim-init").addEventListener("click", async () => {
   vider_alertt();
    let inputfich1 = document.getElementById("input-fich1").value;
    let valfich1 = inputfich1.split(",");
    if (verif(valfich1)) {
        valfich1 = parser(valfich1);

        let inputfich2 = document.getElementById("input-fich2").value;
        let valfich2 = inputfich2.split(",");
        if (verif(valfich2)) {
            valfich2 = parser(valfich2);

            hide_form_box(1);
            box_shown = 0;

            await f1.intialiser(valfich1, 1);

            await f2.intialiser(valfich2, 2);
            initialise = true;

        }
        else {
            alertt(1,'l\'un des clés du 2eme fichier n\'est pas un nombre');
        }
    }
    else {
        alertt(1,'l\'un des clés du 1er fichier n\'est pas un nombre');
    }
});
document.getElementById("sim-fusion").addEventListener("click", async () => {
    // console.log(initialise);
    vider_alertt();
    if (initialise) {
        hide_form_box(3);
        await f3.fusion_ordonne(f1, f2);
    } else {

        alertt(2,'les fichiers ne sont pas initialisés')

    }
    box_shown=0;
});

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
        '                            <p>Fusion</p>\n' +
        '                        </div>\n' +
        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Information sur la structure:</h3>\n' +
        '                         - L\'operation consiste a fusionner deux fichiers de format TOF\n' +
        '                        <br>\n' +
        '                         dans un troisième fichier en gardons le format TOF.\n' +
        '                        <br>\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            La page est repartis en quatre partie:\n' +
        '                            <br>\n' +
        '                            - 1er et 2eme parties pour les deux fichiers a fusionner. \n' +
        '                            <br>\n' +
        '                            - La 3eme partie est pour les buffers utilisés en memoire centrale (MC).\n' +
        '                            <br>\n' +
        '                            - La 4eme partie est pour le fichier resultat de la fusion. \n' +
        '                            <br>\n' +
        '                            <img class="mt-1" src="assets/img/struct.JPG" width="600">\n' +
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
