function animations() {

}
animations.prototype={
    constructor:animations(),

    animeblock:function (nmrdublock) {
        anime({
            targets:document.getElementById('noeud'+(nmrdublock)),
            opacity:1,
            borderColor:[{value:'#0000ff',duration:3500},{
                value: '#000000'
            }],
            backgroundColor:[{value:'#42a4ff',duration:3500},{
                value: '#a4f2ff'
            }],
        });
    },

    animealgo:function(a){
        anime({
            targets:document.getElementById(a),
            backgroundColor:[{value:'#1393ff',duration:700},{value: '#fff'}]
        })

    },

    animeenrg:function(bloc,enrg,color){
        anime({
            targets:document.getElementById('bloc'+bloc+'enreg'+enrg),
            opacity:1,
            borderColor:[{value:color,duration:500},{
                value: '#000000'
            }]
        });
    },

    animetrouv:function (bloc,enrg,color) {
        anime({
            targets:document.getElementById('bloc'+bloc+'enreg'+enrg),

            borderColor:[{value:color,duration:1000},{
                value: '#000000'
            }],
            backgroundColor: [{value:color,duration:2000},{
                value: '#f2f8ff'}]
        });
    },

    animetrouv2:function (bloc,enrg,color) {
        anime({
            targets:document.getElementById('bloc'+bloc+'enreg'+enrg),

            borderRightColor:color

        });
    },

animeline:function (bloc) {
    anime({
        targets: document.getElementById('noeud' + bloc),
        opacity: 1,
        borderColor: [{value: "#06ff00", duration: 1000}, {
            value: '#000000'
        }],
        backgroundColor: [{value: "#06ff00", duration: 3000}, {
            value: '#000000'
        }]
    })
}



};





//===========================================================================================================




/*function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, delay);
    });
}*/

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






//======================================================================================================================




class bloc{
    constructor(tabval){
        this.tabval=tabval;
        var tabfils=[];
        for(var i=0;i<this.tabval.length+1;i++){tabfils.push(-1);}
        this.tabfils=tabfils;
        this.degre=this.tabval.length+1;
    }

 async   recherecheInter(cle,bloc){
        var a=new animations();
        var inf=0;
        var sup=this.tabval.length-1;
        var trouv=false;
        var mil;
        while (trouv==false && inf<=sup){

            mil=Math.floor((inf+sup)/2);
            a.animeenrg(bloc,inf,"#ffda06");
            a.animeenrg(bloc,sup,"#ffda06");
            await sleep(400);
            if(this.tabval[mil]==cle){
                trouv=true;
                var tut=document.getElementById('bloc'+bloc+'enreg'+mil);
                if(tut!=null) {
                    tut.style.backgroundColor = "#06FF00";
                }
            }
            else {
                if(this.tabval[mil]<cle){
                    a.animeenrg(bloc,mil,"#ff5e56");
                    inf=mil+1;

                }
                else {
                    a.animeenrg(bloc,mil,"#ff5e56");
                    sup=mil-1;

                }
            }
            await sleep(900);
        }
        var resu=[trouv,mil];
        return resu;

    }




    insertioninter(cle,pos,bloc) {


        for (var i = this.tabval.length; i >pos; i--) {
            var elem=document.getElementById('bloc'+bloc+'enreg'+i);
            var elem2=document.getElementById('bloc'+bloc+'enreg'+(i-1));
            this.tabval[i]=this.tabval[i-1];
            elem.style.opacity=1;
            elem.style.height='25px';
            elem.style.width='20px';
            elem.style.top='-2px';
            elem.innerHTML=elem2.innerHTML;

        }
        this.tabval[pos] = cle;
        var elem3=document.getElementById('bloc'+bloc+'enreg'+pos);
        elem3.innerHTML='<p>'+cle+'</p>';
        elem3.style.opacity=1;
        elem3.style.height='25px';
        elem3.style.width='20px';
        elem3.style.top='-2px';



    }

    nbfilsvid(h){
        var nb=0;
        for(var i=0;i<h;i++){
            if(this.tabfils[i]==-1){
                nb++
            }
        }
        return nb;
    }


}


