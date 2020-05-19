function animations() {

}
animations.prototype={
    constructor:animations(),

    animeblock:function (nmrdublock) { //pour animer lire dire///////////////////////////////////
        anime({
            targets:document.getElementById('block'+(nmrdublock)),
             opacity:1,
            borderColor:[{value:'#0000ff',duration:800*speed},{
                value: '#000000'
            }],
            backgroundColor:[{value:'#b1bbff',duration:800*speed},{
                value: '#ffffff'
            }],
        });
    },

    animeblockrech:function (nmrdublock) { //pour animer lire dire///////////////////////////////////
        anime({
            targets:document.getElementById('block'+(nmrdublock)),
            translateX: 0,
            opacity:1,
            borderColor:[{value:'#0000ff',duration:800*speed},{
                value: '#000000'
            }],
            backgroundColor:[{value:'#b1bbff',duration:800*speed},{
                value: '#ffffff'
            }],
        });
    },
    animealgo:function(a){
        anime({
            targets:document.getElementById(a),
            backgroundColor:[{value:'#3299ff',duration:700*speed},{value: '#fff',duration: 0}]
        })

    },

    animeenrg:function(bloc,enrg){ ////////////////////////////////////////////
        anime({
            targets:document.getElementById('enreg'+(enrg+2)+'block'+bloc),
            //translateY:20,
            //  translateX: 0,

            borderColor:"#ffda06",
            duration:300*speed
        });
    },





    animrech1:function(x) { /////////////////////////////////////////////////////////////////////
        anime({
            targets:x,
            /*borderColor:[{value:'#2910ff',
                duration:1000,value:'#000000'}]*/
            borderColor:[{value:'#fffe00',duration:700*speed},{
                value: '#ff0c97'
            }],
            backgroundColor:[{value:"#2910ff",duration:700*speed},{
                value: '#ffffff'
            }]
        })

    },

    animrech2:function(x) { /////////////////////////////////////////////////////////////////
        anime({
            targets:x,
            /*borderColor:[{value:'#2910ff',
                duration:1000,value:'#000000'}]*/

            backgroundColor:[{value:"#06ff00",duration:700*speed},{
                value: '#06ff00'
            }]
        })

    }


};





//===========================================================================================================


/*

function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, delay);
    });
}
*/


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

//==================================================================================================================



















class Entete{
    constructor(nbBloc,tailleMax)
    {
        this.nbBloc=nbBloc;//nbbloc utilisé pour donner l'aire qu on ajoute des bloc avec l insertion
        this.tailleMax=tailleMax;
    }
}



//=========================================================================================================

class Bloc{
    constructor(information,tailleMax){
        this.information=information;
        this.tailleMax=tailleMax;
    }

    insertionBloc(info,i){
        var a=[];
        var x=this.information.length;
        var insertion=false;
        while ((x<this.tailleMax)&&(i<info.length)){
            this.information[x]=info[i];
            x++;
            i++;
        }
        if(i>=info.length){
            insertion=true;
        }
        a.push(insertion);
        a.push(i);
        return a;

    }

    blocPlein(){
        var v=false;
        if(this.information.length==this.tailleMax){
            v=true;
        }
        else{
            v=false;
        }
        return v;
    }

    premierCaseVide(){
        return(this.information.length)


    }





}

//=====================================================================================================

class Enrg {
    constructor(cle,eff,info){
        this.cle=cle;
        this.eff=eff;
        this.info=info;
        this.taille=this.info.length+3;

    }
    concatiner() //radha array
    {
        var chain=[];
        chain.push(this.taille);
        chain.push(this.cle);
        chain.push(this.eff);
        for(var i=0;i<this.info.length;i++){
            chain.push(this.info.charAt(i));
        }
        return chain;
    }




}


//======================================================================================================

class TObVC{
    constructor(tete,tabBloc){
        this.tete=tete;
        this.tabBloc=tabBloc;
    }

     lireDir(i){
       // let a=new animations();
        //a.animeblockdown(i);
        return (this.tabBloc[i]);
    }


    ecrireDir(buf,i){
        this.tabBloc[i]=buf;
    }


    premierBlocNonPlein2(){ //indice du premier bloc non plein
        var anm=new animations();
        var i=0;
        var trouv=false;
        while ( trouv==false && i<this.tabBloc.length ){
            if (this.tabBloc[i].blocPlein()==false){
                trouv=true;
            }
            else{
                i++;
            }
        }
        if (i>=this.tabBloc.length){i=(-1);}
        return i;
    }



