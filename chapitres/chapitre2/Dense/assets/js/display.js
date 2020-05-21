
var guide=document.getElementById('guide');

var nbrDeGuide=9;
var nbrDeguideStruct=2;
var nbrDeGuideAffiche=0;
var guideAffiche=1;

// guide generale
function affich_guide() {
    document.getElementById('algo').style.display='none';
    document.getElementById('TObF_index').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>Guide d\'utilisation</p>\n' +
        '                        </div>\n' +
        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Bienvenue:</h3>\n' +
        '                        Bonjour dans notre application,\n' +
        '                        <br>\n' +
        '                        on va faire un tour avec vous dans notre page de simulation pour vous familiariser\n' +
        '                        <br>\n' +
        '                        avec sa utilisation.\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Navigation:</h3>\n' +
        '                            Pour naviguer dans le site et visualiser les differentes structures,\n' +
        '                            <br>\n' +
        '                            utiliser cette bar de navigation ou vous trouverez toute les chapitres\n' +
        '                            <br>\n' +
        '                            du module.\n' +
        '                            <br>\n' +
        '                            <img class="mt-5" src="assets/img/nav.JPG">\n' +
        '                        </div>\n' +
        '                        <div id="guide3" class="guide-content">\n' +
        '                            <h3>II.Navigation:</h3>\n' +
        '                            Positionez le curseur sur le chapitre voulue, et un menu\n' +
        '                            <br>\n' +
        '                            sera affiche ou vous pouvez choisir la structure a visualiser.\n' +
        '                            <br>\n' +
        '                            <br>\n' +
        '                            <img class="mt-2" src="assets/img/navhover.JPG">\n' +
        '                        </div>\n' +
        '                        <div id="guide4" class="guide-content">\n' +
        '                            <h3>III.Manipulation des structures:</h3>\n' +
        '\n' +
        '                            <img class=" d-inline" src="assets/img/sidebar.JPG" height="300">\n' +
        '                            <div class="d-inline-block">\n' +
        '                                Pour tester les différentes opérations sur la structure\n' +
        '                                <br>\n' +
        '                                choisie, utilisez le bar a côté pour choisir l\'operation\n' +
        '                                <br>\n' +
        '                                a effectuer.\n' +
        '                                <br>\n' +
        '                            </div>\n' +
        '\n' +
        '                        </div>\n' +
        '                        <div id="guide5" class="guide-content">\n' +
        '                            <h3>III.Manipulation des structures:</h3>\n' +
        '                            <div class="">\n' +
        '                                Positioner le curseur sur l\'operation voulue et cliquer, et une interface va s\'apparaitre\n' +
        '                                <br>\n' +
        '                                 ou vous devez entrer les paramètres de la simulation.\n' +
        '                                <br>\n' +
        '                                \n' +
        '                                <br>\n' +
        '                            </div>\n' +
        '                            <img class=" d-inline" src="assets/img/side.JPG" height="300" width="450">\n' +
        '\n' +
        '\n' +
        '                        </div>\n' +
        '                        <div id="guide6" class="guide-content">\n' +
        '                            <h3>III.Manipulation des structures:</h3>\n' +
        '                            <h4>Exemples:</h4>\n' +
        '                            <div class="">\n' +
        '                                Voici un exemple d\'une saisie pour une initialisation\n' +
        '                                <br>\n' +
        '                                <br>\n' +
        '\n' +
        '                            </div>\n' +
        '                            <img class=" d-inline" src="assets/img/init.JPG" height="300" width="400">\n' +
        '\n' +
        '\n' +
        '                        </div>\n' +
        '                        <div id="guide7" class="guide-content">\n' +
        '                            <h3>III.Manipulation des structures:</h3>\n' +
        '                            <h4>Exemples:</h4>\n' +
        '                            <div class="">\n' +
        '                                Voici un autre exemple d\'une saisie pour une recherche\n' +
        '                                <br>\n' +
        '                                <br>\n' +
        '\n' +
        '                            </div>\n' +
        '                            <img class=" d-inline" src="assets/img/rech.JPG" height="300" width="400">\n' +
        '\n' +
        '\n' +
        '                        </div>\n' +
        '                        <div id="guide8" class="guide-content">\n' +
        '                            <h3>IV.Manipulation de la simulation:</h3>\n' +
        '                            <h4>I-La vitesse:</h4>\n' +
        '                            <div class="">\n' +
        '                                Vous pouvez manipuler la vitesse de la simulation en bougeant\n' +
        '                                <br>\n' +
        '                                le pointeur de vitesse vers la gauche pour une simulation plus rapide\n' +
        '                                <br>\n' +
        '                                ou vers la droite pour une simulation plus lente.\n' +
        '\n' +
        '\n' +
        '                            </div>\n' +
        '                            <img class=" mt-3 d-inline" src="assets/img/vitesse.JPG" >\n' +
        '                        </div>\n' +
        '                        <div id="guide9" class="guide-content">\n' +
        '                            <h3>IV.Manipulation de la simulation:</h3>\n' +
        '                            <h4>II-Pause/Play:</h4>\n' +
        '                            <div class="">\n' +
        '                                Vous pouvez aussi pauser la simulation et la rejouer pour mieux\n' +
        '                                <br>\n' +
        '                                comprendre une étape ou visualiser mieux le changement, en cliquant\n' +
        '                                <br>\n' +
        '                                sur les boutons montrés ci-dessous.\n' +
        '\n' +
        '\n' +
        '                            </div>\n' +
        '                            <img class=" mt-5 d-inline" src="assets/img/pause.JPG" >\n' +
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
    nbrDeGuideAffiche=nbrDeGuide;
    document.getElementById('guide'+guideAffiche).style.display='block';
    document.getElementById('previous').style.display='none';
}
function nextguide() {
    document.getElementById('guide'+guideAffiche).style.display='none';
    guideAffiche++;
    document.getElementById('guide'+guideAffiche).style.display='block';
    document.getElementById('previous').style.display='inline-block';
    if (guideAffiche==nbrDeGuideAffiche){
        document.getElementById('next').style.display='none';

    }
}
function previousguide() {
    document.getElementById('guide'+guideAffiche).style.display='none';
    guideAffiche--;
    document.getElementById('guide'+guideAffiche).style.display='block';
    document.getElementById('next').style.display='inline-block';
    if (guideAffiche==1){
        document.getElementById('previous').style.display='none';

    }
}
function hide_guide() {
    guide.innerHTML='';
    document.getElementById('algo').style.display = 'block';
    document.getElementById('TObF_index').style.display='block';
}

