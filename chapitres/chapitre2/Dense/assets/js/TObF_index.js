
const taille_max = 9;
const max_bloc = 4;
var speed = 1;
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



function animations() {

}
animations.prototype={
    constructor:animations(),
    selectbloc:function(num_bloc){
    animation = anime({
        targets: document.getElementById("bloc" + (num_bloc-1)),
        borderColor:[
        {value: '#000000'},
        ],
    });
    animation = anime({
        targets: document.getElementById("bloc" + num_bloc),
        borderColor:[
        {value: '#FFFF00'},
        ]
    });
    },
    
    selectcle:function(num_bloc, num_enr, color){
    animation = anime({
        targets: document.getElementById("cle" + num_bloc + "_" + num_enr),
        borderColor:[
        {value: color},
        ],
    });
    },
    
    selecteff:function(num_bloc, num_enr, color){
    animation = anime({
        targets: document.getElementById("eff" + num_bloc + "_" + num_enr),
        borderColor:[
        {value: color},
        ],
    });
    },
    
    selectinf:function(num_bloc, num_enr, color){
    animation = anime({
        targets: document.getElementById("inf" + num_bloc + "_" + num_enr),
        borderColor:[
        {value: color},
        ],
    });
    },
    
    selectnb:function(num_bloc, color){
    animation = anime({
        targets: document.getElementById("nb" + num_bloc),
        borderColor:[
        {value: color},
        ],
    });
    },

    selectentete:function(color){
    animation = anime({
        targets: document.getElementById('entete_nb'),
        borderColor:[
        {value: color},
        ],
    });
    },
    
    select_enr: function(num_bloc, num_enr, color){
    this.selectcle(num_bloc, num_enr, color);
    this.selecteff(num_bloc, num_enr, color);
    this.selectinf(num_bloc, num_enr, color);
    },

    s_bloc: function(num_bloc, color){
    animation = anime({
        targets: document.getElementById("bloc" + num_bloc),
        borderColor:[
        {value: color}
        ]
    });
    },

    relooad: async function(a){
    let i = 1, j = 0;
        while (i<= a.tab_bloc.length){
            buff = a.liredir(i);
            this.bloc_up(i);
            this.s_bloc(i, "#000000");
            while (j < buff.tab_enrg.length){
            this.selectcle(i, j+1, '#dddddd');
            this.selecteff(i, j+1, '#dddddd');
            this.selectinf(i, j+1, "#dddddd");
            j++;
            }
            i++;
            j = 0;
        }
        return;
    },

    bloc_down:function (num_bloc) {
        animation = anime({
        targets: document.getElementById("bloc" + num_bloc),
        translateY:[
            {value:50, duration:speed*1000}
            ],
        easing:'linear'
        });
    },

    bloc_up:function (num_bloc) {
        animation = anime({
        targets: document.getElementById("bloc" + num_bloc),
        translateY:[
            {value:0, duration:speed*1000}
            ],
        easing:'linear'
        });
    },

    enr_down: function(num_bloc, num_enr){
    animation = anime({
        targets: document.getElementById('enr' + num_bloc + '_' + num_enr),
        translateY:[
        {value:$("#nb" + num_bloc).offset().top - $('#' + 'enr' + num_bloc + '_' + num_enr).offset().top + 50, duration:speed*1000}
        ],
        easing:'linear',
    })
    },

    enr_up: function(num_bloc, num_enr){
    animation = anime({
        targets: document.getElementById('enr' + num_bloc + '_' + num_enr),
        translateY:[
        {value:0 , duration:speed*1000}
        ],
        easing:'linear',
    })
    },

    go_to: function(id1, id2, durationx, durationy){

    let x1 = document.querySelector('#' + id1).getBoundingClientRect().left;
    let x2 = document.querySelector('#' + id2).getBoundingClientRect().left;

    let y1 = document.querySelector('#' + id1).getBoundingClientRect().top;
    let y2 = document.querySelector('#' + id2).getBoundingClientRect().top;
    animation = anime({
        targets: document.getElementById(id1),
        translateY:[
        {value:  0, duration:speed*0}
        ],
        translateX:[
        {value:  0, duration:speed*0}
        ],
        easing:'linear',
    });

    let x = document.querySelector('#' + id1).getBoundingClientRect().left;
    let y = document.querySelector('#' + id1).getBoundingClientRect().top;

    animation = anime({
        targets: document.getElementById(id1),
        translateY:[
        {value:  y1 - y, duration:speed*0}
        ],
        translateX:[
        {value:  x1 - x, duration:0}
        ],
        easing:'linear',
    });
    
    //let x1 = document.getElementById(id1).getBoundingClientRect().right - document.getElementById(id1).getBoundingClientRect().width;
    //let x2 = document.getElementById(id2).getBoundingClientRect().right - document.getElementById(id2).getBoundingClientRect().width;
    //let y1 = document.getElementById(id1).getBoundingClientRect().bottom - document.getElementById(id1).getBoundingClientRect().height;
    //let y2 = document.getElementById(id2).getBoundingClientRect().bottom - document.getElementById(id2).getBoundingClientRect().height;
    

    //console.log(document.getElementById(id2).getBoundingClientRect().left, document.getElementById(id1).getBoundingClientRect().left, x2 - x1);
    //console.log(document.getElementById(id2).getBoundingClientRect().top, document.getElementById(id1).getBoundingClientRect().top, y2 - y1);
    
    animation = anime({
        targets: document.getElementById(id1),
        translateX:[
        {value: (x2 - x) , duration:speed*durationx}
        ],
        translateY:[
        {value: (y2 - y) , duration:speed*durationy, delay:speed*durationx}
        ],
        easing:'linear',
    });

    },

    select_index: function(type, num, color){
    animation = anime({
        targets: document.getElementById(type + num),
        borderColor:[
        {value: color},
        ],
    });
    },

    select_enr_index:function(num, color){
    this.select_index("cle" , num, color);
    this.select_index("eff" , num, color);
    this.select_index("inf" , num, color);
    },

    enr_up_index: function(num){
    animation = anime({
        targets: document.getElementById("cle" + num),
        translateY:[
        {value:-50 , duration:speed*800}
        ],
        easing:'linear',
    });

    animation = anime({
        targets: document.getElementById('eff' + num).innerText,
        translateY:[
        {value:-50 , duration:speed*800}
        ],
        easing:'linear',
    });

    animation = anime({
        targets: document.getElementById('inf' + num).innerHTML,
        translateY:[
        {value:-50 , duration:speed*800}
        ],
        easing:'linear',
    });
    },

    enr_down_index: function(num){
    animation = anime({
        targets: document.getElementById('enr' + num).innerHTML,
        translateY:[
        {value:-50 , duration:speed*1000}
        ],
        easing:'linear',
    })
    },

    enr_return_index: function(num){
    animation = anime({
        targets: document.getElementById('enr' + num).innerHTML,
        translateY:[
        {value:0 , duration:speed*0}
        ],
        easing:'linear',
    })
    },

};