    miseajourEntet(){
        this.tete.nbBloc=this.premierBlocNonPlein2()+1;
    }

  async  premierBlocNonPlein(){ //indice du premier bloc non plein
        var anm=new animations();
        var i=0;
        var trouv=false;

        while ( trouv==false && i<this.tabBloc.length ){
            anm.animealgo('1');
            anm.animeblock(i);
            await sleep('500');
            if (this.tabBloc[i].blocPlein()==false){
                anm.animealgo('2');
                await sleep(500);
                trouv=true;
                anm.animealgo('3');
            }
            else{
                anm.animealgo('4');
                i++;
            }
        }
        if (i>=this.tabBloc.length){i=(-1);}
        return i;
    }


     restcolorsenrg(){
        var i=0;
        var j=0;
        var n;
        while (i<this.tabBloc.length){
            for(j=0;j<this.tete.tailleMax;j++){
                n=document.getElementById('enreg'+(j+1)+'block'+i);
                n.style.backgroundColor="#ffffff";
            }
            i++;

        }

    }





    async insertion(cle,info) {
         var anm =new animations();
         var algo=document.getElementById('algo');
        this.restcolorsenrg();
        algo.innerHTML='<p id="titre">   &nbsp &nbsp &nbsp  &nbsp &nbsp  Insertion(cle,information)</p> <p id="1">tantque (trouv=false&& i< entete(1)"nbbloc")</p> <p id="2"> &nbsp &nbsp  &nbsp si taille(bloc n°i) < entete(2)"taile max du bloc"</p>  <p id="3">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp trouv=true; &nbsp &nbsp premier-bloc-non-plein=i</p>  <p id="4">   &nbsp &nbsp  &nbsp  sinon incrementé i"liredire prochain bloc" </p><p id="5"> i=premier-case-vide(premier-bloc-non-plein) </p><p id="6"> tantque(j< taille-enrg)</p><p id="7">   &nbsp &nbsp &nbsp insertion caractere[j] de enrg dans position[i] du premier-bloc-non-plein</p><p id="8">   &nbsp &nbsp  &nbsp  si (j>=taille-enrg) </p><p id="9">   &nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp  insertion terminé </p>  <p id="11">   &nbsp &nbsp  &nbsp sinon si (i>=entete(2)"taillemax du bloc) : &nbsp &nbsp   chauvauchement avec bloc suivant ; &nbsp reinitialiser i à 0 </p>  ';
        var enr = new Enrg(cle, 0, info);
        var chain = enr.concatiner();
        var i = 0;
        var j = 0;
        var h = 0;
        var insert = false;
        var buff;
        var x =await (this.premierBlocNonPlein());
        await sleep(500);
        var y=x;

        j = this.tabBloc[x].premierCaseVide();
        anm.animealgo('5');
        await sleep(500);
        var z=j;
        while ((i < chain.length) && (insert == false)) {
            anm.animealgo('6');
            await sleep(300);
            anm.animealgo('7');
            anm.animeblock(x);

            this.tabBloc[x].information[j] = chain[i];
            document.getElementById('enreg'+(j+1)+'block'+x).innerHTML='<p>'+chain[i]+'</p>';
            anm.animeenrg(x,j);
            await sleep(300);
           switch (i) {
                case 0:document.getElementById('enreg'+(j+1)+'block'+x).style.borderColor="#2f2eff";
                break;
                case 1:document.getElementById('enreg'+(j+1)+'block'+x).style.borderColor="#ff0c97";
                break;
                case 2:document.getElementById('enreg'+(j+1)+'block'+x).style.borderColor="#ff9022";
                break;
               default: document.getElementById('enreg'+(j+1)+'block'+x).style.borderColor='#000';
            }


            j++;
            i++;
            await sleep(200);
            if (i >= chain.length) {
                anm.animealgo('8');
                await sleep(300);
                anm.animealgo('9');
                insert = true;
            } else if (j >= this.tabBloc[x].tailleMax) {
                anm.animealgo('11');
                await sleep(300);


                j = 0;
                x++;


            }

        }

        this.miseajourEntet();
        //await this.animeInsertion(y,z,chain);






        var bk=[y,z];
        return(bk);






    }




