var animation=anime({

});
var animationpaused=false;
var speed,timeouta;
function getspeed(){

    speed = (document.getElementById('speed').value) / 100;

    requestAnimationFrame(getspeed);
}
getspeed();
function auto_scroll() {
    let a=document.getElementById('algo');
    a.scrollTop=a.scrollHeight;
    // requestAnimationFrame(auto_scroll);
}
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
//===========================================fleche====================================================
let fleche_right = document.getElementById('fleche-right');

let ctxr = fleche_right.getContext('2d');
ctxr.beginPath();
ctxr.moveTo(5,30);
ctxr.lineTo(35,30);
ctxr.lineTo(30,25);
ctxr.lineTo(35,30);
ctxr.lineTo(30,35);
ctxr.stroke();
//===========================================animation classe==========================================
function animations() {

}
animations.prototype={
    constructor:animations(),
    animenreg:function (nmrEnreg,color,still=false) {
        let a=document.getElementById('case'+(nmrEnreg));
        if (still){
            animation=anime({
                targets: a,
                background:color,
            })
        }else {
            animation= anime({
                targets: a,
                background: [{
                    value: color,
                    duration: 500 * speed,
                }
                    ,
                    {
                        value: '#ffffff',
                        duration: 100 * speed,
                    }
                ]
            })
        }
    },
    animeff:function(nmr,color){
        let a=document.getElementById('caseeff'+(nmr));
        animation= anime({
            targets:a,
            background:[{value:color,
                duration:500*speed,}
                ,
                {
                    value: '#ffffff',
                    duration: 100*speed,
                }
            ]
        })
    },

    anime_border_enreg: function (nmrEnreg,borderColor) {
        animation=anime({
            targets:'case'+(nmrEnreg),
            borderTopColor:borderColor,
        });
    },
    animealgo:function(nmrLigne){
        animation=anime({
            targets:document.getElementById('l'+nmrLigne),
            backgroundColor:'#FF453A',
            duration:0
        });
    },
    resetAlgo:function (nbrligne) {
        for (let i=0;i<nbrligne;i++){
            anime({
                targets:document.getElementById('l'+i),
                backgroundColor:'#fff',
                duration:0,

            });
        }
    },
};

//============================================essai lineaire classe===================================

function Tcase(cle,eff) {
    this.cle=cle;
    this.eff=eff;
}

Tcase.prototype ={
    constructor:Tcase,
};