//===========================================================================================================
//===========================================================================================================



class fichier {
    constructor(tabbloc,root){
        this.tabbloc=tabbloc;
        this.root=root;
    }
    adrroot(){
       return  this.tabbloc.indexOf(this.root);
    }



  async   suppressionintern(bloc,enrg){
        for(var i=enrg;i<this.tabbloc[bloc].tabval.length;i++){
            var elem=document.getElementById('bloc'+bloc+'enreg'+i);
            var elem2=document.getElementById('bloc'+bloc+'enreg'+(i+1));
            if(elem2!=null) {
                elem.innerHTML = elem2.innerHTML
            }
            await sleep(400);
        }
        var elem9=document.getElementById('bloc'+bloc+'enreg'+(this.tabbloc[bloc].tabval.length-1));
        elem9.innerHTML='';
        elem9.style.width='0px';       // decalage dakhal el noeud obligi machi thabat opacity aljdmlha function
        elem9.style.height='0px';
        elem9.style.opacity=0;

    }


    descendantde(pere,fils){
        var i=0;
        var trouv=false;
        while (i<pere.tabval.length && trouv==false){
            if(fils.tabval[fils.tabval.length-1]<pere.tabval[i]){
                trouv=true;
            }else {
                i++;
            }


        }
        pere.tabfils[i]=this.tabbloc.indexOf(fils);
    }




    allocbloc(){
        var noeud=new bloc([]);
        this.tabbloc.push(noeud);
        let divblock=document.createElement('div');
        divblock.id='bloc'+this.tabbloc.indexOf(noeud);
        divblock.className='bloc';
        for(var j=0;j<4;j++){
            let divenrg=document.createElement('div');
            divenrg.className='Tenreg';
            divenrg.id='bloc'+this.tabbloc.indexOf(noeud)+'enreg'+j;
            divblock.appendChild(divenrg);
        }
        let nd=document.createElement('span');
        nd.className='tf-nc';
        nd.id='noeud'+this.tabbloc.indexOf(noeud);
        nd.appendChild(divblock);
        return([nd,this.tabbloc.indexOf(noeud)]);
    }


    creatdivenreg(bloc,enreg){
        let divenrg=document.createElement('div');
        divenrg.className='Tenreg';
        divenrg.id='bloc'+bloc+'enreg'+enreg;
        divenrg.innerHTML='<p>'+fich.tabbloc[bloc].tabval[enreg]+'</p>';
        return divenrg
    }



//===========================================================================================================
//===========================================================================================================



    async  recherche(cle) {
        var cases=document.getElementsByClassName('tf-nc');
        for (var v=0;v<cases.length;v++){
            cases[v].style.backgroundColor='inherit';
            cases[v].className='tf-nc';
        }

        var enregs=document.getElementsByClassName('Tenreg');
        for(var f=0;f<enregs.length;f++){
            enregs[f].style.borderColor="#000";
            enregs[f].style.backgroundColor="inherit";

        }
        var i=this.adrroot();
         var  a= new animations();
        var prec=-1;
        var j=0;
        var trouv=false;
        while (trouv==false && i!=-1 && this.tabbloc[i]!=undefined){

                j = 0;
                a.animeblock(i);
               var p= await this.tabbloc[i].recherecheInter(cle,i);
                trouv=p[0];


                if (trouv == false) {
                    var stop=false;

                    while (j<this.tabbloc[i].tabval.length && stop==false){

                        if(this.tabbloc[i].tabval[j]>cle){
                            stop=true;

                        }else{
                            j++;
                        }
                    }
                    prec = i;
                    if(j<this.tabbloc[i].tabval.length){
                       a.animetrouv2(i,j-1,"#ff0500")
                    }else {
                        a.animetrouv2(i,j-1,"#ff0500");
                    }
                    i = this.tabbloc[i].tabfils[j];
                    a.animeblock(i);
                    await sleep(200);
                }
            }
            if(trouv==true){
                j= (await this.tabbloc[i].recherecheInter(cle))[1];
            }


        return [trouv,prec,i,j];


    }