   async recherch(cle){
        this.restcolorsenrg();
        var algo=document.getElementById('algo');
       algo.innerHTML='<p id="titre">   &nbsp &nbsp &nbsp   Recherche(cle,var pos-bloc,var pos-enrg)</p>  <p id="3">tantque(i< entete(1) && trouv=false)</p> <p id="5">   &nbsp &nbsp  &nbsp  si (j+1< entete(2)) </p><p id="6">&nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp si (clé=caractere position (j+1) de bloc i) :  &nbsp trouv=true; pos-bloc=i; pos-enrg=j</p><p id="8"> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp sinon : j=j+taille </p><p id="9"> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp si (j>entete(2))"taille max enrg" </p><p id="10">   &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp j=j-entete(2); pos-bloc=i  </p>  <p id="11">   &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  pos-enrg=j </p> <p id="12"> &nbsp &nbsp &nbsp sinon : j=0 </p> <p id="14">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp si(cle=caractere j du bloc i) : trouv=true </p> <p id="16"> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp sinon : j=j+taille </p><p id="18"> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp si(j>entete(2)) : j=j-entete(2);  </p>';
        var i=0;
        var an=new animations();
        var j=0;
        var h=0;
        var positiondeENRGdansBLOC;
        var trouv=false;
        var positionDeBloc=0;



        while ((i<this.tete.nbBloc) && (trouv==false) ){
            an.animealgo('3');
            await sleep(500);
            var taille=this.tabBloc[i].information[j];
            if (taille==undefined){
                break;
            }
            else {
                await sleep(800);
                an.animeblock(i);
                if ((j + 1) < this.tabBloc[i].tailleMax) {

                    an.animealgo('5');
                    await sleep(800);
                    var enrg = document.getElementById('enreg' + (j + 2) + 'block' + i);
                    an.animrech1(enrg);

                        if (cle == this.tabBloc[i].information[j + 1]) {
                            an.animealgo('6');
                            await sleep(300);
                            trouv = true;
                            var x = j;
                            var stop = false;
                            while (x < this.tete.tailleMax && stop == false) {
                                var elem2 = document.getElementById('enreg' + (x + 1) + 'block' + i);
                                an.animrech2(elem2);
                                await sleep(300);
                                var s = x - j + 1;
                                if (s >= this.tabBloc[i].information[j]) {
                                    stop = true;
                                }

                                x++;

                            }

                            if (stop == false) {
                                var t = this.tabBloc[i].information[j] - (x - j);
                                for (var n = 1; n <= t; n++) {
                                    var elem3 = document.getElementById('enreg' + (n) + 'block' + (i + 1));
                                    an.animrech2(elem3);
                                    await sleep(300);

                                }
                            }

                        } else {
                            an.animealgo('8');
                            await sleep(300);
                            an.animealgo('9');
                            j = j + taille;
                            await sleep(100)
                            if (j >= this.tabBloc[i].tailleMax) {
                                an.animealgo('10');
                                j = j - this.tabBloc[i].tailleMax;
                                i++;
                                positionDeBloc = i;
                            }
                        }
                    an.animealgo('11');
                      positiondeENRGdansBLOC = j;
                } else {
                    an.animealgo('12');
                     await sleep(500);
                    positiondeENRGdansBLOC = j;
                    j = 0;

                    an.animeblock(i+1);
                    var elem4 = document.getElementById('enreg' + (j+1) + 'block' + (i+1));
                    an.animrech1(elem4);
                    await sleep(500);
                    if (cle == this.tabBloc[i + 1].information[j]) {
                        an.animealgo('14');
                        trouv = true;
                        var x = j;
                        var stop = false;
                        while (x < this.tete.tailleMax && stop == false) {
                            var elem5 = document.getElementById('enreg' + (x + 1) + 'block' + (i+1));
                            an.animrech2(elem5);
                            await sleep(300);
                            var s = x - j + 2;
                            if (s >= this.tabBloc[i].information[9]) {
                                stop = true;
                            }

                            x++;

                        }

                        if (stop == false) {
                            var t = this.tabBloc[i].information[9] - (x - j);
                            for (var n = 1; n <= t; n++) {
                                var elem6 = document.getElementById('enreg' + (n) + 'block' + (i + 2));
                                an.animrech2(elem6);
                                await sleep(300);

                            }
                        }
                    } else {
                         await sleep(300);
                        an.animealgo('16');
                        j = j + this.tabBloc[i].information[9]-1;
                        if (j >= this.tabBloc[i].tailleMax) {
                            an.animealgo('17');
                            await sleep(300);
                            an.animealgo('18');
                            j = j - this.tabBloc[i].tailleMax;
                            i++;
                            positionDeBloc = i;
                        }
                        i++;
                    }

                }
            }

        }





       if(trouv==true){
        if(positiondeENRGdansBLOC+2>=this.tete.tailleMax){
            var l=positiondeENRGdansBLOC+2-this.tete.tailleMax;
            if(this.tabBloc[i+1].information[l]==1){
                trouv=false;
            }
        }
        else {
            if(this.tabBloc[i].information[positiondeENRGdansBLOC+2]==1){
                trouv=false;

            }


        }
        }
       else {
           positiondeENRGdansBLOC=-1;
           positionDeBloc=-1;

       }

        var a=[trouv,positionDeBloc,positiondeENRGdansBLOC];

        return a;
    }




