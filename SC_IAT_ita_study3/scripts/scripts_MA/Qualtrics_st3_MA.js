define(['pipAPI', 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@51f055a645f60f189f93294428ea6a0171b991e2/SC_IAT_ita_study3/scripts/scripts_MA/extension_MA_st3.js'], function(APIConstructor, stiatExtension){
  var API = new APIConstructor();
  return stiatExtension({
    category : { 
      name : 'Paziente',
      title : {
        media : {word : 'Paziente'},
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
      repeatedStimuli: ['Saif Khemal', 'Khemal Saif'], // Added
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
      repeatedStimuli: ['aiutare', 'sostenere'], // Added
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
      repeatedStimuli: ['ostacolare', 'tralasciare'], // Added
      css : {color:'#31b404','font-size':'3em'}
    },
    base_url : {
      image : 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@main/images/'
    }
  });
});
