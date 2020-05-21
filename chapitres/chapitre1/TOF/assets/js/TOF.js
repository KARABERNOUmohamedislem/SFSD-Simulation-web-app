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


//==========================================================classe animations========================
function animations() {

}
animations.prototype={
    constructor:animations(),
    animeblockdown:function (nmrdublock) {
        anime({
            targets:document.getElementById('block'+(nmrdublock+1)),
            borderColor:'#0081E2',
            backgroundColor:'#b1bbff',
            duration:1000*speed,
            easing:'linear'
        });
    },
    animeblockup:function (nmrdublock) {
        anime({
            targets:document.getElementById('block'+(nmrdublock+1)),
            borderColor:'#000',
            backgroundColor:'#fff',
            duration:1000*speed,
            easing: 'linear'
        });
    },
    animereplaceblock:function(nmrdublockARemplacer,nmrDuBlockRemplacent){
        let remplacent=document.getElementById('block'+(nmrDuBlockRemplacent+1));
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

    animenreg:function (nmrDuBlock,nmrEnreg,color) {
        let a=document.getElementById('enreg'+(nmrEnreg+1)+'block'+(nmrDuBlock+1));
        anime({
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


//================================================Structure du Bloc:===================================
class BlocTof{

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
        this.vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Initialisation(nb_enrg, taux)</p>' +
            '<p id="l1"> </p>'

        this.add_algo(2, "Pour(k varie de 0 vers le nombre d'enregestrement)");
        this.add_algo(3, " Si(j < taille_max*taux)");
        this.add_algo(4, " buff.tab_enrg[j] = enregistrement(t*t+5*t+2, faux)");
        this.add_algo(5, " j++");
        this.add_algo(6, "Sinon");
        this.add_algo(7, " buff.nb_enrg = j");
        this.add_algo(8, " ecritrDir(buff, i)");
        this.add_algo(9, " i++");
        this.add_algo(10, " buff.tab_enrg[0] = enregistrement(t*t+5*t+2, faux)");
        this.add_algo(11, " j = 1");
        this.add_algo(11, "FPour");
        let i,j,k;
        let enreg;
        let anime= new animations();
        let buf= new BlocTof([],0);
        i=j=0;
        let t=0;
        this.alloc_bloc(0);
        this.select_ligne(2);
        await  sleep(500);
        this.deselect_ligne(2);
        for(k=0; k< nbreenreg;k++){
            this.select_ligne(3);
            await sleep(500);
            this.deselect_ligne(3);
            enreg= t*t+5*t+2;
            t++;
            let e= new EnregTof(enreg,0);
            if (j<(this.entete.entetet(2))*tauxChargement){
                this.select_ligne(4);
                await  sleep(500);
                this.deselect_ligne(4);
                buf.tabreg[j]=new EnregTof(enreg,0);
                document.getElementById('enreg'+(j+1)+'block'+(i+1)).innerHTML='<p>'+enreg+'</p>';
                anime.animenreg(i,j,"#907333");
                this.select_ligne(5);
                await  sleep(500);
                this.deselect_ligne(5);
                j++;

            }

             else{
                this.select_ligne(6);
                await  sleep(500);
                this.deselect_ligne(6);
                this.select_ligne(7);
                buf.affNB(j);
                this.deselect_ligne(7);
                this.select_ligne(8);
                await sleep(500);
                this.deselect_ligne(8);
                this.EcrireDir(i,buf);
                buf=new BlocTof([],0);
                buf.tabreg[0]=new EnregTof(enreg,0);
                this.select_ligne(9);
                await  sleep(500);
                this.deselect_ligne(9)
                i++;
                this.alloc_bloc(i);
                document.getElementById('enreg'+(1)+'block'+(i+1)).innerHTML='<p>'+enreg+'</p>';
                anime.animenreg(i,0,"#907333");
                this.select_ligne(11);
                await  sleep(500);
                this.deselect_ligne(11)
                j=1;
            }

        }

        this.vider_algo();
        buf.affNB(j);
        this.EcrireDir(i,buf);
        this.entete.Aff_Entete(1,i+1);


    }
    async Recherche (c,algo=false){
        this.vider_algo();
        if (algo){
              let g = document.getElementById('algo');
             g.innerHTML = '<p id="l0" style="text-decoration: underline;">Recherche(c)</p>' +
            '<p id="l1"> </p>';
             this.add_algo(2, "bs=entete(1); trouv= stop= false; bi= 0");
             this.add_algo(3, "");
             this.add_algo(4, " Tant que ((bi<=bs)et(!stop)et (!trouv))");
             this.add_algo(5, "&nbsp &nbsp lireDir(i); k=buf.nb");
             this.add_algo(6, "");
             this.add_algo(7, " &nbsp &nbsp Si((c>= buf.tabreg[0].cle)&&(c<=buf.tabreg[k-1].cle))");
             this.add_algo(8, "&nbsp &nbsp &nbsp &nbsp Recherche dichotomique interne"); //tant que((inf<=sup) et(!trouv))
            this.add_algo(17, "&nbsp &nbsp &nbsp &nbsp si non trouv : j= inf");
            this.add_algo(18, "");

            this.add_algo(19, "&nbsp &nbsp &nbsp &nbsp stop =true ");

            this.add_algo(40, "&nbsp &nbsp Sinon  ");
            this.add_algo(21, "&nbsp &nbsp &nbsp &nbsp Si (c < buf.tabreg[0].cle) :  bs= i-1");
            this.add_algo(20, "");

            this.add_algo(31, "&nbsp &nbsp &nbsp &nbsp Sinon : bi=i-1 ");
            this.add_algo(22,"" );
            this.add_algo(23,"FTQ //tq ((bi<=bs)&&(!stop)&&(!trouv))" );
        }
        let trouv,stop,bi, bs, i,j ,sup=0, inf=0;
        let buf ;
        let enreg;
        let anime= new animations();
        // buf.tabreg[j]=new EnregTof(enreg,0);
        if (algo){
            this.select_ligne(2);
            await sleep(200);
        }

        bs=this.entete.entetet(1)-1;
        if (algo){
            this.deselect_ligne(2);
        }

        let k=0;
        i=0;
        bi=j=0;
        if (algo){
            this.select_ligne(3);
            await sleep(300);
        }

        trouv=false;
        stop= false;
        if (algo){
            this.deselect_ligne(3);
        }



        while((bi<=bs)&&(!stop)&&(!trouv)){
            if (algo){
                this.select_ligne(4);
                await sleep(600);
                this.deselect_ligne(4);
            }

            i=Math.floor((bi+bs)/2);
            if (algo){
                this.select_ligne(5);
                await sleep(500);
            }

            buf= this.lireDir(i);
            if (algo){
                this.deselect_ligne(5);
            }
            if (algo){
                this.select_ligne(6);
                await sleep(500);
            }

            anime.animeblockdown(i);
            console.log('await' );
            await sleep(1500);


            k = buf.nb;
            if (algo){
                this.deselect_ligne(6);
            }


            if((c>= buf.tabreg[0].cle)&&(c<=buf.tabreg[k-1].cle)){
                if (algo){
                    this.select_ligne(7);
                    await sleep(600);
                    this.deselect_ligne(7);
                }

                inf=0;
                sup=k-1;
                if (algo){
                    this.select_ligne(8);
                    await  sleep(700);
                    this.deselect_ligne(8);
                }

                while((inf<=sup)&&(!trouv)){
                    if((inf+sup)%2==0){
                        j= Math.floor((inf+sup)/2);
                    }
                    if((inf+sup)%2!=0){
                        j= Math.floor(((inf+sup)+1)/2);
                    }
                    // if (algo){
                    //      this.select_ligne(9);
                    //     await sleep(600);
                    //     this.deselect_ligne(9)
                    // }

                    if(c==buf.tabreg[j].cle){
                        // if (algo){
                        //      this.select_ligne(10);
                        //     await sleep(500);
                        // }

                        trouv=true;
                        // if (algo){
                        //     this.deselect_ligne(10);
                        // }

                        anime.animenreg(i,j,'#009900');
                        await sleep(500);

                    }


                    else{
                        // if (algo){
                        //     this.select_ligne(11);
                        //     await  sleep(600);
                        //     this.deselect_ligne(11);
                        // }

                        if(c < buf.tabreg[j].cle){
                            // if (algo){
                            //      this.select_ligne(12);
                            //     await sleep(600);
                            //     this.deselect_ligne(12);
                            //     this.select_ligne(13)
                            // }

                            sup=j-1;
                            await sleep(500);
                            // if (algo){
                            //     this.deselect_ligne(13);
                            // }

                            anime.animenreg(i,j,'#597caa');
                            await sleep(1000);

                        }
                        if(c>buf.tabreg[j].cle){
                            // if (algo){
                            //     this.select_ligne(14);
                            //     await sleep(500);
                            //     this.deselect_ligne(14);
                            // }

                            anime.animenreg(i,j,'#597caa');
                            await sleep(1000);
                            // if (algo){
                            //     this.select_ligne(15);
                            //     await sleep(500);
                            // }

                            inf=j+1;
                            // if (algo){
                            //     this.deselect_ligne(15);
                            // }

                        }
                    }
                }


                if(!trouv){
                    if (algo){
                        this.select_ligne(17);
                        await sleep(500);
                        this.deselect_ligne(17);
                        this.select_ligne(18);
                        await sleep(500);
                        this.deselect_ligne(18);
                    }

                    j=inf;
                    trouv=false;
                }
                if (algo){
                    this.select_ligne(19);
                    await sleep(500);
                    this.deselect_ligne(19);
                }

                stop=true;
            }
            else {
                if (algo){
                    this.select_ligne(20);
                    await sleep(500);
                    this.deselect_ligne(20);
                }

                if (c < buf.tabreg[0].cle) {
                    if (algo){
                         this.select_ligne(21);
                        await sleep(500);
                        this.deselect_ligne(21);
                    }

                    anime.animeblockup(i);
                    await  sleep(500);
                    if (algo){
                        this.select_ligne(22);
                        await sleep(500);
                        this.deselect_ligne(22);
                    }

                    bs=i-1 ;
                }
                else{
                    anime.animeblockup(i);
                    await sleep(500);
                    bi=i+1 ;
                }
            }
        }
        if (algo){
            this.select_ligne(23);
            await sleep(500);
            this.deselect_ligne(23);
        }

        anime.animeblockup(i);
        if(!trouv) {
            i = bi;
        }
        // this.vider_algo();

        return [i,j,trouv];
    }
    async Recherche2 (c){

        let trouv,stop,bi, bs, i,j ,sup=0, inf=0;
        let buf ;
        let enreg;
        let anime= new animations();

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
        this.vider_algo();

        return [i,j,trouv];
    }
    async supression(c){
        this.vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Suppression dun enregistremet(cle)</p>' +
            '<p id="l1"> </p>';

        this.add_algo(2, "a= Recherche(c)");


        let anime=new animations();
        let trouv,i,j,a;
        let buf = new BlocTof([],0);
        this.select_ligne(2);
        await sleep(500);
        this.deselect_ligne(2);
        a= await  this.Recherche2(c);
        i= a[0];
        j=a[1];
        trouv=a[2];

        this.vider_algo();

        //trouv=true;
        this.add_algo(3, "&nbsp &nbsp &nbsp &nbsp SI (trouv == true)" );
        this.add_algo(4, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp lireDir(i)");
        this.add_algo(5, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  buf.tabreg[j].efface=1");
        this.add_algo(6, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp ecritrDir(buff, i)");
        this.add_algo(7, "&nbsp &nbsp &nbsp &nbsp FSI");
         this.select_ligne(3);
        await sleep(500);
        this.deselect_ligne(3);
        if(trouv==true){
            this.select_ligne(4);
            await sleep(500);
            buf=this.lireDir(i);
            anime.animeblockdown(i);
            await sleep(1200);
            this.deselect_ligne(4);
            this.select_ligne(5);
            await sleep(500);
            this.deselect_ligne(5);
            buf.tabreg[j].efface=1;
            this.select_ligne(6);
            await sleep(500);
            this.EcrireDir(i,buf);
            anime.animenregcolor(i,j,'#ff0033');
            await sleep(1500)
            this.deselect_ligne(6);
            await sleep(700);
            anime.animeblockup(i);
            await sleep(1000)
        }
        anime.animenregcolor(i,j,'#ff0033');
        this.select_ligne(7);
        await sleep(500);
        this.deselect_ligne(7);

    }
    async Insertion(enreg){
        this.vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Insertion(c)</p>' +
            '<p id="l1"> </p>'
        this.add_algo(2, "var a= Recherche(c)");

        let e= new EnregTof(enreg,0);
        let anime=new animations();
        let k;
        let en,x,buf;
        buf= new BlocTof([],0);

      this.select_ligne(2);
      await (500);
      this.deselect_ligne(2);
      let a= await this.Recherche2(e.cle);
        let trouv= a[2];
        let i= a[0];
        let j=a[1];

        this.vider_algo();
        this.add_algo(3, "Tant que ((continu==true )&&(i<entete(1)))");
        this.add_algo(4, "&nbsp &nbsp lireDir(i)");
        this.add_algo(5, "&nbsp &nbsp Tant que (buf.nb > j)");
        this.add_algo(6, "&nbsp &nbsp &nbsp &nbsp buf.tabreg[k]=buf.tabreg[k-1]");
        this.add_algo(7, "&nbsp &nbsp  FTQ");
        this.add_algo(8, " &nbsp &nbsp Si(buf.nb<this.entete.entetet(2)");
        this.add_algo(9, " &nbsp &nbsp &nbsp &nbsp this.EcrireDir(i,buf)");
        this.add_algo(9, " &nbsp &nbsp FSI");
        this.add_algo(10, "&nbsp &nbsp Si(i>=this.entete.entetet(1) ");
        this.add_algo(11, "&nbsp &nbsp &nbsp &nbsp buf.tabreg[0]=e; ");
        this.add_algo(11, "&nbsp &nbsp FSI");
        this.add_algo(12, "&nbsp &nbsp this.EcrireDir(i,buf)");
        this.add_algo(13, "&nbsp &nbsp this.entete.Aff_Entete(1,i+1); ");
        this.add_algo(14, "FTQ ");
        if(trouv==false){
            let continu= true;
            while ((continu==true )&&(i<this.entete.entetet(1))){
            this.select_ligne(3);
            await sleep(500);
            this.deselect_ligne(3);
            buf= this.lireDir(i);
                this.select_ligne(4);
                await sleep(500);
                anime.animeblockdown(i);
                this.deselect_ligne(4);
                await sleep(1000);
                x=buf.tabreg[(buf.nb)-1];
                k=(buf.nb)-1;
                while (k > j){
                    this.select_ligne(5);
                    await sleep(500);
                    this.deselect_ligne(5);
                    buf.tabreg[k]=buf.tabreg[k-1];
                    this.select_ligne(6);
                    await sleep(500);
                    anime.animenreg(i,k,"#222255");
                    this.deselect_ligne(6);
                    await sleep(500);
                    let y = buf.tabreg[k-1].cle;
                    let z = buf.tabreg[k].cle;
                    document.getElementById('enreg'+(k+1)+"block"+(i+1)).innerHTML='<p>'+y+'</p>';
                    k=k-1;
                    anime.animeblockup(i);
                    await sleep (1000);
                }
                this.select_ligne(7);
                await sleep(500);

                buf.tabreg[j]=e;
                document.getElementById('enreg'+(j+1)+'block'+(i+1)).innerHTML='<p>'+e.cle+'</p>';
                anime.animenreg(i,j,"#222255");
                this.deselect_ligne(7);
                if (buf.nb<this.entete.entetet(2)){
                    this.select_ligne(8);
                    await sleep(500);
                    this.deselect_ligne(8);
                    buf.nb++;
                    buf.tabreg[(buf.nb)-1]=x;
                    let p = x.cle;
                    document.getElementById('enreg'+buf.nb+'block'+(i+1)).innerHTML='<p>'+p+'</p>';
                    anime.animenreg(i,buf.nb-1,"#222255")
                    anime.animeblockup(i);
                    await sleep (1000);
                    this.select_ligne(9);
                    await sleep(500);
                    this.EcrireDir(i,buf);
                    this.deselect_ligne(9);
                    continu= false;
                }
                else{
                    this.EcrireDir(i,buf);
                    i++;
                    j=0;
                    e=x;
                }
            }
            if(i>=this.entete.entetet(1)){
                this.select_ligne(10);
                await sleep(500);
                this.deselect_ligne(10);
                buf= new BlocTof([],0);
                this.alloc_bloc(i);
                await sleep (1000);
                anime.animeblockdown(i);
                await sleep(1000);
                buf.tabreg[0]=e;
                buf.nb++;
                if (e==x){
                    let u = buf.tabreg[(buf.nb)-1].cle;
                    document.getElementById('enreg'+(1)+'block'+(i+1)).innerHTML='<p>'+u+'</p>';
                    anime.animenreg(i,0,"#222255");
                    anime.animeblockup(i);
                    await sleep(1000);
                    buf.nb=1;

                }
                else{
                    document.getElementById('enreg'+(1)+'block'+(i+1)).innerHTML='<p>'+enreg+'</p>';
                    anime.animenreg(i,0,"#222255");
                    anime.animeblockup(i);
                    await sleep(1000);
                    buf.nb=1;

                }
                this.select_ligne(12);
                this.select_ligne(13);
                await sleep(500);
                this.deselect_ligne(12);
                this.deselect_ligne(13);
                this.EcrireDir(i,buf);
                this.entete.Aff_Entete(1,i+1);

            }

        }
    }
}

var entete = new EnteteTof(0,10);
var bloc = new BlocTof([],0);
var fich = new FichierTof(bloc,entete);

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

function vider_alertt(i) {
    switch (i) {
        case 1:{
            document.getElementById('initialiser-alert').innerText='';
            break;
        }
        case 2:{
            document.getElementById('rechercher-alert').innerText='';
            break;
        }
        case 3:{
            document.getElementById('inserer-alert').innerText='';
            break;
        }
        case 4:{
            document.getElementById('supprimer-alert').innerText='';
            break;
        }
    }
}

function init() {
    let a =document.getElementById('initialiser-nbr').value; //taux
    let taux =parseFloat(document.getElementById('taux').value);
    vider_alertt(1);
    if (a!='' && !isNaN(taux) && taux<=1 && taux>0) {
        if (!initialiseee) {

            document.getElementById('initialiser-form').style.display = 'none';
            box_shown = 0;
            fich.Initialisation(a, taux);
            initialiseee = true;
        } else {
            alertt(1, 'le fichier est déja initialisé');
        }
    }
    else {
        if (isNaN(taux) || taux>1 || taux<=0){
            alertt(1,'le taux doit etre > 0 et <=1 ');
        }
    }
}
function insere() {
    // document.getElementById('inserer-form').style.display='none';
    let a=document.getElementById('cle_inser').value;
    vider_alertt(3);
    if (a!='') {
        
        if (initialiseee) {
hide_form_box(3);
        box_shown = 0;
            a=parseInt(a);
            fich.Insertion(a);
        } else {
            alertt(3, "Le fichier n'est pas initialisé");
        }
    }
}
function rech() {
    // document.getElementById('rechercher-form').style.display='none';
    let a=document.getElementById('cle_rech').value;
    vider_alertt(2);
    if (a!='') {
        
        if (initialiseee) {
            hide_form_box(2);
            box_shown = 0;
            a=parseInt(a);
            fich.Recherche(a, true);
        } else {
            alertt(2,"Le fichier n'est pas initialisé");
        }
    }
}
function supp() {
    // document.getElementById('supprimer-form').style.display='none';
    let s=document.getElementById('cle_supp_log').value;
    vider_alertt(4);
    if (s!='') {
     
        if (initialiseee) {
   hide_form_box(4);
        box_shown = 0;
            s=parseInt(s);
            fich.supression(s);
        } else {
            alertt(4,"Le fichier n'est pas initialisé");
        }
    }
}


function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    document.getElementById('TOF').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>TOF</p>\n' +
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
        '                        Donc  TOF représente l\'organisation d\'un fichier vu comme tableau,ordonné,\n' +

        '                        <br>\n' +
        '                         avec des enregistrements de taille fix.\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            L\'enregistrement est vue comme un objet de deux attributs organise comme suit:\n' +
        '                            <br>\n' +
        '                            (cle qui représente le contenu de l\'enregistrement , effacement = 1 si la case est en rouge ) \n' +
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