    async recherch2(cle){
        this.restcolorsenrg();
        var algo=document.getElementById('algo');
        var i=0;
        var an=new animations();
        var j=0;
        var h=0;
        var positiondeENRGdansBLOC;
        var trouv=false;
        var positionDeBloc=0;



        while ((i<this.tete.nbBloc) && (trouv==false) ){

            var taille=this.tabBloc[i].information[j];
            if (taille==undefined){
                break;
            }
            else {
                await sleep(800);
                an.animeblock(i);
                if ((j + 1) < this.tabBloc[i].tailleMax) {


                    var enrg = document.getElementById('enreg' + (j + 2) + 'block' + i);
                    an.animrech1(enrg);

                    if (cle == this.tabBloc[i].information[j + 1]) {

                        trouv = true;

                        var x = j;
                        var stop = false;
                        while (x < this.tete.tailleMax && stop == false) {
                            var elem2 = document.getElementById('enreg' + (x + 1) + 'block' + i);
                            an.animrech2(elem2);
                            await sleep(300);
                            var s = x - j + 1;
                            if (s >= this.tabBloc[i].information[j]) {
                                stop = true;
                            }

                            x++;

                        }

                        if (stop == false) {
                            var t = this.tabBloc[i].information[j] - (x - j);
                            for (var n = 1; n <= t; n++) {
                                var elem3 = document.getElementById('enreg' + (n) + 'block' + (i + 1));
                                an.animrech2(elem3);
                                await sleep(300);

                            }
                        }

                    } else {

                        j = j + taille;
                        await sleep(100)
                        if (j >= this.tabBloc[i].tailleMax) {
                            j = j - this.tabBloc[i].tailleMax;
                            i++;
                            positionDeBloc = i;
                        }
                    }
                    positiondeENRGdansBLOC = j;
                } else {

                    positiondeENRGdansBLOC = j;
                    j = 0;
                    an.animeblock(i+1);
                    var elem4 = document.getElementById('enreg' + (j+1) + 'block' + (i+1));
                    an.animrech1(elem4);
                    await sleep(500);
                    if (cle == this.tabBloc[i + 1].information[j]) {
                        trouv = true;
                        var x = j;
                        var stop = false;
                        while (x < this.tete.tailleMax && stop == false) {
                            var elem5 = document.getElementById('enreg' + (x + 1) + 'block' + (i+1));
                            an.animrech2(elem5);
                            await sleep(300);
                            var s = x - j + 2;
                            if (s >= this.tabBloc[i].information[9]) {
                                stop = true;
                            }

                            x++;

                        }

                        if (stop == false) {
                            var t = this.tabBloc[i].information[9] - (x - j);
                            for (var n = 1; n <= t; n++) {
                                var elem6 = document.getElementById('enreg' + (n) + 'block' + (i + 2));
                                an.animrech2(elem6);
                                await sleep(300);

                            }
                        }
                    } else {
                        algo.scrollTop=algo.scrollHeight;

                        j = j + this.tabBloc[i].information[9]-1;
                        if (j >= this.tabBloc[i].tailleMax) {
                            j = j - this.tabBloc[i].tailleMax;
                            i++;
                            positionDeBloc = i;
                        }
                        i++;
                    }

                }
            }

        }





        if(trouv==true){
            if(positiondeENRGdansBLOC+2>=this.tete.tailleMax){
                var l=positiondeENRGdansBLOC+2-this.tete.tailleMax;
                if(this.tabBloc[i+1].information[l]==1){
                    trouv=false;
                }
            }
            else {
                if(this.tabBloc[i].information[positiondeENRGdansBLOC+2]==1){
                    trouv=false;

                }


            }
        }
        else {
            positiondeENRGdansBLOC=-1;
            positionDeBloc=-1;

        }

        var a=[trouv,positionDeBloc,positiondeENRGdansBLOC];

        return a;
    }




