// https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics@main/QualtricsStiat.js

define(['pipAPI', 'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics/extentionStiat.js'], function(APIConstructor, stiatExtension){
	
	var API = new APIConstructor();
		  return stiatExtension({
		  category : { 
		    name : 'Pessoa Racializada', //Will appear in the data.
		    title : {
		      media : {word : 'Pessoa Racializada'}, //Name of the category presented in the task.
		      css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
		      height : 7 //Used to position the "Or" in the combined block.
		    }, 
		    media : [ //Stimuli content as PIP's media objects
    		       {image : 'b1.jpg'}, 
        {image : 'b2.jpg'}, 
        {image : 'b3.jpg'}, 
        {image : 'b4.jpg'}, 
        {image : 'b5.jpg'}, 
        {image : 'b6.jpg'}
		    ], 
		    //Stimulus css (style)
		    css : {color:'#31b404','font-size':'3em'}
		  },	

  		attribute1 : 
			{
			name : 'Evitamento', //Attribute label
			title : {
				media : {word : 'Evitamento'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 7 //Used to position the "O" in the combined block.
			}, 
			media : [ //Stimuli
				{word: 'Evito'},
				{word: 'Fujo'},
				{word: 'Afasto-me'},
				{word: 'Desvio-me'},
				{word: 'Rejeito'},
				{word: 'Recuo'}
			], 
			//Can change color and size of the targets here.
			css : {color:'#31b404','font-size':'3em'}
			},
		attribute2 : 
			{
			name : 'Aproximação', //Attribute label
			title : {
				media : {word : 'Aproximação'}, //Name of the category presented in the task.
				css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
				height : 7 //Used to position the "O" in the combined block.
			}, 
			media : [ //Stimuli
				{word: 'Aproximo-me '},
				{word: 'Chego-me'},
				{word: 'Aproximação'},
				{word: 'Aproximar-se'},
				{word: 'Tocar'},
				{word: 'Aconchegar'}
			], 
			//Can change color and size of the targets here.
			css : {color:'#31b404','font-size':'3em'}
			},

  base_url : {//Where are your images at?
    image :  'https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics/images/' 
  }}
  );
  });