    async  recherche2(cle) {
        var cases=document.getElementsByClassName('tf-nc');
        for (var v=0;v<cases.length;v++){
            cases[v].style.backgroundColor='inherit';
            cases[v].className='tf-nc';

        }
        var algo=document.getElementById("algo");
        algo.innerHTML='<p id="titre"> &nbsp &nbsp  &nbsp &nbsp Recherche(cle,var trouv ,var noeud,var enrg)</p> <p id="1">var i=adrroot &nbsp var prec=-1;&nbsp var trouv=false; &nbsp var j=0;</p> <p id="2">tantque trouv==false and i!=-1</p>  <p id="3">&nbsp &nbsp &nbsp trouv=Recherche-interne(cle,i) "dans le noeud i" </p>  <p id="4">&nbsp &nbsp &nbsp  si trouv=false </p>    <p id="5">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp j=position-où-clé-doit-etre-inseré</br>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp i=fils[j] "de noeud i"</p>  <p id="6"> &nbsp &nbsp &nbsp sinon</p>  <p id="7">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp adr-noeud=i &nbsp position-dans-noeud=j </p>  ';
        algo.scrollTop=algo.scrollHeight;
        var enregs=document.getElementsByClassName('Tenreg');
        for(var f=0;f<enregs.length;f++){
            enregs[f].style.borderColor="#000";
            enregs[f].style.backgroundColor="inherit";

        }
        var i=this.adrroot();
        var  a= new animations();
        var prec=-1;
        var j=0;
        var trouv=false;
        //a.animealgo('1');
        //a.animealgo('2');
        while (trouv==false && i!=-1 && this.tabbloc[i]!=undefined){
            a.animealgo('2');
            await sleep(500);
            a.animealgo('3');
            j = 0;
            a.animeblock(i);
            //document.getElementById('noeud'+i).className+=' line';
            var p= await this.tabbloc[i].recherecheInter(cle,i);

            trouv=p[0];

            a.animealgo('4');
            if (trouv == false) {
               await sleep(500)
                a.animealgo('5');
                var stop=false;

                while (j<this.tabbloc[i].tabval.length && stop==false){

                    if(this.tabbloc[i].tabval[j]>cle){
                        stop=true;

                    }else{
                        j++;
                    }
                }
                prec = i;
                if(j<this.tabbloc[i].tabval.length){
                    a.animetrouv2(i,j-1,"#ff0500")
                }else {
                    a.animetrouv2(i,j-1,"#ff0500");
                }


                await sleep(500);


                i = this.tabbloc[i].tabfils[j];
                a.animeblock(i);
                await sleep(1000);
            }

        }
        a.animealgo('6');
        if(trouv==true){
            await sleep(500);
            a.animealgo('7');
            j= (await this.tabbloc[i].recherecheInter(cle))[1];
            algo.innerHTML+='<p id="conc"> &nbsp  &nbsp &nbsp &nbsp&nbsp  &nbsp &nbsp  &nbsp &nbsp &nbsp '+cle+' existe dans le noeud '+i+' pointé par '+prec+'</p>';
            algo.scrollTop=algo.scrollHeight;

        }
        else {
            algo.innerHTML+='<p id="conc2">&nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp&nbsp  &nbsp &nbsp  &nbsp &nbsp &nbsp  '+cle+' n\'existe pas   </p>';
            algo.scrollTop=algo.scrollHeight;

        }


        return [trouv,prec,i,j];


    }



//===========================================================================================================
//===========================================================================================================



