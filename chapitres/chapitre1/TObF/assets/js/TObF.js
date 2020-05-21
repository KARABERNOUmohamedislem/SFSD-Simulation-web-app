
const taille_max = 9;
const max_bloc = 4;

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
          anim.bloc_up(i);
          animation = anime({
            targets: document.getElementById("bloc" + i),
            borderColor:[
              {value: '#000000'},
            ]
          });
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
          {value:50, duration:1000*speed}
          ],
        easing:'linear'
       });
  },

  bloc_up:function (num_bloc) {
      animation = anime({
        targets: document.getElementById("bloc" + num_bloc),
        translateY:[
          {value:0, duration:1000*speed}
          ],
        easing:'linear'
       });
  },

  enr_down: function(num_bloc, num_enr){
    animation = anime({
      targets: document.getElementById('enr' + num_bloc + '_' + num_enr),
      translateY:[
        {value:$("#nb" + num_bloc).offset().top - $('#' + 'enr' + num_bloc + '_' + num_enr).offset().top + 50, duration:1000*speed}
        ],
      easing:'linear',
    })
  },

  enr_up: function(num_bloc, num_enr){
    animation = anime({
      targets: document.getElementById('enr' + num_bloc + '_' + num_enr),
      translateY:[
        {value:0 , duration:1000*speed}
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
        {value:  0, duration:0}
        ],
      translateX:[
        {value:  0, duration:0}
        ],
      easing:'linear',
    });

    let x = document.querySelector('#' + id1).getBoundingClientRect().left;
    let y = document.querySelector('#' + id1).getBoundingClientRect().top;

    animation = anime({
      targets: document.getElementById(id1),
      translateY:[
        {value:  y1 - y, duration:0}
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
    
    animation = anime({
      targets: document.getElementById(id1),
      translateX:[
        {value: (x2 - x) , duration:speed*durationx}
        ],
      translateY:[
        {value: (y2 - y) , duration:speed*durationy, delay:durationx*speed}
        ],
      easing:'linear',
    });

  },

    animereplaceblock:function(nmrdublockARemplacer,nmrDuBlockRemplacent){
      let remplacent=document.getElementById('block'+(nmrDuBlockRemplacent+1));
      animation = anime({
          targets:remplacent,
          translateY:[{value:200,duration:speed*500},
              {value: 20,duration:speed* 500}
          ],
          translateX:[{value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:speed*500},
              {value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:speed*500}
          ]

      });
    },
    animenreg:function (nmrDuBlock,nmrEnreg,color) {
        let a=document.getElementById('enreg'+(nmrEnreg+1)+'block'+(nmrDuBlock+1));
        animation = anime({
            targets:a,
            width:[{value:21 ,duration:speed*500},
                {value: 20}
            ],
            height:[{value:21,duration:speed*500},
                {value: 20}],
            backgroundColor:[{value:color,
            duration:speed*500,},
                {
                    value: '#ffffff'
                }]
        })

    },
    anime_border_enreg:function (nmrBlock,nmrEnreg,borderColor) {
      animation = anime({
          targets:'enreg'+(nmrEnreg+1)+'block'+(nmrBlock+1),
          borderTopColor:borderColor,
      });
    }
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
    }

    //----------------------traitement du fichier--------------------------------------//
    var buff = new Tbloc();
    

    function TObF(nom_fich) {
      this.nom_fich = nom_fich;
      this.entete = new Entete(0);
      this.tab_bloc = [];
    }

    TObF.prototype = {
      constructor:TObF,

      liredir : function (i) {
        return  this.tab_bloc[i-1];
      },

      ecriredir : function (i, buff) {
        this.tab_bloc[i-1] = buff;
      },

      chargement_initial :async function (nb_enrg, taux) {
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Chargement initial du fichier(nb_enrg, taux)</p>' + 
                      '<p id="l1"> </p>' 
                      
        add_algo(2, "Pour(k varie de 0 vers le nombre d'enregestrement)");
        add_algo(3, "&nbsp &nbsp Si(j < taille_max*taux)");
        add_algo(4, "&nbsp &nbsp &nbsp &nbsp buff.tab_enrg[j] = enregistrement(k*2, faux, random-enrg)");
        add_algo(5, "&nbsp &nbsp &nbsp &nbsp j++");
        add_algo(6, "&nbsp &nbsp Sinon");
        add_algo(7, "&nbsp &nbsp &nbsp &nbsp buff.nb_enrg = j");
        add_algo(8, "&nbsp &nbsp &nbsp &nbsp ecritrDir(buff, i)");
        add_algo(9, "&nbsp &nbsp &nbsp &nbsp i++");
        add_algo(10, "&nbsp &nbsp &nbsp &nbsp buff.tab_enrg[0] = enregistrement(k*2, faux, random-enrg)");
        add_algo(11, "&nbsp &nbsp &nbsp &nbsp j = 1");
        add_algo(11, "FPour");
        let u = taux;
        if(taux < 1/taille_max)  u = 1/taille_max;
        if(taux > 1) u = 1;
        if(nb_enrg != 0) {
          anim.selectbloc(1);
          await sleep(300);
          anim.bloc_down(1);
          await sleep(1000);
        }
        let j=0, i = 1;
        select_ligne(2);
        await sleep(500);
        deselect_ligne(2);
        for (k = 0; k < nb_enrg; k++){
          select_ligne(3);
          await sleep(500);
          deselect_ligne(3);
          if (j < taille_max*u){
            select_ligne(4);
            let e = new Enregestrement(k*2, false, Math.floor(Math.random()*1022469763250)+500);
            buff.tab_enrg[j] = e;
            anim.select_enr(i, j+1, "#00FFFF");
            await sleep(200);
            document.getElementById("cle" + i + "_" + (j+1) ).innerHTML = buff.tab_enrg[j].get_cle();
            await sleep(300);
            document.getElementById("eff" + i + "_" + (j+1) ).innerHTML = buff.tab_enrg[j].get_eff();
            await sleep(300);
            document.getElementById("inf" + i + "_" + (j+1) ).innerHTML = buff.tab_enrg[j].get_info();
            await sleep(300);
            anim.select_enr(i, j+1, "#dddddd");
            deselect_ligne(4);
            select_ligne(5);
            await sleep(500);
            j++;
            deselect_ligne(5);
          }
          else {
            select_ligne(6);
            await sleep(500);
            deselect_ligne(6);
            select_ligne(7);
            buff.nb_enrg = j;
            anim.selectnb(i, "#00FFFF");
            await sleep(200);
            document.getElementById("nb" + i).innerHTML = buff.nb_enrg;
            await sleep(300);
            anim.selectnb(i, "#dddddd");
            deselect_ligne(7);
            select_ligne(8);
            this.ecriredir(i, buff);
            anim.s_bloc(i, "#000000");
            anim.bloc_up(i);
            await sleep(1000);
            deselect_ligne(8);
            buff = new Tbloc;
            select_ligne(9);
            i++;
            anim.selectbloc(i);
            await sleep(300);
            anim.bloc_down(i);
            await sleep(1000);
            deselect_ligne(9);
            select_ligne(10);
            buff.tab_enrg[0] = new Enregestrement(k*2, false, Math.floor(Math.random()*1022469763250)+500);
            anim.select_enr(i, 1, "#00FFFF");
            await sleep(200);
            document.getElementById("cle" + i + "_1").innerHTML = buff.tab_enrg[0].get_cle();
            await sleep(300);
            document.getElementById("eff" + i + "_1").innerHTML = buff.tab_enrg[0].get_eff();
            await sleep(300);
            document.getElementById("inf" + i + "_1" ).innerHTML = buff.tab_enrg[0].get_info();
            await sleep(300);
            anim.select_enr(i, 1, "#dddddd");
            deselect_ligne(10);
            select_ligne(11);
            await sleep(500);
            deselect_ligne(11);
            j = 1;
          }
        }

        vider_algo();
        g.innerHTML = '<p id="l0">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbspChargement initial du fichier</p>' + 
                      '<p id="l1"> </p>' + 
                      '<hr>'
        
        add_algo(2, 'buff.nb_enrg = j');
        add_algo(3, 'ecrireDir(buff, i)');
        add_algo(4, 'entete.nb_bloc = i');
        
        select_ligne(2);
        buff.nb_enrg = j;
        anim.selectnb(i, "#00FFFF");
        await sleep(200);
        document.getElementById("nb" + i).innerHTML = buff.nb_enrg;
        await sleep(300);
        anim.selectnb(i, "#dddddd");
        deselect_ligne(2);
        select_ligne(3);
        this.ecriredir(i, buff);
        anim.s_bloc(i, "#000000");
        anim.bloc_up(i);
        await sleep(1000);
        deselect_ligne(3);
        select_ligne(4);
        this.entete.set_nb_bloc(i);
        anim.selectentete("#00FFFF");
        await sleep(500);
        document.getElementById('entete_nb').innerHTML = this.entete.get_nb_bloc();
        await sleep(800);
        anim.selectentete("#dddddd");
        deselect_ligne(4);
      },

      recherche :async function (cle, res) {
        anim.relooad(this);
        let i=1, j = 0, trouve=false;
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Recherche(cle, var trouve, var i, var j, var buff)</p>' + 
                      '<p id="l1"> </p>'
        add_algo(2, "TQ(i < entete.nb_bloc et !trouve)");
        add_algo(3, "&nbsp &nbsp lireDir(i, buff)");
        add_algo(4, "&nbsp &nbsp j = 0");
        add_algo(5, "&nbsp &nbsp TQ(j < buff.nb_enrg et !trouve)");
        add_algo(6, "&nbsp &nbsp &nbsp &nbsp Si(cle == buff.tab_enrg[j].cle)");
        add_algo(7, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp trouve = vrai");
        add_algo(8, "&nbsp &nbsp &nbsp &nbsp Sinon");
        add_algo(9, "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp j++");
        add_algo(10, "&nbsp &nbsp FTQ");
        add_algo(11, "&nbsp &nbsp Si(!trouve)");
        add_algo(12, "&nbsp &nbsp &nbsp &nbsp i++");
        add_algo(13, "FTQ");
        select_ligne(2);
        await sleep(500);
        deselect_ligne(2);
        while (i<= this.entete.get_nb_bloc() && !trouve){
          anim.bloc_up(i-1);
          select_ligne(3);
          buff = this.liredir(i);
          anim.selectbloc(i);
          anim.bloc_down(i);
          await sleep(1000);
          deselect_ligne(3);
          select_ligne(4);
          await sleep(500);
          deselect_ligne(4);
          j = 0;
          select_ligne(5);
          await sleep(500);
          deselect_ligne(5);
          while (j < buff.nb_enrg && !trouve){
            select_ligne(6);
            anim.selectcle(i, j+1, '#00FFFF');
            await sleep(500);
            deselect_ligne(6);
            if (cle == buff.tab_enrg[j].get_cle())
            {
              select_ligne(7);
              anim.selectcle(i, j+1, '#00FF00');
              trouve = true;
              await sleep(300);
              deselect_ligne(7);
            }
            else
            {
              select_ligne(8);
              await sleep(500);
              deselect_ligne(8);
              select_ligne(9);
              anim.selectcle(i, j+1, '#FF1493');
              j++;
              await sleep(300);
              deselect_ligne(9);
            }
          }

          select_ligne(10);
          deselect_ligne(10);
          select_ligne(11);
          await sleep(300);
          deselect_ligne(11);
          if (!trouve)
          {
            anim.selectnb(i, '#00FFFF');
            await sleep(1000);
            anim.selectnb(i, '#dddddd');
            await sleep(500);
            select_ligne(12);
            await sleep(500);
            i++;
            deselect_ligne(12);
          }
        }

        if(!trouve)
        {
          anim.selectentete('#00FFFF');
          await sleep(1000);
          anim.selectentete('#dddddd');
        }
        res.make = [trouve, i, j];
        
      },

      suppression_phys :async function (cle) {
        let res = Array();
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Suppression_physique(cle)</p>' + 
                      '<p id="l1"> </p>'+
                      '<p>Recherche(cle, var trouve, var i, var j, var buff)</p>'
        await this.recherche(cle, res);
        vider_algo();
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Suppression_physique(cle)</p>' + 
                      '<p id="l1"> </p>' +
                      '<p>Recherche(cle, var trouve, var i, var j, var buff)</p>'
        add_algo(2, "Si(trouve)");
        add_algo(3, "&nbsp &nbsp Si(i != le dernier bloc) lire le dernier bloc; copier le dernier enrg");
        add_algo(4, "&nbsp &nbsp decrimenter le nombre d'enregistrements");
        add_algo(5, "&nbsp &nbsp Si(nb_enrg dans le bloc > 0 ET i != le dernier bloc) ecrire le dernier bloc");
        add_algo(6, "&nbsp &nbsp Sinon decrementer le nombre des blocs");
        add_algo(7, "&nbsp &nbsp Si(i != le dernier bloc) lireDir(i, buff)");
        add_algo(8, "&nbsp &nbsp ecraser l'enregistrement");
        add_algo(9, "&nbsp &nbsp ecrire le buff dans le bloc i");
        add_algo(10, "Sinon");
        add_algo(11, "&nbsp &nbsp ecrire('enregistrement n'existe pas')");

        enr = new Enregestrement;
        select_ligne(2);
        await sleep(300);
        deselect_ligne(2);
        if (res.make[0]){
          select_ligne(3);
          anim.select_enr(res.make[1], (res.make[2]+1), '#00FFFF');
          buff = this.liredir(this.entete.get_nb_bloc());
          anim.s_bloc(this.entete.get_nb_bloc(), "#FFFF00");
          await sleep(500);
          anim.bloc_down(this.entete.get_nb_bloc());
          await sleep(1000);
          enr = buff.tab_enrg[buff.nb_enrg-1];
          k = buff.nb_enrg;
          l = this.entete.get_nb_bloc();
          anim.select_enr(l, k, '#00FFFF');
          await sleep(1000);
          anim.enr_down(l, k);
          await sleep(3000);
          anim.go_to('s', 'enr' + l +'_'+k, 0, 0);
          document.getElementById('s1').innerHTML = document.getElementById('cle' + l + '_' + k).innerHTML;
          document.getElementById('s2').innerHTML = document.getElementById('eff' + l + '_' + k).innerHTML;
          document.getElementById('s3').innerHTML = document.getElementById('inf' + l + '_' + k).innerHTML;
          document.getElementById('ts').style.opacity = 1;
          deselect_ligne(3);
          select_ligne(4);
          document.getElementById("cle" + l + "_" + k).innerHTML = '';
          document.getElementById("eff" + l + "_" + k).innerHTML = '';
          document.getElementById("inf" + l + "_" + k).innerHTML = '';
          anim.enr_up(l, k);
          anim.select_enr(l, k, "#dddddd");
          anim.selectnb(l, "#00FFFF");
          await sleep(1000);
          buff.nb_enrg--;
          buff.tab_enrg.pop();
          document.getElementById("nb" + l).innerHTML = buff.nb_enrg;
          await sleep(1000);
          anim.selectnb(l, "#dddddd");
          deselect_ligne(4);
          select_ligne(5);
          await sleep(300);
          deselect_ligne(5);
          if (buff.nb_enrg > 0)
          {
            if(res.make[1] != l){
              select_ligne(5);
              anim.s_bloc(this.entete.get_nb_bloc(), '#000');
              anim.bloc_up(this.entete.get_nb_bloc());
              await sleep(1000);
              this.ecriredir(this.entete.get_nb_bloc(), buff);
              deselect_ligne(5);
            }
          }
          else {
            select_ligne(6);
            anim.selectentete("#00FFFF");
            await sleep(1000);
            this.entete.set_nb_bloc(this.entete.get_nb_bloc()-1);
            this.tab_bloc.pop();
            document.getElementById('entete_nb').innerHTML = this.entete.get_nb_bloc();
            await sleep(1000);
            anim.selectentete("#dddddd");
            deselect_ligne(6);
          }

          select_ligne(7);
          await sleep(300);
          deselect_ligne(7);
          if (res.make[1] != l) 
          {
            select_ligne(7);
            anim.s_bloc(l, '#000000');
            anim.bloc_up(l);
            buff = this.liredir(res.make[1]);
            deselect_ligne(7);
          }

          if (res.make[1] != l || res.make[2]!=k-1){
            select_ligne(8);
            anim.go_to('s', 'enr' + res.make[1] + '_' + (res.make[2]+1), 2000, 2000);
            //anim.go_to('s2', 'eff' + res.make[1] + '_' + (res.make[2]+1), 2000, 2000);
            //anim.go_to('s3', 'inf' + res.make[1] + '_' + (res.make[2]+1), 2000, 2000);
            await sleep(4000);
            buff.tab_enrg[res.make[2]] = enr;
            deselect_ligne(8);
            this.ecriredir(res.make[1], buff);
            document.getElementById("cle" + res.make[1] + "_" + (res.make[2]+1)).innerHTML = enr.get_cle();
            document.getElementById("eff" + res.make[1] + "_" + (res.make[2]+1)).innerHTML = enr.get_eff();
            document.getElementById("inf" + res.make[1] + "_" + (res.make[2]+1)).innerHTML = enr.get_info();
            document.getElementById('ts').style.opacity = 0;
            select_ligne(9);
            anim.s_bloc(res.make[1], '#000');
            anim.bloc_up(res.make[1]);
            await sleep(1000);
            this.ecriredir(res.make[1], buff);
            deselect_ligne(9);
          }
          else{
            select_ligne(9);
            anim.s_bloc(res.make[1], '#000');
            anim.bloc_up(res.make[1]);
            await sleep(1000);
            this.ecriredir(res.make[1], buff);
            deselect_ligne(9);
          }
          document.getElementById('ts').style.opacity = 0;
          //document.getElementById('s').appendChild(document.getElementById("enr" + l + "_" + k).cloneNode(true));

        }
        else{
          select_ligne(11);
          await sleep(300);
          deselect_ligne(11);
        }
        anim.relooad(this);
      },

      suppression_logique :async function (cle) {
        let res = Array();
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Suppression_logique(cle)</p>' + 
                      '<p id="l1"> </p>' +
                      '<p>Recherche(cle, var trouve, var i, var j, var buff)</p>'
        await this.recherche(cle, res);
        vider_algo();
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Suppression_logique(cle)</p>' + 
                      '<p id="l1"> </p>' +
                      '<p>Recherche(cle, var trouve, var i, var j, var buff)</p>'
        add_algo(2, "Si(trouve ET !buff.tab_enrg[j].eff");
        add_algo(3, "&nbsp &nbsp buff.tab_enrg[j].eff = true");
        add_algo(4, "&nbsp &nbsp ecrireDir(buff, i)");
        add_algo(5, "Sinon ecrire('l'enregistrement n'existe pas')");

        select_ligne(2);
        await sleep(300);
        deselect_ligne(2);
        if (res.make[0] && !buff.tab_enrg[res.make[2]].get_eff()) {
          anim.selecteff(res.make[1], res.make[2]+1, '#00FFFF');
          await sleep(500);
          buff = this.liredir(res.make[1]);
          select_ligne(3);
          buff.tab_enrg[res.make[2]].set_eff(true);
          document.getElementById("eff" + res.make[1] + "_" + (res.make[2]+1) ).innerHTML = true;
          document.getElementById("eff" + res.make[1] + "_" + (res.make[2]+1) ).style.color = "#00FF00";
          await sleep(500);
          document.getElementById("eff" + res.make[1] + "_" + (res.make[2]+1) ).style.color = "#000000";
          deselect_ligne(3);
          select_ligne(4);
          anim.s_bloc(res.make[1], '#000');
          anim.bloc_up(res.make[1]);
          await sleep(1000);
          this.ecriredir(res.make[1], buff);
          deselect_ligne(4);
        }
        else{
          select_ligne(5);
          await sleep(300);
          deselect_ligne(5);
        }
        await anim.relooad(this);
        //anim.bloc_up(res.make[1]);
      },

      insertion :async function (cle, enreg) {
        let res = Array(), inc_entete=false;
        await this.recherche(cle, res);
        vider_algo();
        let g = document.getElementById('algo');
        g.innerHTML = '<p id="l0" style="text-decoration: underline;">Insertion(cle, enreg)</p>' + 
                      '<p id="l1"> </p>' + 

                      '<p>Recherche(cle, var trouve, var i, var j, var buff)</p>'
        add_algo(2, "Si(!trouve)");
        add_algo(3, "&nbsp &nbsp Si(buff.nb_enrg == taille_max OU entete.nb_bloc == 0)");
        add_algo(4, "&nbsp &nbsp &nbsp &nbsp entete.nb_bloc++");
        add_algo(5, "&nbsp &nbsp &nbsp &nbsp buff.nb_enrg = 0");
        add_algo(6, "&nbsp &nbsp buff.tab_enrg[buff.nb_enrg] = enregestrement(cle, false, enreg)");
        add_algo(7, "&nbsp &nbsp buff.nb_enrg++");
        add_algo(8, "&nbsp &nbsp ecrireDir(buff, entete.nb_bloc)");
        add_algo(9, "Sinon Si(buff.tab_enrg[j].eff == vrai)");
        add_algo(10, "&nbsp &nbsp liredir(i, buff);");
        add_algo(11, "&nbsp &nbsp buff.tab_enrg[j].eff = false");
        add_algo(12, "&nbsp &nbsp buff.tab_enrg[j].info = enreg");
        add_algo(13, "&nbsp &nbsp ecriredir(buff, i);");

        select_ligne(2);
        await sleep(300);
        deselect_ligne(2);
        if (!res.make[0]) {
          select_ligne(3);
          await sleep(300);
          deselect_ligne(3);
          if(this.entete.get_nb_bloc() != 0) buff = this.liredir(this.entete.get_nb_bloc());
          if (buff.nb_enrg == taille_max || this.entete.get_nb_bloc() == 0) {
            anim.bloc_up(this.entete.get_nb_bloc());
            buff = new Tbloc;
            select_ligne(4);
            this.entete.set_nb_bloc(this.entete.get_nb_bloc() + 1);
            anim.selectentete("#00FFFF");
            await sleep(1000);
            document.getElementById('entete_nb').innerHTML = this.entete.get_nb_bloc();
            await sleep(200);
            anim.selectentete("#dddddd");
            deselect_ligne(4);
            buff.nb_enrg = 0;
            select_ligne(5);
            anim.selectbloc(this.entete.get_nb_bloc());
            anim.bloc_down(this.entete.get_nb_bloc());
            await sleep(1000);
            deselect_ligne(5);
          }

          select_ligne(6);
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
          deselect_ligne(6);
          select_ligne(7);
          anim.selectnb(this.entete.get_nb_bloc(), "#00FFFF");
          await sleep(500);
          document.getElementById("nb" + this.entete.get_nb_bloc()).innerHTML = buff.nb_enrg;
          await sleep(300);
          anim.selectnb(this.entete.get_nb_bloc(), "#dddddd");
          deselect_ligne(7);
          select_ligne(8);
          anim.s_bloc(this.entete.get_nb_bloc(), '#000');
          anim.bloc_up(this.entete.get_nb_bloc());
          await sleep(1000);
          deselect_ligne(8);
        }
        else{ 
          select_ligne(9);
          await sleep(300);
          deselect_ligne(9);
          if(buff.tab_enrg[res.make[2]].get_eff()){
            select_ligne(10);
            buff = this.liredir(res.make[1]);
            anim.selectbloc(res.make[1]);
            anim.bloc_down(res.make[1]);
            await sleep(1000);
            deselect_ligne(10);
            select_ligne(11);
            anim.select_enr(res.make[1], res.make[2]+1, "#00FFFF");
            await sleep(500);
            anim.select_enr(res.make[1], res.make[2]+1, "#dddddd");
            anim.selecteff(res.make[1], res.make[2]+1, "#00FFFF");
            await sleep(500);
            buff.tab_enrg[res.make[2]].set_eff(false);
            document.getElementById("eff" + res.make[1] + "_" + (res.make[2]+1) ).innerHTML = false;
            document.getElementById("eff" + res.make[1] + "_" + (res.make[2]+1) ).style.color = "#00FF00";
            await sleep(500);
            document.getElementById("eff" + res.make[1] + "_" + (res.make[2]+1) ).style.color = "#000000";
            anim.selecteff(res.make[1], res.make[2]+1, "#dddddd");
            deselect_ligne(11);
            select_ligne(12);
            anim.selectinf(res.make[1], res.make[2]+1, "#00FFFF");
            await sleep(500);
            buff.tab_enrg[res.make[2]].info = enreg;
            document.getElementById("inf" + res.make[1] + "_" + (res.make[2]+1) ).innerHTML = enreg;
            document.getElementById("inf" + res.make[1] + "_" + (res.make[2]+1) ).style.color = "#00FF00";
            await sleep(500);
            document.getElementById("inf" + res.make[1] + "_" + (res.make[2]+1) ).style.color = "#000000";
            anim.selectinf(res.make[1], res.make[2]+1, "#dddddd");
            deselect_ligne(12);
            select_ligne(13);
            anim.s_bloc(res.make[1], '#000');
            anim.bloc_up(res.make[1]);
            await sleep(1000);
            this.ecriredir(res.make[1], buff);
            deselect_ligne(13);
          }
        }
        anim.relooad(this);
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
            document.getElementById("inf" + i + "_" + (j+1) ).innerHTML = buff.tab_enrg[j].get_info();
            document.getElementById("nb" + i).innerHTML = buff.nb_enrg;
            j++;
          }
          i++;
          j = 0;
        }
      }
    };


    var f = new TObF("f");


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
      vider_alertt();
      let n, t;
      n = parseInt(document.getElementById('nb_enr').value);
      t = parseFloat(document.getElementById('taux').value);
      console.log(n,t);
      if ( !isNaN(n) && !isNaN(t) && t<=1 && t>0) {
        document.getElementById('initialiser-form').style.display = 'none';
        box_shown = 0;
        f.chargement_initial(n, t);
      }
      else {
        if (isNaN(t) || t>1 || t<0){
          alertt(1,'le taux doit etre > 0 et <=1');
        }
      }
    }

    function insertion(){
      vider_alertt();
      let c, e;
      c = parseInt(document.getElementById('cle_inser').value);
      e = document.getElementById('enr_inser').value;
      if (!isNaN(c) && e!='') {
        document.getElementById('inserer-form').style.display = 'none';
        box_shown = 0;
        f.insertion(c, e);
      }
    }

    async function recherche() {
      vider_alertt();
      let c, r = [];
      c = parseInt(document.getElementById('cle_rech').value);
      if (!isNaN(c)) {
        document.getElementById('rechercher-form').style.display = 'none';
        box_shown = 0;
        await f.recherche(c, r);
        if (!r.make[0]) {
          edit_algo(1, "Lenregistrement n'existe pas", '#DC0000');
        } else {
          edit_algo(1, "Lenregistrement existe dans le bloc " + r.make[1] + ", dans al position" + r.make[2], '#21DC00');
        }
      }
    }

    function suppression_log() {
      vider_alertt();
      let c;
      c = parseInt(document.getElementById('cle_supp_log').value);
      if (!isNaN(c)) {
        document.getElementById('supprimer-form').style.display = 'none';
        box_shown = 0;
        f.suppression_logique(c);
      }
    }

    function suppression_phys() {
      vider_alertt();
      let c;
      c = parseInt(document.getElementById('cle_supp_ph').value);
      if (!isNaN(c)) {
        document.getElementById('supprimer-form').style.display = 'none';
        box_shown = 0;
        f.suppression_phys(c);
      }
    }


    function deselect_ligne(num){
      document.getElementById('l' + num).style.backgroundColor = "#fff";
      document.getElementById('l' + num).style.color = "#000";
    }

    function select_ligne(num){
      document.getElementById('l' + num).style.backgroundColor = "#0081E2";
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
  document.getElementById('TObF').style.display='none';
  guide.innerHTML='                    <div class="bg-modal">\n' +
      '                    <div  class="guide">\n' +

      '                        <div id="guide-header" class="guide-control">\n' +
      '                        <div id="close" class="fas fa-window-close" onclick="hide_guide()"></div>\n' +
      '                            <p>TObF</p>\n' +
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
      '                        Donc  TObF représente l\'organisation d\'un fichier vu comme tableau,non ordonné,\n' +

      '                        <br>\n' +
      '                         avec des enregistrements de taille fix.\n' +
      '                    </div>\n' +
      '                        <div id="guide2" class="guide-content">\n' +
      '                            <h3>II.Information sur la visualisation:</h3>\n' +

      '                            L\'enregistrement est vue comme un objet de trois attributs organisés comme suit:\n' +
      '                            <br>\n' +
      '                            (cle , effacement , un champs qui represente le contenu de  l\'enregistrement) \n' +
      '                            <br>\n' +
      '                            <img class="mt-1" src="assets/img/struct.JPG" height="300">\n' +
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