    async  animesup(bloc,enrg){        /////akhdam recherche wahdokhra  b animation wahdokhra dir biha la suppression
        var i=0;
        var j=0;
        var z;
        var x=this.tabBloc[bloc].information[enrg]+enrg;
        var y=x-this.tete.tailleMax;
        var n;
        z=x;
        if(x>=this.tete.tailleMax){
            z=x-y;
        }
        for(j=enrg;j<z;j++){
            n=document.getElementById('enreg'+(j+1)+'block'+(bloc));
            n.style.backgroundColor="#ff0500"
            await sleep(200)
        }
        if(x>=this.tete.tailleMax){
            for(j=0;j<y;j++){
                n=document.getElementById('enreg'+(j+1)+'block'+(bloc+1));
                n.style.backgroundColor="#ff0500"
                await sleep(200)

            }
        }

    }


   async suprimer(cle){
        var algo=document.getElementById('algo');
       this.restcolorsenrg();
      algo.innerHTML='<p id="titre">   &nbsp &nbsp &nbsp  &nbsp &nbsp  Suppression_logique(cle)</p> <p id="1"> Recherche(cle,trouv,pos_bloc,pos_enrg)</p> <p id="2">si (trouv=true) </p>  <p id="3">&nbsp &nbsp &nbsp si(pos_enrg+2>= entete(2))</p>  <p id="4"> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp caractere (pos_enrg+2-taille_max) du bloc (pos_bloc+1) intialisé à 1</br> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp suppression logique </p><p id="5">&nbsp &nbsp &nbsp sinon </p><p id="6">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp caractere pos_enrg + 2 du bloc pos_bloc intialisé à 1 </br> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp suppression logique </p>';
       var an=new animations();
       an.animealgo('1');
       var x=await (this.recherch2(cle));
        await sleep(1000);
        if(x[0]==true){
            an.animealgo('2');
            await sleep(500);

            var a=x[1];//bloc
            var b=x[2]+2;//eff dans enrg

            if(b>=this.tabBloc[a].tailleMax){
                an.animealgo('3');
                await sleep(500);
                an.animealgo('4');
                this.tabBloc[a+1].information[b-this.tabBloc[a].tailleMax]=1;
                var idenrg='enreg'+(b-this.tabBloc[a].tailleMax+1)+'block'+(a+1);
                var n=document.getElementById(idenrg);
                n.innerHTML='<p>'+1+'</p>';

            }
            else
            {
                an.animealgo('5');
                await sleep(500);
                an.animealgo('6');
                this.tabBloc[a].information[b]=1;
                var idenrg='enreg'+(b+1)+'block'+(a);
                var n=document.getElementById(idenrg);
                n.innerHTML='<p>'+1+'</p>';
            }
            this.animesup(x[1],x[2]);
        }
        this.miseajourEntet();
    }



    alloc_bloc(p) {
        let divfichier=document.getElementById('TObVC');
        let divblock=document.createElement('div');
        divblock.id='block'+(p);
        divblock.className='Tblock';
        divfichier.appendChild(divblock);
        for (let i=1;i<=this.tete.tailleMax;i++){
            let divenreg=document.createElement('div');
            divenreg.id='enreg'+i+'block'+(p);//enrg radha case fe enreg
            divenreg.className='Tenreg';
            divblock.appendChild(divenreg);
        }



    }

















}





var t=new Entete(0,10);
var inf=[];
var inf2=[];
var inf3=[];
var inf4=[];
var inf5=[];
var inf6=[];
var inf7=[];
var inf8=[];
var inf9=[];
var inf10=[];
var inf11=[];

