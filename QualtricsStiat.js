// https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@main/QualtricsStiat.js

define(['pipAPI', 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics/extentionStiat.js'], function(APIConstructor, stiatExtension){
  var API = new APIConstructor();
  return stiatExtension({
    category : { 
      name : 'Pessoa Racializada',
      title : {
        media : {word : 'Pessoa Racializada'},
        css : {color:'#31b404','font-size':'2em'},
        height : 7
      }, 
      media : [
        {image : 'b1.jpg'}, 
        {image : 'b2.jpg'},
        {image : 'b3.jpg'},
        {image : 'b4.jpg'},
        {image : 'b5.jpg'},
        {image : 'b6.jpg'}
      ],
      css : {color:'#31b404','font-size':'3em'}
    },
    attribute1 : {
      name : 'Evitamento',
      title : {
        media : {word : 'Evitamento'},
        css : {color:'#31b404','font-size':'2em'},
        height : 7
      },
      media : [
        {word: 'Evito'},
        {word: 'Fujo'},
        {word: 'Afasto-me'},
        {word: 'Desvio-me'},
        {word: 'Rejeito'},
        {word: 'Recuo'}
      ],
      css : {color:'#31b404','font-size':'3em'}
    },
    attribute2 : {
      name : 'Aproximação',
      title : {
        media : {word : 'Aproximação'},
        css : {color:'#31b404','font-size':'2em'},
        height : 7
      },
      media : [
        {word: 'Aproximo-me'},
        {word: 'Chego-me'},
        {word: 'Aproximação'},
        {word: 'Aproximar-se'},
        {word: 'Tocar'},
        {word: 'Aconchegar'}
      ],
      css : {color:'#31b404','font-size':'3em'}
    },
    base_url : {
      image : 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@main/images/'
    }
  });
});
