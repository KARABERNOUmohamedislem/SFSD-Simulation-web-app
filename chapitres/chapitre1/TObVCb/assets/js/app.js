
var animation=anime({

});
var animationpaused=false;
var speed,timeouta;
function getspeed(){

    speed = (document.getElementById('speed').value) / 100;
    speed += 0.2;
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
function EnteteTObVCb(nb,taillemax) {
    this.NB=nb;
    this.TailleMax=taillemax;


}

EnteteTObVCb.prototype={
    constructor :EnteteTObVCb,
    Entete:function (i) {
        var a;
        if (i===1){
            a=this.NB;
        }
        else if (i===2){
            a=this.TailleMax;
        }
        return a;
    },
    Aff_entete:function (i,val) {
        if (i===1){
            this.NB=val;
        }
        else if (i===2){
            this.TailleMax=val;
        }

    },
};

function TenregTObVCb(taille,eff,cle,chaine) {
    this.Taille=taille;
    this.eff=eff;
    this.cle=cle;
    this.chaine=chaine;
}
TenregTObVCb.prototype={
    constructor:TenregTObVCb
};
function TblocTObVCb(tab,derniercasevide,nbrenreg) {
    this.tab=tab;
    this.derniercasevide=derniercasevide;
    this.nbrenreg=nbrenreg;

}
TblocTObVCb.prototype={
 constructor:TblocTObVCb,

};
//==========================================================classe animations========================
function animations() {

}
animations.prototype={
  constructor:animations(),
  animeblockdown:function (nmrdublock) {
      animation=anime({
           targets:document.getElementById('block'+(nmrdublock+1)),
           // translateY:200,
           // translateX:0,
          borderColor:'#0081E2',
          backgroundColor:'#b1bbff',
          duration:1000*speed,
          easing:'linear'
       });
  },
  animeblockup:function (nmrdublock) {
      animation=anime({
          targets:document.getElementById('block'+(nmrdublock+1)),
          // translateY:20,
          // translateX: 0,
          borderColor:'#000',
          backgroundColor:'#fff',
          duration:1000*speed,
          easing: 'linear'
      });
  },
    animereplaceblock:function(nmrdublockARemplacer,nmrDuBlockRemplacent){
      let remplacent=document.getElementById('block'+(nmrDuBlockRemplacent+1));
        animation=anime({
          targets:remplacent,
          translateY:[{value:200,duration:500*speed},
              {value: 0,duration: 500*speed}
          ],
          translateX:[{value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500*speed},
              {value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500*speed}
          ]

      });
    },
    animenreg:function (nmrDuBlock,nmrEnreg,color) {
        let a=document.getElementById('enreg'+(nmrEnreg+1)+'block'+(nmrDuBlock+1));
        animation=anime({
            targets:a,
            width:[{value:21 ,duration:500*speed},
                {value: 20}
            ],
            height:[{value:21,duration:500*speed},
                {value: 20}],
            backgroundColor:[{value:color,
            duration:500*speed,},
                {
                    value: '#ffffff'
                }]
        })

    },
    anime_border_enreg:function (nmrBlock,nmrEnreg,borderColor) {
        animation=anime({
          targets:'enreg'+(nmrEnreg+1)+'block'+(nmrBlock+1),
          borderTopColor:borderColor,
      });
    },
    animealgo:function(nmrLigne){
        animation=anime({
            targets:document.getElementById('l'+nmrLigne),
            backgroundColor:'#0084FF',
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
//==========================================================classe fichier===========================

function TObVCb(Tab,entete,nomfich) {
    this.tab=Tab;
    this.Entete=entete;
    this.nomfich=nomfich;
}

TObVCb.prototype={
  constructor:TObVCb,
    clear_etapes:function(){

    },
    ajouter_etape:function(paragraph){

    },
    ajouter_algo_insere:function(){
        let algo=document.getElementById('algo');
        algo.innerHTML='<p id="l0">i = 1;</p>' +
            '<p id="l1">TQ( i<= nombre des block ET !insere)</p>' +
            '<p id="l2">&nbsp &nbsp LireDire(i);</p>' +
            '<p id="l3">&nbsp &nbsp si l\'espace disponible est suffisant:</p>' +
            '<p id="l4">&nbsp &nbsp &nbsp &nbsp Insertion de l\'enregistrement; insere=vrai</p>' +
            '<p id="l5">&nbsp &nbsp Sinon: i++;</p>' +

            '<p id="l6">FTQ</p>' +
            '<p id="l7">SI (!insere):</p>'+
            '<p id="l8">&nbsp &nbsp Allocation d\'un nouveau block </p>'+
            '<p id="l9">&nbsp &nbsp Insertion de l\'enregistrement</p>';
    },
    ajouter_algo_rech:function(){
        let algo=document.getElementById('algo');
        algo.innerHTML='<p id="l0">i = 1; j = 0;</p>' +
            '<p id="l1">TQ( i<= nombre des block ET !trouv)</p>' +
            '<p id="l2">&nbsp &nbsp LireDire(i);</p>' +
            '<p id="l3">&nbsp &nbsp TQ( j<= taille du block ET !trouv)</p>' +
            '<p id="l4">&nbsp &nbsp &nbsp &nbsp Si(cle = block.Tab[j+2]): trouv=vrai</p>' +
            '<p id="l5">&nbsp &nbsp &nbsp &nbsp Sinon:j=j+taille de l\'enregistrement</p>' +

            '<p id="l6">&nbsp &nbsp FTQ</p>' +
            '<p id="l7">&nbsp &nbsp SI (!trouv): i++; j=0;</p>'+
            '<p id="l8">FTQ </p>'+
            '<p id="l9">Return [trouv,i,j]</p>';
    },
    ajouter_algo_supp:function(){
        let algo=document.getElementById('algo');
        algo.innerHTML='<p id="l0">recherche(cle)</p>' +
            '<p id="l1">SI l\'enregistrement existe:</p>' +
            '<p id="l2">&nbsp &nbsp SI l\'enregistrement est le seul dans le block</p>' +
            '<p id="l3">&nbsp &nbsp &nbsp &nbsp Si ce block est le dernier block:</p>' +
            '<p id="l4">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Supperession du block</p>' +
            '<p id="l5">&nbsp &nbsp &nbsp &nbsp Sinon: Remplacement du block par le dernier</p>' +
            '<p id="l6">&nbsp &nbsp Sinon: Supperession de l\'enregistrement</p>'+
            '<p id="l7">Sinon: Ecrire(\'l\'enregistrement n\'existe pas\')</p>'
        ;



    },
    liredir:function (i) {

        return this.tab[i];
    },
    ecriredir:function (i,buf) {
      this.tab[i]=buf;

    },
    aff_entete:function (i,val) {
        this.Entete.Aff_entete(i,val);
    },
    entete:function (i)
    {
        return  this.Entete.Entete(i);
    },
    alloc_bloc:function () {
      let divfichier=document.getElementById('TObVCb');
      let divblock=document.createElement('div');
      divblock.id='block'+(this.entete(1)+2);
      divblock.className='Tblock';
      divfichier.appendChild(divblock);
      for (let i=1;i<=this.entete(2);i++){
          let divenreg=document.createElement('div');
          divenreg.id='enreg'+i+'block'+(this.entete(1)+2);
          divenreg.className='Tenreg';
          divblock.appendChild(divenreg);
      }
      let divtaille=document.createElement('div');
      divtaille.className='casevide';
      divtaille.id='casevide'+(this.entete(1)+2);
      divtaille.innerHTML='<P>0</p>';
      divblock.appendChild(divtaille);
        return this.entete(1)+1;
    },

    remplacer_block:function(nmrDublockAremplacer,nmrDublockRemplacent){
        let remplacent=document.getElementById('block'+(nmrDublockRemplacent+1));
        let aremplacer=document.getElementById('block'+(nmrDublockAremplacer+1));
        aremplacer.parentNode.replaceChild(remplacent,aremplacer);
        remplacent.id='block'+(nmrDublockAremplacer+1);
        for (let i=1;i<=this.entete(2);i++){
            let divenreg=document.getElementById('enreg'+i+'block'+(nmrDublockRemplacent+1));
            divenreg.id='enreg'+i+'block'+(nmrDublockAremplacer+1);
            divenreg.className='Tenreg';
        }
        },

    insererenreg:async function(e,buf,k){
      let anime = new animations();
      let color='#ff0';
      let a=buf.derniercasevide;
      k++;

      buf.tab[a]=e.Taille;

      buf.tab[a+1]=e.eff;

      buf.tab[a+2]=e.cle;

      let divblock0=document.getElementById('enreg'+(a+1)+'block'+k);

      let divblock1=document.getElementById('enreg'+(a+2)+'block'+k);

      let divblock2=document.getElementById('enreg'+(a+3)+'block'+k);

        anime.animenreg(k-1,a,color);
        await sleep(200);
        divblock0.style.borderColor='#193ded';
        divblock0.style.borderWidth='2px';
      divblock0.innerHTML+='<p>'+e.Taille+'</p>';
        await sleep(300);
        anime.animenreg(k-1,a+1, color);
        await sleep(200);
        divblock1.style.borderColor='#ed6658';
        divblock1.style.borderWidth='2px';
      divblock1.innerHTML+='<p>'+e.eff+'</p>';
        await sleep(300);
        anime.animenreg(k-1,a+2,color);
        await sleep(200);
        divblock2.style.borderColor='#1e9611';
        divblock2.style.borderWidth='2px';
      divblock2.innerHTML+='<p>'+e.cle+'</p>';
        await sleep(300);

      for (let i=1;i<=e.chaine.length;i++){
          buf.tab[a+2+i]=e.chaine[i-1];
          let divblocki=document.getElementById('enreg'+(a+i+3)+'block'+k);
          anime.animenreg(k-1,a+i+2,color);
          await sleep(200);
          divblocki.style.borderWidth='2px';
          divblocki.innerHTML+='<p>'+e.chaine[i-1]+'</p>';
          await sleep(300);
      }
      document.getElementById('casevide'+k).innerHTML='<p>'+(a+e.Taille)+'</p>';
    },

    insertion:async function (cle,enreg) {
      let e;
      this.ajouter_algo_insere();
      let anime =new animations();
      let buf;
      let t=(enreg.length)+3;
      e=new TenregTObVCb(t,0,cle,enreg);
            anime.resetAlgo(10);
            anime.animealgo(0);
            await sleep(500);

      let i=0,nb=this.entete(1),insere=false,taillemax=this.entete(2);
      while (i<=nb && !insere)
          {
              anime.resetAlgo(10);
            anime.animealgo(1);
            await sleep(500);
              anime.resetAlgo(10);
              anime.animealgo(2);
              await sleep(500);
         buf= this.liredir(i);

          anime.animeblockdown(i);
          await sleep(1500);
         if (buf==null){buf=new TblocTObVCb([],0,0);
         this.aff_entete(1,i);
         }

         if ((taillemax - buf.derniercasevide)>=t){
             anime.resetAlgo(10);
             anime.animealgo(3);
             await sleep(500);
             anime.resetAlgo(10);
             anime.animealgo(4);
             await sleep(500);
            await this.insererenreg(e,buf,i);
            buf.derniercasevide= buf.tab.length;
            insere=true;
              this.ecriredir(i,buf);
             this.ajouter_etape('-ecrireDir('+(i+1)+',buf)');
              anime.animeblockup(i);
             await sleep(1000);
         }
         else {
             anime.resetAlgo(10);
             anime.animealgo(5);
             await sleep(500);
             this.ajouter_etape('-Non');
              anime.animeblockup(i);
             await sleep(1000);
             i++;
         }
              anime.resetAlgo(10);
              anime.animealgo(1);
              await sleep(500);
      }
        anime.resetAlgo(10);
        anime.animealgo(6);
        await sleep(500);
      if (!insere){
          anime.resetAlgo(10);
          anime.animealgo(7);
          await sleep(500);
          anime.resetAlgo(10);
          anime.animealgo(8);
          await sleep(500);
          let n=this.alloc_bloc();

          buf=new TblocTObVCb([],0,0);
          anime.animeblockdown(n);
          await sleep(1500);
          anime.resetAlgo(10);
          anime.animealgo(9);
          await sleep(500);
          await this.insererenreg(e,buf,n);
          this.ajouter_etape('-ecrireDir('+(n+1)+',buf)');
          anime.animeblockup(n);
          await sleep(1500);
          buf.derniercasevide=t;
          this.aff_entete(1,nb+1);
          this.ajouter_etape('-aff_entete(1,'+(nb+2)+')');
          this.ecriredir(n,buf);
      }
    },
    initialisation:async function (tabDEle) {

        let tab=tabDEle;
        let initialise=0;

        // while (initialise<nbrelemntAinserer){
        //     let enreg=prompt('entrez l enregistrement '+(initialise+1));
        //     tab[initialise]=enreg;
        //     initialise++;
        // }
        initialise=0;
        this.alloc_bloc();
        this.aff_entete(1,0);
        while (initialise<tab.length){
            let enreg=tab[initialise];
            await this.insertion(initialise+1,enreg);
            initialise++;
        }
    },
    recherche:async function (cle,avecalgo=false) {
      if (avecalgo){
          this.ajouter_algo_rech();
      }

      var anime=new animations();
     if (avecalgo) {
         anime.resetAlgo(10);
         anime.animealgo(0);
         await sleep(500);
     }
        let i=0,j=0,trouv=false;
        let buf;
        let nbloc=this.entete(1);
        while ((i<=nbloc) &&(!trouv)){
            if (avecalgo) {
                anime.resetAlgo(10);
                anime.animealgo(1);
                await sleep(500);
            }
            j=0;
            if (avecalgo) {
                anime.resetAlgo(10);
                anime.animealgo(2);
                await sleep(500);
            }
            buf=this.liredir(i);

            anime.animeblockdown(i);
            await sleep(1500);
            while ((j<buf.derniercasevide) && (!trouv)){
                if (avecalgo) {
                    anime.resetAlgo(10);
                    anime.animealgo(3);
                    await sleep(500);
                }
                let taille=buf.tab[j];

                anime.animenreg(i,j,'#597caa');
                await sleep(300);
                let eff=buf.tab[j+1];
                let kle=buf.tab[j+2];


                if ((kle==cle) && (!eff)){
                    if (avecalgo) {
                        anime.resetAlgo(10);
                        anime.animealgo(4);
                        await sleep(500);
                    }
                    trouv=true;
                    anime.animenreg(i,j+2,'#1e9611');
                    this.ajouter_etape('- '+cle+' = '+cle);
                    await sleep(500);
                }
                else {
                    if (avecalgo) {
                        anime.resetAlgo(10);
                        anime.animealgo(5);
                        await sleep(500);
                    }
                    anime.animenreg(i,j+2,'#963133');
                    this.ajouter_etape('- '+kle+' =/= '+cle);
                    await sleep(300);
                    anime.animenreg(i,j,'#ffffff');
                    anime.animenreg(i,j+2,'#ffffff');
                    j+=taille;

                }
                if (avecalgo) {
                    anime.resetAlgo(10);
                    anime.animealgo(3);
                    await sleep(500);
                }
            }
            if (avecalgo) {
                anime.resetAlgo(10);
                anime.animealgo(6);
                await sleep(500);
            }
            anime.animeblockup(i);
            await (1000);
            if (!trouv)
            {
                if (avecalgo) {
                    anime.resetAlgo(10);
                    anime.animealgo(7);
                    await sleep(500);
                }
                i++;
                j=0;
            }
            if (avecalgo) {
                anime.resetAlgo(10);
                anime.animealgo(1);
                await sleep(500);
            }
        }
        if (avecalgo) {
            anime.resetAlgo(10);
            anime.animealgo(8);
            await sleep(500);
        }
        if (avecalgo) {
            anime.resetAlgo(10);
            anime.animealgo(9);
            await sleep(500);
        }

        return [trouv,i,j];
    },
    clear_dernier_bloc(){
      let r=this.entete(1);
      let div=document.getElementById('block'+(r+1));
      div.parentNode.removeChild(div);
    },
    clear_enregs_div:async function(nmrBlock,indiceDebut,indiceFin){
      for (let i=indiceFin;i>=indiceDebut;i--){
          document.getElementById('enreg'+(i+1)+'block'+(nmrBlock+1)).innerHTML='';
          await sleep(200);
      }
    },
    suppression:async function (cle) {
      var anim=new animations();
      this.ajouter_algo_supp();
        anim.resetAlgo(8);
        anim.animealgo(0);
        await sleep(500);
      let a=await this.recherche(cle);
      await sleep(500);

      let buf;
      let trouv=a[0],i=a[1],j=a[2];
      if (trouv){

          anim.resetAlgo(8);
          anim.animealgo(1);
          await sleep(500);
          nb=this.entete(1);
          buf=this.liredir(i);

          anim.animeblockdown(i);
          await sleep(1000);
          let taille=buf.tab[j];
          if (buf.derniercasevide==taille){
              anim.resetAlgo(8);
              anim.animealgo(2);
              await sleep(500);
              if (nb==i){
                  anim.resetAlgo(8);
                  anim.animealgo(3);
                  await sleep(500);
                  anim.resetAlgo(8);
                  anim.animealgo(4);
                  await sleep(500);
                  this.clear_dernier_bloc();
                  this.aff_entete(1,nb-1);
              }
              else {
                  anim.resetAlgo(8);
                  anim.animealgo(5);
                  await sleep(500);
                  buf=this.liredir(nb);
                   anim.animereplaceblock(i,nb);
                  document.getElementById('block'+(i+1)).style.opacity=0;
                   await sleep(300);

                   await sleep(700);

                  this.ecriredir(i,buf);
                  this.remplacer_block(i,nb);
                 await sleep(10);
                  anime({
                      targets:document.getElementById('block'+(i+1)),
                      translateX:0,
                      easing:'linear',
                      duration:0
                  });



                  this.aff_entete(1,nb-1);
              }
          }
          else {
              anim.resetAlgo(8);
              anim.animealgo(6);
              await sleep(500);
              if ((taille+j)==buf.derniercasevide){
                  this.ajouter_etape('-l\'enregistrement est le dernier ');
                  this.ajouter_etape('dans le block');
                  await sleep(500);
                  this.ajouter_etape('Donc suppression de l\'enregistrement');
                  await sleep(500);
                  buf.derniercasevide=j;
                  this.clear_enregs_div(i,j,j+taille-1);
                  document.getElementById('casevide'+(i+1)).innerHTML='<p>'+j+'</p>';
                  await sleep(200);
                  anim.animeblockup(i);
                  await sleep(1000);
              }
              else {
                  this.ajouter_etape('-l\'enregistrement n\'est pas le dernier');
                  this.ajouter_etape(' dans le block');
                  await sleep(500);
                  this.ajouter_etape('Donc suppression par decalage');
                  await sleep(500);
                  let s=j;
                  for (let l=j+taille;l<buf.derniercasevide;l++)
                  {
                      buf.tab[s]=buf.tab[l];
                      anim.animenreg(i,s,'#f10b2b');
                      anim.animenreg(i,l,'#43ee06');
                      document.getElementById('enreg'+(s+1)+'block'+(i+1)).innerHTML='<p>'+buf.tab[s]+'</p>';
                      await sleep(500);
                      s++;
                  }
                  this.clear_enregs_div(i,s,buf.derniercasevide-1);
                  buf.derniercasevide-=taille;
                  anim.animeblockup(i);
                  document.getElementById('casevide'+(i+1)).innerHTML='<p>'+buf.derniercasevide+'</p>';
              }
          }
      }
      else {
          anim.resetAlgo(8);
          anim.animealgo(7);
          await sleep(500);
      }

    }

};
var entetee =new EnteteTObVCb(-1,10);
var fichier=new TObVCb([],entetee,'test');
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
    let i=0;
    while ( verifier && i<tab.length){
        if (tab[i].length>=8){
            verifier=false
        }
        i++;
    }
    return verifier;
}
 function init() {
     let a =document.getElementById('initialiser-enrs').value.split(',');
     if (verif(a)) {
         document.getElementById('initialiser-form').style.display = 'none';
         document.getElementById('initialiser-alert').innerText = '';
         box_shown = 0;
         if (!initialiseee) {

             console.log(a);
             fichier.initialisation(a);
             initialiseee = true;
         } else {
             alertt(1, 'le fichier est deja initialise');
         }
     }else {
         alertt(1, 'les enregistrement ne doit pas depasser 7 caracteres');
     }

}
function insere() {
    // document.getElementById('inserer-form').style.display='none';
    let a=document.getElementById('inserer-cle').value;
    let s = document.getElementById('inserer-enr').value;
    document.getElementById('inserer-alert').innerText='';
    if ( a!='' && s.length<8) {
        hide_form_box(3);
        box_shown = 0;
        if (initialiseee) {


            fichier.insertion(a, s);
        } else {
            alertt(3,"Le fichier n'est pas initialise");
        }
    }
    else{
        if (s.length>=8){
            alertt(3,'l\'enregistrement est tres long')
        }
    }
}
function rech() {
    // document.getElementById('rechercher-form').style.display='none';
    let a=document.getElementById('rechercher-cle').value;
    document.getElementById('rechercher-alert').innerText='';
    if (a != '') {
        hide_form_box(2);
        box_shown = 0;
        if (initialiseee) {

            fichier.recherche(a, true);
        } else {
            alertt(2,"Le fichier n'est pas initialise");
        }
    }
}
function supp() {
    let s=document.getElementById('supprimer-cle').value;
    document.getElementById('supprimer-alert').innerText='';
    if (s != ''){
        hide_form_box(4);
        box_shown=0;
        if (initialiseee){


            fichier.suppression(s);
        }
        else {
            alertt(4,"Le fichier n'est pas initialise");
        }
    }


}

function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    document.getElementById('TObVCb').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>TObVCb</p>\n' +
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
        '                        Donc  TObVCb représente l\'organisation d\'un fichier vu comme tableau,non ordonné,\n' +

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






