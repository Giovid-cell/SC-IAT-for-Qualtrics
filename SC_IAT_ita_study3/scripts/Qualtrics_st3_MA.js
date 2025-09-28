// https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics/QualtricsStiat.js

define(['pipAPI', 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@ea7140607acd5df849a894d5e3567671f66d7d51/SC_IAT_ita_study3/scripts/extension_MA_st3.js'], function(APIConstructor, stiatExtension){
  var API = new APIConstructor();
  return stiatExtension({
    category : { 
      name : 'Nome Paziente',
      title : {
        media : {word : 'Nome Paziente'},
        css : {color:'#31b404','font-size':'2em'},
        height : 7
      }, 
      media : [ 
				{word: 'Saif'},
				{word: 'Khemal'},
				{word: 'Saif Khemal'},
				{word: 'S.K.'},
				{word: 'Khemal Saif'},
				{word: 'Saif Khemal'},
				{word: 'Khemal Saif'}
      ],
      css : {color:'#31b404','font-size':'3em'}
    },
    attribute1 : {
      name : 'Ignorare',
      title : {
        media : {word : 'Ignorare'},
        css : {color:'#31b404','font-size':'2em'},
        height : 7
      },
      media : [ 
				{word: 'ostacolare'},
				{word: 'trascurare'},
				{word: 'ignorare'},
				{word: 'dimenticare'},
				{word: 'tralasciare'},
				{word: 'ostacolare'},
				{word: 'trascurare'}
      ],
      css : {color:'#31b404','font-size':'3em'}
    },
    attribute2 : {
      name : 'Sostenere',
      title : {
        media : {word : 'Sostenere'},
        css : {color:'#31b404','font-size':'2em'},
        height : 7
      },
      media : [
				{word: 'aiutare'},
				{word: 'assistere'},
				{word: 'soccorrere'},
				{word: 'sostenere'},
				{word: 'appoggiare'},
				{word: 'aiutare'},
				{word: 'sostenere'}
      ],
      css : {color:'#31b404','font-size':'3em'}
    },
    base_url : {
      image : 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@main/images/'
    }
  });
});
