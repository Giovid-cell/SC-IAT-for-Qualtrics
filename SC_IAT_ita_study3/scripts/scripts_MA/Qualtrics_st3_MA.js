// https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics/QualtricsStiat.js

define(['pipAPI', 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@ee85dbe7c3b8b7cf3fcd78f8e40075806cecac43/SC_IAT_ita_study3/scripts/scripts_MA/extension_MA_st3.js'], function(APIConstructor, stiatExtension){
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
				{word: 'Khemal Saif'}
      ],
      css : {color:'#31b404','font-size':'3em'}
    },
    attribute1 : {
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
				{word: 'appoggiare'}
      ],
      css : {color:'#31b404','font-size':'3em'}
    },
    attribute2 : {
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
				{word: 'tralasciare'}
      ],
		
      css : {color:'#31b404','font-size':'3em'}
    },
    base_url : {
      image : 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@main/images/'
    }
  });
});