    async   insertion(cle){
        var a=new animations();
        var algo=document.getElementById("algo");
        algo.innerHTML='<p id="titre"> &nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp    Insertion(cle)</p> <p id="1">Recherche(cle,trouv,i,j)"i pour le noeud j pour position dans noeud" </p> <p id="2">si trouv==false </p>  <p id="3">&nbsp &nbsp &nbsp si noeud i n\'est pas plein </p>  <p id="4">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  insertion interne dans noeud i position j avec decalage </p>    <p id="5">&nbsp &nbsp &nbsp  sinon </p><p id="6">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp allocation d\'un nouveau noeud pointé par fils[j]</br>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp insertion dans le nouveau noeud</p> ';
        await sleep(500);
        a.animealgo('1');
        var r=await this.recherche(cle);

            if(r[0]==false){
                a.animealgo('2');
               // await sleep(500);


                if(this.tabbloc[r[1]].tabval.length<4){
                    a.animealgo('3');
                    await sleep(500);
                    a.animealgo('4');
                    this.tabbloc[r[1]].insertioninter(cle,r[3],r[1]);
                    this.tabbloc[r[1]].tabfils.push(-1);
                    this.tabbloc[r[1]].degre=this.tabbloc[r[1]].tabval.length+1;


                }
                else {
                    await sleep(500);
                    a.animealgo('5');
                    await sleep(500);
                    a.animealgo('6');
                    await sleep(100);
                    var i=this.allocbloc();
                    this.tabbloc[i[1]].tabval.push(cle);
                    this.tabbloc[i[1]].tabfils.push(-1);
                    this.tabbloc[i[1]].degre=this.tabbloc[i[1]].tabval.length+1;
                    this.tabbloc[r[1]].tabfils[r[3]]=i[1];

                    var simpos=r[3]-this.tabbloc[r[1]].nbfilsvid(r[3]);
                    var pere=document.getElementById("ele"+r[1]);
                    if(pere.childNodes[1]!=undefined){
                        var u=document.createElement('li');
                        u.id='ele'+i[1];
                        u.appendChild(i[0]);
                        var len=pere.childNodes[1].childNodes.length;
                           var arr=Array.from(pere.childNodes[1].childNodes);
                           for(var n=0;n<pere.childNodes[1].childNodes.length;n++){
                               pere.childNodes[1].childNodes[n].parentNode.removeChild( pere.childNodes[1].childNodes[n]);
                           }
                           arr.splice(simpos,0,u);
                        for(var v=0;v<arr.length;v++){
                            pere.childNodes[1].appendChild(arr[v]);
                        }
                    }
                    else {
                        var o=document.createElement('ul');
                        var u=document.createElement('li');
                        u.id='ele'+i[1];
                        u.appendChild(i[0]);
                        o.appendChild(u);
                        pere.appendChild(o);
                    }
                    var t=document.getElementById('bloc'+i[1]+'enreg'+0);
                    t.innerHTML='<p>'+cle+'</p>';
                    t.style.opacity=1;
                    t.style.height='25px';
                    t.style.width='20px';
                    t.style.top='-2px';



                }
            }


    }



//===========================================================================================================
//===========================================================================================================




