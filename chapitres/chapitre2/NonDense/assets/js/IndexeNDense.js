var animation=anime({});
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




//==========================================================classe animations========================
function animations() {

}
animations.prototype={
    constructor:animations(),
    animeblockdown:function (nmrdublock) {
        anime({
            targets:document.getElementById('block'+(nmrdublock+1)),
            translateY:100,
            translateX:0,
            duration:1000*speed,
            easing:'linear'
        });
    },
    animeblockdownindexe:function (nmrdublock) {
        anime({
            targets:document.getElementById('blockIndexe'+(nmrdublock+1)),
            translateY:100,
            translateX:0,
            duration:1000*speed,
            easing:'linear'
        });
    },
    animeblockup:function (nmrdublock) {
        anime({
            targets:document.getElementById('block'+(nmrdublock+1)),
            translateY:0,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },
    animeblockupindexe:function (nmrdublock) {
        anime({
            targets:document.getElementById('blockIndexe'+(nmrdublock+1)),
            translateY:20,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },
    animereplaceblock:function(nmrdublockARemplacer,nmrDuBlockRemplacent){
        let remplacent=document.getElementById('block'+(nmrDuBlockRemplacent+1));
        anime({
            targets:remplacent,
            translateY:[{value:200,duration:500},
                {value: 20,duration: 500}
            ],
            translateX:[{value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500},
                {value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500}
            ]

        });
    },
    animereplaceblockindexe:function(nmrdublockARemplacer,nmrDuBlockRemplacent){
        let remplacent=document.getElementById('blockIndexe'+(nmrDuBlockRemplacent+1));
        anime({
            targets:remplacent,
            translateY:[{value:200,duration:500},
                {value: 20,duration: 500}
            ],
            translateX:[{value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500},
                {value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500}
            ]

        });
    },
    animereplacenreg:function(nmrdenregARemplacer,nmrDenregRemplacent){
        let remplacent=document.getElementById('enreg'+(nmrEnreg+1)+'block'+(nmrDuBlock+1));
        anime({
            targets:remplacent,
            translateY:[{value:200,duration:500},
                {value: 20,duration: 500}
            ],
            translateX:[{value:(270*(nmrdenregARemplacer-nmrDenregRemplacent)),duration:500},
                {value:(270*(nmrdenregARemplacer-nmrDenregRemplacent)),duration:500}
            ]

        });
    },
    animereplacenregindexe:function(nmrdenregARemplacer,nmrDenregRemplacent){
        let remplacent=document.getElementById('indexe'+(nmrEnreg+1)+'blockIndexe'+(nmrDuBlock+1));
        anime({
            targets:remplacent,
            translateY:[{value:200,duration:500},
                {value: 20,duration: 500}
            ],
            translateX:[{value:(270*(nmrdenregARemplacer-nmrDenregRemplacent)),duration:500},
                {value:(270*(nmrdenregARemplacer-nmrDenregRemplacent)),duration:500}
            ]

        });
    },
    animenreg:function (nmrDuBlock,nmrEnreg,color) {
        let a=document.getElementById('enreg'+(nmrEnreg+1)+'block'+(nmrDuBlock+1));
        anime({
            targets:a,
            // width:[{value:21 ,duration:500},
            //     {value: 20}
            // ],
            // height:[{value:21,duration:500},
            //     {value: 20}],
            backgroundColor:[{value:color,
                duration:500*speed,},
                {
                    value: '#ffffff'
                }]
        })

    },
    animenregindexe:function (nmrDuBlock,nmrEnreg,color) {
        let a=document.getElementById('indexe'+(nmrEnreg+1)+'blockIndexe'+(nmrDuBlock+1));
        anime({
            targets:a,
            // width:[{value:21 ,duration:500},
            //     {value: 20}
            // ],
            // height:[{value:21,duration:500},
            //     {value: 20}],
            backgroundColor:[{value:color,
                duration:500*speed,},
                {
                    value: '#ffffff'
                }]
        })

    },
    animenregcolor:function (nmrDuBlock,nmrEnreg,color) {
        let a=document.getElementById('enreg'+(nmrEnreg+1)+'block'+(nmrDuBlock+1));
        anime({
            targets:a,
            backgroundColor :color
        })

    },
    anime_border_enreg:function (nmrBlock,nmrEnreg,borderColor) {
        anime({
            targets:'enreg'+(nmrEnreg+1)+'block'+(nmrBlock+1),
            borderTopColor:borderColor,
        });
    }
};

//==========================ENTETE===============================================
class EnteteTof {
    constructor(nbBloc,tailleMax){
        this.nbBloc=nbBloc;
        this.tailleMax= tailleMax;
    }
    Aff_Entete(i,val){
        if (i==1){
            this.nbBloc= val;
        }
        if (i==2){
            this.tailleMax=val;
        }
    }
    entetet(i){
        if(i==1){
            return this.nbBloc;
        }
        if(i==2){
            return this.tailleMax;
        }
    }
}

//==========================Structure de l'enregistrement=============================================
class EnregTof{

    constructor(cle, efface){
        this.cle=cle;
        this.efface=efface;
    }

}

//=======================================Structure de Tcouple======================================


//================================================Structure du Bloc:===================================
class Bloc{

    constructor(tabreg,nb){
        this.tabreg=tabreg;
        this.nb=nb;
    }

    affNB(val){
        this.nb=val;
    }

}

//===========================================Structure Fichier:===========================================
class FichierTof{

    constructor(tBloc,entete){
        this.tBloc=tBloc;
        this.entete=entete;
    }
    lireDir(i){
        return this.tBloc[i];
    }
    EcrireDir(i,buff){
        this.tBloc[i]=buff;
    }
    alloc_bloc(x) {
        let divfichier=document.getElementById('TOF');
        let divblock=document.createElement('div');
        divblock.id='block'+(x+1);
        divblock.className='Tblock';
        divfichier.appendChild(divblock);
        for (let i=1;i<=this.entete.entetet(2);i++){
            let divenreg=document.createElement('div');
            divenreg.id='enreg'+i+'block'+(x+1);
            divenreg.className='Tenreg';
            divblock.appendChild(divenreg);
        }
        let divtaille=document.createElement('div');
        divtaille.className='casevide';
        divtaille.id='casevide'+(x+1);
        divtaille.innerHTML='<P>0</p>';
        divblock.appendChild(divtaille);
        return this.entete.entetet(1)+1;
    }

    async Initialisation (nbreenreg,tauxChargement){
        let i,j,k;
        let enreg;
        let buf= new BlocTof([],0);
        i=j=0;
        let t=0;
        this.alloc_bloc(0);
        //alert('Donnez les enregistrements en ordre croissant suivant la clé:');
        for(k=0; k< nbreenreg;k++){
            //enreg= prompt('enregistrement:'+ (k+1) );
              enreg= t*t+5*t+2;
              t++;
            let e= new EnregTof(enreg,0);
            if (j<(this.entete.entetet(2))*tauxChargement){
                buf.tabreg[j]=new EnregTof(enreg,0);
                document.getElementById('enreg'+(j+1)+'block'+(i+1)).innerHTML='<p>'+enreg+'</p>';

                j++;

            }
            else{

                buf.affNB(j);
                this.EcrireDir(i,buf);
                buf=new BlocTof([],0);
                buf.tabreg[0]=new EnregTof(enreg,0);
                i++;
                this.alloc_bloc(i);
                document.getElementById('enreg'+(1)+'block'+(i+1)).innerHTML='<p>'+enreg+'</p>';

                j=1;
            }

        }

        buf.affNB(j);
        this.EcrireDir(i,buf);
        this.entete.Aff_Entete(1,i+1);

    }
    async Recherche (c){

 let trouv,stop,bi, bs, i,j ,sup=0, inf=0;
 let buf ;
 let enreg;
 let anime= new animations();
 //buf.tabreg[j]=new EnregTof(enreg,0);
 bs=this.entete.entetet(1)-1;
 let k=0;
       i=0;
        bi=j=0;
 trouv=false;
        stop= false;

 while((bi<=bs)&&(!stop)&&(!trouv)){
     i=Math.floor((bi+bs)/2);
     buf= this.lireDir(i);
     anime.animeblockdown(i);
     await sleep(1500);
     k = buf.nb;
     if((c>= buf.tabreg[0].cle)&&(c<=buf.tabreg[k-1].cle)){
         inf=0;
         sup=k-1;
         while((inf<=sup)&&(!trouv)){
             if((inf+sup)%2==0){
                 j= Math.floor((inf+sup)/2);
             }
             if((inf+sup)%2!=0){
                 j= Math.floor(((inf+sup)+1)/2);
             }

             if(c==buf.tabreg[j].cle){
                 trouv=true;
                 anime.animenreg(i,j,'#009900');
                 await sleep(500);

             }
             else{
                 if(c < buf.tabreg[j].cle){
                     sup=j-1;
                     anime.animenreg(i,j,'#597caa');
                     await sleep(1000);

                 }
                 if(c>buf.tabreg[j].cle){
                     anime.animenreg(i,j,'#597caa');
                     await sleep(1000);
                     inf=j+1;
                 }
             }
         }
         if(!trouv){
             j=inf;
             trouv=false;
         }
         stop=true;
     }
     else {
         if (c < buf.tabreg[0].cle) {
             anime.animeblockup(i);
             await  sleep(500);
             bs=i-1 ;
         }
         else{
             anime.animeblockup(i);
             await sleep(500);
             bi=i+1 ;
         }
     }
 }
 anime.animeblockup(i);
 if(!trouv) {
     i = bi;
 }
console.log(i);
 console.log(j);
 console.log(trouv);

 return [i,j,trouv];
    }
    async supression(c){
        let anime=new animations();
        let trouv,i,j,a;
        let buf = new BlocTof([],0);
        a= await  this.Recherche(c);


        i= a[0];
        j=a[1];
        trouv=a[2];
         //trouv=true;

        if(trouv=true){
            buf=this.lireDir(i);
            anime.animeblockdown(i);
            await sleep(1200);
            buf.tabreg[j].efface=1;
            this.EcrireDir(i,buf);
            anime.animenregcolor(i,j,'#ff0033');
            await sleep(700);
            anime.animeblockup(i);
            await sleep(1000)


        }
    }
    async Insertion(enreg){
        let e= new EnregTof(enreg,0);
        let anime=new animations();
        let k;
        let en,x,buf;
        buf= new BlocTof([],0);
        let a=0;
         a= await this.Recherche(e.cle);
        let trouv= a[2];
        let i= a[0];
        let j=a[1];
        if(trouv==false){
            let continu= true;
            while ((continu==true )&&(i<this.entete.entetet(1))){
                 buf= this.lireDir(i);
                 anime.animeblockdown(i);
                 await sleep(1000);
                x=buf.tabreg[(buf.nb)-1];
                k=(buf.nb)-1;
                while (k > j){
                    buf.tabreg[k]=buf.tabreg[k-1];
                    k=k-1;
                }
                buf.tabreg[j]=e;
                if (buf.nb < this.entete.entetet(2)){
                    buf.nb= (buf.nb)+1;
                    buf.tabreg[(buf.nb)-1]=x;
                    this.EcrireDir(i,buf);
                    anime.animereplaceblock(i,buf);
                    continu= false;
                }
                else{
                    this.EcrireDir(i,buf);
                    anime.animereplaceblock(i,buf);
                    i++;
                    j=0;
                    e=x;
                }
            }
            if(i>=this.entete.entetet(1)){
                buf= new BlocTof([],0);
                this.alloc_bloc(i);
                buf.tabreg[0]=e;
                buf.nb=1;

                this.EcrireDir(i,buf);
                anime.animereplaceblock(i,buf);

                this.entete.Aff_Entete(1,i);
            }

        }
    }
}
//====================================Fichier Indexe====================================================
class IndexeNDense {

    constructor(f1, tabIndexe, nbI,tab) {
        this.f1 = f1;
        this.tabIndex = tabIndexe;
        this.nbI = nbI;

    }
    alloc_bloc(x) {
        let divfichier=document.getElementById('IndexeNDense');
        let divblock=document.createElement('div');
        divblock.id='block'+(x+1);
        divblock.className='Tblock';
        divfichier.appendChild(divblock);
        for (let i=1;i<=f1.entete.entetet(2);i++){
            let divenreg=document.createElement('div');
            divenreg.id='enreg'+i+'block'+(x+1);
            divenreg.className='Tenreg';
            divblock.appendChild(divenreg);
        }
        let divtaille=document.createElement('div');
        divtaille.className='casevide';
        divtaille.id='casevide'+(x+1);
        divtaille.innerHTML='<P>0</p>';
        divblock.appendChild(divtaille);
        return f1.entete.entetet(1)+1;
    }
    alloc_Indexe(x,t){
        let divfichier=document.getElementById('IndexeNDense');
        let divblock=document.createElement('div');
        divblock.id='blockIndexe'+(x+1);
        divblock.className='Tabindexe';
        divfichier.appendChild(divblock);
        for (let i=1;i<=t;i++){
            let divenreg=document.createElement('div');
            divenreg.id='indexe'+i+'blockIndexe'+(x+1);
            divenreg.className='Tindexe';
            divblock.appendChild(divenreg);
        }
        let divtaille=document.createElement('div');
        divtaille.className='casevide';
        divtaille.id='casevide'+(x+1);
        divtaille.innerHTML='<P>0</p>';
        divblock.appendChild(divtaille);
        //return f1.entete.entetet(1)+1;

    }
    addcaseindex(i){
        let divfichier=document.getElementById('blockIndexe1');
        let divblock=document.createElement('div');
        divblock.id='indexe'+i+'blockIndexe1';
        divblock.className='Tindexe';
        divfichier.appendChild(divblock);
    }
    deselect_ligne(num){
        document.getElementById('l' + num).style.backgroundColor = "#fff";
        document.getElementById('l' + num).style.color = "#000";
    }
    select_ligne(num){
        document.getElementById('l' + num).style.backgroundColor = "#0081E2";
        document.getElementById('l' + num).style.color = "#fff";
    }
    add_algo(num, inf){
        let a = document.getElementById('algo');
        a.innerHTML = a.innerHTML + '<p id="l' + num + '">' + inf + '</p>';
    }
    edit_algo(num, inf, color){
        document.getElementById('l' + num).innerHTML = inf;
        document.getElementById('l' + num).style.color = color;
    }

    vider_algo(){
        document.getElementById('algo').innerHTML = "";
    }
        async InitialisationIndexe(n, taux) {
        this.vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">InitialisationIndexe(nb_enrg, taux)</p>' +
            '<p id="l1"> </p>';

        this.add_algo(2, "Pour(k varie de 0 vers le nombre d'enregestrement)");
        this.add_algo(3, " Si(j < taille_max*taux)");
        this.add_algo(4, " buff.tab_enrg[j] = enregistrement(t*t+5*t+2, faux)");
        this.add_algo(5, " j++");
        this.add_algo(5, " Fsi");
        this.add_algo(6, "Sinon");
        this.add_algo(7, "     this.tabIndex[m]=buf1.tabreg[j-1].cle;\n" +
            "                            this.nbI++;\n" +
            "                            buf1.nb = j ;\n" +
            "                            m++;");
        this.add_algo(8, " ecritrDir(buff, i)");
        this.add_algo(9, " buf1.tabreg[0] = e;");
        this.add_algo(9, " FSINON");
        this.add_algo(10, " j = 1");
        this.add_algo(10, "FPour");

         let anime= new animations();
        let  j, m;
        let k=0;
        let l = 1;
        let enreg;
        let i=0;
        let buf1 = new Bloc([],0) ;
        m=0;
        this.alloc_Indexe(0,4);
        //     this.alloc_Indexe(0,3);
        //     document.getElementById('indexe'+(1)+'blockIndexe'+(1)).innerHTML='<p>'+322+'</p>';
        //     await sleep(500);
        //     document.getElementById('indexe'+(2)+'blockIndexe'+(1)).innerHTML='<p>'+1282+'</p>';
        //     await sleep(500);
        //     document.getElementById('indexe'+(3)+'blockIndexe'+(1)).innerHTML='<p>'+1447+'</p>';
            await sleep(500);
            this.alloc_bloc(0);
            await sleep(500);
        i = 0;
        j=0;
        this.nbI =0;
        this.select_ligne(2);
        await sleep(500);
        this.deselect_ligne(2);
        for (k = 0; k < n; k++) {
            enreg = l * 5 * l + 2;
            l++;
            let e = new EnregTof(enreg, 0);
            let t = f1.entete.entetet(2);
            if (j < (taux * t)) {
                this.select_ligne(3);
                await sleep(500);
                this.deselect_ligne(3);

                buf1.tabreg[j] =e;
                this.select_ligne(4);
                await sleep(500);

                anime.animenreg(i,j,'#225522');
                await sleep(600);
                document.getElementById('enreg'+(j+1)+'block'+(i+1)).innerHTML='<p>'+enreg+'</p>';
                this.deselect_ligne(4);
                j++;
            this.select_ligne(5);
            await sleep(500);
            this.deselect_ligne(5);

            }
              else {
                  this.select_ligne(6);
                  await sleep(500);
                  this.deselect_ligne(6);
                this.select_ligne(7);
                await sleep(500);
                this.deselect_ligne(7);
                this.tabIndex[m]=buf1.tabreg[j-1].cle;
                document.getElementById('indexe'+(m+1)+'blockIndexe1').innerHTML='<p>'+this.tabIndex[m]+'</p>';
                await sleep(500);
                this.nbI++;
                buf1.nb = j ;
                m++;
                this.select_ligne(8);
                await sleep(500);

                f1.EcrireDir(i, buf1);
                buf1=new Bloc([],0);
                i++;
               this.alloc_bloc(i);
                this.deselect_ligne(8);
                buf1.tabreg[0] = e;
                this.select_ligne(9);
                await sleep(500);
                anime.animenreg(i,0,'#225522');
                await sleep(600);
                document.getElementById('enreg'+(1)+'block'+(i+1)).innerHTML='<p>'+e.cle+'</p>';
                this.deselect_ligne(9);
                j = 1;
                this.select_ligne(10);
                await sleep(500);
                this.deselect_ligne(10);
              }
        }
       this.vider_algo();
            // this.alloc_Indexe(0,3);
            // document.getElementById('indexe'+(1)+'blockIndexe'+(1)).innerHTML='<p>'+322+'</p>';
            // await sleep(500);
            // document.getElementById('indexe'+(2)+'blockIndexe'+(1)).innerHTML='<p>'+1282+'</p>';
            // await sleep(500);
            // document.getElementById('indexe'+(3)+'blockIndexe'+(1)).innerHTML='<p>'+1447+'</p>';
        this.add_algo(12,"this.nbI++ ;\n" +
            "        this.tabIndex[ m]= buf1.tab[j-1].cle;");
        this.add_algo(13, "Ecrire(buf,i)");
        this.add_algo(14,"Aff_Entete(1,i+1)" );
        this.select_ligne(12);
        await sleep(500);
        this.nbI++ ;
        this.tabIndex[ m]= buf1.tabreg[j-1].cle;
        document.getElementById('indexe'+(m+1)+'blockIndexe1').innerHTML='<p>'+this.tabIndex[m]+'</p>';
        this.deselect_ligne(12);




        buf1.nb =j;


        this.select_ligne(13);
        await sleep(500);
        this.deselect_ligne(13);
         f1.EcrireDir(i,buf1);
        this.select_ligne(14);
        await sleep(500);
        this.deselect_ligne(14);
          f1.entete.Aff_Entete(1,i+1);

    }
        async RechercheIndex(c){
            this.vider_algo();
            let g = document.getElementById('algo');
            g.innerHTML = '<p id="l0" style="text-decoration: underline;">Recherche(cle)</p>' +
                '<p id="l1"> </p>'

            this.add_algo(2, "tant que (non trouve et bi<=bs)");
            this.add_algo(3, " Si(c<this.tabIndex[k]){k-1} ");
            this.add_algo(4, " Si(c>this.tabIndex[k]{bi = k++}");
            this.add_algo(5, " Si(c=this.tabIndex[k]");
            this.add_algo(5, "Ftq");
            this.add_algo(6, " SI(non trouv)");
            this.add_algo(7, " if(bi<=this.nbI){k=bi}" );
            this.add_algo(8, " Sinon{k=NBI-1} ");
            this.add_algo(9, "trouv =false; ");
            this.add_algo(10, " liredir(k)");

        let buf2;
        let buf1;
        let i,j,k,trouv,bi,bs,continu;
         let anime= new animations();
        trouv=false;
        bi=0;
        bs=this.nbI-1;
        continu=true;
        while((!trouv)&&(bi<=bs)){
            this.select_ligne(2);
            await sleep(600);
            this.deselect_ligne(2);

            k= Math.floor((bi+bs)/2);
console.log(k);
            if(c<this.tabIndex[k]){
                this.select_ligne(3);
                await sleep(600);
                this.deselect_ligne(3);
                anime.animenregindexe(0,k,"#995522")
                bs= k-1
            }

            if(c>this.tabIndex[k]){
                this.select_ligne(4);
                await sleep(600);
                this.deselect_ligne(4);
                anime.animenregindexe(0,k,"#995522")
                bi=k+1;
                }
            if(c==this.tabIndex[k]){
                this.select_ligne(5);
                await sleep(600);
                this.deselect_ligne(5);
                anime.animenregindexe(0,k,"#005522")
                    trouv=true;
            }

        }
        if (!trouv){
            this.select_ligne(6);
            await sleep(600);
            this.deselect_ligne(6);
            if(bi<=this.nbI){
                this.select_ligne(7);
                await sleep(600);
                this.deselect_ligne(7);
                k=bi;
            }
            else {
                this.select_ligne(8);
                await sleep(600);
                this.deselect_ligne(8);
                k=this.nbI-1;
                continu=false
            }
        }
            this.select_ligne(9);
            await sleep(600);
            this.deselect_ligne(9);
        trouv=false;
        i=k;
         buf1= f1.lireDir(k);
            this.select_ligne(10);
            await sleep(600);
            this.deselect_ligne(10);
         anime.animeblockdown(k);
         await sleep(1500);
         let t = f1.lireDir(k).nb;
         this.vider_algo();
            this.add_algo(2, "SI(c<=buf1.tabreg[t-1].cle)");
            this.add_algo(3, " TANT QUE ((!trouv)&&(bi<=bs)) ");
            this.add_algo(4, "SI (c<buf1.tabreg[j].cle){bi=j++} ");
            this.add_algo(5, "SI(c>buf1.tabreg[j].cle){bs=j--} ");
            this.add_algo(6, "SI(c=buf1.tabreg[j].cle){trouve=vrai}");
            this.add_algo(6, "FTQ");
            this.add_algo(7, " SI(non trouv){j=bi}");
            this.add_algo(8, "SI (buf1.tabreg[j].efface==1){trouv=false) " );


        if(c<=buf1.tabreg[t-1].cle){
            this.select_ligne(2);
            await sleep(600);
            this.deselect_ligne(2);
            anime.animenreg(i,t-1,"#ffff22");
            await sleep(600);
            bi=0;
            bs=t;
            while ((!trouv)&&(bi<=bs)){
                this.select_ligne(3);
                await sleep(600);
                this.deselect_ligne(3);
                j=Math.floor((bi+bs)/2);
                if (c<buf1.tabreg[j].cle){
                    this.select_ligne(4);
                    await sleep(600);
                    this.deselect_ligne(4);
                    anime.animenreg(i,j,"#ffff22");
                    bs=j-1;
                }
                else{
                    if(c>buf1.tabreg[j].cle){
                        this.select_ligne(5);
                        await sleep(600);
                        this.deselect_ligne(5);
                        anime.animenreg(i,j,"#ffff22");

                        bi=j+1;
                    }
                    if(c==buf1.tabreg[j].cle){
                        trouv=true;
                        this.select_ligne(6);
                        await sleep(600);
                        this.deselect_ligne(6);
                        anime.animenreg(i,j,'#225522');
                        await sleep(1000);
                    }
                }
            }
            if(!trouv){
                this.select_ligne(7);
                await sleep(600);
                this.deselect_ligne(7);
                j=bi;
            }
            else{
                if(buf1.tabreg[j].efface==1){
                    this.select_ligne(8);
                    await sleep(600);
                    this.deselect_ligne(8);
                    trouv=false;
                }
            }
        }
        anime.animeblockup(i);
        await sleep(1500);
        return[i,j,trouv,k];
    }
        async RechercheIndex2(c){
        let buf2;
            let buf1;
            let i,j,k,trouv,bi,bs,continu;
            let anime= new animations();
            trouv=false;
            bi=0;
            bs=this.nbI-1;
            continu=true;
            while((!trouv)&&(bi<=bs)){


                k= Math.floor((bi+bs)/2);
console.log(k);
                if(c<this.tabIndex[k]){
                    anime.animenregindexe(0,k,"#995522");
                    await sleep(500);
                    bs= k-1
                }

                if(c>this.tabIndex[k]){

                    anime.animenregindexe(0,k,"#995522");
                    await sleep(500);
                    bi=k+1;
                }
                if(c==this.tabIndex[k]){

                    anime.animenregindexe(0,k,"#005522");
                    await sleep(500);
                    trouv=true;
                }

            }
            if (!trouv){

                if(bi<=this.nbI){

                    k=bi;
                }
                else {

                    k=this.nbI-1;
                    continu=false
                }
            }
            trouv=false;
            i=k;
            if (k==this.nbI){k--;i--;}
            buf1= f1.lireDir(k);
            anime.animeblockdown(k);
            await sleep(1500);
            let t = buf1.nb;
            if(c<=buf1.tabreg[t-1].cle){

                anime.animenreg(i,t-1,"#ffff22");
                await sleep(600);
                bi=0;
                bs=t;
                while ((!trouv)&&(bi<=bs)){

                    j=Math.floor((bi+bs)/2);
                    if (c<buf1.tabreg[j].cle){

                        anime.animenreg(i,j,"#ffff22");
                        bs=j-1;
                    }
                    else{
                        if(c>buf1.tabreg[j].cle){

                            anime.animenreg(i,j,"#ffff22");

                            bi=j+1;
                        }
                        if(c==buf1.tabreg[j].cle){
                            trouv=true;

                            anime.animenreg(i,j,'#225522');

                        }
                    }
                }
                if(!trouv){

                    j=bi;
                }
                else{
                    if(buf1.tabreg[j].efface==1){

                        trouv=false;
                    }
                }
            }
            else {
                j=t;
            }
            anime.animeblockup(i);
            await sleep(1500);
            console.log([i,j,trouv,k]);
            return[i,j,trouv,k];
    }
        async SupressionIndexe(c){
          let anime= new animations();
          this.vider_algo();
          let g = document.getElementById('algo');
          g.innerHTML = '<p id="l0" style="text-decoration: underline;"> SuppressionIndexe(cle)</p>' +
              '<p id="l1"> </p>'
          this.add_algo(2, "Recherche(cle)");
          this.add_algo(3, " Si(trouv==vrai)");
          this.add_algo(4, " bloc[i].tabreg[j].efface=1");
          this.add_algo(4, " FSI");
          this.select_ligne(2);
          await sleep(500);
          this.deselect_ligne(2);
        let a = await this.RechercheIndex2(c);
        let i= a[0];
        let j= a[1];
        let trouv= a[2];
        let k= a[3];

           if(trouv==true){
               this.select_ligne(3);
               await sleep(500);
               this.deselect_ligne(3);
               f1.lireDir(i).tabreg[j].efface=1;

               this.select_ligne(4);
               await sleep(500);
               this.deselect_ligne(4);
           }
          anime.animenregcolor(i,j,'#ff0033');
          anime.animeblockup(i);
           await sleep(500);

    }
        async InsertionIndexe(enreg){
        let e= new EnregTof(enreg,0);
            this.vider_algo();
            let g = document.getElementById('algo');
            g.innerHTML = '<p id="l0" style="text-decoration: underline;">Insertion(cle)</p>' +
                '<p id="l1"> </p>'

            this.add_algo(2, "Recherche(cle)");
            this.add_algo(3, " si (trouv= false)");
            this.add_algo(4, " lireDir(i)");
            this.add_algo(5, " tant que(buf.nb>j)");
            this.add_algo(6, "buf1.tabreg[m]=buf1.tabreg[m-1];");
            this.add_algo(6, " m--");
            this.add_algo(6, " FTQ");
            this.add_algo(7, " buf.tabreg[j]=e;");
            this.add_algo(8, " SI(buf1.nb<entete(2))");
            this.add_algo(9, " buf1.nb++;\n" +
                "                    buf1.tabreg[buf1.nb]=ee;");
            this.add_algo(10, "ecrireDir(buf,i)");
            this.add_algo(10,'Fsi');
            this.add_algo(11, "SI (enreg>this.tabIndex[k])");
            this.add_algo(12,' this.tabIndex[k]= enreg;');
            this.add_algo(12, "FSI");
            this.add_algo(12,'FSI');
          let anime= new animations();
          this.select_ligne(2);
          await sleep(600);
          this.deselect_ligne(2);
        let a = await this.RechercheIndex2(enreg);
        let i= a[0];
        let j= a[1];
        let trouv= a[2];
        let k = a[3];
        let m,n;
        let buf1;
            if(!trouv){
                this.select_ligne(3);
                await sleep(1000);
                this.deselect_ligne(3);
                this.select_ligne(4);
                await sleep(600);
                this.deselect_ligne(4);
                buf1= f1.lireDir(i);
                anime.animeblockdown(i);
                let ee= buf1.tabreg[buf1.nb-1];
                m=buf1.nb;
                while(m>j){
                    this.select_ligne(5);
                    await sleep(600);
                    this.deselect_ligne(5);
                    buf1.tabreg[m]=buf1.tabreg[m-1];
                    this.select_ligne(6);
                    await sleep(600);
                    this.deselect_ligne(6);
                    anime.animenreg(i,m,'#002255');
                    await sleep(600);
                    document.getElementById('enreg'+(m+1)+"block"+(i+1)).innerHTML='<p>'+buf1.tabreg[m-1].cle+'</p>';
                    await sleep(600);
                    m--;

                }//fin Tq
                buf1.tabreg[j]=e;
                this.select_ligne(7);
                await sleep(800);
                this.deselect_ligne(7);
                anime.animenreg(i,m,'#002255');
                await sleep(600);
                document.getElementById('enreg'+(j+1)+"block"+(i+1)).innerHTML='<p>'+e.cle+'</p>';

                if(buf1.nb<entete.entetet(2) && enreg<=this.tabIndex[k]){
                    this.select_ligne(8);
                    await sleep(600);
                    this.deselect_ligne(8);
                    buf1.nb++;
                    buf1.tabreg[buf1.nb]=ee;
                    this.select_ligne(9);
                    await sleep(600);
                    this.deselect_ligne(9);
                    anime.animenreg(i,m,'#002255');
                    await sleep(600);
                    document.getElementById('enreg'+(buf1.nb)+"block"+(i+1)).innerHTML='<p>'+ee.cle+'</p>';
                    await sleep(600);
                    this.select_ligne(10);
                    await sleep(600);
                    this.deselect_ligne(10);
                    f1.EcrireDir(i,buf1);

                }
                if (enreg>this.tabIndex[k]){
                    this.select_ligne(11);
                    await sleep(600);
                    this.deselect_ligne(11);
                    this.tabIndex[k]= enreg;
                    this.select_ligne(12);
                    await sleep(600);
                    anime.animenregindexe(0,k,"#43ee06");
                    document.getElementById('indexe'+(k+1)+'blockIndexe1').innerHTML='<p>'+enreg+'</p>';
                    await sleep(500);
                    this.deselect_ligne(12);
            }
                anime.animeblockup(i);
                await sleep(500);


     }
    }
}

//================test=======================

var  bloc1 = new Bloc([], 0);
var entete = new EnteteTof(0,10);
var f1= new FichierTof(bloc1,entete);
var fich= new IndexeNDense(f1,[],0);

//fichier.InsertionIndexe(23);
//================fin===========================


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

var initialiseee=false;
function init() {
    vider_alertt();
    let a =document.getElementById('nb_enr').value; //taux
    let taux =document.getElementById('taux').value;
    if (a!='' && taux!='') {
        if( a/taux <= 40) {
            if (!initialiseee) {
                document.getElementById('initialiser-form').style.display = 'none';

                box_shown = 0;
                a = parseInt(a);
                fich.InitialisationIndexe(a, taux);
                initialiseee = true;
            } else {
                alertt(1, 'le fichier est déja initialisé');
            }
        }
        else {
           alertt(1,'le nombre max des blocks est 4') ;
        }
    }
}
function insere() {
    vider_alertt();
    let a=document.getElementById('cle_inser').value;
    a=parseInt(a);
    if (!isNaN(a)){

    if (initialiseee){
        hide_form_box(3);
        box_shown=0;

        fich.InsertionIndexe(a);
    }
    else {
        alertt(3,"Le fichier n'est pas initialisé");
    }
    }

}
function rech() {
    vider_alertt();
    let a=document.getElementById('cle_rech').value;
    a=parseInt(a);
    if (!isNaN(a)) {

        if (initialiseee) {
            hide_form_box(2);
            box_shown = 0;
            fich.RechercheIndex(a, true);
        } else {
            alertt(2,"Le fichier n'est pas initialisé");
        }
    }
}
function supp() {
    vider_alertt();
    let s=document.getElementById('cle_supp_log').value;
    s=parseInt(s);
    if (!isNaN(s)) {

        if (initialiseee) {
            hide_form_box(4);
            box_shown = 0;
            fich.SupressionIndexe(s);
        } else {
            alertt(4,"Le fichier n'est pas initialisé");
        }
    }
}


function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    document.getElementById('IndexeNDense').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide" style="margin-top: 60px">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>Index Non Dense</p>\n' +
        '                        </div>\n' +

        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Information sur la structure :</h3>\n' +
        '                        Un index est dit \'non dense\' s\'il ne contient pas toutes les valeurs de\n\n' +
        '                        <br>\n' +
        '                        l’attribut clé du fichier de données (par exemple, on ne garde dans l’index \n' +
        '                        <br>\n' +
        '                        qu’une seule valeur par bloc ou groupe de blocs).\n' +
        '                        <br>\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                             - le petit premier block représente l\'index non dense du fichier,\n' +
        '                            <br>\n'+
        '                            il contient la plus grande valeur de chaque block pour faciliter \n' +
        '                            <br>\n'+
        '                             les opérations de manipulation du fichier.\n' +
        '                            <br>\n'+
        '                            - Les derniers blocks (les grands block ) représente les blocks\n' +
        '                            <br>\n' +
        '                             du fichier de format TOF\n' +
        '                            <br>\n' +

        '                            <img  src="assets/img/struct.JPG" height="230">\n' +
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