var up=true;
function upDown(){
    if (up){
        document.getElementById('algo').style.display='none';
        up=false;
    }
    else{
        document.getElementById('algo').style.display='block';


        up=true;
    }
}

document.getElementById('affich-guide').onclick=affich_guide;
var box_shown=0;

function hide_form_box(i) {
    switch (i) {
        case 1:{

                document.getElementById('initialiser-form').style.display='none';

            break;
        }
        case 2:{document.getElementById('rechercher-form').style.display='none';
            break;
        }
        case 3:{document.getElementById('inserer-form').style.display='none';
            break;
        }

        case 4:{document.getElementById('supprimer-form').style.display='none';
            break;
        }
    }
}

function show_form_box(i) {
    switch (i) {
        case 1:{
            if (!box_shown){
                document.getElementById('initialiser-form').style.display='block';
                box_shown=1;
            }
           else {
                hide_form_box(box_shown);
                if (box_shown!=1){
                    document.getElementById('initialiser-form').style.display='block';
                    box_shown=1;
                }
                else{
                    box_shown=0;
                }
            }
        break;
        }
        case 2:{
            if (!box_shown){
                document.getElementById('rechercher-form').style.display='block';
                box_shown=2;
            }
            else {
                hide_form_box(box_shown);
                if (box_shown!=2){
                    document.getElementById('rechercher-form').style.display='block';
                    box_shown=2;
                }
                else{
                    box_shown=0;
                }
            }
            break;
        }
        case 3:{
            if (!box_shown){
                document.getElementById('inserer-form').style.display='block';
                box_shown=3;
            }
            else {
                hide_form_box(box_shown);
                if (box_shown!=3){
                    document.getElementById('inserer-form').style.display='block';
                    box_shown=3;
                }
                else{
                    box_shown=0;
                }
            }
            break;
        }

        case 4:{
            if (!box_shown){
                document.getElementById('supprimer-form').style.display='block';
                box_shown=4;
            }
            else {
                hide_form_box(box_shown);
                if (box_shown!=4){
                    document.getElementById('supprimer-form').style.display='block';
                    box_shown=4;
                }
                else{
                    box_shown=0;
                }

            }
            break;
        }
    }
}