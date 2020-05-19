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
function Entete(nb) {
    this.nb=nb;
}

Entete.prototype={
    constructor :Entete,
    Entete:function () {
        var a;
        a=this.nb;
        return a;
    },
    Aff_entete:function (val) {
        this.nb=val;
    },
};



function Tbloc(cle) {
    this.cle=cle;
}
Tbloc.prototype={
    constructor:Tbloc,
};


//==========================================================classe animations========================

function animations() {

}
animations.prototype={
    constructor:animations(),


//*******************************************************
    animeblockup:function () {
        anime({
            targets:document.getElementById('fichier'),
            translateY:50,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },



    animeBlockreturn:function () {
        anime({
            targets:document.getElementById('fichier'),
            translateY:0,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },
//*******************************************************
    animeblockFragup:function (i) {
        anime({
            targets:document.getElementById('F'+i),
            translateY:50,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },



    animeBlockFragreturn:function (i) {
        anime({
            targets:document.getElementById('F'+i),
            translateY:0,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },
//*******************************************************
    animeblockFragTrup:function (i) {
        anime({
            targets:document.getElementById('F'+i+'T'),
            translateY:50,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },



    animeBlockFragTrreturn:function (i) {
        anime({
            targets:document.getElementById('F'+i+'T'),
            translateY:0,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },

//*******************************************************
    animeblockTrup:function () {
        anime({
            targets:document.getElementById('fichierTr'),
            translateY:50,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },



    animeBlockTrreturn:function () {
        anime({
            targets:document.getElementById('fichierTr'),
            translateY:0,
            translateX: 0,
            duration:1000*speed,
            easing: 'linear'
        });
    },






    animeblock:function (nmrDuBlock,color) {
        let a=document.getElementById('block'+(nmrDuBlock+1));
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


    animeblockFrag:function (nmrDuFrag,nmrCase,color) {
        let a=document.getElementById((nmrDuFrag)+'frag'+(nmrCase));
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

    animeblockFragT:function (nmrDuFrag,nmrCase,color) {
        let a=document.getElementById((nmrDuFrag)+'frag'+(nmrCase)+'T');
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


    animeblockTr:function (nmrDuBlock,color) {
        let a=document.getElementById('block'+(nmrDuBlock)+'T');
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

    aff_entete:function (val) {
        this.Entete.Aff_entete(val);   //
    },
    entete:function (){
        return  this.Entete.Entete();   //
    },



    insertion:async function(cle){
        if(this.entete() < 15) {
            let anim = new animations();
            anim.animeblockup();
            anim.animeblock(this.entete(), '#F0FF03');
            await sleep(500);
            let buf = this.liredir(this.entete());
            if (buf == null) {
                buf = new Tbloc(cle);
                buf.cle = cle;
                document.getElementById('block'+(this.entete()+1)).innerHTML='<p>'+buf.cle+'</p>';
                let divblock=document.getElementById('block'+(this.entete()+1));
                divblock.style.borderColor='#0365FF';
                inser = true;
                anim.animeblock(this.entete(), '#32FF03');
                await sleep(800);
                this.aff_entete(this.entete() + 1);
                anim.animeBlockreturn();
            }
        }else {
            alert('le fichier est complet ! ');
        }
    },

    initialisation_perso:async function (tab) {

        let initialise=0;
        while (initialise < tab.length){
            let vall = parseInt(tab[initialise]);
            await this.insertion(vall);
            initialise++;
        }
    },

    initialisation_random:async function(nombreElemntAinserer){
        let tab=[];
        let initialise=0;
        while (initialise < nombreElemntAinserer){
            let val=Math.floor(Math.random() * 101);
            tab[initialise]=val;
            initialise++;
        }
        initialise=0;

        while (initialise < nombreElemntAinserer){
            let vall = tab[initialise];
            await this.insertion(vall);
            initialise++;
        }
    },

    fragEtTri:async function(){
        
        let anim = new animations();
        let b = 0;


        alert(' FRAGMENTATION EN COURS ...');


        document.getElementById('hid').removeAttribute('hidden');
        for(let i=1;i<=3;i++){
            anim.animeblockFragup(i);
            for(let j=1;j<=5;j++){
                anim.animeblock(b,"#E5FF03");
                await sleep(700);
                let divblock=document.getElementById(i+'frag'+j);
                divblock.style.borderColor='#E5FF03'
                document.getElementById(i+'frag'+j).innerHTML = document.getElementById('block'+(b+1)).textContent;
                anim.animeblockFrag(i,j,'#49FF03');
                await sleep(1000);
                b++;

            }
            anim.animeBlockFragreturn(i);
        }


        alert(' TRI EN COURS ...');


        document.getElementById('trihide').removeAttribute('hidden');
        let fragment1=[] , w1=0;
        let fragment2=[] , w2=0;
        let fragment3=[] , w3=0;
        for (let w=1;w<=5;w++){
            fragment1[w1] = document.getElementById(1+'frag'+w).textContent;
            w1++;
        }
        for (let ww=1;ww<=5;ww++){
            fragment2[w2] = document.getElementById(2+'frag'+ww).textContent;
            w2++;
        }
        for (let www=1;www<=5;www++){
            fragment3[w3] = document.getElementById(3+'frag'+www).textContent;
            w3++;
        }


        //------------------------------------------------
        fragment1.sort(function (a,b) {
            return a - b;
        });

        anim.animeblockFragTrup(1);
        anim.animeblockFragup(1);

        for(let f1=1;f1<=5;f1++){
            let divblock=document.getElementById('1frag'+f1+'T');
            divblock.style.borderColor='#FF03DC'

            document.getElementById('1frag'+f1+'T').innerHTML=fragment1[f1-1];

            anim.animeblockFragT(1,f1,'#49FF03');
            await sleep(2000);

        }
        anim.animeBlockFragTrreturn(1);
        anim.animeBlockFragreturn(1);


        //------------------------------------------------
        fragment2.sort(function (a,b) {
            return a - b;
        });
        anim.animeblockFragTrup(2);
        anim.animeblockFragup(2);


        for(let f2=1;f2<=5;f2++){

            let divblock=document.getElementById('2frag'+f2+'T');
            divblock.style.borderColor='#FF03DC'

            document.getElementById('2frag'+f2+'T').innerHTML=fragment2[f2-1];

            anim.animeblockFragT(2,f2,'#49FF03');
            await sleep(2000);
        }
        anim.animeBlockFragTrreturn(2);
        anim.animeBlockFragreturn(2);


        //------------------------------------------------
        fragment3.sort(function (a,b) {
            return a - b;
        });
        anim.animeblockFragTrup(3);
        anim.animeblockFragup(3);


        for(let f3=1;f3<=5;f3++){
            let divblock=document.getElementById('3frag'+f3+'T');
            divblock.style.borderColor='#FF03DC'

            document.getElementById('3frag'+f3+'T').innerHTML=fragment3[f3-1];

            anim.animeblockFragT(3,f3,'#49FF03');
            await sleep(2000);
        }
        anim.animeBlockFragTrreturn(3);
        anim.animeBlockFragreturn(3);


        //-------------------------------------------------
        alert(' FUSION EN COURS ...');

        document.getElementById('fichTr').removeAttribute('hidden');

        // anim.animeblockTrup();

        let tab_fus_vir = [];


        for (let i=1;i<=5;i++) {
            tab_fus_vir[i-1] = document.getElementById('1frag'+i+'T').textContent;
        }

        for (let i=1;i<=5;i++) {
            tab_fus_vir[i+4] = document.getElementById('2frag'+i+'T').textContent;
        }

        for (let i=1;i<=5;i++) {
            tab_fus_vir[i+9] = document.getElementById('3frag'+i+'T').textContent;
        }


        tab_fus_vir.sort(function (a,b) {
            return a - b;
        });

        let r=0,trv=false;

        for (let ter=1;ter<=15;ter++){

            anim.animeblockFragTrup(1);
            for (let y=1;y<=5;y++){
                anim.animeblockFragT(1,y,"#E5FF03");
                await sleep(500);
            }
            anim.animeBlockFragTrreturn(1);

            anim.animeblockFragTrup(2);
            for (let yy=1;yy<=5;yy++){
                anim.animeblockFragT(2,yy,"#E5FF03");
                await sleep(500);
            }
            anim.animeBlockFragTrreturn(2);

            anim.animeblockFragTrup(3);
            for (let yyy=1;yyy<=5;yyy++){
                anim.animeblockFragT(3,yyy,"#E5FF03");
                await sleep(500);
            }
            anim.animeBlockFragTrreturn(3);


            //-_-_-_-__-_-_-_-_-_-_-__-_-_-_-_-__-_-_-_-__-_-_-_-_-_


            let divblock=document.getElementById('block'+(ter)+'T');
            divblock.style.borderColor='#49FF03'

            document.getElementById("block"+ter+"T").innerHTML = tab_fus_vir[ter-1];
            anim.animeblockTr(ter,"#49FF03");
            await sleep(5000);
            trv=false;
        }

        anim.animeBlockTrreturn();

        alert(" FIN TRI !! ");
    },

};

var entetee =new Entete(0);
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


}

function init_perso() {
    vider_alertt();
    let a = document.getElementById('cles').value.split(',');
    if (verif(a)) {
        if (!initialiseee) {

            if (a.length > 15) {
                alertt(1, ' Le nombre maximale est 15 ! ');
            } else {
                hide_form_box(1);
                box_shown = 0;
                fichier.initialisation_perso(a);
                initialiseee = true;
            }
        } else {
            alertt(1, 'le fichier est déja initialisé');
        }
    }
    else {
        alertt(1,'l\'un de clés n\'est pas un nombre');
    }
}




function init_random() {
    vider_alertt();
    if (!initialiseee) {
        let a = 15;
        if(a>15){

        }else {
            hide_form_box(2);
            box_shown=0;
            fichier.initialisation_random(a);
            initialiseee = true;
        }
    }
    else{
        alertt(2,'le fichier est déja initialisé');
    }

}

function tri() {
    vider_alertt();
    if (initialiseee) {
        hide_form_box(3);
        box_shown=0;

        fichier.fragEtTri();

    }else{
        alertt(3,' Le fichier n\'est pas initialisé !');
    }
}


function affich_guide_struct() {
    document.getElementById('algo').style.display='none';
    document.getElementById('trii').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>Tri</p>\n' +
        '                        </div>\n' +
        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Information sur la structure:</h3>\n' +
        '                         - L\'operation consiste a trier un fichier de format TObF.\n' +
        '                        <br>\n' +
        '                         - On utilise la méthode de la fragmentation\n' +
        '                        <br>\n' +

        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            La page est repartis en quatre partie:\n' +
        '                            <br>\n' +
        '                            - 1er partie est pour le fichier a trier. \n' +
        '                            <br>\n' +
        '                            - La 2eme partie est pour les fragments utilisés en mémoire centrale (MC).\n' +
        '                            <br>\n' +
        '                            - La 3eme partie est pour les fragments triés. \n' +
        '                            <br>\n' +
        '                            - La 4eme partie est pour le fichier résultat. \n' +
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





