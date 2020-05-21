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
//===========================================animation classe==========================================
function animations() {

}
animations.prototype={
    constructor:animations(),
    animeCase:function (nmrBlock,nmrCase,color,still=false) {
        let a=document.getElementById('block'+nmrBlock+'case'+(nmrCase));

        if (still){
            animation=anime({
                targets: a,
                background:color,
                duration: 100 * speed,
            })
        }else {
            animation=anime({
                targets: a,
                background: [{
                    value: color,
                    duration: 500 * speed,
                }
                    ,
                    {
                        value: '#fff',
                        duration: 100 * speed,
                    }
                ]
            })
        }
    },
    anime_border_left_case: function (nmrblock,nmrCase,borderColor,still=false) {
        let a=document.getElementById('block'+nmrblock+'case'+(nmrCase));
        console.log(a);
        if (still) {
            animation= anime({
                targets: a,
                borderLeft: '4px solid '+borderColor,
                duration:100*speed,
            });
        }
        else {
            animation= anime({
                targets: a,
                borderLeft:[
                    {
                    value:'4px solid '+borderColor,
                duration:500*speed,
                },
                    {
                        value: '2px solid black',
                        duration: 100*speed,
                    }
                ]
            });
        }
    },
    anime_border_right_case: function (nmrblock,nmrCase,borderColor,still=false) {
        let a=document.getElementById('block'+nmrblock+'case'+(nmrCase));
        if (still) {
            animation= anime({
                targets: a,
                borderRight: '4px solid '+borderColor,
                duration:100*speed,
            });
        }
        else {
            animation=anime({
                targets: a,
                borderRight:[
                    {
                        value: '4px solid '+borderColor,
                        duration:500*speed,
                    },
                    {
                        value: '2px solid black',
                        duration: 100*speed,
                    }
                ]
            });
        }
    },


    animeBlock:function (nmrBlock,borderColor,still=false) {
       if (still){
           animation= anime({
               targets:'#tf'+nmrBlock,
               border:'solid 3px '+borderColor,
               duration:100*speed,
           });
       }
       else {
           animation= anime({
               targets:'#tf'+nmrBlock,
               border:[{value:'solid 3px '+borderColor,
               duration:500*speed,
               },
                   {
                       value: 'solid 1px white',
                       duration: 100*speed,
                   }
               ]
           });
       }
    },
    animeBeforeAfter:function (pere,fils,freres=[]) {
        document.getElementById('tf'+fils).className+=' before';
        document.getElementById('tf'+pere).className+=' after';
        document.getElementById('block' + fils).className += ' before-top';
            for (let i=0;i<freres.length;i++) {
               document.getElementById('block' + freres[i]).className += ' before-top';

            }



    },
    annuleAnimeBeforeAfter:function (pere,fils) {
        let divbefore=document.getElementById('tf'+fils);
        let divafter=document.getElementById('tf'+pere);
        let divblockfils=document.getElementById('block'+fils);
        divblockfils.className=' ';
        divbefore.className='tf-nc';
        divafter.className='tf-nc';
    },
    animealgo:function(nmrLigne){
        animation=anime({
            targets:document.getElementById('l'+nmrLigne),
            backgroundColor:'#FF375F',
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

//============================================stucture classes===================================
function noueds(val=[],fils=[],degre=0,feuill=true,nextfeuille=undefined,pere=undefined) {
    this.val=val;
    this.fils=fils;
    this.degree=degre;
    this.feuille=feuill;
    this.nextfeuille=nextfeuille;
    this.pere=pere;
    // dscaxz
}
noueds.prototype={
  constructor: noueds(),

};

function bPlus_arbre(ordre=5) {
    this.tab=[new noueds()];

    this.ordre=ordre;
    this.racine=0;

}

bPlus_arbre.prototype={
    constructor:bPlus_arbre(),
    ajouter_algo_insere:function(){

      let algo=document.getElementById('algo');
      algo.innerHTML='<p id="l0">1- Rechercher le bloc feuille p devant contenir v</p>' +
          '<p id="l1">2- Si p n’est pas plein, insertion par décalages; goto 4</p>' +
          '<p id="l2">3- Sinon:</p>' +
          '<p id="l3">Si p est une feuille, alors Eclatement_Feuille :</p>' +
          // '<p>1ere moitié dans p ;\n</p>' +
          // '<p>2e moitié dans un nouveau bloc feuille q ;\n</p>' +
          '<p id="l4">v ← 1ere valeur de q;fd ← q;p ← pere(p); goto 2</p>' +
          '<p id="l5">Sinon, Eclatement non feuille (classique) :</p>' +
          // '<p>1ere moitié dans p ;\n</p>' +
          // '<p>dernière moitié dans un nouveau bloc interne q ;\n<p>' +
          '<p id="l6">v ← val_milieu; fd ← q ; p ← pere(p) ; goto 2</p>' +
          '<p id="l7">4- stop</p>';
    },
    ajouter_algo_supp:function(){
        let algo=document.getElementById('algo');
        algo.innerHTML='<p id="l0">Rechercher le bloc feuille p contenant v</p>' +
            '<p id="l1">Suppression de v par décalages internes dans p</p>' +
            '<p id="l2">TQ (p est sous-chargé OU p est la racine )</p>' +
            '<p id="l3">SI un des frères q de p peut donner une valeur,</p>' +
            // '<p>1ere moitié dans p ;\n</p>' +
            // '<p>2e moitié dans un nouveau bloc feuille q ;\n</p>' +
            '<p id="l4">&nbsp &nbsp Redistribution(p,q) ;</pid>' +
            '<p id="l5">Sinon,</p>' +
            // '<p>1ere moitié dans p ;\n</p>' +
            // '<p>dernière moitié dans un nouveau bloc interne q ;\n<p>' +
            '<p id="l6">&nbsp &nbsp Fusion(p,q) ;</p>' +
            '<p id="l7">&nbsp &nbsp Libérer(q) ; p ← pere(p) ;</p>'+

            '<p id="l8">&nbsp &nbsp Suppression de val qui séparait les 2 noeuds fusionnés</p>'+

            '<p id="l9">FTQ ; FIN</p>';
    },
    ajouter_algo_rech:function(){
        let algo=document.getElementById('algo');
        algo.innerHTML='<p id="l0">P = la racine</p>' +
            '<p id="l1">TQ( P n\'est pas une feuille )</p>' +
            '<p id="l2">&nbsp  &nbsp &nbspSI (v < Val1 ) i = 1</p>' +
            '<p id="l3"> &nbsp &nbsp  &nbsp   Sinon: TQ(1 < j < degré ET !stop ):  </p>' +

            '<p id="l4">&nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp SI ( Valj-1 ≤ v < Valj) i=j ; stop=vrai</p>' +
            '<p id="l5">&nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp Sinon : j++;</p>' +
            '<p id="l6">&nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp SI (!stop) i=degre;</p>' +

            '<p id="l7">&nbsp  &nbsp &nbsp P = P.fils[i]</p>' +
            '<p id="l8">FTQ;</p>'+
            '<p id="l9">Return P;FIN</p>'
        ;
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
    casevide:function(){
        let k=0;
        let stop=false;
        while (k<this.tab.length && !stop){
            if (this.tab[k]==undefined){
                stop=true;
            }
            else {
                k++;
            }
        }
        return k;
    },
    createNoued:function(placeDansTableau,feuille=false){
        let divnoued=document.createElement('li');
        divnoued.id='block'+placeDansTableau;
        let divtf=document.createElement('div');
        divtf.className="tf-nc ";
        divtf.id='tf'+placeDansTableau;
        divtf.style.padding=0;
        for (let i=0;i<this.ordre-1;i++){
            let divcase=document.createElement('div');
            divcase.className='val';
            divcase.id='block'+placeDansTableau+'case'+i;
            divtf.appendChild(divcase);
        }
        divnoued.appendChild(divtf);
        let fils=document.createElement('ul');
        fils.id='list'+placeDansTableau;

        // for (let i=0;i<this.ordre;i++){
        //     let divfils=document.createElement('li');
        //     divfils.className='vide';
        //     fils.appendChild(divfils);
        // }

        if (feuille){
            let divsvg=document.createElement('div');
            divsvg.id='svg'+placeDansTableau;
            divsvg.className='svg';
            divsvg.innerHTML='<svg><path d="M0 5 L20 5 L15 0 L20 5 L15 10 L20 5" stroke="red" stroke-width="2" opacity="1"></path></svg>';
            divnoued.appendChild(divsvg);
        }
        divnoued.appendChild(fils);

        return divnoued;
    },
    fillcase:function(nmrblock,nmrcase,val){
        if (val==undefined){val=''}
        document.getElementById('block'+nmrblock+'case'+nmrcase).innerText=val;
    },
    fillFils:function(nmrblock,nmrfils,blockfils){

        let listfils=document.getElementById('list'+nmrblock);
        let fils=document.getElementById('block'+blockfils);

        let fills=[];
        for(let i=0;i<listfils.childNodes.length;i++){
            fills[i]=listfils.childNodes[i];
        }
console.log(fills);

        // if (nmrfils<fills.length) {
        listfils.innerHTML='';
        let j=0;
            for (let i = 0; i <= this.ordre; i++) {
                if (i == nmrfils) {
                    if (fils != undefined) {

                            listfils.appendChild(fils);
                    }
                    else {
                        j++;
                    }
                    // else {
                    //         let li=document.createElement('li');
                    //         li.className='vide';
                    //         listfils.appendChild(li);
                    //
                    // }
                } else {
                    if (fills[j] != undefined) {

                        listfils.appendChild(fills[j]);
                        j++;
                    }
                    // else {
                    //     let li=document.createElement('li');
                    //     li.className='vide';
                    //     listfils.appendChild(li);
                    //
                    // }

                }
            }

        // else {
        //     if (fils != undefined) {
        //
        //         listfils.appendChild(fils);
        //     }
        //     else {
        //             let li=document.createElement('li');
        //             li.className='vide';
        //             listfils.appendChild(li);
        //     }
        // }
    },
    reset:function(){
      for (let i=0;i<this.tab.length;i++){
          let divblock=document.getElementById('block'+i);
          let divtf=document.getElementById('tf'+i);
          if (this.tab[i]!=undefined){
              console.log(i);
              divblock.className='';
              divtf.className='tf-nc';
              divtf.style.border='solid 1px black';
          }

      }
    },
    recherche:async function (val,avecalgo=false) {
        this.reset();
        if (avecalgo){
            this.ajouter_algo_rech();
        }

        let anim=new animations();
        let p=this.tab[this.racine];
        let indexp=this.racine;
        if (avecalgo){
            anim.resetAlgo(10);
            anim.animealgo(0);
            await sleep(500);
        }
        anim.animeBlock(indexp,'#2c28ff',true);
        await sleep(500);
        let trouv;
        while (!p.feuille){
            if (avecalgo){
                anim.resetAlgo(10);
                anim.animealgo(1);
                await sleep(500);
            }
          if (val<p.val[0]){
              if (avecalgo){
                  anim.resetAlgo(10);
                  anim.animealgo(2);
                  await sleep(500);
              }
              anim.animeCase(indexp,0,'#f10b2b');
              await sleep(500);
              anim.anime_border_left_case(indexp,0,'limegreen');
              await sleep(500);
              if (p.val.length>=2){
                  anim.animeBeforeAfter(indexp,p.fils[0],[p.fils[1]]);
              }
              else{
                  anim.animeBeforeAfter(indexp,p.fils[0]);
              }

              await sleep(500);
              indexp=p.fils[0];
              p=this.tab[p.fils[0]];
          }
          else{
              if (avecalgo){
                  anim.resetAlgo(10);
                  anim.animealgo(3);
                  await sleep(500);
              }
              anim.animeCase(indexp,0,'#f0f80a');
              await sleep(500);
                  let k=1;
                 trouv=false;
                 while ((k < p.val.length) && (!trouv)){
                     if ((p.val[k-1] <= val) && (val < p.val[k])){
                         if (avecalgo){
                             anim.resetAlgo(10);
                             anim.animealgo(4);
                             await sleep(500);
                         }
                         this.ajouter_etape('- '+p.val[k-1]+' < '+val+' < '+p.val[k]);
                         this.ajouter_etape('donc p = le '+(k+1)+'ieme fils');
                         anim.animeCase(indexp,k,'#f10b2b');
                         await sleep(500);
                          anim.anime_border_left_case(indexp,k,'limegreen');
                         anim.anime_border_right_case(indexp,k-1,'limegreen');
                         await sleep(500);
                         anim.animeBeforeAfter(indexp,p.fils[k]);
                         await sleep(500);
                         indexp=p.fils[k];
                         p=this.tab[p.fils[k]];
                         trouv=true;
                     }
                     else {
                         if (avecalgo){
                             anim.resetAlgo(10);
                             anim.animealgo(5);
                             await sleep(500);
                         }
                         anim.animeCase(indexp,k,'#f0f80a');
                         await sleep(500);
                         k++;
                     }
                 }
              if (!trouv){
                  if (avecalgo){
                      anim.resetAlgo(10);
                      anim.animealgo(6);
                      await sleep(500);
                  }

                  anim.animeCase(indexp,p.val.length-1,'#f0f80a');
                  await sleep(500);

                  anim.anime_border_right_case(indexp,p.val.length-1,'limegreen');
                  if (p.val.length!=4){ anim.anime_border_left_case(indexp,p.val.length,'limegreen');}
                  await sleep(500);
                  if (p.val.length==4){ anim.animeBeforeAfter(indexp,p.fils[p.val.length],[p.fils[p.val.length-1]]);}
                  else {anim.animeBeforeAfter(indexp,p.fils[p.val.length]);}
                  await sleep(500);
                  indexp=p.fils[p.val.length];
                  p=this.tab[p.fils[p.val.length]];
              }
          }
            if (avecalgo){
                anim.resetAlgo(10);
                anim.animealgo(7);
                await sleep(500);
            }
          anim.animeBlock(indexp,'#2c28ff',true);
            if (avecalgo){
                anim.resetAlgo(10);
                anim.animealgo(1);
                await sleep(500);
            }
        }
        if (avecalgo){
            anim.resetAlgo(10);
            anim.animealgo(8);
            await sleep(500);
        }
        this.ajouter_etape('- P est une feuille');
        this.ajouter_etape('donc la recherche est finie');
        if (avecalgo){
            anim.resetAlgo(10);
            anim.animealgo(9);
            await sleep(500);
        }
        return p;
    },
    create_path:function(){
      let svg=document.createElement('svg');
      svg.style.width='30';
      svg.style.height='20';
      // let path=document.createElement('path');
      // path.setAttribute('d',"M0 5 L30 5 L25 0 L30 5 L25 10 L30 5");
      // path.setAttribute('stroke',"red");
      //   path.setAttribute('stroke-width',"2");
      //   path.setAttribute('opacity',"1");
svg.innerHTML='<path d="M0 5 L20 5 L15 0 L20 5 L15 10 L20 5" stroke="red" stroke-width="2" opacity="1" />';

      return svg;

    },
    insertion:async function (valeur) {
        let val=valeur;
        let anim=new animations();
        this.ajouter_algo_insere();
        anim.resetAlgo(8);
        anim.animealgo(0);
        let p=await this.recherche(val);


        this.ajouter_etape('- Recherche('+val+')');
        await sleep(500);
        let indexp=this.tab.indexOf(p);


        let fd=null,i;
        let stop=false;
        let z,zd;

        while (!stop) {
            if (p.val.length != (this.ordre - 1)) {
                anim.resetAlgo(8);
                anim.animealgo(1);
                this.ajouter_etape('- le noueds n\'est pas plein');
                this.ajouter_etape('donc insertion par decalage');
                //insertion par decalage
                for (let k = 0; k < p.val.length; k++) {
                    if (val < p.val[k]) {
                        z = p.val[k];
                        zd = p.fils[k + 1];
                        p.val[k] = val;
                        this.fillcase(indexp, k, val);
                        await sleep(500);
                        if (!p.feuille) {
                            p.fils[k + 1] = fd;
                            anim.animeBlock(fd, 'yellow');
                            await sleep(200);
                            this.fillFils(indexp, k + 1, fd);
                            await sleep(500);
                        }
                        if (fd != null) {
                            this.tab[fd].pere = this.tab.indexOf(p);
                        }
                        fd = zd;
                        val = z;
                        console.log([fd,val]);
                    }
                }

                this.fillcase(indexp, p.val.length, val);
                await sleep(500);
                p.val[p.val.length] = val;
                console.log(val);
                if (!p.feuille) {
                    anim.animeBlock(fd, 'yellow');
                    await sleep(200);
                    this.fillFils(indexp, p.val.length, fd);
                    p.fils[p.val.length] = fd;
                    await sleep(500);
                }
                if (fd != null) {
                    this.tab[fd].pere = this.tab.indexOf(p);
                }
                stop = true;
            } else {//p.feuille
                anim.resetAlgo(8);
                anim.animealgo(2);
                this.ajouter_etape('- le noueds est plein');

                await sleep(500);
                if (p.feuille) {
                    anim.resetAlgo(8);
                    anim.animealgo(3);
                    this.ajouter_etape('donc eclatement feuille');
                    await sleep(500);
                    i = Math.floor(this.ordre / 2) - 1;
                    this.ajouter_etape('- allocation d\'un nouveau ');
                    this.ajouter_etape('noueds feuille q');
                    // this.ajouter_etape('');
                    await sleep(500);
                    let q = new noueds([], [], 0, p.feuille);
                    let r = this.casevide();
                    this.tab[r] = q;
                    let divQ = this.createNoued(r, true);
                    document.getElementById('invisible').appendChild(divQ);
                    q.nextfeuille = p.nextfeuille;
                    p.nextfeuille = r;
                    await sleep(1000);
                    // moitie
                    this.ajouter_etape('- 1ere moitie dans P');
                    await sleep(500);
                    for (let k = 0; k <= i; k++) {
                        if (val < p.val[k]) {
                            z = p.val[k];
                            zd = p.fils[k + 1];
                            p.val[k] = val;
                            this.fillcase(indexp, k, val);
                            await sleep(500);
                            // if (!p.feuille){
                            //     p.fils[k+1]=fd;
                            //     this.fillFils(indexp,k+1,fd);
                            //     await sleep(1000);
                            //     }
                            // // p.fils[k+1]=fd;
                            // // this.fillFils(indexp,k+1,fd);
                            // if (fd!=null) {
                            //     this.tab[fd].pere = this.tab.indexOf(p);
                            // }
                            fd = zd;
                            val = z;
                        }
                    }
                    this.ajouter_etape('- 2eme moitie dans q');
                    await sleep(500);
                    for (let k = 0; k < this.ordre - i - 2; k++) {
                        if (val < p.val[k + i + 1]) {
                            z = p.val[k + i + 1];
                            zd = p.fils[k + i + 2];
                            q.val[k] = val;
                            this.fillcase(r, k, val);
                            await sleep(500);
                            // if (!p.feuille) {
                            //     q.fils[k+1]=fd;
                            //     this.fillFils(r,k+1,fd);
                            //     await sleep(1000);
                            // }
                            // if (fd!=null) {
                            //     this.tab[fd].pere = this.tab.indexOf(q);
                            // }
                            fd = zd;
                            val = z;
                        } else {
                            anim.animeCase(this.tab.indexOf(q), k, '#43ee06');
                            anim.animeCase(indexp, k + i + 1, '#43ee06');
                            await sleep(200);
                            q.val[k] = p.val[k + i + 1];
                            this.fillcase(r, k, p.val[k + i + 1]);
                            await sleep(500);
                            // if (!p.feuille) {
                            //     q.fils[k+1]=p.fils[k+i+2];
                            //     this.fillFils(r,k+1,p.fils[k+i+2]);
                            //     await sleep(1000);
                            // }
                            // if (q.fils[k + 1]!=null) {
                            //     this.tab[q.fils[k + 1]].pere = this.tab.indexOf(q);
                            // }
                        }
                        p.val[k + i + 1] = undefined;
                        this.fillcase(indexp, k + i + 1, '');
                        await sleep(500);
                        // if (!p.feuille) {
                        //     p.fils[k+i+2]=undefined;
                        //     this.fillFils(indexp,k+i+2,'gg');
                        //     await sleep(1000);
                        // }
                    }
                    q.val[this.ordre - i - 2] = val;
                    this.fillcase(r, this.ordre - i - 2, val);
                    await sleep(500);
                    // if (!p.feuille) {
                    //     q.fils[this.ordre-i-1]=fd;
                    //     this.fillFils(r,this.ordre-i-1,fd);
                    //     await sleep(1000);
                    // }
                    for (let k = 0; k < this.ordre - i - 2; k++) {
                        p.val.pop();
                        p.fils.pop();
                    }
                    // a revoir
                    anim.resetAlgo(8);
                    anim.animealgo(4);
                    val = q.val[0];
                    this.ajouter_etape('- val= ' + val + '(1er valeur de q)');
                    await sleep(500);
                    anim.animeCase(r, 0, '#43ee06');
                    await sleep(1000);

                    fd = r;

                    if (p.pere != undefined) {
                        anim.animeBlock(indexp, 'limegreen');
                        indexp = p.pere;
                        this.ajouter_etape('- p = p.pere');
                        await sleep(500);
                        p = this.tab[p.pere];
                        console.log(p);
                    } else {
                        this.ajouter_etape('- allocation d\'une nouvel racine');
                        let y = this.casevide();
                        let j = new noueds([], [this.tab.indexOf(p)], 0, false);
                        let divracine = this.createNoued(y);
                        document.getElementById('invisible').appendChild(divracine);
                        await sleep(1000);
                        indexp = y;
                        this.fillFils(y, 0, this.tab.indexOf(p));
                        await sleep(1000);
                        this.tab[y] = j;
                        this.racine = y;
                        document.getElementById('list-0').innerHTML = '';
                        document.getElementById('list-0').appendChild(divracine);
                        await sleep(1000);
                        p.pere = y;
                        p = j;
                    }
                } else {
                    anim.resetAlgo(8);
                    anim.animealgo(5);
                    this.ajouter_etape('donc eclatement noueds');
                    await sleep(500);
                    let valmileu;
                    i = Math.floor(this.ordre / 2) - 1;
                    this.ajouter_etape('- allocation d\'un nouveau ');
                    this.ajouter_etape('noueds interne q');
                    await sleep(500);
                    let q = new noueds([], [], 0, p.feuille);
                    let r = this.casevide();
                    this.tab[r] = q;
                    let divQ = this.createNoued(r);
                    document.getElementById('invisible').appendChild(divQ);
                    await sleep(1000);
                    // moitie
                    this.ajouter_etape('- 1ere moitie dans P');
                    await sleep(500);
                    for (let k = 0; k <= i; k++) {
                        if (val < p.val[k]) {
                            z = p.val[k];
                            zd = p.fils[k + 1];
                            p.val[k] = val;
                            this.fillcase(indexp, k, val);
                            await sleep(500);
                            p.fils[k + 1] = fd;
                            anim.animeBlock(fd, 'yellow');
                            await sleep(200);
                            this.fillFils(indexp, k + 1, fd);
                            await sleep(1000);
                            // p.fils[k+1]=fd;
                            // this.fillFils(indexp,k+1,fd);
                            if (fd != null) {
                                this.tab[fd].pere = this.tab.indexOf(p);
                            }
                            fd = zd;
                            val = z;
                        }
                    }
                    this.ajouter_etape('- 2ere moitie dans q (sans ');
                    this.ajouter_etape('la valeur du milieu)');
                    await sleep(500);
                    for (let k = 0; k < this.ordre - i - 2; k++) {
                        if (val < p.val[k + i + 1]) {
                            z = p.val[k + i + 1];
                            zd = p.fils[k + i + 2];
                            if (k != 0) {
                                q.val[k - 1] = val;
                                this.fillcase(r, k - 1, val);
                                await sleep(500);
                                q.fils[k] = fd;
                                anim.animeBlock(fd, 'yellow');
                                await sleep(200);
                                this.fillFils(r, k, fd);
                                await sleep(1000);
                                if (fd != null) {
                                    this.tab[fd].pere = this.tab.indexOf(q);
                                }
                            } else {
                                valmileu = val;
                                q.fils[0] = fd;
                                anim.animeBlock(fd, 'yellow');
                                await sleep(200);
                                this.fillFils(r, 0, fd);
                                await sleep(1000);
                                if (fd != null) {
                                    this.tab[fd].pere = this.tab.indexOf(q);
                                }
                            }
                            // if (!p.feuille) {
                            //     q.fils[k+1]=fd;
                            //     this.fillFils(r,k+1,fd);
                            // }
                            // if (fd!=null) {
                            //     this.tab[fd].pere = this.tab.indexOf(q);
                            // }
                            fd = zd;
                            val = z;
                        } else {
                            if (k != 0) {
                                q.val[k - 1] = p.val[k + i + 1];
                                anim.animeCase(this.tab.indexOf(q), k - 1, '#43ee06');
                                anim.animeCase(indexp, k + i + 1, '#43ee06');
                                await sleep(200);
                                this.fillcase(r, k - 1, p.val[k + i + 1]);
                                await sleep(500);
                                q.fils[k] = p.fils[k + i + 2];

                                anim.animeBlock(p.fils[k + i + 2], 'yellow');
                                await sleep(200);
                                this.fillFils(r, k, p.fils[k + i + 2]);
                                await sleep(1000);
                                if (q.fils[k] != null) {
                                    this.tab[q.fils[k]].pere = this.tab.indexOf(q);
                                }
                            } else {
                                valmileu = p.val[k + i + 1];
                                q.fils[0] = p.fils[k + i + 2];
                                anim.animeBlock(p.fils[k + i + 2], 'yellow');
                                await sleep(200);
                                this.fillFils(r, 0, p.fils[k + i + 2]);

                                await sleep(1000);
                                if (q.fils[0] != null) {
                                    this.tab[q.fils[0]].pere = this.tab.indexOf(q);
                                }

                            }
                        }

                        p.val[k + i + 1] = undefined;
                        this.fillcase(indexp, k + i + 1, '');
                        await sleep(1000);
                        p.fils[k + i + 2] = undefined;
                        await sleep(1000);
                    }
                    q.val[this.ordre - i - 3] = val;
                    this.fillcase(r, this.ordre - i - 3, val);
                    await sleep(500);
                    q.fils[this.ordre - i - 2] = fd;
                    anim.animeBlock(fd, 'yellow');
                    await sleep(200);
                    this.fillFils(r, this.ordre - i - 2, fd);
                    if (fd != null) {
                        this.tab[fd].pere = this.tab.indexOf(q);
                    }
                    await sleep(1000);
                    for (let k = 0; k < this.ordre - i - 2; k++) {
                        p.val.pop();
                        p.fils.pop();
                    }
                    // a revoir
                    anim.resetAlgo(8);
                    anim.animealgo(6);
                    val = valmileu;
                    this.ajouter_etape('- val = valeur du milieu');
                    await sleep(500);
                    fd = r;

                    if (p.pere != undefined) {
                        anim.animeBlock(indexp, 'limegreen');
                        this.ajouter_etape('- p = p.pere');
                        await sleep(500);
                        indexp = p.pere;
                        p = this.tab[p.pere];

                    } else {
                        this.ajouter_etape('- allocation d\'une nouvel racine');
                        await sleep(500);
                        let y = this.casevide();
                        let j = new noueds([], [this.tab.indexOf(p)], 0, false);
                        let divracine = this.createNoued(y);
                        document.getElementById('invisible').appendChild(divracine);
                        await sleep(1000);
                        indexp = y;
                        anim.animeBlock(this.tab.indexOf(p), 'yellow');
                        await sleep(200);
                        this.fillFils(y, 0, this.tab.indexOf(p));
                        await sleep(1000);
                        this.tab[y] = j;
                        this.racine = y;
                        document.getElementById('list-0').innerHTML = '';
                        document.getElementById('list-0').appendChild(divracine);
                        await sleep(1000);
                        p.pere = y;
                        p = j;
                    }
                }
            }
        }
        anim.resetAlgo(8);
        anim.animealgo(7);
        await sleep(500);
        this.reset();
    },
    valeurFrereDisponible:function(p){
        let pere=this.tab[ p.pere];

        let indexP=this.tab.indexOf(p);
        let i=0,stop=false;
        let yes=false,k,result;
        while (i<=pere.val.length && !stop){
            if(pere.fils[i]==indexP){
                stop=true;
            }
            else {
                i++;
            }
        }

        let j1,j2;
        k=Math.floor(this.ordre/2);

        if (stop){
            j1=i-1;
            j2=i+1;
            console.log(j1,j2);
            if (  j1>=0 ) {
                if (this.tab[pere.fils[j1]].val.length> k) {
                    yes = true;
                    result = j1;
                }
            }
            if (!yes) {
                console.log(pere.val.length);
                if (  j2<=pere.val.length) {

                    if (this.tab[pere.fils[j2]].val.length> k) {
                        yes = true;
                        result = j2;
                    }
                }
                if (!yes) {
                    yes=false;
                    if (j2<=pere.val.length){
                        result=j2;
                    }
                    else {
                        result=j1;
                    }

                }
            }

        }else {
            console.log('err');
        }

        return [yes,pere.fils[result]];
    },
    redist:async function(p,q,feuille){
        let pere=this.tab[p.pere];
        let anim=new animations();
        let indexp=pere.fils.indexOf(this.tab.indexOf(p)),indexq=pere.fils.indexOf(this.tab.indexOf(q));
        if (indexq>indexp){
            let sep=pere.val[indexp];
            this.ajouter_etape(' -- sep = '+pere.val[indexp]);
            await sleep(500);
            if (feuille) {
                this.ajouter_etape('  -- la dernier valeur de P=la 1ere de q');
                await sleep(500);
                anim.animeCase(pere.fils[indexp],p.val.length,'#43ee06');
                anim.animeCase(pere.fils[indexq],0,'#43ee06' );
                await sleep(200);
                this.fillcase(pere.fils[indexp],p.val.length,q.val[0]);
                await sleep(1000);
                p.val[p.val.length] = q.val[0];

            }
            else {
                this.ajouter_etape('  -- la dernier val de P =sep ');
                await sleep(500);
                anim.animeCase(pere.fils[indexp],p.val.length,'#43ee06');
                anim.animeCase(p.pere,indexp,'#43ee06');
                await sleep(200);
                this.fillcase(pere.fils[indexp],p.val.length,sep);
                await sleep(1000);
                p.val[p.val.length] = sep;

            }
            this.ajouter_etape('  -- la valeur qui separe P');
            this.ajouter_etape('    et q =la 1ere val de q ');
            await sleep(500);
            anim.animeCase(p.pere,indexp,'#43ee06');
            anim.animeCase(pere.fils[indexq],0,'#43ee06');
            await sleep(200);
            pere.val[indexp]=q.val[0];
            this.fillcase(p.pere,indexp,q.val[0]);
            await sleep(1000);
            if (!feuille){
                this.ajouter_etape('  --le dernier fils de  ');
                this.ajouter_etape('    P = le 1er fils de q ');

                await sleep(500);
                p.fils[p.val.length]=q.fils[0];
                anim.animeBlock(q.fils[0],'#f0f80a');
                await sleep(200);
                this.fillFils(pere.fils[indexp],p.val.length,q.fils[0]);
                await sleep(1000);
                if (q.fils[0]!=null) {
                    this.tab[q.fils[0]].pere = this.tab.indexOf(p);
                }
            }

              this.ajouter_etape('  -- Decalage dans q vers la gauche');
                         await sleep(500);
            if (!feuille){
                q.fils[0]=q.fils[1];
                anim.animeBlock(q.fils[1],'#f0f80a');
                await sleep(200);
                this.fillFils(pere.fils[indexq],0,q.fils[1]);
                await sleep(1000);
                if (q.fils[1]!=null) {
                    this.tab[q.fils[1]].pere = this.tab.indexOf(q);
                }
            }


            for (let r=0; r<q.val.length-1;r++){
                anim.animeCase(pere.fils[indexq],r,'#43ee06');
                anim.animeCase(pere.fils[indexq],r+1,'#43ee06');
                await sleep(200);
                q.val[r]=q.val[r+1];
                this.fillcase(pere.fils[indexq],r,q.val[r+1]);
                await sleep(1000);
                if (!feuille){
                    q.fils[r+1]=q.fils[r+2];
                    anim.animeBlock(q.fils[r+2],'#f0f80a');
                    await sleep(200);
                    this.fillFils(pere.fils[indexq],r+1,q.fils[r+2]);
                    await sleep(1000);
                    if (q.fils[r+2]!=null) {
                        this.tab[q.fils[r+2]].pere = this.tab.indexOf(q);
                    }
                }

            }
            q.val.pop();
            this.fillcase(pere.fils[indexq],q.val.length,'');

        }
        else {
            let sep=pere.val[indexq];
            this.ajouter_etape(' -- sep = '+sep);
            await sleep(500);
            this.ajouter_etape(' -- Decalage dans P vers la droite');
            await sleep(500);
            for (let r=p.val.length-1; r>=0;r--){
                anim.animeCase(pere.fils[indexp],r+1,'#43ee06');
                anim.animeCase(pere.fils[indexp],r,'#43ee06');
                await sleep(200);
                p.val[r+1]=p.val[r];
                this.fillcase(pere.fils[indexp],r+1,p.val[r]);
                await sleep(1000);
                if (!feuille){
                    p.fils[r+2]=p.fils[r+1];
                    anim.animeBlock(q.fils[r+1],'#f0f80a');
                    await sleep(200);
                    this.fillFils(pere.fils[indexp],r+2,p.fils[r+1]);
                    await sleep(1000);
                    if (p.fils[r+1]!=null) {
                        this.tab[p.fils[r+1]].pere = this.tab.indexOf(p);
                    }
                }

            }
            if (!feuille){
                p.fils[1]=p.fils[0];
                anim.animeBlock(p.fils[0],'#f0f80a');
                await sleep(200);
                this.fillFils(pere.fils[indexp],1,p.fils[0]);
                await sleep(1000);
                if (p.fils[0]!=null) {
                    this.tab[p.fils[0]].pere = this.tab.indexOf(p);
                }
            }

            if (feuille){
                this.ajouter_etape(' -- la 1ere val de P = la');
                this.ajouter_etape('    derniere val de q');

                await sleep(500);
                anim.animeCase(pere.fils[indexp],0,'#43ee06');
                anim.animeCase(pere.fils[indexq],q.val.length-1,'#43ee06');
                await sleep(200);
                this.fillcase(pere.fils[indexp],0,q.val[q.val.length-1]);
                await sleep(1000);
                p.val[0] = q.val[q.val.length-1];
            }
            else {
                this.ajouter_etape(' -- la 1ere val de P = sep ');
                await sleep(500);
                anim.animeCase(pere.fils[indexp],0,'#43ee06');
                anim.animeCase(p.pere,indexq,'#43ee06');
                await sleep(200);
                p.val[0] = sep;
                this.fillcase(pere.fils[indexp],0,sep);
                await sleep(1000);
            }
            this.ajouter_etape('  -- la valeur qui separe P');
            this.ajouter_etape('    et q =la derniere val de q ');
            await sleep(500);
            anim.animeCase(pere.fils[indexq],q.val.length-1,'#43ee06');
            anim.animeCase(p.pere,indexq,'#43ee06');
            await sleep(200);
            pere.val[indexq]=q.val[q.val.length-1];
            this.fillcase(p.pere,indexq,q.val[q.val.length-1]);
            await sleep(1000);
            if (!feuille){
                this.ajouter_etape('  -- le 1er fils de P = le ');
                this.ajouter_etape('    dernier fils de q');
                await sleep(500);
                p.fils[0]=q.fils[q.val.length];
                anim.animeBlock(q.fils[q.val.length],'#f0f80a');
                await sleep(200);
                this.fillFils(pere.fils[indexp],0,q.fils[q.val.length]);
                await sleep(1000);
                if (q.fils[q.val.length]!=null) {
                    this.tab[q.fils[q.val.length]].pere = this.tab.indexOf(p);
                }
            }

            q.val.pop();
            this.fillcase(pere.fils[indexq],q.val.length,'');
            //


        }
    },

    fusion:async function(p,q,feuille){
        let anim=new animations();
        let pere=this.tab[p.pere];
        let indexp=pere.fils.indexOf(this.tab.indexOf(p)),indexq=pere.fils.indexOf(this.tab.indexOf(q));
        let sep=pere.val[Math.min(indexp,indexq)];
        this.ajouter_etape('  -- sep = '+sep);
        await sleep(500);
        let x=this.tab[pere.fils[Math.min(indexp,indexq)]],y=this.tab[pere.fils[Math.max(indexp,indexq)]];
        if (!feuille) {
            this.ajouter_etape('  -- la dernier val = '+sep);
            await sleep(500);
            anim.animeCase(this.tab.indexOf(x),x.val.length,'#43ee06');
            anim.animeCase(p.pere,Math.min(indexp,indexq),'#43ee06');
            await sleep(200);
            this.fillcase(this.tab.indexOf(x),x.val.length,sep);
            await sleep(1000);
            x.val[x.val.length]=sep;
        }
        this.ajouter_etape('  -- Deplacement des valeurs ');
        await sleep(500);
        for (let i=0;i<y.val.length;i++){
            anim.animeCase(this.tab.indexOf(x),x.val.length,'#43ee06');
            anim.animeCase(this.tab.indexOf(y),i,'#43ee06');
            await sleep(200);
            this.fillcase(this.tab.indexOf(x),x.val.length,y.val[i]);
            await sleep(1000);
            x.val[x.val.length]=y.val[i];
            if (!feuille){
                anim.animeBlock(y.fils[i],'yellow');
                await sleep(200);
                this.fillFils(this.tab.indexOf(x),x.val.length-1,y.fils[i]);
                await sleep(1000);
                x.fils[x.val.length-1]=y.fils[i];
                if (y.fils[i]!=null) {
                    this.tab[y.fils[i]].pere = this.tab.indexOf(x);
                }
            }


        }
        if (!feuille){
            anim.animeBlock(y.fils[y.val.length],'yellow');
            await sleep(200);
            this.fillFils(this.tab.indexOf(x),x.val.length,y.fils[y.val.length]);
            await sleep(1000);
            x.fils[x.val.length]=y.fils[y.val.length];
            if (y.fils[y.val.length]!=null) {
                this.tab[y.fils[y.val.length]].pere = this.tab.indexOf(x);
            }
        }


    },
    
    supperession:async function (val) {
        let anim=new animations();
        this.ajouter_algo_supp();
        anim.resetAlgo(10);
        anim.animealgo(0);
        await sleep(500);
        let p=await this.recherche(val);
        this.clear_etapes();
        this.ajouter_etape('- Recherche('+val+')');
        await sleep(500);
        let indexP=this.tab.indexOf(p);
        let supprime=false;

        //supp par decalage
        anim.resetAlgo(10);
        anim.animealgo(1);
        await sleep(500);
        for (let j=0;j<p.val.length;j++){
            if ((p.val[j]==val) || (supprime)){
                p.val[j]=p.val[j+1];
                anim.animeCase(indexP,j,'#f10b2b');
                anim.animeCase(indexP,j+1,'#43ee06');
                await sleep(200);
                this.fillcase(indexP,j,p.val[j+1]);
                await sleep(1000);
                supprime=true;
            }
        }
        if (supprime){
            p.val.pop();
        }

        //fin

        let i=Math.floor(this.ordre/2);

        while ( p.val.length < i && p.pere!=undefined){
            anim.resetAlgo(10);
            anim.animealgo(2);
            await sleep(500);

            anim.resetAlgo(10);
            anim.animealgo(3);
            await sleep(500);

            let a=this.valeurFrereDisponible(p);
            if (a[0]){
                anim.resetAlgo(10);
                anim.animealgo(4);
                await sleep(500);
                    await this.redist(p, this.tab[a[1]],p.feuille);

            }
            else {
                anim.resetAlgo(10);
                anim.animealgo(5);
                await sleep(500);

                anim.animealgo(6);
                await sleep(500);
                await this.fusion(p,this.tab[a[1]],p.feuille);

                let pere=this.tab[p.pere];
                let max=Math.min(pere.fils.indexOf(indexP),pere.fils.indexOf(a[1]));
                let v=pere.val[Math.min(pere.fils.indexOf(indexP),pere.fils.indexOf(a[1]))];
                this.ajouter_etape('- Supperession de la valeur qui ');
                this.ajouter_etape('  separe P et q et son fils droit ');
                anim.resetAlgo(10);
                anim.animealgo(7);
                await sleep(500);
                await sleep(500);
                this.tab[pere.fils[max+1]]=undefined;
                pere.fils[max+1]=undefined;
                this.fillFils(p.pere,max+1,'gg');
                await sleep(1000);
                p=pere;
                indexP=this.tab.indexOf(p);
                supprime=false;
                anim.resetAlgo(10);
                anim.animealgo(8);
                await sleep(500);

                for (let j=0;j<p.val.length;j++){
                    if ((p.val[j]==v) || (supprime)){
                        p.val[j]=p.val[j+1];
                        anim.animeCase(indexP,j,'#f10b2b');
                        anim.animeCase(indexP,j+1,'#43ee06');
                        await sleep(200);
                        this.fillcase(indexP,j,p.val[j+1]);
                        await sleep(1000);
                        p.fils[j+1]=p.fils[j+2];
                        anim.animeBlock(p.fils[j+2],'yellow');
                        await sleep(200);
                        this.fillFils(indexP,j+1,p.fils[j+2]);
                        await sleep(1000);
                        supprime=true;
                    }
                }
                if (supprime){
                    p.val.pop();
                }
                if (p.val.length==0){
                    let fils0=document.getElementById('block'+p.fils[0]);
                    document.getElementById('list-0').innerHTML='';
                    document.getElementById('list-0').appendChild(fils0);
                    let f0=p.fils[0];
                    console.log('la racine a supprimer'+this.racine);
                    this.tab[this.racine]=undefined;
                    this.racine=f0;
                    this.tab[f0].pere=undefined;

                }

            }
            anim.resetAlgo(10);
            anim.animealgo(2);
            await sleep(500);
        }
        anim.resetAlgo(10);
        anim.animealgo(9);
        await sleep(500);
    }
};

let fich=new bPlus_arbre(5);
let i=fich.createNoued(0,true);
document.getElementById('list-0').appendChild(i);


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

    if (!initialiseee) {
        let tab = document.getElementById('initialiser-cles').value.split(',');
        if (verif(tab)) {
            let initialise = 0;
            initialise = 0;
            document.getElementById('initialiser-form').style.display='none';
            box_shown=0;
            while (initialise < tab.length) {
                let enreg = parseInt(tab[initialise]);
                await fich.insertion(enreg);
                initialise++;
            }
            initialiseee = true;
        }
        else {
            alertt(1,'l\'un des clés n\'est pas un nombre');
        }
    }
    else {
        alertt(1,"Le fichier est déja initialisé");
    }
}
async function insere() {
    let a = document.getElementById('inserer-cle').value;
    if (a!='') {
        if (initialiseee) {
            document.getElementById('inserer-form').style.display = 'none';
            box_shown = 0;

            a = parseInt(a);
            await fich.insertion(a);

        } else {
            alertt(3, "Le fichier n'est pas initialisé");
        }
    }

}
async function rech() {
    let a=document.getElementById('rechercher-cle').value;
    if (a!='') {
        if (initialiseee) {
            document.getElementById('rechercher-form').style.display = 'none';
            box_shown = 0;
            a = parseInt(a);
            await fich.recherche(a, true);
        } else {
            alertt(2, "Le fichier n'est pas initialisé");
        }
    }
}
async function supp() {
    let s=document.getElementById('supprimer-cle').value;
    if (s!='') {
        if (initialiseee) {

            document.getElementById('supprimer-form').style.display = 'none';
            box_shown = 0;
            s = parseInt(s);
            await fich.supperession(s);
        } else {
            alertt(4, "Le fichier n'est pas initialisé");
        }
    }
}


function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    document.getElementById('bPlusArbre').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>B+ arbres</p>\n' +
        '                        </div>\n' +
        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Information sur la structure:</h3>\n' +
        '                        les arbre B + sont des arbre B mais avec des caractéristiques speciales:' +
        '                        <br>\n' +
        '                        - Les feuilles sont chaînées entre elles et contiennent toutes les valeurs de l’arbre' +
        '                        <br>\n' +
        '                       - Les noeuds internes forment un index non dense sur le niveau feuille.' +
        '                        <br>\n' +
        '                        - Les clés dans les noeuds internes peuvent éventuellement être fictives.\n' +
        '                        <br>\n' +
        '                        - Le rôle des noeuds internes est uniquement de guider la recherche vers le bon\n' +

        '                        <br>\n' +
        '                        noeud feuille\n' +
        '                        <br>\n' +
        '                        - Les valeurs (ou clés) dans les noeuds internes sont appelées ‘séparateurs’\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            - L\'arbre est d\'ordre 5 \n' +
        '                            <br>\n' +
        '                            - Les noueds avec des flêches rouge sont des feuilles\n' +
        '                            <br>\n' +
        '                            - Chaque noueds non feuille a 5 fils (seuls les fils remplis sont affichés) \n' +

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








