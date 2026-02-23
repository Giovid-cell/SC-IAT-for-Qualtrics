define(['pipAPI', 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@41cea50a8d6db278a2e73b5ed0474297673275fd/anna_tosato/anna_sciat_ext.js'], function(APIConstructor, stiatExtension){
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
        {word: 'Anna'},
        {word: 'Tosato'},
        {word: 'Anna Tosato'},
        {word: 'A.T.'},
        {word: 'Tosato Paolo'}
      ],
      repeatedStimuli: ['Paolo Tosato', 'Tosato Paolo'], // Added
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
