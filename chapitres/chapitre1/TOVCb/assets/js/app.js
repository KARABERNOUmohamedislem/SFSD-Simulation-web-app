var animation=anime({

});
var animationpaused=false;
var speed,timeouta;
function getspeed(){

    speed = (document.getElementById('speed').value) / 100;
    speed+=0.2;
    requestAnimationFrame(getspeed);
}
getspeed();

function deleya(delay){
    return new Promise(resolve => {
        timeouta = setTimeout(async () => {
            resolve('resolved');

        }, speed* delay);

    });
}

async function sleep(delay) {
    let a=animationpaused;
    while (a){
        await deleya(1000);
        console.log(animationpaused);
        a=animationpaused;
    }
    await deleya(delay);
    a=animationpaused;
    while (a){
        await deleya(1000);
        console.log(animationpaused);
        a=animationpaused;
    }

    return 0;

}
function pause(){
    animation.pause();
    animationpaused=true;
}
function play(){
    animationpaused=false;
    animation.play();
}
document.getElementById('pause').onclick=pause;
document.getElementById('play').onclick=play;
//==========================================Declaration des structures==========================
function EnteteTOVCb(nb,taillemax) {
    this.nb=nb;
    this.taillemax=taillemax;
}

EnteteTOVCb.prototype={
    constructor :EnteteTOVCb,
    Entete:function (i) {
        var a;
        if (i==1){
            a=this.nb;
        }
        else if (i==2){
            a=this.taillemax;
        }
        return a;
    },
    Aff_entete:function (i,val) {
        if (i==1){
            this.nb=val;
        }
        else if (i==2){
            this.taillemax=val;
        }

    },
};


function TenregTOVCb(taille,eff,cle,chaine) {
    this.taille=taille;
    this.eff=eff;
    this.cle=cle;
    this.chaine=chaine;
}
TenregTOVCb.prototype={
    constructor:TenregTOVCb
};


function TblocTOVCb(tab,premcasevide,nbrenreg) {
    this.tab=tab;
    this.premcasevide=premcasevide;
    this.nbrenreg=nbrenreg;

}
TblocTOVCb.prototype={
    constructor:TblocTOVCb,
};


//==========================================================classe animations========================