    async supprimer(cle){
        var a=new animations();
        var algo =document.getElementById('algo');
        algo.innerHTML='<p id="titre">  &nbsp &nbsp  &nbsp &nbsp Supprimer(cle)</p> <p id="1">Recherche(cle,trouv,noeud,enrg)</p> <p id="2">si(touv= true) </p>  <p id="3"> &nbsp &nbsp &nbsp si(l\'elem à supprimer n\'a du fils droit) </p>  <p id="4"> &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp supprimer l\'element</p>    <p id="5">&nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp si le noeud est vide <br>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp supprimer noeud </p>  <p id="6"> &nbsp &nbsp &nbsp sinon </p>  <p id="7">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp remplacer l\'element a supprimer par le premier element du fils droit</p>  ';
        a.animealgo('1');
        var r=  await this.recherche(cle);
        var trouv=r[0];
        var pere=r[1];
        var noeud=r[2];
        var loc=r[3];
        if(trouv==true){
            a.animealgo('2');
            await sleep(500);
            if(this.tabbloc[noeud].tabfils[loc+1]==-1){
                a.animealgo('3');
                await sleep(500);
                a.animealgo('4');


                await   this.suppressionintern(noeud,loc);
                this.tabbloc[noeud].tabval.splice(loc,1);
                this.tabbloc[noeud].tabfils.splice(loc,1);
                this.tabbloc[noeud].degre=this.tabbloc[noeud].tabval.length+1;
                if(this.tabbloc[noeud].tabval.length==0){
                    a.animealgo('5');
                    await sleep(500);


                    var x=this.tabbloc[pere].tabfils.indexOf(noeud);
                    this.tabbloc[pere].tabfils[x]=-1;
                    var noeudsup=document.getElementById('ele'+noeud);
                    noeudsup.parentNode.removeChild(noeudsup);
                }
                this.tabbloc[noeud].degre=this.tabbloc[noeud].tabval.length+1;

            }
            else {
                a.animealgo('6');
                await sleep(500);
                a.animealgo('7');
                this.tabbloc[noeud].tabval[loc]=this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval[0];
                var elem8=document.getElementById('bloc'+noeud+'enreg'+loc);
                var elem9=document.getElementById('bloc'+this.tabbloc[noeud].tabfils[loc+1]+'enreg'+0);
                elem8.innerHTML=elem9.innerHTML;
                await this.suppressionintern(this.tabbloc[noeud].tabfils[loc+1],0);
                var noeudsup=document.getElementById('ele'+this.tabbloc[noeud].tabfils[loc+1]);


                if(this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabfils[0]==-1) {
                    this.tabbloc[this.tabbloc[noeud].tabfils[loc + 1]].tabfils.splice(0, 1);
                }
                else {
                    this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval[0]=this.tabbloc[this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabfils[0]].tabval[0];
                    var elem8=document.getElementById('bloc'+this.tabbloc[noeud].tabfils[loc+1]+'enreg'+0);
                    var elem9=document.getElementById('bloc'+this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabfils[0]+'enreg'+0);
                    elem8.innerHTML=elem9.innerHTML;
                    await  this.suppressionintern(this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabfils[0],0);
                    var noeudsup=document.getElementById('ele'+this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabfils[0]);
                    this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval.splice(0,1);
                }

                this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval.splice(0,1);


                this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].degre=this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval.length+1;
                if(   this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval.length==0){


                    this.tabbloc[noeud].tabfils[loc+1]=-1

                    noeudsup.parentNode.removeChild(noeudsup);
                    // this.tabbloc.splice(this.tabbloc[noeud].tabfils[loc+1],1);
                }



            }

        }
        else {
            algo.innerHTML+='<p id="conc2">&nbsp &nbsp &nbsp  &nbsp'+cle+' n\'existe pas</p>';
            algo.scrollTop=algo.scrollHeight;

        }


    }





}

var a=[24,40,67,82];
var b=[2,5,12,20];
var c=[27,30];
var d=[42,50,55,60];
var e=[71,80];
var f=[90,95,97,99];
var g=[10];
var h=[47,48];
var i=[63,65,66];

var g5=new bloc(g);
var h5=new bloc(h);
var i5=new bloc(i);
var b2= new bloc(b);
var c3= new bloc (c);
var d4 = new bloc(d);
var e5 =new bloc(e);
var f5=new bloc(f);
var a1 = new bloc(a);
var  tab=[g5,h5,i5,b2,c3,d4,e5,f5,a1];

var fich=new fichier(tab,a1);
fich.descendantde(a1,b2);
fich.descendantde(a1,c3);
fich.descendantde(a1,d4);
fich.descendantde(a1,e5);
fich.descendantde(a1,f5);
fich.descendantde(b2,g5);
fich.descendantde(d4,h5);
fich.descendantde(d4,i5);

var elem=document.getElementById("mair");
var ma='<span class="tf-nc" id="noeud8" >'+'</span>';
var mb='<span class="tf-nc" id="noeud3" >'+'</span>';
var mc='<span class="tf-nc" id="noeud4" >'+'</span>';
var md='<span class="tf-nc" id="noeud5" >'+'</span>';
var me='<span class="tf-nc" id="noeud6" >'+'</span>';
var mf='<span class="tf-nc" id="noeud7" >'+'</span>';
var mg='<span class="tf-nc" id="noeud0" >'+'</span>';
var mh='<span class="tf-nc" id="noeud1" >'+'</span>';
var mi='<span class="tf-nc" id="noeud2" >'+'</span>';
elem.innerHTML='<ul><li id="ele8">'+ma+'<ul><li id="ele3">'+mb+'<ul ><li id="ele0">'+mg+'</li></ul></li><li id="ele4">'+mc+'</li><li id="ele5">'+md+'<ul><li id="ele1">'+mh+'</li><li id="ele2">'+mi+'</li></ul></li><li id="ele6">'+me+'</li><li id="ele7">'+mf+'</li></li></ul>';

