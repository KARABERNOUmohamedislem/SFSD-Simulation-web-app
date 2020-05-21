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
//===========================================animation classe========================================== //modified
function animations() {             
}
animations.prototype={
    constructor:animations(),
    anime_donnee:function (nmrDonnee,color,still=false) {
        let a=document.getElementById('donnee'+(nmrDonnee));
        if (still){
            animation=anime({
                targets: a,
                background:color,
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
                        value: '#ffffff',
                        duration: 100 * speed,
                    }
                ]
            })
        }
    },
    anime_lien:function(nmr,color){
        let a=document.getElementById('caselien'+(nmr));
        animation=anime({
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
    anime_adr:function(nmr,color){
        let a=document.getElementById(nmr);
        animation=anime({
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
    anime_vide:function(nmr,color){
        let a=document.getElementById('casevide'+(nmr));
        animation=anime({
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
    anime_border_donnee: function (nmrDonnee,borderColor) {
        animation=anime({
            targets:'donnee'+(nmrDonnee),
            borderTopColor:borderColor,
        });
    }
};

//===========================================hachage interne classe==========================================


function TCase(donnee,vide,lien) {
    this.donnee=donnee;
    this.vide=vide;
    this.lien=lien;
}
TCase.prototype={
    constructor:TCase,
};

function Table_Hachage(tab,taille_max,nombre_donnees,doubleHachage=false) {
    this.tab=tab;
    this.taille_max=taille_max;
    this.nombre_case_vide=taille_max;
    this.nombre_donnees=nombre_donnees; //nombre de donnees = nombre de cases
    this.doubleHachage=doubleHachage;

    let container=document.getElementById('Essai lineaire');
    let table=document.createElement('table');
    table.className='table-fill';
    let x;
    x='<thead>\n' +
            '            <tr>\n' +
            '                <th class="text-center adresse">Adresse</th>\n' +
            '                <th class="text-center donnee">Donnees</th>\n' +
            '				 <th class="text-center vide">Vide</th>\n' +
            '				 <th class="text-center lien">Lien</th>\n' +            
            '            </tr>\n' +
            '        </thead>';
    table.innerHTML=x;
    let tblock=document.createElement('tbody');
    tblock.className='table-hover';
    for (let k=0;k<taille_max;k++){
        this.tab[k]=new TCase(undefined,1,"null");
        let tr=document.createElement('tr');
        tr.innerHTML='<td id="'+k+'" class="text-center">'+k+'</td>'+'<td id="donnee'+k+'" class="text-center ">Vide</td>'+'<td id="casevide'+k+'" class="text-center">1</td>'+'<td id="caselien'+k+'" class="text-center">null</td>';
        tblock.appendChild(tr);
    }
	table.appendChild(tblock);
    container.appendChild(table);
    let canvas=document.createElement('canvas');
    canvas.className='fleches';
    canvas.id='fleche-cote';
    let y=38*taille_max;
    canvas.height=y;
    canvas.width=210;
    container.appendChild(canvas);
}

Table_Hachage.prototype={
    constructor:Table_Hachage,

    fonction_hachage:async function(x , animation=false){
    	let a = x % 5;
    	if (animation) {
 		      document.getElementById('case-hach1').style.opacity = 0;
     	      document.getElementById('fleche-right').style.opacity = 0;
		      document.getElementById('case-hach2').style.opacity = 0;
		      //document.getElementById('fleche-right-prim').style.opacity = 0;
		      //document.getElementById('case-hach2-prim').style.opacity = 0;
		      await sleep(600);
		      document.getElementById('donne1').innerText = x;
		      document.getElementById('donne2').innerText = a;
		      document.getElementById('case-hach1').style.opacity = 1;
		      await sleep(500);
		      document.getElementById('fleche-right').style.opacity = 1;
		      await sleep(500);
		      document.getElementById('case-hach2').style.opacity = 1;
		      await sleep(500);
		}

        return x%5;
    },
    filllien:async function(nbrcase,lien){
    	let lll = document.getElementById('caselien'+nbrcase);
    	lll.innerText=lien;
    },
    fillcase:async function(donnee,nbrcase,lien,vide=0){
        let ncase=document.getElementById('donnee'+nbrcase);
        ncase.innerText=donnee;
        let videe=document.getElementById('casevide'+nbrcase);
        videe.innerText=vide;
        let lienn=document.getElementById('caselien'+nbrcase);
        lienn.innerText=lien;
	},
    resete:async function(){
  	    let an=new animations();
	    for (let k=0;k<this.taille_max;k++){
	        an.anime_donnee(k,'#fff',true);
        }
    },

    recherche:async function (donnee_x) {
            this.resete();
            let a=new animations();
            let trouv=false;
            let stop =false;
            let adr= await this.fonction_hachage(donnee_x,true);
            let kk=adr;
            let stayadr=adr;
            let previous_adr;
            let cpt=0;
            while ((!trouv) && (this.tab[adr].vide == 0)){ //non vide
                if (this.tab[adr].donnee==donnee_x){
                    trouv=true;
                    a.anime_adr(adr,"#f0f80a");   //jaune
                    await sleep(1000);
                    a.anime_vide(adr,"#43ee06");       //vert
                    await sleep(1000);
                    a.anime_donnee(adr,"#f0f80a");       //jaune
                    await sleep(500);
                    a.anime_donnee(adr,'#43ee06',true);
                    await sleep(1000);
                }
                else {
                    cpt++;
                    if(this.tab[adr].lien == "null"){
                        a.anime_adr(adr,"#f0f80a"); 
                        await sleep(1000);
                        a.anime_vide(adr,"#43ee06");       //vert
                        await sleep(1000);
                        a.anime_donnee(adr,"#F10B2B");   //rouge
                        await sleep(1000);   
                
                        adr = adr + (5 - adr);
                        while(adr<this.taille_max && this.tab[adr].vide ==0){
                            // a.anime_vide(adr,"#F10B2B");       //vert
                            // await sleep(1000);
                            adr=adr+1;
                            if(adr == this.taille_max){
                                adr=5;
                            }
                        }
                        a.anime_vide(adr,"#43ee06");       
                        await sleep(1000);
                        a.anime_donnee(adr,'#43ee06',true);
                        await sleep(1000);
                        a.anime_adr(adr,"#43ee06");       
                        await sleep(1000);
                        
                        
                        previous_adr = stayadr;
                        
                    }else{
                        // adr = adr + (5 - adr);
                        stop=false;
                        while((adr<this.taille_max) && (this.tab[adr].vide ==0) && (!stop)){
                            
                            if(this.tab[adr].donnee == donnee_x){
                                trouv = true;
                                stop = true;
                                a.anime_vide(adr,"#43ee06");       
                                await sleep(1000);
                                a.anime_donnee(adr,'#43ee06',true);
                                await sleep(1000);
                                a.anime_adr(adr,"#43ee06");       
                                await sleep(1000);
                                previous_adr=stayadr;
                            }else{
                                if(await this.fonction_hachage(this.tab[adr].donnee) == kk){
                                    stayadr = adr;
                                }
                                a.anime_vide(adr,"#F10B2B");       //rouge
                                await sleep(1000);
                                a.anime_donnee(adr,"#F10B2B");       //rouge
                                await sleep(1000);
                                if (this.tab[adr].lien=='null'){
                                    stop=true;
                                }
                                else {
                                    adr=this.tab[adr].lien;
                                }

                                if(adr == this.taille_max){
                                    adr=5;
                                }
                                previous_adr=stayadr;
                    
                            }

                        }
                       // a.anime_adr(adr,"#43ee06");
                        //await sleep(1000);
                        
                        
                    }
                   
                }
            }            
            if (!trouv){
                await sleep(1000);
                a.anime_adr(adr,"#f0f80a");       //rouge
                await sleep(1000);
                await sleep(1000);
                a.anime_donnee(adr,"#F10B2B");       //rouge
                await sleep(1000);

            }
            else{

            }
            
            if(cpt >0){
                return [trouv,adr,previous_adr];
            }else{
                if(cpt==0){
                    return[trouv,adr,"null"];
                }
            }
      },



    insertion:async function (donnee_x) {
    	let y=new animations();
    	let an=new animations();
    	if(this.nombre_case_vide !=0){
    		let a=await this.recherche(donnee_x);
	        let trouv=a[0],adr=a[1],prev=a[2];

	        if (!trouv){
	        	if(prev =="null"){
                    
	        		this.tab[adr].donnee=donnee_x;
	                this.tab[adr].vide=0;
                    await sleep(1000);
                    an.anime_adr(adr,'#f0f80a');
                    await sleep(1000);
                    an.anime_donnee(adr,'#f0f80a');   //jaune
                    await sleep(1000);
                    an.anime_vide(adr,'#f0f80a');
                    await sleep(1000);
	                this.fillcase(donnee_x,adr,"null");
	                an.anime_donnee(adr,'#43ee06');   //vert
	                await sleep(100);
	                this.nombre_case_vide--;
	                this.nombre_donnees++;
	        	}else{
	        		this.tab[prev].lien=adr;
                    await sleep(500);
                    //y.anime_adr(adr,"#f0f80a");
                    //await sleep(1000);
                    //y.anime_vide(adr,"#43ee06");
                    //await sleep(1000);

	        		


	                this.tab[adr].donnee=donnee_x;
	                this.tab[adr].vide=0;
                    //await sleep(1000);
                    //an.anime_donnee(adr,'#f0f80a');
	                this.fillcase(donnee_x,adr,"null");
                    //an.anime_donnee(adr,'#43ee06');   //vert
	                //await sleep(1000);

                    await sleep(1000);
                    y.anime_adr(adr,"#f0f80a");
                    this.filllien(prev,adr);
                    y.anime_lien(prev,'#f0f80a');   //jaune
                    await sleep(1000);
	                this.nombre_case_vide--;
	                this.nombre_donnees++;
	            }

	        }
	        else {
	            console.log('la donnee existe deja');
	            alert('la donnee existe deja');
	        }
    	}else{
    		console.log('the table is full');
          	alert('la table est remplis au maximum');
    	}


    },

    

    suppression_physique:async function (donnee_x){
   		let a=await this.recherche(donnee_x);
    	let canvas=document.getElementById('fleche-cote');
        let ctx=canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let an=new animations();
        let trouv=a[0],adr=a[1],pre=a[2];	
        if(trouv){
        	if(this.tab[adr].lien == "null"){
        		this.tab[adr].donnee = "Vide";
        		this.tab[adr].vide=1;
        		an.anime_donnee(adr,'#f0f80a'); //jaune
	            this.fillcase("Vide",adr,"null",1);
	            await sleep(200);
	            an.anime_donnee(adr,'#43ee06');
                await sleep(300);
                //an.anime_vide(adr,'#FF0404');

                if((pre != null)  && (this.tab[pre].vide == 0)){
                	this.tab[pre].lien = "null";
                	an.anime_donnee(adr,'#f0f80a');
                	this.filllien(pre,"null");
                	await sleep(300);
                	an.anime_lien(pre,'#FF0404');
                	await sleep(300);
                }
                this.nombre_donnees--;
                this.nombre_case_vide++;
        	}else{
        		let pro_adr = this.tab[adr].lien;
        		while(pro_adr != "null"){
        			this.tab[adr].donnee=this.tab[pro_adr].donnee;
        			this.tab[adr].vide = this.tab[pro_adr].vide;
        			an.anime_donnee(pro_adr,'#f0f80a');
        			this.fillcase(this.tab[pro_adr].donnee,adr,this.tab[adr].lien,this.tab[pro_adr].vide);
        			await sleep(500);
        			adr=this.tab[adr].lien;
        			pro_adr = this.tab[adr].lien;
        		}
        		let k=0,trv;
        		do{
        			if(this.tab[k].lien == adr){
        				this.tab[k].lien = "null";
        				this.filllien(k,"null");
        				trv = true;
        			}else{
        				k++;
        				trv = false;
        			}
        		}while((k<this.taille_max) && (trv == false));
        		
        		this.tab[adr].donnee = "Vide";
        		this.tab[adr].vide = 1;
        		this.fillcase("Vide",adr,"null",1);


        	    this.nombre_donnees--;
                this.nombre_case_vide++;
        	}
        }else{
        	console.log('Donnee non trouve !');
            alert('Donnee non trouve !');
        }

    },
    
};

let fich = new Table_Hachage([],11,0,true);


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
            await fich.suppression_physique(s);
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
        '                            <p>Chainage Interne</p>\n' +
        '                        </div>\n' +
        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Information sur la structure:</h3>\n' +
        '                        - Le principe de hachage est de Stocker des données (x) dans une table (T)\n' +
        '                        <br>\n' +
        '                         en utilisant une fonction (h) pour la localisation rapide.\n' +
        '                        <br>\n' +
        '                        - Chainage Interne : son principal fonctionnement est : les données en débordement  \n' +
        '                        <br>\n' +
        '                       (en cas de collisions) sont stockées dans la table (dans le même espace  \n' +
        '                        <br>\n' +
        '                       « adressable » par la fonction) en gardant le chaînage entre les synonymes\n' +
        '                        <br>\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Information sur la visualisation:</h3>\n' +
        '                            - A gauche de la page de simulation, on a une zone pour le calcul d\'adresse.\n' +
        '                            <br>\n' +
        '                            - Et a droite, on a le tableau où on insere les données. \n' +
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
