
    var animation = anime({

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

    //---------------------Animation--------------------------------------------------------

    function Animation(){
    }
    Animation.prototype = {
    constructor:Animation(),

    visible: function(num){
        document.getElementById('bloc' + num).style.opacity = '1';
    },

    visibleway: function(from, to){
        if(to != 0 && to < 31){
            document.getElementById('after_' + from).style.opacity = '1';
        if(to != 3 && to != 8 && to != 13 && to != 18 && to != 23 && to != 28){
            document.getElementById('to_' + to).style.zIndex = z;
            z++;
            document.getElementById('to_' + to).style.opacity = '1';
        }
        document.getElementById('before_' + to).style.opacity = '1';
        }
    },

    hidden: function(num){
        document.getElementById('bloc' + num).style.opacity = '0';
    },

    hiddenway: function(from, to){
        if(to != 0 && to < 31){
            document.getElementById('after_' + from).style.opacity = '0';
        if(to != 3 && to != 8 && to != 13 && to != 18 && to != 23 && to != 28){
            document.getElementById('to_' + to).style.zIndex = z;
            z++;
            document.getElementById('to_' + to).style.opacity = '0';
        }
        document.getElementById('before_' + to).style.opacity = '0';
        }
    },

    selectnoeud:function(num, color){
        animation = anime({
        targets: document.getElementById('bloc' + num),
        borderColor:[
            {value: color},
        ]
        })
    },

    selectval: function(num_bloc, num_val, color){
        animation = anime({
        targets: document.getElementById('bloc' + num_bloc).getElementsByClassName('val')[num_val],
        backgroundColor:[
            {value: color}
        ]
        })
    },

    selectway: function(num_from, num_to, color){
        if(num_to != 0){
        animation = anime({
            targets: document.getElementById('after_' + num_from),
            borderColor:[
            {value: color}
            ]
        });
        if(num_to != 3 && num_to != 8 && num_to != 13 && num_to != 18 && num_to != 23 && num_to != 28){
            document.getElementById('to_' + num_to).style.zIndex = z;
            z++;
            animation = anime({
            targets: document.getElementById('to_' + num_to),
            borderColor:[
                {value: color}
            ],
            });
        }
        animation = anime({
            targets: document.getElementById('before_' + num_to),
            borderColor:[
            {value: color}
            ]
        });
        }
    },

    select_entete:async function(n, inf){
        let x = document.getElementsByClassName('entet')[n];
        animation = anime({
            targets : x,
            borderColor:[
                {value: "#00FFFF"}
                ]
        });
        await sleep(500);
        x.innerHTML = inf;
        await sleep(400);
        animation = anime({
            targets : x,
            borderColor:[
                {value: "#ddd"}
                ]
        });
    }
    }


    //-------------------------------Structure----------------------------------------------



    var e, nb_val, erreur, val_prec, max_n = 4, max_p = 20, res = [], w = 0, anime_pile = [], anim = new Animation(), z = 1, w5, wf1, wf2;

    // Definition de la structure entête (bloc0 du fichier B-Arbre)
    function Entete(){
        this.racine = -1;		// num de bloc racine
        this.tete_blocs_libres = -1;	// Liste des blocs liberes (pour recuperation)
        this.nbnoeud = 0;		// Nombre de blocs alloues au fichier
        this.nbvaleurs = 0;		// Nombre de valeurs dans l'arbre
        this.prof = 0;		// Hauteur de l'arbre
    }

    Entete.prototype = {
    constructor:Entete,



    }

    function t_noeud(){
    this.fils = [];     // Tableau d'adr vers les noeuds fils
    this.nb = 0;       // nb de valeurs (cles) presentes dans le bloc (degre - 1)
    this.t_cle = [];    // Tableau des valeurs (cles)
    }
    t_noeud.prototype = {
    constructor:t_noeud,

    ins_noeud:async function(a, v, fd){
        if(this.nb < max_n){
        let i = 0, j;
        while(i < this.nb && this.t_cle[i] < v){     // chercher la pos i ou doit etre inseree v
            anim.selectval(w, i, "#E0FFFF");
            await sleep(500);
            anim.selectval(w, i, "#F2F2F7");
            i++;
        }    
        anim.selectval(w, i, "#7FFFD4");
        await sleep(500);

        for(j = this.nb; j>i; j--){                  /* decalage a droite des cles et des fils */
            document.getElementById('bloc' + w).getElementsByClassName("val")[(j-1)].style.color = "#00FFFF";
            await sleep(400);
            document.getElementById('bloc' + w).getElementsByClassName("val")[(j-1)].style.color = "#000";
            document.getElementById('bloc' + w).getElementsByClassName("val")[(j-1)].innerHTML = "";
            document.getElementById('bloc' + w).getElementsByClassName("val")[j].style.color = "#00FFFF";
            document.getElementById('bloc' + w).getElementsByClassName("val")[j].innerHTML = this.t_cle[j-1];
            await sleep(400);
            document.getElementById('bloc' + w).getElementsByClassName("val")[j].style.color = "#000";
            if(this.fils[j] != -1){
            anim.selectway(w, fils0(w) + j, "#FF8C00");
            await sleep(400);
            anim.selectway(w, fils0(w) + j, "#000");
            anim.selectway(w, fils0(w) + j + 1, "#FF8C00");
            await sleep(400);
            anim.selectway(w, fils0(w) + j + 1, "#000");
            }
            this.t_cle[j] = this.t_cle[j-1];
            this.fils[j+1] = this.fils[j];
        }
        
        document.getElementById('bloc' + w).getElementsByClassName("val")[i].innerHTML = v;
        await sleep(500);
        if(fd != -1){
            anim.selectway(w, (fils0(w) + i+1), "#FF8C00");
            anim.visibleway(w, fils0(w)+i+1);
            a.aff(fd, fils0(w) + i +1);
            await sleep(400);
            anim.selectway(w, fils0(w) + i + 1, "#000");
        }
        anim.selectval(w, i, "#F2F2F7");
        this.t_cle[i] = v;
        this.fils[i+1] = fd;
        this.nb++;
        }
    },

    del_noeud:async function(a, v){
        let i = 0, j;
        // recherche de v
        while(i < this.nb && this.t_cle[i] != v) i++;

        if(i < this.nb){
        for(j=i; j< (this.nb - 1); j++){
            document.getElementById('bloc' + w).getElementsByClassName("val")[(j+1)].style.color = "#00FFFF";
            await sleep(500);
            document.getElementById('bloc' + w).getElementsByClassName("val")[(j+1)].innerHTML = "";
            document.getElementById('bloc' + w).getElementsByClassName("val")[(j+1)].style.color = "#000";
            document.getElementById('bloc' + w).getElementsByClassName("val")[j].style.color = "#00FFFF";
            document.getElementById('bloc' + w).getElementsByClassName("val")[j].innerHTML = this.t_cle[j+1];
            await sleep(500);
            document.getElementById('bloc' + w).getElementsByClassName("val")[j].style.color = "#000";

            if(this.fils[j+2] != -1){
            anim.selectway(w, fils0(w) + j + 2, "#FF8C00");
            await sleep(500);
            anim.hiddenway(w, fils0(w) + j + 2);
            document.getElementById('after_' + w).style.opacity = '1';
            vider(fils0(w) + j + 2);
            anim.selectway(w, fils0(w) + j + 2, "#000");
            anim.visibleway(w, fils0(w) + j + 1);
            await sleep(500);
            anim.selectway(w, fils0(w) + j + 1, "#FF8C00");
            await sleep(500);
            a.aff(this.fils[j+2], fils0(w) + j + 1);
            anim.selectway(w, fils0(w) + j + 1, "#000");
            }


            this.t_cle[j] = this.t_cle[j+1];
            this.fils[j+1] = this.fils[j+2];
        }
        if(i == this.nb - 1){
            document.getElementById('bloc' + w).getElementsByClassName("val")[i].innerHTML = "";
        }
        this.nb--;
        this.t_cle.pop();
        this.fils.pop();

        anim.selectval(w, i, "#F2F2F7");
        }
    },

    rech_noeud:async function(v){
        let i, bi = 0, bs = this.nb-1, trouv = false;
        anim.selectval(w, bi, "#E0FFFF");
        anim.selectval(w, bs, "#E0FFFF");   //#808000 #7FFFD4   #00FF00
        await sleep(500);
        while(!trouv && bi <= bs){
        i = Math.trunc((bi + bs) / 2);
        anim.selectval(w, i, "#808000");
        await sleep(500);
        if(v < this.t_cle[i])  
        {
            anim.selectval(w, bs, "#F2F2F7");
            await sleep(400);
            bs = i - 1;
            if(bs >= 0)  
            {
            anim.selectval(w, bs, "#E0FFFF");
            await sleep(500);
            }
        }
        else if(v > this.t_cle[i])   
                {
                anim.selectval(w, bi, "#F2F2F7");
                await sleep(500);
                bi = i + 1;
                if(bi < 4)  
                {
                    anim.selectval(w, bs, "#E0FFFF");
                    await sleep(500);
                }
                }
                else 
                {
                anim.selectval(w, i, "#00FF00");
                await sleep(500);
                trouv = true;
                anim.selectval(w, bi, "#F2F2F7");
                anim.selectval(w, bs, "#F2F2F7");
                }
                
        anim.selectval(w, i, "#F2F2F7");
        }
        if(bi < 4 && !trouv) anim.selectval(w, bi, "#F2F2F7");
        if(bs > -1 && !trouv) anim.selectval(w, bs, "#F2F2F7");
        if(!trouv)   i = bi;

        res = [];
        res.make = [trouv, i];
    },

    fusion_noeud:async function(a, n2, sep, f1, f2){
        let i, j;
        i = this.nb;
        j = 0;
        // commencer par inserer le separateur a la fin du bloc courant

        
        anim.selectval(f1, i, "#00FFFF");
        await sleep(400);
        document.getElementById('bloc' + f1).getElementsByClassName('val')[i].innerHTML = sep;
        await sleep(700);
        anim.selectval(f1, i, "#F2F2F7");

        if(n2.fils[0] != -1){
        anim.selectway(f2, fils0(f2), "#FF8C00");
        await sleep(500);
        anime.hiddenway(f2, fils0(f2));
        document.getElementById('after_' + f2).style.opacity = '1';
        vider(fils0(f2));
        anim.selectway(f2, fils0(w), "#000");
        anim.visibleway(f1, fils0(f1) + i + 1);
        await sleep(500);
        anim.selectway(f1, fils0(f1) + i + 1, "#FF8C00");
        await sleep(500);
        a.aff(n2.fils[0], fils0(f1) + i + 1);
        anim.selectway(f1, fils0(f1) + i + 1, "#000");
        }

        this.t_cle[i] = sep;
        this.fils[i+1] = n2.fils[0];    // comme fd, le 1er fils de n2.
        i++;
        // rajouter tous les elts de n2 dans le noeud this

        while(j < n2.nb){
        anim.selectval(f2, j, "#00FFFF");
        await sleep(700);
        anim.selectval(f1, i, "#00FFFF");
        await sleep(400);
        document.getElementById('bloc' + f1).getElementsByClassName('val')[i].innerHTML = n2.t_cle[j];
        document.getElementById('bloc' + f2).getElementsByClassName('val')[j].innerHTML = "";
        await sleep(700);
        anim.selectval(f2, j, "#F2F2F7");
        anim.selectval(f1, i, "#F2F2F7");

        if(n2.fils[j+1] != -1){
            anim.selectway(f2, fils0(f2) + j +1, "#FF8C00");
            await sleep(500);
            anime.hiddenway(f2, fils0(f2) + j +1);
            document.getElementById('after_' + f2).style.opacity = '1';
            vider(fils0(f2) + j +1);
            anim.selectway(f2, fils0(f2) + j +1, "#000");
            anim.visibleway(f1, fils0(f1) + i + 1);
            await sleep(500);
            anim.selectway(f1, fils0(f1) + i + 1, "#FF8C00");
            await sleep(500);
            a.aff(n2.fils[j+1], fils0(f1) + i + 1);
            anim.selectway(f1, fils0(f1) + i + 1, "#000");
        }

        this.t_cle[i] = n2.t_cle[j];
        this.fils[i+1] = n2.fils[j+1];
        i++;
        j++;
        }

        // MAJ du champs Nb du noeud this
        this.nb = i; 	// i = max_n si ce dernier est pair

    },

    redist_G_noeud:async function(a, bf, pere, indice_sep){
        let k, nbv = Math.trunc((bf.nb - Math.trunc(max_n / 2)) / 2);
        if(nbv == 0)  nbv = 1;   // nbv : le nb de val a transferer depuis bf vers le noeud this.

        // decaler de nbv positions vers la droite...
        for(k = this.nb-1; k>= 0; k--){
        document.getElementById('bloc' + w).getElementsByClassName("val")[k].style.color = "#00FFFF";
        await sleep(500);
        document.getElementById('bloc' + w).getElementsByClassName("val")[k].innerHTML = "";
        document.getElementById('bloc' + w).getElementsByClassName("val")[k].style.color = "#000";
        document.getElementById('bloc' + w).getElementsByClassName("val")[k+nbv].innerHTML = this.t_cle[k];
        document.getElementById('bloc' + w).getElementsByClassName("val")[k+nbv].style.color = "#00FFFF";
        await sleep(500);
        document.getElementById('bloc' + w).getElementsByClassName("val")[k+nbv].style.color = "#000";

        if(this.fils[k + 1] != -1){
            anim.selectway(w, fils0(w) + k + 1, "#FF8C00");
            await sleep(500);
            anime.hiddenway(w, fils0(w) + k + 1);
            document.getElementById('after_' + w).style.opacity = '1';
            vider(fils0(w) + k + 1);
            anim.selectway(w, fils0(w) + k + 1, "#000");
            anim.visibleway(w, fils0(w) + k + nbv + 1);
            await sleep(500);
            anim.selectway(w, fils0(w) + k + nbv + 1, "#FF8C00");
            await sleep(500);
            a.aff(this.fils[k+1], fils0(w) + k + nbv + 1);
            anim.selectway(w, fils0(w) + k + nbv + 1, "#000");
        }


        this.t_cle[k+nbv] = this.t_cle[k];
        this.fils[k+nbv+1] = this.fils[k+1];
        }

        if(this.fils[0] != -1){
        anim.selectway(w, fils0(w), "#FF8C00");
        await sleep(500);
        anim.hiddenway(w, fils0(w));
        document.getElementById('after_' + w).style.opacity = '1';
        vider(fils0(w));
        anim.selectway(w, fils0(w), "#000");
        anim.visibleway(w, fils0(w) + nbv - 1);
        await sleep(500);
        anim.selectway(w, fils0(w) + nbv - 1, "#FF8C00");
        await sleep(500);
        a.aff(this.fils[0], fils0(w) + nbv - 1);
        anim.selectway(w, fils0(w) + nbv - 1, "#000");
        }

        anim.selectval(w5, indice_sep, "#00FFFF");
        await sleep(700);
        anim.selectval(w, nbv-1, "#00FFFF");
        await sleep(400);
        document.getElementById('bloc' + w).getElementsByClassName('val')[nbv-1].innerHTML = pere.t_cle[indice_sep];
        await sleep(700);
        anim.selectval(w5, indice_sep, "#F2F2F7");
        anim.selectval(w, nbv-1, "#F2F2F7");
        this.fils[nbv] = this.fils[0];
        this.t_cle[nbv-1] = pere.t_cle[indice_sep];      // faire descendre le separateur

        // deplacer les nbv-1 dernieres val et les nbv dernieres adr de bf --> n
        if(bf.fils[bf.nb] != -1){
        anim.selectway(wf1, fils0(wf1) + bf.nb, "#FF8C00");
        await sleep(500);
        anim.hiddenway(wf1, fils0(wf1));
        document.getElementById('after_' + w).style.opacity = '1';
        vider(fils0(wf1));
        anim.selectway(wf1, fils0(wf1), "#000");
        anim.visibleway(w, fils0(w) + nbv - -1);
        await sleep(500);
        anim.selectway(w, fils0(w) + nbv - 1, "#FF8C00");
        await sleep(500);
        a.aff(bf.fils[bf.nb], fils0(w) + nbv - 1);
        anim.selectway(w, fils0(w) + nbv - 1, "#000");
        }
        this.fils[nbv-1] = bf.fils[bf.nb];
        for(k = 0; k < nbv - 1; k++){
            this.t_cle[nbv-2-k] = bf.t_cle[bf.nb-1-k];
            this.fils[nbv-2-k] = bf.fils[bf.nb-1-k];
        }


        anim.selectval(wf1, bf.nb - nbv, "#00FFFF");
        await sleep(700);
        anim.selectval(w5, indice_sep, "#00FFFF");
        await sleep(400);
        document.getElementById('bloc' + w5).getElementsByClassName('val')[indice_sep].innerHTML = bf.t_cle[bf.nb - nbv];
        document.getElementById('bloc' + wf1).getElementsByClassName('val')[bf.nb - nbv].innerHTML = "";
        await sleep(700);
        anim.selectval(w5, indice_sep, "#F2F2F7");
        anim.selectval(wf1, bf.nb - nbv, "#F2F2F7");
        pere.t_cle[indice_sep] = bf.t_cle[bf.nb - nbv];      // MAJ du sep dans le pere

        // MAJ des champs nb du noeud n et de son frere gauche bf
        this.nb += nbv;	// on a rajouté nbv val au noeud n
        bf.nb -= nbv;	// et retranché nbv val a son frere bf

        res = [];
        res.make = [bf, pere];
    },

    redist_D_noeud:async function(a, bf, pere, indice_sep){
        let k, nbv = Math.trunc((bf.nb - Math.trunc(max_n / 2)) / 2);
        if(nbv == 0)  nbv = 1;   // nbv : le nb de val a transferer depuis bf vers le noeud this.

        anim.selectval(w5, indice_sep, "#00FFFF");
        await sleep(700);
        anim.selectval(w, this.nb, "#00FFFF");
        await sleep(400);
        document.getElementById('bloc' + w).getElementsByClassName('val')[this.nb].innerHTML = pere.t_cle[indice_sep];
        await sleep(700);
        anim.selectval(w5, indice_sep, "#F2F2F7");
        anim.selectval(w, this.nb, "#F2F2F7");
        this.t_cle[this.nb] = pere.t_cle[indice_sep];     // Transf le sep depuis le pere

        // copier les nbv-1 prem val et adr depuis bf vers le noeud n
        for(k = 0; k < nbv-1; k++){
        this.t_cle[this.nb+k+1] = bf.t_cle[k];
        this.fils[this.nb+k+1] = bf.fils[k];
        }

        if(bf.fils[nbv-1] != -1){
        anim.selectway(bf2, fils0(bf2)+nbv-1, "#FF8C00");
        await sleep(500);
        anim.hiddenway(bf2, fils0(bf2)+nbv-1);
        document.getElementById('after_' + bf2).style.opacity = '1';
        vider(fils0(bf2)+nbv-1);
        anim.selectway(bf2, fils0(bf2)+nbv-1, "#000");
        anim.visibleway(w, fils0(w)+ this.nb + nbv);
        await sleep(500);
        anim.selectway(w, fils0(w)+ this.nb + nbv, "#FF8C00");
        await sleep(500);
        a.aff(bf.fils[nbv-1], fils0(w)+ this.nb + nbv);
        anim.selectway(w, fils0(w)+ this.nb + nbv , "#000");
        }

        anim.selectval(wf2, nbv-1, "#00FFFF");
        await sleep(700);
        anim.selectval(w5, indice_sep, "#00FFFF");
        await sleep(400);
        document.getElementById('bloc' + w5).getElementsByClassName('val')[indice_sep].innerHTML = bf.t_cle[nbv-1];
        await sleep(700);

        this.fils[this.nb+nbv] = bf.fils[nbv-1]; 
        pere.t_cle[indice_sep] = bf.t_cle[nbv-1];      // MAJ du sep dans le pere

        // decaler bf de nbv positions vers la gauche...
        for(k = 0; k < (bf.nb - nbv); k++){
            document.getElementById('bloc' + wf2).getElementsByClassName("val")[k+nbv].style.color = "#00FFFF";
            await sleep(500);
            document.getElementById('bloc' + wf2).getElementsByClassName("val")[k+nbv].innerHTML = "";
            document.getElementById('bloc' + wf2).getElementsByClassName("val")[k].style.color = "#000";
            document.getElementById('bloc' + wf2).getElementsByClassName("val")[k].innerHTML = bf.t_cle[k+nbv];
            document.getElementById('bloc' + wf2).getElementsByClassName("val")[k].style.color = "#00FFFF";
            await sleep(500);
            document.getElementById('bloc' + wf2).getElementsByClassName("val")[k].style.color = "#000";

            if(bf.fils[k+nbv] != -1){
            anim.selectway(wf2, fils0(wf2) + k + nbv, "#FF8C00");
            await sleep(500);
            anime.hiddenway(wf2, fils0(wf2) + k + nbv);
            document.getElementById('after_' + wf2).style.opacity = '1';
            vider(fils0(wf2) + k + nbv);
            anim.selectway(wf2, fils0(wf2) + k, "#000");
            anim.visibleway(wf2, fils0(wf2) + k);
            await sleep(500);
            anim.selectway(wf2, fils0(wf2) + k, "#FF8C00");
            await sleep(500);
            a.aff(bf.fils[k+nbv], fils0(wf2) + k);
            anim.selectway(wf2, fils0(wf2) + k, "#000");
            }


            bf.t_cle[k] = bf.t_cle[k+nbv];
            bf.fils[k] = bf.fils[k+nbv];
        }


        if(bf.fils[bf.nb] != -1){
        anim.selectway(wf2, fils0(wf2) + bf.nb, "#FF8C00");
        await sleep(500);
        anime.hiddenway(wf2, fils0(wf2) + bf.nb);
        document.getElementById('after_' + wf2).style.opacity = '1';
        vider(fils0(wf2) + bf.nb);
        anim.selectway(wf2, fils0(wf2) + bf.nb-nbv, "#000");
        anim.visibleway(wf2, fils0(wf2) + bf.nb-nbv);
        await sleep(500);
        anim.selectway(wf2, fils0(wf2) + bf.nb-nbv, "#FF8C00");
        await sleep(500);
        this.aff(bf.fils[bf.nb], fils0(wf2) + bf.nb-nbv);
        anim.selectway(wf2, fils0(wf2) + bf.nb-nbv, "#000");
        }
        bf.fils[bf.nb-nbv] = bf.fils[bf.nb];

        // MAJ des champs nb du noeud n et de son frere (bf)
        this.nb += nbv;	// on a rajouté nbv val au noeud n
        bf.nb -= nbv;	// et retranché nbv val a son frere bf

        res = [];
        res.make = [bf, pere];
    },

    Affich_noeud: function(){
        let j;
        console.log("[ @" + this.fils[0]);
        for (j=0; j < this.nb; j++)
        console.log("|" + this.t_cle[j] + "| " + this.fils[j+1]);
        console.log("]");
    }
    }

    function t_pile(){
    this.sommet = -1;
    this.adr = [];
    this.t_noeud = [];
    }
    t_pile.prototype = {
    constructor:t_pile,

    init: function(){
        this.sommet = -1;
    },

    empliler: function(i, n){
        this.adr[++(this.sommet)] = i;
        this.t_noeud[this.sommet] = n;
    },

    depiler: function(i, n){
        i = this.adr[this.sommet];
        n = this.t_noeud[this.sommet--];
        this.t_noeud.pop();
        this.adr.pop();

        res = [];
        res.make = [i, n];
    },

    elem_sommet_pile: function(i, n){
        i = this.adr[this.sommet];
        n = this.t_noeud[this.sommet];

        res = [];
        res.make = [i, n];
    },

    // Modifier le contenu du bloc num i dans la pile
    maj_buf_pile: function(i, n){
        let k = 0;
        // Rechercher l'indice k du bloc i dans la pile...
        while (k <= this.sommet && this.adr[k] != i) k++;
        // s'il existe, affecter le nouveau contenu n
        if (k <= this.sommet) this.t_noeud[k] = n;
    }
    }

    function Btree(){
    this.arb = [];        //tableau des noeuds
    this.entete = new Entete();
    this.t_pile = new t_pile();
    }
    Btree.prototype = {
    constructor: Btree,

    // RECHERCHE de c dans le B-Arbre, retourne en plus du booleen,
    // le num de bloc i, le depl j et le contenu du dernier bloc dans buf
    // de plus les blocs de la branche visitee sont sauvegardés dans la pile
    rech_btree:async function(c, i, j, buf){
        vider_algo();
        g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Recherche(cle, var trouve, var i, var j, var buff)</p>' + 
                    '<p id="l1"> </p>'
                    
        add_algo(2, "i = entete.racine;   initialisation pile `sommet = 0`");
        add_algo(3, "TQ(i <> -1 ET !trouve)");
        add_algo(4, "&nbsp &nbsp lireDir(i, buff) et faire une recherche dichotomique interne");
        add_algo(5, "&nbsp &nbsp Si(!trouve) empiler(i, buff) et i = le fils j");
        add_algo(6, "FTQ");
        add_algo(7, "Si(!trouve)");
        add_algo(8, "&nbsp &nbsp Si(la pile n'est pas vide)   depiler(i, buff)");
        add_algo(9, "Sinon  i = -1");

        select_ligne(2);
        await sleep(400);
        i = this.entete.racine;
        j = -1;
        let trouv = false, p = 0;
        this.t_pile.init();
        deselect_ligne(2);
        select_ligne(3);
        await sleep(300);
        deselect_ligne(3);
        while(i != -1 && !trouv){
            select_ligne(4);
            buf = this.lirebloc(i);
            anim.selectnoeud(p, "#FF8C00");
            w = p;
            await buf.rech_noeud(c);
            deselect_ligne(4);
            trouv = res.make[0];
            j = res.make[1];
            select_ligne(5);
            await sleep(300);
            deselect_ligne(5);
            if(!trouv){
                select_ligne(5);
                await sleep(200);
                this.t_pile.empliler(i, buf);
                anime_pile.push(p);
                i = buf.fils[j];
                deselect_ligne(5);
                p = fils0(p) + j;
                if(i != -1){
                anim.selectway(anime_pile[anime_pile.length-1], p, "#FF8C00");
                }
            }
        }
        select_ligne(6);
        await sleep(250);
        deselect_ligne(6);
        select_ligne(7);
        await sleep(300);
        deselect_ligne(7);
        w = p;
        if(!trouv){
            select_ligne(8);
            await sleep(300);
            deselect_ligne(8);
            if(this.t_pile.sommet >= 0)   
            {
                select_ligne(8);
                this.t_pile.depiler(i, buf);
                w = anime_pile.pop();
                i = res.make[0];
                buf = res.make[1];
                deselect_ligne(8);
            }
            else{
                select_ligne(9);
                await sleep(400);
                deselect_ligne(9);
                i = -1;
            }
        }

        res = [];
        res.make = [trouv, i, j, buf, w];
        return trouv;
    },

    ins_btree:async function(v){
        vider_algo();
        g = document.getElementById('algo');
        g.innerHTML = '<p id="l0"style="text-decoration: underline;">Inserssion(v)</p>' + 
                    '<p id="l1"> </p>'
                    
                    add_algo(2, "Recherche(v, var trouve, var i, var j, var buff)");
                    add_algo(3, "Si(!trouve)");
                    add_algo(4, "&nbsp &nbsp Si(arbre vide `i == -1`)");
                    add_algo(5, "&nbsp &nbsp &nbsp &nbsp Allocbloc, inserssion interne, ecrire le bloc et mettre à jour l'entete");
                    add_algo(6, "&nbsp &nbsp Sinon");
                    add_algo(7, "&nbsp &nbsp &nbsp &nbsp TQ(continue)");
                    add_algo(8, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Si(la bloc n'est pas plein) inserssion interne, ecrire le bloc et continue = faux");
                    add_algo(9, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Sinon");
                    add_algo(10, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Eclatement du noeud et le separateur dans le pere");
                    add_algo(11, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Si(le pere existe)  depiler(i, buff)");
                    add_algo(12, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Sinon nouveau racine et continue = faux");
                    add_algo(13, "&nbsp &nbsp entete.nbvaleurs++");
                    add_algo(14, "Sinon ecrire('dejà existe')");
        
        let i, j, buf = new t_noeud(), w0;
        res = [];
        select_ligne(2);
        await sleep(500);
        await this.rech_btree(v, i, j, buf);
        select_ligne(2);
        await sleep(500);
        deselect_ligne(2);
        vider_algo();
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Inserssion(v)</p>' + 
                    '<p id="l1"> </p>'

        add_algo(2, "Recherche(v, var trouve, var i, var j, var buff)");
        add_algo(3, "Si(!trouve)");
        add_algo(4, "&nbsp &nbsp Si(arbre vide `i == -1`)");
        add_algo(5, "&nbsp &nbsp &nbsp &nbsp Allocbloc, inserssion interne, ecrire le bloc et mettre à jour l'entete");
        add_algo(6, "&nbsp &nbsp Sinon");
        add_algo(7, "&nbsp &nbsp &nbsp &nbsp TQ(continue)");
        add_algo(8, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Si(la bloc n'est pas plein) inserssion interne, ecrire le bloc et continue = faux");
        add_algo(9, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Sinon");
        add_algo(10, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Eclatement du noeud et le separateur dans le pere");
        add_algo(11, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Si(le pere existe)  depiler(i, buff)");
        add_algo(12, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Sinon nouveau racine et continue = faux");
        add_algo(13, "&nbsp &nbsp entete.nbvaleurs++");
        add_algo(14, "Sinon ecrire('dejà existe')");

        select_ligne(2);
        await sleep(300);
        deselect_ligne(2);
        i = res.make[1];
        j = res.make[2];
        buf = res.make[3];
        w = res.make[4];
        select_ligne(3);
        await sleep(300);
        deselect_ligne(3);
        if(!res.make[0]){
            select_ligne(4);
            await sleep(300);
            deselect_ligne(4);
            if(i == -1){          //arbre vide
                select_ligne(5);
                this.entete.racine = await this.allocbloc();
                w = 0;
                anim.visible(w);
                anim.selectnoeud(w, "#FF8C00");
                await sleep(500);
                await buf.ins_noeud(this, v, -1);
                buf.fils[0] = -1;
                this.ecrirebloc(buf, this.entete.racine);
                this.entete.nbvaleurs++;
                anim.selectnoeud(w, "#000");
                await anim.select_entete(0, this.entete.racine);
                await anim.select_entete(3, this.entete.nbvaleurs);
                select_ligne(5);
            }
            else{
                select_ligne(6);
                await sleep(300);
                deselect_ligne(6);
                let continu = true, fd = -1;
                select_ligne(7);
                await sleep(300);
                deselect_ligne(7);
                while(continu){
                    select_ligne(8);
                    await sleep(300);
                    deselect_ligne(8);
                    if(buf.nb < max_n){     //bloc n'est pas plein
                        select_ligne(8);
                        await buf.ins_noeud(this, v, fd);
                        this.ecrirebloc(buf, i);
                        continu = false;
                        anim.selectnoeud(w, "#000");
                        deselect_ligne(8);
                    }
                    else{
                        select_ligne(9);
                        await sleep(300);
                        deselect_ligne(9);
                        if(w == 0){
                            if(document.getElementById('bloc0').style.opacity == '1'){
                                vider(w);
                                this.aff(i, fils0(w));
                            }
                                w0 = w;
                                w = fils0(w);
                                anim.selectnoeud(w, "#FF8C00");
                        }
                        else{
                            res = [];
                            this.t_pile.depiler(i, buf);
                            w0 = anime_pile.pop();
                            if(res.make[1].nb < max_n){
                                for(m = fils0(w0)+res.make[1].nb; m > w; m--){
                                document.getElementById('before_' + m).style.opacity = '0';
                                vider(m);
                                anim.visibleway(w0, m+1);
                                this.aff(res.make[1].fils[m-fils0(w0)], m+1);
                                }
                            }
                            else{
                                if(this.t_pile.sommet >= 0){
                                let u = res, w1;
                                res = [];
                                this.t_pile.depiler(i, buf);  
                                w1 = anime_pile.pop();
                                if(res.make[1].nb < max_n){
                                    for(m = fils0(w1)+res.make[1].nb; m > w; m--){
                                    document.getElementById('before_' + m).style.opacity = '0';
                                    vider(m);
                                    anim.visibleway(w1, m+1);
                                    this.aff(res.make[1].fils[m-fils0(w1)], m+1);
                                    }
                                }
                                else{
                                    vider(w1);
                                    this.aff(res.make[0], fils0(w1));
                                    w = w + 5;
                                    anim.selectnoeud(fils0(w1), "#FF8C00");
                                    anim.selectway(fils0(w1), w, "#FF8C00");
                                    anim.selectnoeud(w, "#FF8C00");
                                }
                                this.t_pile.empliler(res.make[0], res.make[1]);
                                anime_pile.push(w1);
                                res = u;
                                }
                                else{
                                    vider(w0);
                                    this.aff(res.make[0], fils0(w0));
                                    w = w + 5;
                                    anim.selectnoeud(fils0(w0), "#FF8C00");
                                    anim.selectway(fils0(w0), w, "#FF8C00");
                                    anim.selectnoeud(w, "#FF8C00");
                                }
                            }

                            this.t_pile.empliler(res.make[0], res.make[1]);
                            anime_pile.push(w0);
                        }

                        select_ligne(10);
                        // Eclatement du noeud courant
                        let c = [], f = [], k = 0; // tableau temporaire de cles et des fils
                        // Construction de la seq ordonnee dans c et f
                        document.getElementById('table').getElementsByClassName("c").item(0).innerHTML = "";
                        document.getElementById('table').getElementsByClassName("c").item(1).innerHTML = "";
                        document.getElementById('table').getElementsByClassName("c").item(2).innerHTML = "";
                        document.getElementById('table').getElementsByClassName("c").item(2).style.backgroundColor = "#F2F2F7";
                        document.getElementById('table').getElementsByClassName("c").item(3).innerHTML = "";
                        document.getElementById('table').getElementsByClassName("c").item(4).innerHTML = "";
                        document.getElementById('table').style.opacity = "1";
                        
                        f[0] = buf.fils[0];
                        while(k < max_n && buf.t_cle[k] < v){
                        anim.selectval(w, k, "#E0FFFF");
                        await sleep(1000);
                        document.getElementById('table').getElementsByClassName("c")[k].innerHTML = buf.t_cle[k];
                        c[k] = buf.t_cle[k];
                        f[k+1] = buf.fils[k+1];
                        anim.selectval(w, k, "#F2F2F7");
                        k++;
                        }
                        document.getElementById('table').getElementsByClassName("c")[k].innerHTML = v;
                        c[k] = v;
                        f[k+1] = fd;
                        k++;

                        while(k < max_n+1){
                        anim.selectval(w, k-1, "#E0FFFF");
                        await sleep(1000);
                        document.getElementById('table').getElementsByClassName("c")[k].innerHTML = buf.t_cle[k-1];
                        c[k] = buf.t_cle[k-1];
                        f[k+1] = buf.fils[k];
                        anim.selectval(w, k-1, "#F2F2F7");
                        k++;
                        }

                        document.getElementById('bloc' + w).getElementsByClassName("val").item(0).innerHTML = "";
                        anim.hiddenway(w, fils0(w));
                        document.getElementById('bloc' + w).getElementsByClassName("val").item(1).innerHTML = "";
                        anim.hiddenway(w, fils0(w) + 1);
                        document.getElementById('bloc' + w).getElementsByClassName("val").item(2).innerHTML = "";
                        anim.hiddenway(w, fils0(w) + 2);
                        document.getElementById('bloc' + w).getElementsByClassName("val").item(3).innerHTML = "";
                        anim.hiddenway(w, fils0(w) + 3);
                        document.getElementById('bloc' + w).getElementsByClassName("val").item(3).innerHTML = "";
                        anim.hiddenway(w, fils0(w) + 4);
                        await sleep(800);
                        if(f[0] != -1) anim.visibleway(w, fils0(w));

                        // 1ere moitie de la sequence dans i ...
                        buf = new t_noeud();
                        buf.fils[0] = f[0];     
                        for(k = 0; k < Math.trunc(max_n / 2); k++){
                        anim.selectval(w, k, "#E0FFFF");
                        document.getElementById('table').getElementsByClassName("c")[k].style.backgroundColor = "#E0FFFF";
                        await sleep(400);
                        buf.t_cle[k] = c[k];
                        buf.fils[k+1] = f[k+1];
                        document.getElementById('bloc' + w).getElementsByClassName('val')[k].innerHTML = c[k];
                        await sleep(800);
                        if(f[k+1] != -1) anim.visibleway(w, fils0(w)+k+1);
                        anim.selectval(w, k, "#F2F2F7");
                        document.getElementById('table').getElementsByClassName("c")[k].style.backgroundColor = "#F2F2F7";
                        }

                        //les fils 4 w 5 lazem supp
                        
                        
                        
                        buf.nb = k++;
                        this.ecrirebloc(buf, i);
                        anim.selectnoeud(w, "#000");

                        // 2e moitie dans un nouveau bloc ...
                        buf = new t_noeud();
                        fd = await this.allocbloc();      // un nouveau noeud pour l'eclatement
                        anim.visible(w+1);
                        document.getElementById('before_' + (w+1)).style.opacity = '0';
                        anim.selectnoeud(w+1, "#FF8C00");
                        if(f[k] != -1) 
                        {
                            anim.hiddenway(w, fils0(w) + k);
                            document.getElementById('after_' + w).style.opacity = '1';
                            vider(fils0(w) + k);
                            await sleep(800);
                            anim.visibleway(w+1, fils0(w+1));
                            anim.visible(fils0(w+1));
                            this.aff(f[k], fils0(w+1));

                        }

                        buf.fils[0] = f[k];
                        while(k < max_n+1){
                        anim.selectval(w+1, k-Math.trunc(max_n/2)-1, "#E0FFFF");
                        document.getElementById('table').getElementsByClassName("c")[k].style.backgroundColor = "#E0FFFF";
                        await sleep(700);
                        document.getElementById('bloc' + (w+1)).getElementsByClassName("val")[k-Math.trunc(max_n/2)-1].innerHTML = c[k];
                        buf.t_cle[k-Math.trunc(max_n/2)-1] = c[k];
                        buf.fils[k-Math.trunc(max_n/2)] = f[k+1];
                        if(f[k+1] != -1){
                            anim.hiddenway(w, fils0(w) + 4);
                            document.getElementById('after_' + w).style.opacity = '1';
                            vider(fils0(w) + 4);
                            await sleep(800);
                            anim.visible(fils0(w+1) + k-Math.trunc(max_n/2));
                            anim.visibleway(w+1, fils0(w+1) + k-Math.trunc(max_n/2));
                        }
                        this.aff(buf.fils[k-Math.trunc(max_n/2)], fils0(w+1) + k-Math.trunc(max_n/2));
                        anim.selectval(w+1, k-Math.trunc(max_n/2)-1, "#F2F2F7");
                        document.getElementById('table').getElementsByClassName("c")[k].style.backgroundColor = "#F2F2F7";
                        k++;
                        }
                        buf.nb = k - Math.trunc(max_n/2) - 1;
                        this.ecrirebloc(buf, fd);

                        // le separateur dans le pere ...
                        v = c[Math.trunc(max_n/2)];
                        document.getElementById('table').getElementsByClassName("c")[Math.trunc(max_n/2)].style.backgroundColor = "#E0FFFF";
                        
                        deselect_ligne(10);
                        select_ligne(11);
                        await sleep(300);
                        deselect_ligne(11);
                        if(this.t_pile.sommet >= 0){      // si le pere existe,le depiler
                            select_ligne(11);
                            res = [];
                            this.t_pile.depiler(i, buf);
                            anim.selectnoeud(w, "#000");
                            anim.selectway(w, anime_pile[anime_pile.length-1], "#000");
                            w = anime_pile.pop();
                            i = res.make[0];
                            buf = res.make[1];
                            deselect_ligne(11);
                        }
                        else{   // si le pere n'existe pas : donc nouvelle racine
                            select_ligne(12);
                            this.entete.prof++;
                            await anim.select_entete(4, this.entete.prof);
                            this.entete.racine = await this.allocbloc();
                            await anim.select_entete(0, this.entete.racine);
                            await sleep(800);
                            anim.visible(w0);
                            await sleep(600);
                            anim.selectnoeud(w0, "#FF8C00");
                            buf = new t_noeud();
                            buf.t_cle[0] = v;
                            buf.fils[0] = i;      // le 1er fils est l'ancienne racine
                            buf.fils[1] = fd;     // le 2e = noeud de l'eclatement
                            buf.nb = 1;
                            anim.selectval(w0, 0, "#E0FFFF");
                            document.getElementById("bloc" + w0).getElementsByClassName("val")[0].innerHTML = v;
                            await sleep(500);
                            anim.visibleway(w0, fils0(w0));
                            anim.selectway(w0, fils0(w0), "#FF8C00");
                            await sleep(500);
                            anim.visibleway(w0, fils0(w0)+1);
                            anim.selectway(w0, fils0(w0)+1, "#FF8C00");
                            await sleep(500);
                            this.ecrirebloc(buf, this.entete.racine);
                            continu = false;
                            deselect_ligne(12);
                        }
                        document.getElementById('table').style.opacity = "0";
                    }
                }
                select_ligne(13);
                this.entete.nbvaleurs++;
                await anim.select_entete(3, this.entete.nbvaleurs);
                deselect_ligne(13);
            }
        }
        else{       // la valeur deja existe
            select_ligne(14);
            await sleep(500);
            deselect_ligne(14);
        }

        re();
    },

    sup_btree:async function(c){
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Suppression(v)</p>' + 
                    '<p id="l1"> </p>'
                    add_algo(2, "Recherche(v, var trouve, var i, var j, var buff)");
                    add_algo(3, "Si(!trouve)");
                    add_algo(4, "&nbsp &nbsp Si(non-feuille `buf.fils[0] != -1`)");
                    add_algo(5, "&nbsp &nbsp &nbsp &nbsp trouver la feuille contenant le succ de v et le transferer à la place de v");
                    add_algo(6, "&nbsp &nbsp TQ(continue)");
                    add_algo(7, "&nbsp &nbsp &nbsp &nbsp suppression interne dans une feuille");
                    add_algo(8, "&nbsp &nbsp &nbsp &nbsp Si(le noeud remplit >= 50%)  continue = faux");
                    add_algo(9, "&nbsp &nbsp &nbsp &nbsp Sinon");
                    add_algo(10, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Si(un des frere remlit > 50%) Redistribution et continue = faux");
                    add_algo(11, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Si((f1 ou f2 != -1) ET continue) fusion avec l'un des frere et supp le sep");
                    add_algo(12, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Sinon Si(continue)");
                    add_algo(13, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Si(racine vide)  liberer la racine et un nouveau racine(buff.fils[0])");
                    add_algo(14, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp continue = faux");

        let i, j, i2, j2, buf = buf2 = new t_noeud();
        res = [];
        select_ligne(2);
        await sleep(300);
        await this.rech_btree(c, i, j, buf);
        vider_algo();
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Suppression(v)</p>' + 
                    '<p id="l1"> </p>'

                    add_algo(2, "Recherche(v, var trouve, var i, var j, var buff)");
                    add_algo(3, "Si(!trouve)");
                    add_algo(4, "&nbsp &nbsp Si(non-feuille `buf.fils[0] != -1`)");
                    add_algo(5, "&nbsp &nbsp &nbsp &nbsp trouver la feuille contenant le succ de v et le transferer à la place de v");
                    add_algo(6, "&nbsp &nbsp TQ(continue)");
                    add_algo(7, "&nbsp &nbsp &nbsp &nbsp suppression interne dans une feuille");
                    add_algo(8, "&nbsp &nbsp &nbsp &nbsp Si(le noeud remplit >= 50%)  continue = faux");
                    add_algo(9, "&nbsp &nbsp &nbsp &nbsp Sinon");
                    add_algo(10, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Si(un des frere remlit > 50%) Redistribution et continue = faux");
                    add_algo(11, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Si((f1 ou f2 != -1) ET continue) fusion avec l'un des frere et supp le sep");
                    add_algo(12, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Sinon Si(continue)");
                    add_algo(13, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Si(racine vide)  liberer la racine et un nouveau racine(buff.fils[0])");
                    add_algo(14, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp continue = faux");
        i = res.make[1];
        j = res.make[2];
        buf = res.make[3];

        select_ligne(2);
        await sleep(300);
        deselect_ligne(2);

        select_ligne(3);
        await sleep(300);
        deselect_ligne(3);
        if(res.make[0]){
            select_ligne(4);
            await sleep(300);
            deselect_ligne(4);
            if(buf.fils[0] != -1){    //si(non-feuille)
                select_ligne(5);
                // Trouver la feuille contenant le succ de c ...
                buf2 = buf;
                i2   = i;
                j2   = j;
                w5 = w;
                j++;
                while(buf.fils[j] != -1){     //While non feuille
                    this.t_pile.empliler(i, buf);
                    anime_pile.push(w);
                    anim.selectway(w, fils0(w) + j, "#FF8C00");
                    await sleep(500);
                    w = fils0(w) + j;
                    anim.selectnoeud(w, "#FF8C00");
                    await sleep(700);
                    i = buf.fils[j];
                    j = 0;
                    buf = this.lirebloc(i);
                }
                //    console.log("-------> suivant inordre :" + buf.t_cle[0] + "dans feuile : @" + i);

                //   Transferer le succ a la place de c dans buf2 ...
                anim.selectval(w, 0, "#00FFFF");
                await sleep(600);
                buf2.t_cle[j2] = buf.t_cle[0];
                anim.selectval(w5, j2, "#00FFFF");
                document.getElementById("bloc" + w5).getElementsByClassName("val")[j2].innerHTML = buf.t_cle[0];
                await sleep(700);
                anim.selectval(w5, j2, "#F2F2F7");
                this.ecrirebloc(buf2, i2);
                this.t_pile.maj_buf_pile(i2, buf2);     // MAJ de buf2 dans la pile aussi ...
                c = buf.t_cle[0];         // le succ qu'il faudra supprimer
                deselect_ligne(5);
            }

            select_ligne(6);
            await sleep(300);
            deselect_ligne(6);
            // suppression dans une feuille (soit c soit le succ qu'on vient de deplacer)
            // ou bien la cle a supprimer si elle etait dans une feuille
            let continu = true;
            while(continu){   // la suppression peut se repeter en cas de fusion
                // sup de c dans le noeud i (buf)
                //          console.log("------> Dans noeud : " + @" + i);
                select_ligne(7);
                await buf.del_noeud(this, c);
                deselect_ligne(7);
                select_ligne(8);
                await sleep(400);
                deselect_ligne(8);
                if(buf.nb >= Math.trunc(max_n/2)){
                    continu = false;
                    this.ecrirebloc(buf, i);
                }
                else{     // redistribution ou fusion ...
                    // Chercher les freres (f1 et f2) de i ...
                    let bf1 = bf2 = new t_noeud(), f1 = f2 = -1, deux;
                    select_ligne(9);
                    await sleep(300);
                    deselect_ligne(9);

                    select_ligne(10);
                    await sleep(400);
                    if(this.t_pile.sommet >= 0){

                        this.t_pile.depiler(i2, buf2);      // Depiler le pere de i
                        w5 = anime_pile.pop();
                        anim.selectnoeud(w5, "#F21D51");
                        await sleep(600);
                            // (i2,buf2)  est le pere (num et bloc) de  (i,buf)
                        i2 = res.make[0];
                        buf2 = res.make[1];
                        j2 = 0;
                        while(buf2.fils[j2] != i){
                            j2++;
                        }
                        if (j2 > 0) {     // j2 est la pos de i dans buf2
                            f1 = buf2.fils[j2-1];
                            bf1 = this.lirebloc(f1);
                            wf1 = fils0(w5) + j2 -1;
                            anim.selectway(w5, wf1, "#F21D51");
                            await sleep(500);
                            anim.selectnoeud(wf1, "#F21D51");
                            await sleep(500);
                        }
                        if(j2 < buf2.nb){
                            console.log("855555");
                            f2 = buf2.fils[j2+1];
                            bf2 = this.lirebloc(f2);
                            wf2 = fils0(w5) + j2 +1;
                            anim.selectway(w5, wf2, "#F21D51");
                            await sleep(500);
                            anim.selectnoeud(wf2, "#F21D51");
                            await sleep(500);
                        }
                    }


                    if(f1 != -1)
                    if(bf1.nb > Math.trunc(max_n / 2)){
                        anim.selectnoeud(wf1, "#00FF00");
                        await sleep(1000);
                        await buf.redist_G_noeud(this, bf1, buf2, j2-1);
                        bf1 = res.make[0];
                        buf2 = res.make[1];
                        this.ecrirebloc(bf1, f1);
                        this.ecrirebloc(buf2, i2);
                        this.ecrirebloc(buf, i);
                        //      console.log("------> Redistribution G-D frG: @" + f1 + "pere: @" + i2 + "noeud_courant: @" + i);
                        continu = false;
                    }
                    

                    if(f2 != -1 && continu)
                        if(bf2.nb > Math.trunc(max_n / 2)){
                        anim.selectnoeud(wf2, "#00FF00");
                        await sleep(1000);
                        await buf.redist_D_noeud(this, bf2, buf2, j2);
                        bf2 = res.make[0];
                        buf2 = res.make[1];
                        this.ecrirebloc(bf2, f2);
                        this.ecrirebloc(buf2, i2);
                        this.ecrirebloc(buf, i);
                        //      console.log("------> Redistribution D-G frD: @" + f2 + "pere: @" + i2 + "noeud_courant: @" + i);
                        continu = false;
                        }

                    deselect_ligne(10);

                    select_ligne(11);
                    await sleep(400);
                    if(f1 != -1 && continu){
                        anim.selectnoeud(w, "#F21D51");
                        anim.selectnoeud(wf1, "#F21D51");
                        anim.selectnoeud(w5, "#F21D51");
                        anim.selectval(w5, j2-1, "#00FFFF");
                        await sleep(700);
                        await bf1.fusion_noeud(this, buf, buf2.t_cle[j2-1], wf1, w);
                        anim.hiddenway(w5, w);
                        document.getElementById('after_' + w5).style.opacity = '1';
                        vider(w);
                        buf = await this.liberebloc(buf, i);
                        this.ecrirebloc(bf1, f1);
                        //      console.log("-----> Fusion dans frG: @" + f1 + "avec pere:@" + i2 + "et noeud_courant:@" + i);

                        j = j2-1;
                        i = i2;
                        c = buf2.t_cle[j2-1];
                        buf = buf2;
                        w = w5;
                        //    console.log(-----> Suppression du séparateur" + c + "dans le pere:@" + i);
                        deselect_ligne(11);
                    }
                    else if(f2 != -1 && continu){
                        anim.selectnoeud(w, "#F21D51");
                        anim.selectnoeud(wf2, "#F21D51");
                        anim.selectnoeud(w5, "#F21D51");
                        await buf.fusion_noeud(this, bf2, buf2.t_cle[j2], w, wf2);
                        anim.hiddenway(w5, wf2);
                        document.getElementById('after_' + w5).style.opacity = '1';
                        vider(wf2);
                        bf2 = await this.liberebloc(bf2, f2);
                        this.ecrirebloc(buf, i);
                        //      console.log("-----> Fusion dans frD: @" + f2 + "avec pere:@" + i2 + "et noeud_courant:@" + i);
                        j = j2;
                        i = i2;
                        c = buf2.t_cle[j2];
                        buf = buf2;
                        w = w5;
                        //    console.log(-----> Suppression du séparateur" + c + "dans le pere:@" + i);
                        deselect_ligne(11);
                    }
                    else if(continu){
                        deselect_ligne(11);
                        select_ligne(12);
                        await sleep(300);
                        deselect_ligne(12);

                        select_ligne(13);
                        await sleep(300);
                        if(buf.nb == 0){
                        //    console.log(-----> Suppression de la racine @" + i);
                        vider(0);
                        this.aff(buf.fils[0], 0);
                        this.entete.racine = buf.fils[0];
                        await anim.select_entete(0, buf.fils[0]);
                        buf = await this.liberebloc(buf, i);
                        if(this.entete.prof > 0) {this.entete.prof--;       await anim.select_entete(4, this.entete.prof);}
                        }
                        else this.ecrirebloc(buf, i);

                        deselect_ligne(13);
                        select_ligne(14);
                        await sleep(500);
                        deselect_ligne(14);
                        continu = false;
                    }
                }
            }
            this.entete.nbvaleurs--;
            await anim.select_entete(3, this.entete.nbvaleurs);
        }
        else{   //n'existe pas

        }

        re();
    },

    inordre: function(i, avec_aff){
        if (i != -1) {
        let localBuf = new t_noeud(), j;
        localBuf = this.lirebloc(i);
        this.inordre(localBuf.fils[0], avec_aff);
        for (j=0; j<localBuf.nb; j++) {
            if ( avec_aff ){
            console.log(localBuf.t_cle[j]);
            }

            if (val_prec > localBuf.t_cle[j])
            erreur = 1;		// Pb dans de l'ordre des valeurs
            nb_val++;			// pour vérification du nombre total de valeurs insérées
            val_prec = localBuf.t_cle[j];
            this.inordre(localBuf.fils[j+1], avec_aff);
        }
        if ( i != this.entete.racine && localBuf.nb < Math.trunc(max_n / 2) )
        erreur = 2;	// Pb dans l'existence de noued sous-chargés (autres que la racine)
        }
    },

    verif: function(){
        nb_val = 0;
        erreur = 0;
        val_prec = 0;
        this.inordre(this.entete.racine, false);
        if(erreur == 1)   console.log("*** Problème !!! Presence de sequence non ordonnee ***");
        if(erreur == 2)   console.log("*** Problème !!! Il y a des noeuds sous-chargés ( < 50 %%) ***");
        if(erreur == 3)   console.log("*** Problème !!! le nombre de valeurs dans l'arbre ne correspond pas à l'entete (dans l'entete: " + this.entete.nbvaleurs + "inordre: " + nb_val + ")" + " ***");
        return (erreur == 0 && nb_val == this.entete.nbvaleurs);
    },

    lirebloc: function(i){
        return this.arb[i];
    }, 

    ecrirebloc: function(buf, i){
        this.arb[i] = buf;
    },

    // Allocation d'un nouveau bloc au fichier :
    // soit on rajoute un bloc à la fin du fichier (s'il n'y a pas de blocs déjà libéré)
    // soit on réutilise un bloc de la liste des blocs libérés.
    // 	les blocs libérés (lors des suppressions) sont chainés entre eux formant une
    // 	liste de blocs, dont la tete est : entete.tete_blocs_libres
    // 	le fils(0) est alors utilisé pour le chainage des blocs entre eux

    allocbloc:async function(){
        let i, buf = new t_noeud();
        if(this.entete.tete_blocs_libres != -1){     // S'il ya des blocs libérés
        i = this.entete.tete_blocs_libres;        // alors les reutiliser et modifier la tete de liste
        buf = this.lirebloc(i);
        this.entete.tete_blocs_libres = buf.fils[0];
        await anim.select_entete(1, this.entete.tete_blocs_libres);
        }
        else{                           //Sinon rajouter un bloc a la fin du fichier
        i = this.entete.nbnoeud++;
        await anim.select_entete(2, this.entete.nbnoeud);
        }
        e = i;
        return i;
    },

    liberebloc:async function(buf, i){
        buf.fils[0] = this.entete.tete_blocs_libres;	// rajouter le bloc i au debut
        this.entete.tete_blocs_libres = i;		// de la liste des blocs liberes
        await anim.select_entete(1, this.entete.tete_blocs_libres);
        this.ecrirebloc(buf, i);
        return buf;
    },

    affich_entete: function(){
        let nb_bloc_sup = 0, i = this.entete.tete_blocs_libres, buf = new t_noeud();

        consile.log("Racine: " + this.entete.racine);
        consile.log("Nb bloc: " + this.entete.nbnoeud);
        consile.log("Hauteur: " + this.entete.prof);
        consile.log("Liste libre: " + this.entete.tete_blocs_libres);

        // Parcours de la liste des blocs libres pour affichage ...
        while ( i != -1 ) {
        nb_bloc_sup++;
        buf = this.lirebloc(buf, i);
        consile.log("@" + i); 	// afficher le num du bloc et
        i = buf.fils[0];  	// passer au suivant
        }
        consile.log("Nb bloc Sup: "+ nb_bloc_sup);	// nb de blocs libérés
    },

    bulk_loading:async function(vmin, n, pas){
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0">Chargement initial du fichier(v_min, v_max, pas)</p>' + 
                      '<p id="l1"> </p>' + 
                      '<hr>'
        add_algo(2, "TQ(v_min <= v_max)");
        add_algo(3, "&nbsp &nbsp Inserssion(v_min)");
        add_algo(4, "&nbsp &nbsp v_min++");
        add_algo(5, "FTQ");
        let i = vmin;
        select_ligne(2);
        await sleep(250);
        deselect_ligne(2);
        while(i <= n){
            select_ligne(3);
            await sleep(300);
            await this.ins_btree(i);
            vider_algo();
            g.innerHTML = '<p id="l0">Chargement initial du fichier(v_min, v_max, pas)</p>' + 
                        '<p id="l1"> </p>' + 
                        '<hr>'
            add_algo(2, "TQ(v_min <= v_max)");
            add_algo(3, "&nbsp &nbsp Inserssion(v_min)");
            add_algo(4, "&nbsp &nbsp v_min++");
            add_algo(5, "FTQ");
            select_ligne(4);
            await sleep(300);
            i = i + pas;
            deselect_ligne(4);
        }
        select_ligne(5);
        await sleep(300);
        deselect_ligne(5);
    },

    aff: function(i, p){
        if (i != -1 && p<31) {
        let localBuf = new t_noeud(), j;
        localBuf = this.lirebloc(i);
        this.aff(localBuf.fils[0],fils0(p));
        if(localBuf.fils[0] != -1) anim.visibleway(p, fils0(p));
        for (j=0; j<localBuf.nb; j++) {
            anim.visible(p);
            document.getElementById('bloc' + p).getElementsByClassName('val')[j].innerHTML = localBuf.t_cle[j];
            if(localBuf.fils[j+1] != -1) anim.visibleway(p, fils0(p) + j + 1);
            this.aff(localBuf.fils[j+1], (fils0(p) + j + 1));
        }
        }
    },

    }

    function fils0(a){
    if(a == 0)  return 1;
    else return (5 + fils0(a - 1));
    }

    function vider(a){
    if (a < 31) {
        anim.hidden(a);
        document.getElementById('bloc' + a).getElementsByClassName('val')[0].innerHTML = '';
        document.getElementById('bloc' + a).getElementsByClassName('val')[1].innerHTML = '';
        document.getElementById('bloc' + a).getElementsByClassName('val')[2].innerHTML = '';
        document.getElementById('bloc' + a).getElementsByClassName('val')[3].innerHTML = '';
        let j;
        for (j=0; j<5; j++) {
        if(((fils0(a) + j) < 31)) anim.hiddenway(a, fils0(a) + j);
        vider(fils0(a) + j);
        }
    }
    }

    function re(){
    for(i = 0; i < document.getElementsByClassName('noeud').length; i++) document.getElementsByClassName('noeud')[i].style.borderColor = '#000';
    for(i = 0; i < document.getElementsByClassName('val').length; i++) document.getElementsByClassName('val')[i].style.backgroundColor = '#F2F2F7';
    for(i = 0; i < document.getElementsByClassName('feuille').length; i++) document.getElementsByClassName('feuille')[i].style.borderColor = '#000';
    for(i = 0; i < document.getElementsByClassName('to').length; i++) document.getElementsByClassName('to')[i].style.borderColor = '#000';
    for(i = 0; i < document.getElementsByClassName('ba').length; i++) document.getElementsByClassName('ba')[i].style.borderColor = '#000';
    }














    let b = new Btree();

    function bulk_loading(){
        let min, max, pas;
        min = parseInt(document.getElementById('v_min').value);
        max = parseInt(document.getElementById('v_max').value);
        pas = parseFloat(document.getElementById('pas').value);
        if ( !isNaN(min) && !isNaN(max) && !isNaN(pas)) {
            document.getElementById('initialiser-form').style.display = 'none';
            box_shown = 0;
            b.bulk_loading(min, max, pas);
        }
      }
  
      function insertion(){
        let c;
        c = parseFloat(document.getElementById('cle_inser').value);
        if (!isNaN(c)) {
            document.getElementById('inserer-form').style.display = 'none';
            box_shown = 0;
            b.ins_btree(c);
        }
      }
  
      async function recherche() {
          let c, i, j, buf;
          c = parseFloat(document.getElementById('cle_rech').value);
          if (!isNaN(c)) {
              document.getElementById('rechercher-form').style.display = 'none';
              box_shown = 0;
              await b.rech_btree(c, i, j, buf);
              if (!res.make[0]) {
                  edit_algo(1, "Lenregistrement n'existe pas", '#DC0000');
              } else {
                  edit_algo(1, "Lenregistrement existe dans le bloc " + res.make[1] + ", dans al position" + res.make[2], '#21DC00');
              }

              re();
          }
      }
  
      function suppression_phys(){
        let c;
        c = parseFloat(document.getElementById('cle_supp_ph').value);
          if (!isNaN(c)) {
              document.getElementById('supprimer-form').style.display = 'none';
              box_shown = 0;
              b.sup_btree(c);
          }
      }
  
      function deselect_ligne(num){
        document.getElementById('l' + num).style.backgroundColor = "#fff";
        document.getElementById('l' + num).style.color = "#000";
      }
  
      function select_ligne(num){
        document.getElementById('l' + num).style.backgroundColor = "#F21D51";
        document.getElementById('l' + num).style.color = "#fff";
      }
  
      function add_algo(num, inf){
        let a = document.getElementById('algo');
        a.innerHTML = a.innerHTML + '<p id="l' + num + '">' + inf + '</p>';
      }
  
      function edit_algo(num, inf, color){
        document.getElementById('l' + num).innerHTML = inf;
        document.getElementById('l' + num).style.color = color;
      }
  
      function vider_algo(){
        document.getElementById('algo').innerHTML = "";
      }


    function affich_guide_struct() {
        document.getElementById('algo').style.display='none';
        document.getElementById('Btree').style.display='none';
        guide.innerHTML='                    <div class="bg-modal">\n' +
            '                    <div  class="guide">\n' +

            '                        <div id="guide-header" class="guide-control">\n' +
            '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
            '                            <p>B-arbre</p>\n' +
            '                        </div>\n' +
            '                        <div id="guide1" class="guide-content">\n' +
            '                        <h3>I.Information sur la structure:</h3>\n' +
            '                       Les B-arbres sont des arbres de recherche m-aires qui restent \n' +
            '                        <br>\n' +
            '                        toujours équilibrés, où tous les noeuds à part la racine, sont \n' +
            '                        <br>\n' +
            '                        remplis au minimum à 50% et toutes les branches ont la même \n' +
            '                        <br>\n' +
            '                        longueur (arbre complètement équilibré)\n' +
            '                        <br>\n' +
            '                    </div>\n' +
            '                        <div id="guide2" class="guide-content">\n' +
            '                            <h3>II.Information sur la visualisation:</h3>\n' +
            '                            - L\'arbre est d\'ordre 5 \n' +
            '                            <br>\n' +
            '                            - Chaque noueds non feuille a 5 fils (seuls les fils remplis sont affichés) \n' +

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