var anim = new animations();


    //---------------------------Typedef_Enregestrement----------------------------------//

    function Enregestrement(cle, champ_eff, info) {
        this.cle = cle;
        this.champ_eff = champ_eff;
        this.info = info;
      }
  
      Enregestrement.prototype = {
        constructor:Enregestrement,
        get_cle : function () {
          return this.cle;
        },
  
        get_eff : function () {
          return this.champ_eff;
        },
  
        get_info : function () {
          return this.info;
        },
  
        set_eff : function (eff) {
          this.champ_eff = eff;
        },
  
        set_cle : function(cle){
          this.cle = cle;
        }
      }
  
      //-------------------------TypedefBLOC-------------------------------------------//
  
      function Tbloc() {
        this.tab_enrg = [];
        this.nb_enrg = 0;
      }
  
      Tbloc.prototype = {
        constructor:Tbloc
      }
  
      //------------------------TypedefENTETE------------------------------------------//
  
      function Entete(nb_bloc) {
        this.nb_bloc = nb_bloc;
      }
  
      Entete.prototype = {
        constructor:Entete,
        get_nb_bloc : function () {
          return this.nb_bloc;
        },
  
        set_nb_bloc : function (nb_bloc) {
          this.nb_bloc = nb_bloc;
        }
      };
  
      //----------------------traitement du fichier--------------------------------------//
      var buff = new Tbloc();

    function t_index(){
        this.tab = [];
        this.nb_enrg = 0;
    }
    t_index.prototype = {
        constructor:t_index,

    recherche :async function(cle, res){
    let bi = 0, bs = this.nb_enrg-1, m = 0, trouve = false;
    anim.select_enr_index(bi+1, "#1E90FF");
    anim.select_enr_index(bs+1, "#9400D3");
    await sleep(500);
    if(this.nb_enrg > 0){
        while ((bi <= bs) && !trouve) {
        m = Math.trunc((bi + bs) / 2);
        anim.select_enr_index(m+1, "#D2691E");
        await sleep(1000);
        if (this.tab[m].cle == cle) {
            trouve = true;
            anim.select_index("cle", m+1, "#00FF00");
            await sleep(1000);
            anim.select_enr_index(bi+1, "#dddddd");
            anim.select_enr_index(bs+1, "#dddddd");
            await sleep(200);
            anim.select_enr_index(m+1, "#00FF00");
        }
        else if (this.tab[m].cle > cle) {
            anim.select_index("cle", m+1, "#FF0000");
            await sleep(500);
            anim.select_enr_index(bs+1, "#dddddd");
            await sleep(350);
            bs = m-1;
            anim.select_enr_index(bs+1, "#9400D3");
            await sleep(500);
            anim.select_enr_index(m+1, "#dddddd");
            await sleep(500);
        }
        else {
            anim.select_index("cle", m+1, "#FF0000");
            await sleep(500);
            anim.select_enr_index(bi+1, "#dddddd");
            await sleep(350);
            bi = m+1;
            anim.select_enr_index(bi+1, "#1E90FF");
            await sleep(500);
            anim.select_enr_index(m+1, "#dddddd");
            await sleep(500);
        }
        }
        anim.select_enr_index(bi+1, "#dddddd");
        anim.select_enr_index(bs+1, "#dddddd");
    }

    res.make = [trouve, m];
    },
    insertion :async function(enr, res){
    let i, j = this.nb_enrg-1;
    i = res.make[1];
    if (!res.make[0]){
        if(j >= 0 && this.tab[i].cle < enr[0]) i++;
        anim.select_enr_index((i+1), "#00FFFF");
        await sleep(500);
        while(j >= i){
        anim.select_enr_index((j+1), "#00FFFF");
        await sleep(500);
        document.getElementById("enr" + (j+1)).style.color = "#00FFFF";
        await sleep(500);


     


        document.getElementById("cle" + (j+2)).innerHTML = document.getElementById("cle" + (j+1)).innerHTML;
        document.getElementById("eff" + (j+2)).innerHTML = document.getElementById("eff" + (j+1)).innerHTML;
        document.getElementById("inf" + (j+2)).innerHTML = document.getElementById("inf" + (j+1)).innerHTML;
        document.getElementById("enr" + (j+2)).style.color = "#00FFFF";
        document.getElementById("enr" + (j+1)).style.color = "#000000";
        document.getElementById("cle" + (j+1)).innerHTML =  "";
        document.getElementById("eff" + (j+1)).innerHTML = "";
        document.getElementById("inf" + (j+1)).innerHTML =  "";
        //anim.enr_return_index(i+2);
        await sleep(1000);
        anim.select_enr_index(j+1, "#dddddd");
        document.getElementById("enr" + (j+2)).style.color = "#000000";


        this.tab[j+1] = this.tab[j];
        j--;
        }
        this.tab[i] = new Enregestrement(enr[0], enr[1], enr[2]);
        this.nb_enrg++;
        anim.select_enr_index(i+1, "#00FFFF");
        document.getElementById("cle" + (i+1)).innerHTML = enr[0] ;
        await sleep(500);
        document.getElementById("eff" + (i+1)).innerHTML = enr[1] ;
        await sleep(500);
        anim.selectentete("#00FFFF");
        anim.selectnb(document.getElementById("entete_nb").innerHTML, "#00FFFF");
        await sleep(1000);
        document.getElementById("inf" + (i+1)).innerHTML = "[ " + enr[2] + " ]";
        anim.selectentete("#dddddd");
        anim.selectnb(document.getElementById("entete_nb").innerHTML, "#dddddd");
        anim.select_enr_index(i+1, "#dddddd");

    }
    else 
    {
        anim.select_enr_index(i+1, "#dddddd");
        await sleep(400);
        anim.select_index("eff", i+1, "#00FFFF");
        if(this.tab[i].get_eff()){
        anim.select_index("eff", i+1, "#39E19E");
        await sleep(800);
        this.tab[i].set_eff(false);
        document.getElementById("eff" + (i+1)).innerHTML = false;
        await sleep(500);
        anim.select_index("eff", i+1, "#dddddd");
        this.tab[i].info = enr[2];
        anim.select_index("inf", i+1, "#00FFFF");
        document.getElementById("inf" + (i+1)).innerHTML = "[ " + enr[2] + " ]";
        await sleep(500);
        anim.select_index("inf", i+1, "#dddddd");
        }
        else{
        anim.select_index("eff", i+1, "#F41215");
        await sleep(1000);
        anim.select_index("eff", i+1, "#dddddd");
        }
    }
    //sinon il existe
    },
    suppression_logique :async function(trouve, m){
    if (trouve){
        anim.select_index("eff", m+1, "#00FFFF");
        await sleep(500);
        if(!this.tab[m].get_eff()){
        this.tab[m].set_eff(true);
        document.getElementById("eff" + (m+1)).innerHTML = true;
        document.getElementById("eff" + (m+1)).style.color = "#00FF00";
        await sleep(1000);
        }
        else{
        alert("L'enregistrement deja supp logiquement");
        }
        document.getElementById("eff" + (m+1)).style.color = "#000000";
        anim.select_index("eff", m+1, "#dddddd");
    }
    //sinon n'existe pas
    },
    suppression_phys :async function(cle, res){
    let i;
    if (res.make[0]){
        anim.select_index("inf", this.nb_enrg, "#0064FF");
        await sleep(500);
        this.tab[this.nb_enrg - 1].info = this.tab[res.make[1]].get_info();
        document.getElementById("inf" + this.nb_enrg).innerHTML = document.getElementById("inf" + (res.make[1]+1)).innerHTML;
        document.getElementById("inf" + this.nb_enrg).style.color = "#0064FF";
        await sleep(500);
        anim.select_index("inf", (res.make[1]+1), "#dddddd");
        anim.select_index("inf", this.nb_enrg, "#dddddd");
        document.getElementById("inf" + (res.make[1]+1)).style.color = "#000000";
        document.getElementById("inf" + this.nb_enrg).style.color = "#000000";
        for(i = res.make[1]; i < this.nb_enrg-1; i++){
        anim.select_enr_index(i+1, "#00FFFF");
        await sleep(500);
        document.getElementById("enr" + (i+2)).style.color = "#00FFFF";
        await sleep(500);
        //anim.enr_up_index(i+2);
        await sleep(1000);
        this.tab[i] = this.tab[i+1];
        document.getElementById("cle" + (i+1)).innerHTML = document.getElementById("cle" + (i+2)).innerHTML;
        document.getElementById("eff" + (i+1)).innerHTML = document.getElementById("eff" + (i+2)).innerHTML;
        document.getElementById("inf" + (i+1)).innerHTML = document.getElementById("inf" + (i+2)).innerHTML;
        document.getElementById("enr" + (i+1)).style.color = "#00FFFF";
        document.getElementById("enr" + (i+2)).style.color = "#000000";
        document.getElementById("cle" + (i+2)).innerHTML =  "";
        document.getElementById("eff" + (i+2)).innerHTML = "";
        document.getElementById("inf" + (i+2)).innerHTML =  "";
        //anim.enr_return_index(i+2);
        await sleep(1000);
        anim.select_enr_index(i+1, "#dddddd");
        document.getElementById("enr" + (i+1)).style.color = "#000000";
        }
        this.tab.pop();
        this.nb_enrg--;
    }
    //sinon n'existe pas
},
    afficher: function(){
    let i;
    for(i = 1; i <= this.nb_enrg; i++){
        document.getElementById("cle" + i).innerHTML = this.tab[i-1].get_cle();
        document.getElementById("eff" + i).innerHTML = this.tab[i-1].get_eff();
        document.getElementById("inf" + i).innerHTML = "[ " + this.tab[i-1].get_info()[0] + ",  " + this.tab[i-1].get_info()[1] + " ]";
    }
    }
};

    var table_index = new t_index();

    function TObF_index(nom_fich) {
        this.nom_fich = nom_fich;
        this.entete = new Entete(0);
        this.tab_bloc = [];
    }

    TObF_index.prototype = {
        constructor:TObF_index,

        liredir : function (i) {
        return  this.tab_bloc[i-1];
        },

        ecriredir : function (i, buff) {
        this.tab_bloc[i-1] = buff;
        },

        chargement_initial :async function (nb_enrg, taux) {
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0"style="text-decoration: underline;">Chargement initial du fichier(nb_enrg, taux)</p>' + 
                      '<p id="l1"> </p>';
        let u = taux;
        if(taux < 1/taille_max)  u = 1/taille_max;
        if(taux > 1) u = 1;

        let j=0, i = 1, j2 = 0;

        if((nb_enrg / (taille_max*u)) > 2) {
            alert('wrong info!!  only 2 bloc');
            return;
        }

        add_algo(2, "Pour(k allant de 0 vers nb_enrg)");
        add_algo(3, "&nbsp &nbsp Si(j < taille_max*taux)");
        add_algo(4, "&nbsp &nbsp &nbsp &nbsp inserssion d'enregistrement dans buff dans la position j");
        add_algo(5, "&nbsp &nbsp &nbsp &nbsp j++ et inserssion (cle, eff, coord) dans la table d'index");
        add_algo(6, "&nbsp &nbsp Sinon");
        add_algo(7, "&nbsp &nbsp &nbsp &nbsp mettre à jour le buff.nb et ecrire le bloc i");
        add_algo(8, "&nbsp &nbsp &nbsp &nbsp i++ et inserer le premier enregistrement dans le nouveau bloc");
        add_algo(9, "&nbsp &nbsp &nbsp &nbsp j = 1 et inserer (cle, eff, coord) dans la table d'index");
        add_algo(10, "FPour");
        add_algo(11, "mettre à jour le buff.nb et ecrire le bloc i");
        add_algo(12, "mettre à jour l'entete");

        this.ecriredir(i, new Tbloc);
        i++;
        this.ecriredir(i, new Tbloc);
        i++;
        buff = new Tbloc;
        if(nb_enrg != 0) {
            document.getElementById("index").style.display = "inline-table";
            anim.selectbloc(i);
            await sleep(300);
            anim.bloc_down(i);
            await sleep(1000);
        
        select_ligne(2);
        await sleep(250);
        deselect_ligne(2);
        for (let k = 0; k < nb_enrg; k++){
            select_ligne(3);
            await sleep(250);
            deselect_ligne(3);
            if (j < taille_max*u){
                select_ligne(3);
                await sleep(250);
                deselect_ligne(3);
                let e = new Enregestrement(k*2, false, Math.floor(Math.random()*1022469763250)+500);
                buff.tab_enrg[j] = e;
                j++;
                table_index.tab[j2] = new Enregestrement(e.get_cle(), e.get_eff(), [i, j]);
                j2++;

                select_ligne(4);
                anim.select_enr(i, j, "#00FFFF");
                anim.select_enr_index(j2, "#00FFFF");
                await sleep(200);
                document.getElementById("cle" + i + "_" + j).innerHTML = e.get_cle();
                await sleep(300);
                document.getElementById("eff" + i + "_" + j).innerHTML = e.get_eff();
                await sleep(300);
                document.getElementById("inf" + i + "_" + j).innerHTML = e.get_info();
                await sleep(300);
                deselect_ligne(4);
                select_ligne(5);
                await sleep(500);
                document.getElementById("cle" + j2).innerHTML = e.get_cle();
                await sleep(300);
                document.getElementById("eff" + j2).innerHTML = e.get_eff();
                await sleep(300);
                document.getElementById("inf" + j2).innerHTML = "[ " + i + ", "+ j + " ]";
                await sleep(300);

                anim.select_enr(i, j, "#dddddd");
                anim.select_enr_index(j2, "#dddddd");
                deselect_ligne(5);

            }
            else {
                select_ligne(6);
                await sleep(250);
                deselect_ligne(6);
                select_ligne(7);
                buff.nb_enrg = j;
                anim.selectnb(i, "#00FFFF");
                await sleep(200);
                document.getElementById("nb" + i).innerHTML = buff.nb_enrg;
                await sleep(300);
                anim.selectnb(i, "#dddddd");
                this.ecriredir(i, buff);
                anim.s_bloc(i, "#000000");
                anim.bloc_up(i);
                await sleep(1000);
                this.ecriredir(i, buff);
                deselect_ligne(7);
                buff = new Tbloc;
                select_ligne(8);
                i++;
                anim.selectbloc(i);
                await sleep(300);
                anim.bloc_down(i);
                await sleep(1000);
                e = new Enregestrement(k*2, false, Math.floor(Math.random()*1022469763250)+500);
                buff.tab_enrg[0] = e;
                j = 1;
                table_index.tab[j2] = new Enregestrement(e.get_cle(), e.get_eff(), [i, j]);
                j2++;

                anim.select_enr(i, 1, "#00FFFF");
                await sleep(200);
                document.getElementById("cle" + i + "_" + j).innerHTML = e.get_cle();
                await sleep(300);
                document.getElementById("eff" + i + "_" + j).innerHTML = e.get_eff();
                await sleep(300);
                document.getElementById("inf" + i + "_" + j ).innerHTML = e.get_info();
                await sleep(300);
                deselect_ligne(8);
                select_ligne(9);
                anim.select_enr_index(j2, "#00FFFF");
                await sleep(500);
                document.getElementById("cle" + j2).innerHTML = e.get_cle();
                await sleep(300);
                document.getElementById("eff" + j2).innerHTML = e.get_eff();
                await sleep(300);
                document.getElementById("inf" + j2).innerHTML = "[ " + i + ", "+ j + " ]";
                await sleep(300);

                anim.select_enr(i, j, "#dddddd");
                anim.select_enr_index(j2, "#dddddd");
                deselect_ligne(9);
            }
        }
        select_ligne(10);
        await sleep(250);
        deselect_ligne(10);

        select_ligne(11);

        table_index.nb_enrg = j2;
        buff.nb_enrg = j;

        anim.selectnb(i, "#00FFFF");
        await sleep(200);
        document.getElementById("nb" + i).innerHTML = buff.nb_enrg;
        await sleep(300);
        anim.selectnb(i, "#dddddd");
        this.ecriredir(i, buff);
        anim.s_bloc(i, "#000000");
        anim.bloc_up(i);
        await sleep(1000);
        deselect_ligne(11);
        select_ligne(12);
        this.entete.set_nb_bloc(i);
        anim.selectentete("#00FFFF");
        await sleep(500);
        document.getElementById('entete_nb').innerHTML = this.entete.get_nb_bloc();
        await sleep(800);
        anim.selectentete("#dddddd");
        deselect_ligne(12);

        /*
        i = 1;
        j = 0;
        j2 = 0

        anim.s_bloc(i, "#FFFF00");
        anim.bloc_down(i);
        await sleep(1000);
        buff = new Tbloc;
        for (j2 = 0; j2 < table_index.nb_enrg; j2++){
            buff.tab_enrg[j] = table_index.tab[j2];
            j++;
            anim.select_enr(i, j, "#00FFFF");
            anim.select_enr_index(j2+1, "#00FFFF");
            await sleep(800);
            document.getElementById("cle" + i + "_" + j).innerHTML = document.getElementById("cle" + (j2+1)).innerHTML;
            document.getElementById("eff" + i + "_" + j).innerHTML = document.getElementById("eff" + (j2+1)).innerHTML;
            document.getElementById("inf" + i + "_" + j).innerHTML = document.getElementById("inf" + (j2+1)).innerHTML;
            await sleep(800);
            anim.select_enr(i, j, "#dddddd");
            anim.select_enr_index(j2+1, "#dddddd");
            if((j >= taille_max) || j2+1 == table_index.nb_enrg){
                buff.nb_enrg = j;
                this.ecriredir(i, buff);
                anim.selectnb(i, "#00FFFF");
                await sleep(800);
                document.getElementById("nb" + i).innerHTML = j;
                anim.selectnb(i, "#dddddd");
                buff.nb_enrg = j;
                this.ecriredir(i, buff);
                anim.s_bloc(i, "#000000");
                anim.bloc_up(i);
                await sleep(1000);
                buff = new Tbloc;
                j = 0;
                i++;
                if(j2+1 < table_index.nb_enrg){
                    anim.s_bloc(i, "#FFFF00");
                    anim.bloc_down(i);
                    await sleep(1000);
                }
            }
        }*/


        }

        //this.afficher();
        //table_index.afficher();
        return table_index;
        },

        recherche :async function (cle) {
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Recherche(var trouve, var i, var j)</p>' + 
                      '<p id="l1"> </p>'
                      
        let i, j, res = [];
        add_algo(2, "Rechere dichotomique dans la table d'index(var trouve, var i, var j)");
        add_algo(3, "Si(!trouve OU (trouve ET eff))");
        add_algo(4, "&nbsp &nbsp ecrire(l'enrg n'existe pas')");
        add_algo(5, "Sinon");
        add_algo(6, "&nbsp &nbsp ecrire(l'enrg existe dans le bloc', i 'dans la position', j')");
        
        select_ligne(2);
        await table_index.recherche(cle, res);
        deselect_ligne(2);
        i = table_index.tab[res.make[1]].get_info()[0];
        j = table_index.tab[res.make[1]].get_info()[1]-1;
        select_ligne(3);
        await sleep(250);
        deselect_ligne(3);
        if(!res.make[0] || (res.make[0] && table_index.tab[res.make[1]].get_eff())){
            select_ligne(4);
            await sleep(300);
            deselect_ligne(4);
        }
        else{
            select_ligne(5);
            await sleep(250);
            deselect_ligne(5);
            select_ligne(6);
            document.getElementById("inf" + (res.make[1]+1)).style.color = "#0064FF";
            anim.select_index("inf", (res.make[1]+1),"#0064FF" );
            buff = this.liredir(i);
            anim.s_bloc(i, "#FFFF00");
            await sleep(500);
            anim.bloc_down(i);
            await sleep(1000);
            anim.select_enr(i, j+1, "#00FFFF");
            await sleep(1000);
            anim.select_enr(i, j+1, "#dddddd");
            anim.s_bloc(i, "#000000");
            anim.bloc_up(i);
            await sleep(1000);
            document.getElementById("inf" + (res.make[1]+1)).style.color = "#000000";
            anim.select_index("inf", (res.make[1]+1),"#dddddd");
            deselect_ligne(6);
        }
        },

        suppression_phys :async function (cle) {
        vider_algo();
            let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Suppression_physique(cle)</p>' + 
                      '<p id="l1"> </p>'

        add_algo(2, "Rechere dichotomique dans la table d'index(var trouve, var i, var j)");
        add_algo(3, "Si(trouve)");
        add_algo(4, "&nbsp &nbsp lire le dernier bloc; copier le dernier enrg");
        add_algo(5, "&nbsp &nbsp decrimenter le nombre d'enregistrements");
        add_algo(6, "&nbsp &nbsp Si(nb_enrg dans le bloc > 0 ET i != le dernier bloc) ecrire le dernier bloc");
        add_algo(7, "&nbsp &nbsp Sinon decrementer le nombre des blocs");
        add_algo(8, "&nbsp &nbsp Si(i != le dernier bloc) lireDir(i, buff)");
        add_algo(9, "&nbsp &nbsp ecraser l'enregistrement");
        add_algo(10, "&nbsp &nbsp ecrire le buff dans le bloc i");
        add_algo(11, "&nbsp &nbsp mettre à jour les coord du dernier enrg d'index et suppression par decalage");
        add_algo(12, "Sinon  ecrire('l'enregistrement n'existe pas')");
        let res = Array();
        select_ligne(2);
        await table_index.recherche(cle, res);
        deselect_ligne(2);
        enr = new Enregestrement;
        i = table_index.tab[res.make[1]].get_info()[0], j = table_index.tab[res.make[1]].get_info()[1]-1 ;

        select_ligne(3);
        await sleep(250);
        deselect_ligne(3);
        if (res.make[0]){
            select_ligne(4);
            anim.select_index("inf", (res.make[1]+1), "#0064FF");
            document.getElementById("inf" + (res.make[1]+1)).style.color = "#0064FF";
            await sleep(1000);
            anim.select_enr(i, (j+1), '#00FFFF');
            await sleep(1000);
            buff = this.liredir(this.entete.get_nb_bloc());
            anim.selectentete("#00FFFF");
            await sleep(500);
            anim.s_bloc(this.entete.get_nb_bloc(), "#FFFF00");
            await sleep(500);
            anim.selectentete("#dddddd");
            anim.bloc_down(this.entete.get_nb_bloc());
            await sleep(1000);
            enr = buff.tab_enrg[buff.nb_enrg-1];
            k = buff.nb_enrg;
            l = this.entete.get_nb_bloc();
            anim.selectnb(l, "#00FFFF");
            await sleep(500);
            anim.select_enr(l, k, '#00FFF');
            await sleep(1000);
            anim.selectnb(l, "#00FFFF");
            anim.enr_down(l, k);
            await sleep(1000);
            anim.go_to('s', 'enr' + l +'_'+k, 0, 0);
            document.getElementById('s1').innerHTML = document.getElementById('cle' + l + '_' + k).innerHTML;
            document.getElementById('s2').innerHTML = document.getElementById('eff' + l + '_' + k).innerHTML;
            document.getElementById('s3').innerHTML = document.getElementById('inf' + l + '_' + k).innerHTML;
            document.getElementById('ts').style.opacity = 1;
            document.getElementById("cle" + l + "_" + k).innerHTML = '';
            document.getElementById("eff" + l + "_" + k).innerHTML = '';
            document.getElementById("inf" + l + "_" + k).innerHTML = '';
            deselect_ligne(4);
            select_ligne(5);
            anim.enr_up(l, k);
            anim.select_enr(l, k, "#dddddd");
            anim.selectnb(l, "#00FFFF");
            await sleep(1000);
            buff.nb_enrg--;
            document.getElementById("nb" + l).innerHTML = buff.nb_enrg;
            await sleep(1000);
            anim.selectnb(l, "#dddddd");
            deselect_ligne(5);
            select_ligne(6);
            await sleep(250);
            deselect_ligne(6);
            if (buff.nb_enrg > 0)
            {
                if(res.make[1] != l){
                    select_ligne(6);
                    anim.s_bloc(this.entete.get_nb_bloc(), '#000');
                    anim.bloc_up(this.entete.get_nb_bloc());
                    await sleep(1000);
                    this.ecriredir(this.entete.get_nb_bloc(), buff);
                    deselect_ligne(6);
                }
            }
            else {
                select_ligne(7);
                anim.selectentete("#00FFFF");
                await sleep(1000);
                this.entete.set_nb_bloc(this.entete.get_nb_bloc()-1);
                document.getElementById('entete_nb').innerHTML = this.entete.get_nb_bloc();
                await sleep(1000);
                anim.selectentete("#dddddd");
                deselect_ligne(7);
            }

            select_ligne(8);
            await sleep(250);
            deselect_ligne(8);
            if (i != l) 
            {
                anim.s_bloc(l, '#000000');
                anim.bloc_up(l);
                await sleep(1000);
                select_ligne(8);
                buff = this.liredir(i);
                anim.selectbloc(i);
                anim.bloc_down(i);
                await sleep(1000);
                deselect_ligne(8);
            }
            if (i != l || j!=k-1){
                select_ligne(9);
                anim.go_to('s', 'enr' + i + '_' + (j+1), 2000, 2000);
                //anim.go_to('s2', 'eff' + i + '_' + (j+1), 2000, 2000);
                //anim.go_to('s3', 'inf' + i + '_' + (j+1), 2000, 2000);
                await sleep(4000);
                buff.tab_enrg[j] = enr;
                this.ecriredir(i, buff);
                document.getElementById("cle" + i + "_" + (j+1)).innerHTML = enr.get_cle();
                document.getElementById("eff" + i + "_" + (j+1)).innerHTML = enr.get_eff();
                document.getElementById("inf" + i + "_" + (j+1)).innerHTML = enr.get_info();
                anim.select_enr(i, j+1, "#dddddd");
                document.getElementById('ts').style.opacity = 0;
                deselect_ligne(9);
                select_ligne(10);
                anim.s_bloc(i, '#000');
                anim.bloc_up(i);
                await sleep(1000);
                this.ecriredir(i, buff);
                deselect_ligne(10);
            }
            document.getElementById('ts').style.opacity = 0;
            select_ligne(10);
            anim.s_bloc(i, '#000');
            anim.bloc_up(i);
            await sleep(1000);
            this.ecriredir(i, buff);
            deselect_ligne(10);
            //document.getElementById('s').appendChild(document.getElementById("enr" + l + "_" + k).cloneNode(true));
            select_ligne(11);
            table_index.suppression_phys(cle, res);
            deselect_ligne(11);
        }
        else{
            select_ligne(12);
            await sleep(300);
            deselect_ligne(12);
        }
        //anim.relooad(this);
        },

        suppression_logique :async function (cle) {
        vider_algo();
            let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Suppression_logique(cle)</p>' + 
                      '<p id="l1"> </p>';

        add_algo(2, "Rechere dichotomique dans la table d'index(var trouve, var i, var j)");
        add_algo(3, "Si(trouve ET !eff");
        add_algo(4, "&nbsp &nbsp mettre le champ eff d'index à vrai");
        add_algo(5, "&nbsp &nbsp lireDir(i, buff) et buff.tab_enrg[j].eff = true");
        add_algo(6, "&nbsp &nbsp ecrireDir(buff, i)");
        add_algo(7, "Sinon ecrire('l'enregistrement n'existe pas')");
        let res = Array(), i, j, trouve;
        select_ligne(2);
        await table_index.recherche(cle, res);
        deselect_ligne(2);
        i = table_index.tab[res.make[1]].get_info()[0], j = table_index.tab[res.make[1]].get_info()[1]-1;
        trouve = table_index.tab[res.make[1]].get_eff();
        anim.select_enr_index((res.make[1]+1), "#dddddd");
        select_ligne(3);
        await sleep(250);
        deselect_ligne(3);
        if (res.make[0] && !trouve) {
            select_ligne(4);
            await table_index.suppression_logique(res.make[0], res.make[1]);
            deselect_ligne(4);
            select_ligne(5);
            document.getElementById("inf" + (res.make[1]+1)).style.color = "#0064FF";
            anim.select_index("inf", (res.make[1]+1),"#0064FF" );
            await sleep(500);
            buff = this.liredir(i);
            anim.selectbloc(i);
            anim.bloc_down(i);
            await sleep(1000);
            anim.select_enr(i, j+1, "#00FFFF");
            await sleep(400);
            anim.select_enr(i, j+1, "#dddddd");
            anim.selecteff(i, j+1, '#00FFFF');
            await sleep(500);
            buff.tab_enrg[j].set_eff(true);
            document.getElementById("eff" + i + "_" + (j+1) ).innerHTML = true;
            document.getElementById("eff" + i + "_" + (j+1) ).style.color = "#00FF00";
            await sleep(500);
            document.getElementById("eff" + i + "_" + (j+1) ).style.color = "#000000";
            anim.selecteff(i, j+1, '#dddddd');
            deselect_ligne(5);
            select_ligne(6);
            this.ecriredir(i, buff);
            anim.s_bloc(i, "#000000");
            anim.bloc_up(i);
            await sleep(1000);
            deselect_ligne(6);
            document.getElementById("inf" + (res.make[1]+1)).style.color = "#000000";
            anim.select_index("inf", (res.make[1]+1),"#dddddd");
        }
        //await anim.relooad(this);
        //anim.bloc_up(i);
        },

        insertion :async function (cle, enreg) {
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Inserssion(cle, enrg)</p>' + 
                      '<p id="l1"> </p>'
                      
        add_algo(2, "Recherche dichotomique dans la table d'index(trouve, i, j)");
        add_algo(3, "Si(!trouve)");
        add_algo(4, "&nbsp &nbsp inserssion dans le dernier bloc dans le dernier enrg et ecrire le bloc");
        add_algo(5, "&nbsp &nbsp inserssion (cle, eff, coord) dans la table d'index");
        add_algo(6, "Sinon Si(effacé)");
        add_algo(7, "&nbsp &nbsp mettre le champ eff 'faux' dans la table index");
        add_algo(8, "&nbsp &nbsp ecraser l'enrg effacé par le nouveau enrg (bloc i pos j) et ecrire le bloc");
        
        
        let res = Array(), inc_entete=false;
        select_ligne(2);
        await table_index.recherche(cle, res);
        deselect_ligne(2);
        i = table_index.tab[res.make[1]].get_info()[0], j = table_index.tab[res.make[1]].get_info()[1]-1 ;
        select_ligne(3);
        await sleep(250);
        deselect_ligne(3);
        if (!res.make[0]) {   
            select_ligne(4);           
            anim.selectentete("#00FFFF");
            await sleep(1000);
            anim.selectentete("#dddddd");
            if(this.entete.get_nb_bloc() != 0)
            {
            buff = this.liredir(this.entete.get_nb_bloc());
            anim.s_bloc(this.entete.get_nb_bloc(), "#FFFF00");
            await sleep(300);
            anim.bloc_down(this.entete.get_nb_bloc());
            await sleep(1000);
            anim.selectnb(this.entete.get_nb_bloc(), "#00FFFF");
            await sleep(500);
            anim.selectnb(this.entete.get_nb_bloc(), "#dddddd");
            }
            if (buff.nb_enrg == taille_max || this.entete.get_nb_bloc() == 0) {
            buff = new Tbloc;
            buff.nb_enrg = 0;
            this.entete.set_nb_bloc(this.entete.get_nb_bloc() + 1);
            inc_entete = true;
            anim.s_bloc(this.entete.get_nb_bloc(), "#FFFF00");
            anim.bloc_down(this.entete.get_nb_bloc());
            await sleep(1000);
            }

            buff.tab_enrg[buff.nb_enrg] = new  Enregestrement(cle, false, enreg);
            buff.nb_enrg++;
            
            this.ecriredir(this.entete.get_nb_bloc(), buff);
            anim.selectcle(this.entete.get_nb_bloc(), buff.nb_enrg, "#00FFFF");
            await sleep(500);
            document.getElementById("cle" + this.entete.get_nb_bloc() + "_" + buff.nb_enrg).innerHTML = buff.tab_enrg[buff.nb_enrg-1].get_cle();
            await sleep(500);
            anim.selectcle(this.entete.get_nb_bloc(), buff.nb_enrg, "#dddddd");

            anim.selecteff(this.entete.get_nb_bloc(), buff.nb_enrg, "#00FFFF");
            await sleep(500);
            document.getElementById("eff" + this.entete.get_nb_bloc() + "_" + buff.nb_enrg).innerHTML = buff.tab_enrg[buff.nb_enrg-1].get_eff();
            await sleep(500);
            anim.selecteff(this.entete.get_nb_bloc(), buff.nb_enrg, "#dddddd");

            anim.selectinf(this.entete.get_nb_bloc(), buff.nb_enrg, "#00FFFF");
            await sleep(500);
            document.getElementById("inf" + this.entete.get_nb_bloc() + "_" + buff.nb_enrg).innerHTML = buff.tab_enrg[buff.nb_enrg-1].get_info();
            await sleep(500);
            anim.selectinf(this.entete.get_nb_bloc(), buff.nb_enrg, "#dddddd");

            anim.selectnb(this.entete.get_nb_bloc(), "#00FFFF");
            await sleep(500);
            document.getElementById("nb" + this.entete.get_nb_bloc()).innerHTML = buff.nb_enrg;
            await sleep(300);
            anim.selectnb(this.entete.get_nb_bloc(), "#dddddd");

            anim.bloc_up(this.entete.get_nb_bloc());
            anim.s_bloc(this.entete.get_nb_bloc(), "#000000");

            if(inc_entete){
            anim.selectentete("#00FFFF");
            await sleep(1000);
            document.getElementById('entete_nb').innerHTML = this.entete.get_nb_bloc();
            await sleep(200);
            anim.selectentete("#dddddd");
            }
            deselect_ligne(4);
            select_ligne(5);
            await table_index.insertion([cle, false, [this.entete.get_nb_bloc(), buff.nb_enrg]], res);
            deselect_ligne(5);
        }
        else{
            select_ligne(6);
            await sleep(250);
            deselect_ligne(6);
            buff = this.liredir(i);
            
            if(buff.tab_enrg[j].get_eff()){
            select_ligne(7);
            await table_index.insertion([cle, false, [i, j]], res);
            deselect_ligne(7);
            select_ligne(8);
            buff = this.liredir(i);
            anim.selectbloc(i);
            anim.bloc_down(i);
            await sleep(1000);
            anim.select_enr(i, j+1, "#00FFFF");
            await sleep(500);
            anim.select_enr(i, j+1, "#dddddd");
            anim.selecteff(i, j+1, "#00FFFF");
            await sleep(500);
            buff.tab_enrg[j].set_eff(false);
            document.getElementById("eff" + i + "_" + (j+1) ).innerHTML = false;
            document.getElementById("eff" + i + "_" + (j+1) ).style.color = "#00FF00";
            await sleep(500);
            document.getElementById("eff" + i + "_" + (j+1) ).style.color = "#000000";
            anim.selecteff(i, j+1, "#dddddd");
            anim.selectinf(i, j+1, "#00FFFF");
            await sleep(500);
            buff.tab_enrg[j].info = enreg;
            document.getElementById("inf" + i + "_" + (j+1) ).innerHTML = enreg;
            document.getElementById("inf" + i + "_" + (j+1) ).style.color = "#00FF00";
            await sleep(500);
            document.getElementById("inf" + i + "_" + (j+1) ).style.color = "#000000";
            anim.selectinf(i, j+1, "#dddddd");

            this.ecriredir(buff);
            anim.bloc_up(i);
            anim.s_bloc(i, "#000000");
            deselect_ligne(8);
            }
        }
        //anim.relooad(this);
        //anim.bloc_up(this.entete.get_nb_bloc());
        },
        
        afficher :async function () {
        let i = 1, j = 0;
        document.getElementById('entete_nb').innerHTML = this.entete.get_nb_bloc();
        while (i<= this.entete.get_nb_bloc()){
            buff = this.liredir(i);
            while (j < buff.nb_enrg){
                document.getElementById("cle" + i + "_" + (j+1) ).innerHTML = buff.tab_enrg[j].get_cle();
                document.getElementById("eff" + i + "_" + (j+1) ).innerHTML = buff.tab_enrg[j].get_eff();
                if(i <=2 ) document.getElementById("inf" + i + "_" + (j+1) ).innerHTML = "[ " + buff.tab_enrg[j].get_info() + " ]";
                else document.getElementById("inf" + i + "_" + (j+1) ).innerHTML = buff.tab_enrg[j].get_info();
                document.getElementById("nb" + i).innerHTML = buff.nb_enrg;
                j++;
            }
            i++;
            j = 0;
        }
        },

        clear: function(i, j){
        let k = 0;
        while(i <= j){
            while(k < taille_max){
            document.getElementById("cle" + i + "_" + (k+1) ).innerHTML = "";
            document.getElementById("eff" + i + "_" + (k+1) ).innerHTML = "";
            document.getElementById("inf" + i + "_" + (k+1) ).innerHTML = "";
            document.getElementById("nb" + i).innerHTML = "";
            k++;
            }
            i++;
            k = 0;
        }
        },

        clear_index(){
        for(let i = 1; i <= table_index.nb_enrg; i++){
            document.getElementById("cle" + i).innerHTML = "";
            document.getElementById("eff" + i).innerHTML = "";
            document.getElementById("inf" + i).innerHTML = "";
        }; 

        table_index = new t_index;
        },

        close:async function(){
        document.getElementById('bloc1').style.display = 'inline-table';
        document.getElementById('bloc2').style.display = 'inline-table';
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Fermer le fichier</p>' + 
                      '<p id="l1"> </p>'
        add_algo(2, "ecrire l'index dans le fichier et le fermer");
        select_ligne(2);
        let i = 1, j = 0, k = 0;
        while(i <= 2){
            buff = new Tbloc;
            anim.s_bloc(i, "#FFFF00");
            anim.bloc_down(i);
            await sleep(1000);
            this.clear(i, i);
            this.ecriredir(i, new Tbloc);
            j = 0;
            while(j < taille_max && k < table_index.nb_enrg){
                buff.tab_enrg[j] = table_index.tab[k];
                k++;
                j++;
                anim.select_enr(i, j, "#00FFFF");
                anim.select_enr_index(k, "#00FFFF");
                await sleep(800);
                document.getElementById("cle" + i + "_" + j).innerHTML = document.getElementById("cle" + k).innerHTML;
                document.getElementById("eff" + i + "_" + j).innerHTML = document.getElementById("eff" + k).innerHTML;
                document.getElementById("inf" + i + "_" + j).innerHTML = document.getElementById("inf" + k).innerHTML;
                await sleep(800);
                anim.select_enr(i, j, "#dddddd");
                anim.select_enr_index(k, "#dddddd");
            }
            anim.selectnb(i, "#00FFFF");
            await sleep(800);
            document.getElementById("nb" + i).innerHTML = j;
            anim.selectnb(i, "#dddddd");
            buff.nb_enrg = j;
            this.ecriredir(i, buff);
            anim.s_bloc(i, "#000000");
            anim.bloc_up(i);
            await sleep(1000);
            i++;
        };

        document.getElementById("entete_nb").innerHTML = "";
        document.getElementById("index").style.display = "none";
        this.clear(1, 4);
        deselect_ligne(2);

        },

        open:async function(){
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Ouvrir le fichier</p>' + 
                      '<p id="l1"> </p>'
                      
        add_algo(2, "copie l'index dans un tableau dans la MC");
        select_ligne(2);
        let i = 1, j = 0, k = 0;
        this.clear_index();
        this.afficher();
        document.getElementById("index").style.display = "inline-table";
        while(i <= 2){
            buff = this.liredir(i);
            console.log(buff);
            anim.s_bloc(i, "#FFFF00");
            anim.bloc_down(i);
            await sleep(1000);
            j = 0;
            while(j < buff.nb_enrg){
            table_index.tab[k] = buff.tab_enrg[j];
            k++;
            j++;
            anim.select_enr(i, j, "#00FFFF");
            anim.select_enr_index(k, "#00FFFF");
            await sleep(500);
            document.getElementById("cle" + k).innerHTML = buff.tab_enrg[j-1].get_cle();
            document.getElementById("eff" + k).innerHTML = buff.tab_enrg[j-1].get_eff();
            document.getElementById("inf" + k).innerHTML = "[ " + buff.tab_enrg[j-1].get_info() + " ]";
            await sleep(500);
            anim.select_enr(i, j, "#dddddd");
            anim.select_enr_index(k, "#dddddd");
            }
            anim.s_bloc(i, "#000000");
            anim.bloc_up(i);
            await sleep(1000);
            i++;
        }
        table_index.nb_enrg = k;
        deselect_ligne(2);

        document.getElementById('bloc1').style.display = 'none';
        document.getElementById('bloc2').style.display = 'none';
        },
    };

    var f = new TObF_index("f");
    let initialise=false,ouvrirr=false,fermerr=false;
    function ouvrir(){
        if(fermerr) {
            f.open();
        }
        else {
            alert('le fichier doit etre fermé d\'abord')
        }
    }

    function fermer(){
        if (initialise) {
            f.close();
            fermerr=true;
        }
        else {
            alert('le fichier doit etre initialisé d\'abord')
        }
    }


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