function EssaiLineaire(tab,nbmax,doubleHachage=false){
    this.tab=tab;
    this.nbmax=nbmax;
    this.nbrCaseVide=nbmax;
    this.doubleHachage=doubleHachage;
    let container=document.getElementById('Essai lineaire');
    let table=document.createElement('table');
    table.className='table-fill';
    let x;
    if (doubleHachage){
        x='<thead>\n' +
            '            <tr>\n' +
            '                <th class="text-center case">Case</th>\n' +
            '                <th class="text-center donnee">Donnees</th>\n' +
            '                <th class="text-center eff">Eff </th>\n'+
            '            </tr>\n' +
            '        </thead>';
    }
    else {
        x='<thead>\n' +
            '            <tr>\n' +
            '                <th class="text-center case">Case</th>\n' +
            '                <th class="text-center donnee">Donnees</th>\n' +

            '            </tr>\n' +
            '        </thead>';
    }
    table.innerHTML=x;
    let tblock=document.createElement('tbody');
    tblock.className='table-hover';
    for (let k=0;k<nbmax;k++){
        this.tab[k]=new Tcase(undefined,0);
        let tr=document.createElement('tr');
        tr.innerHTML='<td class="text-center">'+k+'</td>'+'<td id="case'+k+'" class="text-center ">Vide</td>';
        if (doubleHachage){tr.innerHTML+='<td id="caseeff'+k+'" class="text-center">0</td>';}
        tblock.appendChild(tr);
    }
    table.appendChild(tblock);
    container.appendChild(table);
    let canvas=document.createElement('canvas');
    canvas.className='fleches';
    canvas.id='fleche-cote';
    let y=38*nbmax;
    canvas.height=y;
    canvas.width=210;
    container.appendChild(canvas);
}
EssaiLineaire.prototype={
  constructor:EssaiLineaire,
    ajouter_algo_rech:function(){
        let algo=document.getElementById('algo');
        algo.innerHTML='<p id="l0">Adr = hachage(cle) ;</p>' +
            '<p id="l1">TQ ( !trouv Et Tab[adr] != vide )</p>' +
            '<p id="l2">&nbsp &nbsp SI (Tab[adr] = cle) trouv = vrai;</p>' +
            '<p id="l3">&nbsp &nbsp sinon :</p>' +
            '<p id="l4">&nbsp &nbsp &nbsp &nbsp adr = adr -1 ; </pid>' +
            '<p id="l5"> &nbsp &nbsp &nbsp &nbsp Si (adr < 0) adr= Taille de tableau + adr</p>' +
            '<p id="l6">FTQ</p>' +
            '<p id="l7">Return [trouv,adr] ; FIN</p>';
    },
    ajouter_algo_insere:function(){
        let algo=document.getElementById('algo');
        algo.innerHTML='<p id="l0">SI ( nombre de case vide > 1 ) :</p>' +
            '<p id="l1"> &nbsp &nbsp Recherche(cle)</p>' +
            '<p id="l2">&nbsp &nbsp Si on ne trouve pas la cle : </p>' +
            '<p id="l3">&nbsp &nbsp &nbsp &nbsp Insertion de la cle a l\'adresse adr</p>' +
            '<p id="l4">&nbsp &nbsp sinon: Ecrire(\'la cle existe deja\')</pid>' +
            '<p id="l5">Sinon: Ecrire(\'le tableau est plein\')</p>' ;
    },
    ajouter_algo_supp:function(){
        let algo=document.getElementById('algo');
        algo.innerHTML='<p id="l0">Recherche( cle )</p>' +
            '<p id="l1">Si on trouve la cle : </p>' +
            '<p id="l2">&nbsp &nbsp Suppression de la cle</p>' +
            '<p id="l3">&nbsp &nbspTQ( Tab[i] n\'est pas vide )</p>' +

            '<p id="l4">&nbsp &nbsp &nbsp &nbsp Si Tab[i] pose probleme : </pid>' +
            '<p id="l5"> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Deplacement de Tab[i] vers adr;</p>' +

            '<p id="l6">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp adr=i; </p>' +
            '<p id="l7">&nbsp &nbsp &nbsp &nbsp i = i-1; Si(i<0) : i=i+Taille de Tab;</p>'+

            '<p id="l8">&nbsp &nbsp FTQ;</p>'+

            '<p id="l9">Sinon:ecrire(\'la cle n\'existe pas\');FIN</p>';
    },
    clear_etapes:function(){
        // let algo=document.getElementById('algo');
        // algo.innerHTML='';
    },
    ajouter_etape:function(paragraph){
        // let algo=document.getElementById('algo');
        // algo.innerHTML+='<p>'+paragraph+'</p>';
        //
        // auto_scroll();
    },
  hash: async function (cle,animtion=false) {
      let a = cle % this.nbmax;
      if (animtion) {

      document.getElementById('case-hach1').style.opacity = 0;
      document.getElementById('fleche-right').style.opacity = 0;
      document.getElementById('case-hach2').style.opacity = 0;
      await sleep(600);

      document.getElementById('donne1').innerText = cle;
      document.getElementById('donne2').innerText = a;

      document.getElementById('case-hach1').style.opacity = 1;
      await sleep(500);
      document.getElementById('fleche-right').style.opacity = 1;
      await sleep(500);
      document.getElementById('case-hach2').style.opacity = 1;
      await sleep(500);
  }
        return a;
  },
  hashprim:function(cle){
    let a = this.hash(cle);
    a*=a;
    return a % this.nbmax;
  },
  fillcase:async function(cle,nbrcase,eff=0){
      let ncase=document.getElementById('case'+nbrcase);
      ncase.innerText=cle;
      let efff=document.getElementById('caseeff'+nbrcase);
      efff.innerText=eff;

  },
    resete:async function(){
      let an=new animations();
      for (let k=0;k<this.nbmax;k++){
          an.animenreg(k,'#fff',true);
      }
    },
  recherche:async function (cle,avecAlgo=false) {
      this.resete();
      let a=new animations();
      if (avecAlgo){
          this.ajouter_algo_rech();
      }

      let canvas=document.getElementById('fleche-cote');
      let ctx=canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
        let trouv=false;
       if (avecAlgo){
            a.resetAlgo(8);
            a.animealgo(0);
            await sleep(500);
       }
        let adr= await this.hash(cle,true);
        let step;
        if (this.doubleHachage){
            step=this.hashprim(cle);
        }
        else {
            step=1;
        }
        while ((!trouv) && (this.tab[adr].cle != undefined)){
            if (avecAlgo){
                a.resetAlgo(8);
                a.animealgo(1);
                await sleep(500);
            }
            if ((this.tab[adr].cle==cle) && (this.tab[adr].eff==0)){
                if (avecAlgo){
                    a.resetAlgo(8);
                    a.animealgo(2);
                    await sleep(500);
                }
                this.ajouter_etape('- Tab['+adr+'] = '+cle);
                await sleep(500);
                trouv=true;
                a.animenreg(adr,'#43ee06',true);
                await sleep(500);
            }
            else {
                if (avecAlgo){
                    a.resetAlgo(8);
                    a.animealgo(3);
                    await sleep(500);
                }
                this.ajouter_etape('- Tab['+adr+'] =/= '+cle);
                await sleep(500);
                a.animenreg(adr,'#f10b2b');
                await sleep(500);

                ctx.beginPath();
                let begin=38*adr+15;
                ctx.moveTo(2,begin);
                adr-=step;
                if (avecAlgo){
                    a.resetAlgo(8);
                    a.animealgo(4);
                    await sleep(500);
                }
                if (adr<0){adr=this.nbmax+adr;
                    if (avecAlgo){
                        a.resetAlgo(8);
                        a.animealgo(5);
                        await sleep(500);
                    }
                }
                this.ajouter_etape('- Testons Tab['+adr+']');
                await sleep(500);
                let end=38*adr+15;
                ctx.quadraticCurveTo(20*(Math.abs(end-begin)/38),(begin+end)/2 , 2 , end );

                ctx.stroke();
                await sleep(300);
            }
            if (avecAlgo){
                a.resetAlgo(8);
                a.animealgo(1);
                await sleep(500);
            }
        }
      if (avecAlgo){
          a.resetAlgo(8);
          a.animealgo(6);
          await sleep(500);
      }
        if (!trouv){
            a.animenreg(adr,'#f0f80a');
            await sleep(500);
        }

      if (avecAlgo){
          a.resetAlgo(8);
          a.animealgo(7);
          await sleep(500);
      }
        return [trouv,adr];
  },
  insertion:async function (cle) {
      let an=new animations();
      this.clear_etapes();
        this.ajouter_algo_insere();

          an.resetAlgo(6);
          an.animealgo(0);
          await sleep(500);

      if (this.nbrCaseVide>=2){
          an.resetAlgo(6);
          an.animealgo(1);
          await sleep(500);
        let a=await this.recherche(cle);

        let trouv=a[0],adr=a[1];
        if (!trouv){
            an.resetAlgo(6);
            an.animealgo(2);
            await sleep(500);
            an.resetAlgo(6);
            an.animealgo(3);
            await sleep(500);
                this.tab[adr].cle=cle;
                this.tab[adr].eff=0;
                an.animenreg(adr,'#f0f80a');
                this.fillcase(cle,adr);
                await sleep(200);
                an.animenreg(adr,'#43ee06');
                await sleep(300);
                this.nbrCaseVide--;

        }
        else {
            an.resetAlgo(6);
            an.animealgo(4);
            await sleep(500);
            this.ajouter_etape('- la cle existe deja');
        }
      }
      else {
          an.resetAlgo(6);
          an.animealgo(5);
          await sleep(500);
          // alert('la table est remplis au maximum');
          this.ajouter_etape('- Il doit toujours rester au moins');
          this.ajouter_etape('une case vide dans la table');
          this.ajouter_etape(' (on sacrifie une position)');
      }
  },
  suppression:async function (cle) {
              this.ajouter_algo_supp();
              let an=new animations();
              an.resetAlgo(10);
              an.animealgo(0);
              await sleep(500);
            let a=await this.recherche(cle);

            let canvas=document.getElementById('fleche-cote');
            let ctx=canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let trouv=a[0],adr=a[1];
            let stop1=false,stop2;
            let j,i;
            if (trouv) {
                an.resetAlgo(10);
                an.animealgo(1);
                await sleep(500);


                if (this.doubleHachage) {
                    this.tab[adr].eff=1;
                    // document.getElementById('case' + adr).style.background = '#f10b2b';
                    an.animenreg(adr, '#f10b2b');
                    await sleep(300);
                    an.animeff(adr, '#f10b2b');
                    await sleep(300);
                    this.fillcase(this.tab[adr].cle, adr,1);
                    await sleep(200);
                    // document.getElementById('case' + adr).style.background = '#fff';
                }
                else {
                    an.resetAlgo(10);
                    an.animealgo(2);
                    await sleep(500);

                    j = adr;
                    an.animenreg(j, '#f10b2b');
                    await sleep(300);
                    this.tab[j].cle = undefined;
                    this.fillcase('Vide', j);
                    await sleep(200);
                    this.nbrCaseVide++;
                    while (!stop1) {
                        an.resetAlgo(10);
                        an.animealgo(3);
                        await sleep(500);
                        i = j - 1;
                        if (i < 0) {
                            i = this.nbmax + i
                        }

                        stop2 = false;
                        while ((this.tab[i].cle != undefined) && (!stop2)) {
                            this.ajouter_etape('- Verification de Tab['+i+']:');
                            await sleep(500);
                            let y = this.tab[i].cle;
                            let hash=await this.hash(y);
                            if ((hash < i && i < j) || (i < j && j <= hash || (j <= hash && hash < i))) {
                                an.resetAlgo(10);
                                an.animealgo(4);
                                await sleep(500);
                                this.tab[j].cle = y;
                                an.resetAlgo(10);
                                an.animealgo(5);
                                await sleep(500);
                                ctx.beginPath();
                                let begin=38*i+15;
                                ctx.moveTo(2,begin);
                                let end=38*j+15;
                                ctx.quadraticCurveTo(20*(Math.abs(end-begin)/38),(begin+end)/2 , 2 , end );
                                ctx.stroke();
                                an.animenreg(j, '#f10b2b');
                                await sleep(200);
                                this.fillcase(y, j);
                                an.animenreg(j, '#43ee06');
                                await sleep(500);
                                this.tab[i].cle = undefined;
                                an.animenreg(i, '#f10b2b');
                                await sleep(300);
                                this.fillcase('Vide', i);
                                await sleep(200);
                                an.resetAlgo(10);
                                an.animealgo(6);
                                await sleep(500);
                                j = i;
                                stop2 = true;
                                an.resetAlgo(10);
                                an.animealgo(7);
                                await sleep(500);
                            }
                            else {
                                an.resetAlgo(10);
                                an.animealgo(7);
                                await sleep(500);
                                an.animenreg(i, '#43ee06');
                                await sleep(500);
                                i -= 1;
                                if (i < 0) {
                                    i = this.nbmax + i
                                }
                            }
                        }
                        if (!stop2) {
                            an.resetAlgo(10);
                            an.animealgo(3);
                            await sleep(500);
                            an.resetAlgo(10);
                            an.animealgo(8);
                            await sleep(500);
                            stop1 = true;
                        }
                    }
                }
            }
            else {
                an.resetAlgo(10);
                an.animealgo(9);
                await sleep(500);
                this.ajouter_etape('la cle n\'existe pas');
            }
    }

};


