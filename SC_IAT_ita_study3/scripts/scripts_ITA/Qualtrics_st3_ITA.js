// https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics/QualtricsStiat.js

define(['pipAPI', 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@e53c164772ef878bc1cf2757a1d318d0b9afdd30/SC_IAT_ita_study3/scripts/scripts_ITA/extension_ITA_st3.js'], function(APIConstructor, stiatExtension){
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
				{word: 'Paolo'},
				{word: 'Tosato'},
				{word: 'Paolo Tosato'},
				{word: 'P.T.'},
				{word: 'Tosato Paolo'}
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
        media : {word : 'Ignorare '},
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