function vider_alertt() {

    document.getElementById('initialiser-alert').innerText = '';

    document.getElementById('rechercher-alert').innerText = '';

    document.getElementById('inserer-alert').innerText = '';

    document.getElementById('supprimer-alert').innerText = '';

}
    function bulk_loading(){
      let n, t;
      vider_alertt();
      n = parseInt(document.getElementById('nb_enr').value);
      t = parseFloat(document.getElementById('taux').value);
      if (!isNaN(n) && !isNaN(t) && t<=1 && t>0) {
          document.getElementById('initialiser-form').style.display = 'none';
          box_shown = 0;
          f.chargement_initial(n, t);
          initialise=true;
      }
      else {
          if (isNaN(t) || t>1 || t<=0){
              alertt(1,'le taux doit etre > 0 et <= 1');
          }
      }
    }

    function insertion(){
        vider_alertt();
      let c, e;
      c = parseInt(document.getElementById('cle_inser').value);
      e = document.getElementById('enr_inser').value;
      if ( !isNaN(c) && e!='' && initialise) {
          document.getElementById('inserer-form').style.display = 'none';
          box_shown = 0;
          f.insertion(c, e);
      }
      else {
          if (!initialise){
              alertt(3,'le fichier n\'est pas initialisé');
          }
      }
    }

    async function recherche(){
        vider_alertt();
      let c, r=[];
      c = parseInt(document.getElementById('cle_rech').value);
      if (!isNaN(c) && initialise) {
          document.getElementById('rechercher-form').style.display = 'none';
          box_shown = 0;
          await f.recherche(c, r);
          if (!r.make[0]) {
              edit_algo(1, "Lenregistrement n'existe pas", '#DC0000');
          } else {
              edit_algo(1, "Lenregistrement existe dans le bloc " + r.make[1] + ", dans al position" + r.make[2], '#21DC00');
          }
      }
      else {
          if (!initialise){
              alertt(2,'le fichier n\'est pas initialisé');
          }
      }
    }

    function suppression_log(){
        vider_alertt();
      let c;
      c = parseInt(document.getElementById('cle_supp_log').value);
        if (!isNaN(c) && initialise) {
      document.getElementById('supprimer-form').style.display = 'none';
      box_shown = 0;
      f.suppression_logique(c);
        }
        else {
            if (!initialise){
                alertt(3,'le fichier n\'est pas initialisé');
            }
        }
    }

    function suppression_phys(){
        vider_alertt();
      let c;
      c = parseInt(document.getElementById('cle_supp_ph').value);
        if (!isNaN(c) && initialise) {
      document.getElementById('supprimer-form').style.display = 'none';
      box_shown = 0;
      f.suppression_phys(c);
        }
        else {
            if (!initialise){
                alertt(3,'le fichier n\'est pas initialisé');
            }
        }
    }

    function deselect_ligne(num){
      document.getElementById('l' + num).style.backgroundColor = "#fff";
      document.getElementById('l' + num).style.color = "#000";
    }

    function select_ligne(num){
      document.getElementById('l' + num).style.backgroundColor = "#9E14EF";
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
    document.getElementById('TObF_index').style.display='none';
    guide.innerHTML='                    <div class="bg-modal">\n' +
        '                    <div  class="guide" style="margin-top: 60px">\n' +

        '                        <div id="guide-header" class="guide-control">\n' +
        '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
        '                            <p>Index Dense</p>\n' +
        '                        </div>\n' +

        '                        <div id="guide1" class="guide-content">\n' +
        '                        <h3>I.Information sur la structure et la visualisation:</h3>\n' +
        '                        Un index est dit « dense »  s\'il contient toutes les valeurs de l’attribut clé\n\n' +
        '                        <br>\n' +
        '                        du fichier de données.L\'index est la table ordonnée en  mémoire \n' +
        '                        <br>\n' +
        '                        centrale (MC) contenant les triplets [cle , effacement , adr]\n' +
        '                        <br>\n' +
        '                            <img class="mt-1" src="assets/img/struct.JPG" height="300">\n' +
        '                    </div>\n' +
        '                        <div id="guide2" class="guide-content">\n' +
        '                            <h3>II.Clarification des operation ouvrir/fermer:</h3>\n' +
        '                            <img  src="assets/img/ouvrir.JPG" style="margin-top: 0">\n' +
        '                             <div  style="height: 200px;padding-top: 20px;display: inline-block">'+
        '                            Les operations fermer/ouvrir consiste a simuler la sauvegarde\n' +
        '                            <br>\n' +
        '                            et la restauration de l\'index du le fichier.Donc, pour utiliser\n' +
        '                            <br>\n' +
        '                             l\'operation fermer il faut d\'abord initialiser le fichier et pour\n' +
        '                            <br>\n'+
        '                            utiliser l\'operation ouvrir il faut d\'abord avoir utiliser\n' +
        '                            <br>\n'+
        '                             l\'operation fermer sur le fichier.\n' +
        '                            <br>\n'+
        '                            </div>'+
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