var bloc=new Bloc(inf,10);
var bloc2=new Bloc(inf2,10);
var bloc3=new Bloc(inf3,10);
var bloc4=new Bloc(inf4,10);
var bloc5=new Bloc(inf5,10);
var bloc6=new Bloc(inf6,10);
var bloc7=new Bloc(inf7,10);
var bloc8=new Bloc(inf8,10);
var bloc9=new Bloc(inf9,10);
var bloc10=new Bloc(inf10,10);
var bloc11=new Bloc(inf11,10);
var tabbloc=[];

tabbloc.push(bloc);

tabbloc.push(bloc2);
tabbloc.push(bloc3);
tabbloc.push(bloc4);
tabbloc.push(bloc5);
tabbloc.push(bloc6);
tabbloc.push(bloc7);
tabbloc.push(bloc8);
tabbloc.push(bloc9);
tabbloc.push(bloc10);





fich=new TObVC(t,tabbloc);


for(var t=0;t<fich.tabBloc.length;t++){
    fich.alloc_bloc(t);
}


function alertt(i,msg) {
    switch (i) {

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
   

    
            document.getElementById('rechercher-alert').innerText = '';
       
            document.getElementById('inserer-alert').innerText = '';
       
            document.getElementById('supprimer-alert').innerText = '';
     
}
 function insere() {
     vider_alertt();
        let s=document.getElementById('inscle');
        let d=document.getElementById('insenrg');
        var z=s.value;
        var b=d.value;
        if (z!='' ) {
            fich.insertion(z, b);
            document.getElementById('inserer-form').style.display = 'none';
            box_shown = 0;
        }

}
function rech() {
    vider_alertt();
    let a=document.getElementById('rechinp');
    var b=a.value;
    if (b!='') {
        if (fich.tete.nbBloc != 0) {

            fich.recherch(b);
            document.getElementById('rechercher-form').style.display = 'none';
            box_shown = 0;
        } else {
            var algo = document.getElementById('algo');
            algo.innerHTML = '<p id="titre">   &nbsp &nbsp &nbsp   Recherche(cle,var pos-bloc,var pos-enrg)</p>  <p id="3">tantque(i< entete(1) && trouv=false)</p> <p id="5">   &nbsp &nbsp  &nbsp  si (j+1< entete(2)) </p><p id="6">&nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp si (clé=caractere position (j+1) de bloc i) :  &nbsp trouv=true; pos-bloc=i; pos-enrg=j</p><p id="8"> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp sinon : j=j+taille </p><p id="9"> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp si (j>entete(2))"taille max enrg" </p><p id="10">   &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp j=j-entete(2); pos-bloc=i  </p>  <p id="11">   &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  pos-enrg=j </p> <p id="12"> &nbsp &nbsp &nbsp sinon : j=0 </p> <p id="14">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp si(cle=caractere j du bloc i) : trouv=true </p> <p id="16"> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp sinon : j=j+taille </p><p id="18"> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp si(j>entete(2)) : j=j-entete(2);  </p>';

            alertt(2,"Le fichier est vide");
            console.log(document.getElementById('rechinp').value);
        }

    }
}
function supp() {
    vider_alertt();
    let s=document.getElementById('supinp');
    var z=s.value;
    if (z!='') {
        document.getElementById("supprimer-form").style.display = 'none';
        box_shown = 0;
        if (fich.tete.nbBloc != 0) {


            fich.suprimer(z);
        } else {
            alertt(4,"Le fichier est vide");
        }

    }
}

async function intialiser(){
    vider_alertt();
    show_form_box(1);
    await (fich.insertion(10,'idlike'));
    await sleep(200);
    await (fich.insertion(70,'tofu'));
    await sleep(200);
    await (fich.insertion(98,'ckhard'));

}

document.getElementById('inssub').onclick=insere;
document.getElementById('rechsub').onclick=rech;
document.getElementById('supsub').onclick=supp;


function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    document.getElementById('TObVC').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>TObVC</p>\n' +
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
        '                        Donc  TObVC représente l\'organisation d\'un fichier vu comme tableau,non ordonné,\n' +

        '                        <br>\n' +
        '                         avec des enregistrements de taille variables avec chevauchements entre blocs.\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            L\'enregistrement est vue comme une chaine de caractères organise comme suit:\n' +
        '                            <br>\n' +
        '                            (taille , cle , effacement , une chaine de caractères qui represente le contenu \n' +
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