function animations() {

}
animations.prototype={
    constructor:animations(),

    /*
    animefichorga:function (cpt,place){
        anime({
            targets:document.getElementById('block'+(cpt+1)),
            translateY:20,
            translateX:place*50,
            duration:1000*speed,
            easing:'linear'
        });
    },

     */

    animeblockdown:function (nmrdublock) {
        anime({
            targets:document.getElementById('block'+(nmrdublock+1)),
            translateY:200,
            translateX:0,
            duration:1000*speed,
            easing:'linear'
        });
    },
    animeblockup:function (nmrdublock) {
        anime({
            targets:document.getElementById('block'+(nmrdublock+1)),
            translateY:20,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },
    animeBlockRight:function (nmrdublock) {
        anime({
            targets:document.getElementById('block'+(nmrdublock+1)),
            translateY:0,
            translateX: 50,
            duration:1000*speed,
            easing: 'linear'
        });
    },



/*
    animereplaceblock:function(nmrdublockARemplacer,nmrDuBlockRemplacent){
        let remplacent=document.getElementById('block'+(nmrDuBlockRemplacent+1));
        let Aremplacer=document.getElementById('block'+(nmrdublockARemplacer+1));
        anime({
            targets:remplacent,
            translateY:[{value:200,duration:500*speed},
                {value: 20,duration: 500*speed}
            ],
            translateX:[{value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500*speed},
                {value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500*speed}
            ]
        });
    },

 */


    animenreg:function (nmrDuBlock,nmrEnreg,color) {
        let a=document.getElementById('block'+(nmrDuBlock+1)+'enreg'+(nmrEnreg+1));
        anime({
            targets:a,
            // width:[{value:21 ,duration:500*speed},
            //     {value: 20}
            // ],
            // height:[{value:21,duration:500*speed},
            //     {value: 20}],
            backgroundColor:[{value:color,
                duration:500*speed,},
                {
                    value: '#ffffff'
                }]
        })

    },
    /*
    anime_border_enreg:function (nmrBlock,nmrEnreg,borderColor) {
        anime({
            targets:'enreg'+(nmrEnreg+1)+'block'+(nmrBlock+1),
            borderTopColor:borderColor,
        });
    }

     */
};

//==========================================================classe fichier===========================

function TOVCb(Tab,entete,nomfich) {
    this.Tab=Tab;
    this.Entete=entete;
    this.nomfich=nomfich;
}
TOVCb.prototype={
    constructor:TOVCb,
    liredir:function (i) {
        return this.Tab[i];
    },
    ecriredir:function (i,buf) {
        this.Tab[i]=buf;

    },
    aff_entete:function (i,val) {
        this.Entete.Aff_entete(i,val);   //
    },
    entete:function (i){
        return  this.Entete.Entete(i);   //
    },


    insererenreg:async function(buf,j,e,k){
        let anime = new animations();
        let color='#ff0';
        k++;

        buf.tab[j] = e.taille;
        buf.tab[j+1] = e.eff;
        buf.tab[j+2] = e.cle;

        let divblock0=document.getElementById('block'+(k)+'enreg'+(j+1));

        let divblock1=document.getElementById('block'+(k)+'enreg'+(j+2));

        let divblock2=document.getElementById('block'+(k)+'enreg'+(j+3));

        anime.animenreg(k-1,j,color);
        await sleep(200);
        //divblock0.style.borderColor='#193ded';
        //divblock0.style.borderWidth='2px';
        divblock0.innerHTML+='<p>'+e.taille+'</p>';
        await sleep(300);
        anime.animenreg(k-1,j+1, color);
        await sleep(200);
        divblock1.style.borderColor='#ed6658';
        //divblock1.style.borderWidth='2px';
        divblock1.innerHTML+='<p>'+e.eff+'</p>';
        await sleep(300);
        anime.animenreg(k-1,j+2,color);
        await sleep(200);
        divblock2.style.borderColor='#1e9611';
        //divblock2.style.borderWidth='2px';
        divblock2.innerHTML+='<p>'+e.cle+'</p>';
        await sleep(300);

        for(let cpt=1; cpt<=e.chaine.length ; cpt++){
            buf.tab[j+2+cpt] = e.chaine[cpt-1];
            let divblocki=document.getElementById('block'+(k)+'enreg'+(j+cpt+3));
            anime.animenreg(k-1,j+cpt+2,color);
            await sleep(200);
            //divblocki.style.borderWidth='2px';
            divblocki.style.borderColor='#07E6E4';
            divblocki.innerHTML+='<p>'+e.chaine[cpt-1]+'</p>';
            await sleep(300);
        }
        //document.getElementById('casevide'+k).innerHTML='<p>'+(j+e.taille)+'</p>';
    },

    clear_enregs_div:async function(nmrBlock,indiceDebut,indiceFin){
        for (let i=indiceFin;i>=indiceDebut;i--){
            document.getElementById('block'+(nmrBlock+1)+'enreg'+(i+1)).innerHTML='';
            await sleep(200);
        }
    },

    remplacer_blocks:async function(numDuBlockAremplacer,numDuBlockRemplacant){
        let anime = new animations();

        let buf1 = this.liredir(numDuBlockAremplacer);
        let buf2 = this.liredir(numDuBlockRemplacant);
        let tmp = buf2;

        for (let cpt=0; cpt<7;cpt++) {
            document.getElementById('block'+(numDuBlockRemplacant+1)+'enreg'+(cpt+1)).innerHTML=buf1.tab[cpt];
        }
        for (let cpt=0; cpt<7;cpt++) {
            document.getElementById('block'+(numDuBlockAremplacer+1)+'enreg'+(cpt+1)).innerHTML=buf2.tab[cpt];
        }

        for (let cpt=0; cpt<7;cpt++){
            if(document.getElementById('block'+(numDuBlockRemplacant+1)+'enreg'+(cpt+1)).innerHTML =='undefined'){
                document.getElementById('block'+(numDuBlockRemplacant+1)+'enreg'+(cpt+1)).innerHTML = ' ';
            }
        }
        for (let cpt=0; cpt<7;cpt++){
            if(document.getElementById('block'+(numDuBlockAremplacer+1)+'enreg'+(cpt+1)).innerHTML =='undefined'){
                document.getElementById('block'+(numDuBlockAremplacer+1)+'enreg'+(cpt+1)).innerHTML = ' ';
            }
        }

        buf2 = buf1;
        this.ecriredir(numDuBlockRemplacant,buf1);
        buf1=tmp;
        this.ecriredir(numDuBlockAremplacer,tmp);


        let y = numDuBlockRemplacant - (numDuBlockAremplacer + 1);
        if(y!= 0) {
            let q = 1;
            numDuBlockAremplacer = numDuBlockAremplacer + q;
            await this.remplacer_blocks(numDuBlockAremplacer, numDuBlockRemplacant);
        }
    },

    recherche:async function(cle){
        let anime =new animations();
        let i=0 , j=0;
        let nbloc = this.entete(1);
        let trouv = false , stop =false ;
        let buf;
        let nb=this.entete(1);
        if(nb == 0){
            trouv = false;
            i=0;
            j=0;
        }else {
            while ((i < nbloc) && (!trouv) && (!stop)) {
                j = 0;
                buf = this.liredir(i);
                anime.animeBlockRight(i);
                await sleep(1500);
                let tai = buf.tab[j];
                let effa = buf.tab[j + 1];
                let kle = buf.tab[j + 2];
                anime.animenreg(i,j+2,'#8EF7F6');  //bleu
                await sleep(300);
                if ((cle == kle) && (effa == 0)) {
                    trouv = true;
                    anime.animenreg(i,j+2,'#3EEC00'); //vert
                    await sleep(1500);
                } else {
                    if ((cle == kle) && (effa == 1)){
                        trouv = false;
                        stop = true;
                        anime.animenreg(i,j+1,'#EC0000');
                        await sleep(300);
                        anime.animenreg(i,j+2,'#EC0000'); //rouge
                        await sleep(300);
                    }else {
                        if (cle < kle) {
                            trouv = false;
                            stop = true;
                            anime.animenreg(i,j+2,'#EC0000');
                        }

                    }
                }

                if (!trouv && !stop) {
                    i++;
                    j = 0;
                }else{
                    if(stop) {
                        stop = true;
                    }
                    if(trouv){
                        
                    }
                }
            }
        }
        return [trouv,i,j];

    },


    insertion : async function(cle , enreg){
        if(this.entete(1) < 5 ) {
            let anime = new animations();
            let e;
            let buf;
            let t = (enreg.length) + 3;
            e = new TenregTOVCb(t, 0, cle, enreg);
            let rech = await this.recherche(cle);
            let bool = rech[0], ii = rech[1], jj = rech[2];
            if (!bool) {
                buf = this.liredir(ii);
                anime.animeBlockRight(ii);
                await sleep(1500);

                if (buf == null) {
                    buf = new TblocTOVCb([], 0, 0);
                    buf.nbrenreg = 0;
                    this.aff_entete(1, this.entete(1) + 1);
                    await this.insererenreg(buf, jj, e, ii);
                    buf.nbrenreg++;
                    buf.premcasevide = buf.tab.length;
                    this.ecriredir(ii, buf);

                } else {
                    if (buf.tab[jj + 1] == 1) {
                        await this.clear_enregs_div(ii, 0, this.entete(2) - 1);
                        await this.insererenreg(buf, jj, e, ii);
                        this.aff_entete(1, this.entete(1) + 1);
                        buf.premcasevide = buf.tab.length;
                        this.ecriredir(ii, buf);
                    } else {
                        let buff = this.liredir(this.entete(1));
                        if (buff == null) {
                            buff = new TblocTOVCb([], 0, 0);
                            anime.animeBlockRight(this.entete(1));
                            await sleep(1500);
                            this.aff_entete(1, this.entete(1) + 1);
                            await this.insererenreg(buff, 0, e, this.entete(1)-1);
                            buff.nbrenreg++;
                            buff.premcasevide = buff.tab.length;
                            this.ecriredir(this.entete(1) - 1, buff);
                            await this.remplacer_blocks(ii, this.entete(1) - 1); // hebest hna

                        }
                    }
                }
            } else {
                alert('cette clé est deja prise ! ');
            }
        }else {
            alert('Le fichier est plein !');
        }
    },

    initialisation:async function (tab) {

        let initialise=0;

        this.aff_entete(1,0);

        while (initialise <tab.length){
            let enreg = tab[initialise];
            await this.insertion(initialise+1 , enreg);
            initialise++;
        }
    },


    fill_case_eff(num_bloc){
        document.getElementById('block'+(num_bloc+1)+'enreg'+(2)).innerHTML='<P>1</p>';
    },


    suppression_logique:async function(cle){
        let anime = new animations();
        let res = await this.recherche(cle);
        let trv=res[0] , i=res[1] , j=res[2];
        let buf;
        if(trv){
            buf=this.liredir(i);
            anime.animeBlockRight(i);
            await sleep(1000);
            anime.animenreg(i,j+2,'#DEEC00');
            await sleep(300);
            anime.animenreg(i,j+1,'#F22A0B');
            buf.tab[j+1] = 1;
            this.fill_case_eff(i);
            buf.nbrenreg--;
            this.aff_entete(1,this.entete(1)-1);
        }else {
            alert("cette clé n'existe pas !");
        }
    },

    calcul:function () {
        return this.entete(1)+1;
    },






};

var entetee =new EnteteTOVCb(0,7);
var fichier=new TOVCb([],entetee,'test');
var initialiseee=false;

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
    let vv=true;
    let i=0;
    while ( verifier && i<tab.length){
        if (tab[i].length>=5){
            verifier=false
        }
        i++;
    }
    if(tab.length>6){vv=false}
    return [verifier,vv];
}
function init() {
    let a =document.getElementById('initialiser-enrs').value.split(',');
    let condition=verif(a);
    if (condition[0] && condition[1]) {


        if (!initialiseee) {
            document.getElementById('initialiser-form').style.display = 'none';
            document.getElementById('initialiser-alert').innerText = '';
            box_shown = 0;
            console.log(a);
            fichier.initialisation(a);
            initialiseee = true;
        } else {
            alertt(1, 'le fichier est deja initialise');
        }
    }else {
        if (!condition[0]) alertt(1, 'les enregistrement ne doit pas depasser 4 caracteres');
        else {
            if (!condition[1]) alertt(1, 'le nombre des enregistrement ne doit pas depasser 5');
        }
    }

}
function insere() {
    // document.getElementById('inserer-form').style.display='none';
    let a=document.getElementById('inserer-cle').value;
    let s = document.getElementById('inserer-enr').value;
    document.getElementById('inserer-alert').innerText='';
    if ( a!='' && s.length<5) {

        if (initialiseee) {
            hide_form_box(3);
            box_shown = 0;

            fichier.insertion(a, s);
        } else {
            alertt(3,"Le fichier n'est pas initialise");
        }
    }
    else{
        if (s.length>=5){
            alertt(3,'l\'enregistrement est tres long')
        }
    }
}
function rech() {

    let a=document.getElementById('rechercher-cle').value;
    document.getElementById('rechercher-alert').innerText='';
    if (a != '') {

        if (initialiseee) {
            hide_form_box(2);
            box_shown = 0;
            fichier.recherche(a);
        } else {
            alertt(2,"Le fichier n'est pas initialise");
        }
    }
}
function supp() {
    let s=document.getElementById('supprimer-cle').value;
    document.getElementById('supprimer-alert').innerText='';
    if (s != ''){

        if (initialiseee){
            hide_form_box(4);
            box_shown=0;

            fichier.suppression_logique(s);
        }
        else {
            alertt(4,"Le fichier n'est pas initialise");
        }
    }


}

function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    document.getElementById('tovcb').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>TOVCb</p>\n' +
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
        '                        Donc  TOVCb représente l\'organisation d\'un fichier vu comme tableau, ordonné,\n' +

        '                        <br>\n' +
        '                         avec des enregistrements de taille variables sans chevauchements entre blocs.\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            L\'enregistrement est vue comme une chaine de caractères organise comme suit:\n' +
        '                            <br>\n' +
        '                            (taille , effacement , cle , une chaine de caractères qui represente le contenu \n' +
        '                            <br>\n' +
        '                            de l\'enregistrement ).\n' +
        '                            <br>\n' +
        '                            <img class="mt-1" src="assets/img/struct.JPG">\n' +
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