for(var i=0;i<fich.tabbloc.length;i++){
    let divblock=document.createElement('div');
    divblock.id='bloc'+i;
    divblock.className='bloc';
    for(var j=0;j<4;j++){
       let divenrg=document.createElement('div');
       divenrg.className='Tenreg';
       divenrg.id='bloc'+i+'enreg'+j;
       divblock.appendChild(divenrg);
    }

    var z=document.getElementById("noeud"+i);
    z.appendChild(divblock);

    for(var j=0;j<fich.tabbloc[i].tabval.length;j++){
        var x=document.getElementById('bloc'+i+'enreg'+j);
        x.innerHTML='<p>'+fich.tabbloc[i].tabval[j]+'</p>';
        x.style.opacity=1;
        x.style.height='25px';
        x.style.width='20px';
        x.style.top='-2px';


    }
}

function insere() {

    let s=document.getElementById('insinp');
    var z=s.value;
    if (z!='') {
        z=parseInt(z);
        fich.insertion(z);

        document.getElementById('inserer-form').style.display = 'none';
        box_shown = 0;
    }
}
function rech() {
        let a=document.getElementById('rechinp');
        var b=a.value;
        if (b!='') {
            b=parseInt(b);
            fich.recherche2(b);
            document.getElementById('rechercher-form').style.display = 'none';
            box_shown = 0;
        }
}
function supp() {
        let s=document.getElementById('supinp');
        var z=s.value;

if (z!='') {
    z=parseInt(z);
    fich.supprimer(z);

    document.getElementById("supprimer-form").style.display = 'none';
    box_shown = 0;
}
}


document.getElementById('inssub').onclick=insere;
document.getElementById('rechsub').onclick=rech;
document.getElementById('supsub').onclick=supp;


function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    document.getElementById('mair').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>Arbre M-air</p>\n' +
        '                        </div>\n' +
        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Information sur la structure:</h3>\n' +
        '                        Un arbre de recherche m-aires est la généralisation d\'un arbre de\n' +
        '                        <br>\n' +
        '                        recherche binaire pour les ordres > 2 2 Un arbre de recherche m-aires \n' +
        '                        <br>\n' +
        '                        d\'ordre n est un arbre où chaque noeud peut avoir au maximum n fils\n' +
        '                        <br>\n' +
        '                       (Fils [1...n]) et n-1 valeurs (Val [1...n-1]).\n' +
        '                        <br>\n' +
        '                        <br>\n' +
        '                       Les fils sont organisés en fonction des valeurs du noeuds, selon \n' +
        '                        <br>\n' +
        '                         les règles suivantes :\n' +
        '                        <br>\n' +
        '                       i) Le Fils [1] pointe un sous-arbre contenant des valeurs < à Val [1] \n' +
        '                        <br>\n' +
        '                      ii) Le Fils[i] pointe un sous-arbre contenant des valeurs > Val[i-1]  \n' +
        '                        <br>\n' +
        '                       et < Val[i], pour i=2...n-1\n' +
        '                        <br>\n' +
        '                       iii) Le Fils[n] pointe un sous-arbre contenant des valeurs > Val[n-1]\n' +

        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            - L\'arbre est d\'ordre 5 \n' +
        '                            <br>\n' +
        '                            - Chaque noueds non feuille a 5 fils (seuls les fils remplis sont affichés)\n' +
        '                            <br>\n' +
        '                            - L\'ordre d\'un fils affiché est l\'emplacement de la premiere  \n' +
        '                            <br>\n' +
        '                            valeur > aux valeurs du fils\n' +
        '                            <br>\n' +
        '                            <img class="mt-5" src="assets/img/struct.JPG" width="500">\n' +
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