let fich=new EssaiLineaire([],11);


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

let initialiseee=false;
async function initialisation(){
    vider_alertt();
    let tab =document.getElementById('initialiser-cles').value.split(',');
    if (verif(tab)) {
        if (!initialiseee) {
            document.getElementById('initialiser-form').style.display = 'none';
            box_shown = 0;

            let initialise = 0;
            while (initialise < tab.length) {
                let enreg = parseInt(tab[initialise]);
                await fich.insertion(enreg);
                initialise++;
            }
            initialiseee = true;
        } else {
            alertt(1, "Le fichier est déja initialisée");
        }
    }
    else {
        alertt(1,'l\'un des clés n\'est pas un nombre');
    }
}
async function insere() {
    vider_alertt();
    let a = parseInt(document.getElementById('inserer-cle').value);
    if (!isNaN(a)) {
        if (initialiseee) {
            document.getElementById('inserer-form').style.display = 'none';
            box_shown = 0;

            await fich.insertion(a);

        } else {
            alertt(3, "Le fichier n'est pas initialise");
        }
    }
}
async function rech() {
    vider_alertt();
    let a=parseInt(document.getElementById('rechercher-cle').value);
    if (!isNaN(a)) {
        if (initialiseee) {
            document.getElementById('rechercher-form').style.display = 'none';
            box_shown = 0;

            await fich.recherche(a, true);
        } else {
            alertt(2,"Le fichier n'est pas initialise");
        }
    }
}
async function supp() {
    vider_alertt();
    let s=parseInt(document.getElementById('supprimer-cle').value);
    if (!isNaN(s)) {
        if (initialiseee) {
            document.getElementById('supprimer-form').style.display = 'none';
            box_shown = 0;
            await fich.suppression(s);
        } else {
            alertt(4, "Le fichier n'est pas initialise");
        }
    }
}


function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    document.getElementById('Essai lineaire').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>Essai Lineaire</p>\n' +
        '                        </div>\n' +
        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Information sur la structure:</h3>\n' +
        '                        - Le principe de hachage est de Stocker des données (x) dans une table (T)\n' +
        '                        <br>\n' +
        '                         en utilisant une fonction (h) pour la localisation rapide.\n' +
        '                        <br>\n' +
        '                        - Essai Linéaire : son principal fonctionnement est : Si la case h(x) est déjà\n' +
        '                        <br>\n' +
        '                       occupée, essayer les cases qui la précèdent jusqu\'à trouver une case vide\n' +
        '                        <br>\n' +
        '                        - Il doit toujours rester au moins une case vide dans la table \n' +

        '                        <br>\n' +
        '                         (on sacrifie une position).\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            - A gauche de la page de simulation, on a une zone pour le calcul d\'adresse.\n' +
        '                            <br>\n' +
        '                            - Et a droite, on a le tableau où on insere les données. \n' +
        '                            <br>\n' +
        '                            - A droite du tableau, on laisse la trace des cases parcourus\n' +
        '                            <br>\n' +
        '                            <img class="mt-1" src="assets/img/struct.JPG" width="500">\n' +
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







