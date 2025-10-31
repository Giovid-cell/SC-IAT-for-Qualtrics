// https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics/extentionStiat.js 

define(['pipAPI','pipScorer','underscore'], function(APIConstructor, Scorer, _) {

	function stiatExtension(options)
	{
		var API = new APIConstructor();
		var scorer = new Scorer();
		var piCurrent = API.getCurrent();

		var stiatObj = 
		{
							//Set the canvas of the task
				canvas: {
				    maxWidth: 1700,          // più grande
				    proportions: 0.6,       // più orizzontale (più largo, meno alto)
				    background: '#ffffff',
				    borderWidth: 5,
				    canvasBackground: '#ffffff',
				    borderColor: 'lightblue'
				},

			//Define the category.
			category :  
			{
				name : 'Paziente', //Category name to be used for feedback and logging.
				title : {
					media : {word : 'Paziente'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 4 //Used to position the "Or" in the combined block.
				}, 
				media : [ 
				{word: 'Saif'},
				{word: 'Khemal'},
				{word: 'Saif Khemal'},
				{word: 'S.K.'},
				{word: 'Khemal Saif'}
					],
				//Can change color and size of the targets here.
				css : {color:'#31b404','font-size':'2em'}
			},	
			attribute1 : 
			{
				name : 'Sostenere', //Attribute name to be used for feedback and logging
				title : {
					media : {word : 'Sostenere'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 4 //Used to position the "Or" in the combined block.
				}, 
				 media : [
				{word: 'aiutare'},
				{word: 'assistere'},
				{word: 'soccorrere'},
				{word: 'sostenere'},
				{word: 'appoggiare'}
				],
				//Can change color and size of the targets here.
				css : {color:'#31b404','font-size':'2em'}
			},
			attribute2 : 
			{
				name : 'Ignorare', //Attribute name to be used for feedback and logging
				title : {
					media : {word : 'Ignorare'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 4 //Used to position the "Or" in the combined block.
				},
				media : [ //Stimuli
				{word: 'ostacolare'},
				{word: 'trascurare'},
				{word: 'ignorare'},
				{word: 'dimenticare'},
				{word: 'tralasciare'}
				],

				//Can change color and size of the targets here.
				css : {color:'#31b404','font-size':'2em'}
			},	
			trialsByBlock : 
			[//Each object in this array defines a block
				{ 
					instHTML : '', 
					block : 1, 
					miniBlocks : 1, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}, 
				{ 
					instHTML : '', 
					block : 2, 
					miniBlocks : 1, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}, 
				{ 
					instHTML : '', 
					block : 3, 
					miniBlocks : 1, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}, 
				{ 
					instHTML : '', 
					block : 4, 
					miniBlocks : 1, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}
			],
			//All blocks show attribute1 on the left and attribute2 on the right. 
			//blockOrder can be: 'startRight', 'startLeft', and 'random'
			blockOrder : 'random', 
			//Change to 'startRight' if you want to start with category on the right in the first block. 
			//Change to 'startLeft' if you want to start with category on the left in the first block. 
			//Change to 'random' if you want to randomize whether the category starts on the left or on the right.
			//NOTICE: to know what the block-order condition is, we save the pairing definition of the second block, 
			//into the explicit table, under the variable name block2Condition.

			//If the switch parameter is 0 or smaller, we switch the side of the category every block. 
			//If it is larger than 0, then we switch the category side only once, in the block specified in switchSideBlock.
			switchSideBlock : 3, // Switch after block 2 (before block 3)

			base_url : {//Where are your images?
				image : '/implicit/user/yba/pipexample/stiat/images/'
			}, 
			ITIDuration : 250, //Duration between trials.
			
			fontColor : '#000000', //The color of messages and key reminders. 
			
			//Text and style for key instructions displayed about the category labels.
			leftKeyText : 'Prema il tasto "W" per', 
			rightKeyText : 'Prema il tasto "P" per', 
			keysCss : {'font-size':'0.8em', 'font-family':'courier', color:'#000000'},
			//Text and style for the separator between the top and bottom category labels.
			orText : 'o', 
			orCss : {'font-size':'1.8em', color:'#000000'},

			//Will appear at the bottom of the screen during trials.
			remindErrorText : '<p align="center" style="font-size:0.6em; font-family:arial">' +
			'Se commette un errore, una <font color="#ff0000"><b>X</b></font> rossa apparirà.<p/>',
			
			finalText: 'Ha completato questo compito<br/><br/>Premi la BARRA SPAZIATRICE per continuare.', 

			// Instruction templates
				instTemplateCategoryLeft: '<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
				  '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
					'<div style="font-size:19px; max-width:750px; line-height:1.25; margin:90px auto 0 auto; text-align:left;">'+
				      '<p style="margin-bottom:6px;">Le chiediamo di partecipare ad un esperimento.</p>' +
				      '<p style="margin-bottom:6px;">Disponga l\'indice o il medio sul tasto <b>"W"</b> e sul tasto <b>"P"</b>.</p>' +
				      '<p style="margin-bottom:6px;">Al centro dello schermo compariranno stimoli appartenenti alle categorie visualizzate in alto, a destra e a sinistra.</p>' +
				      '<p style="margin-bottom:6px;">Se lo stimolo appartiene a una categoria a <b>SINISTRA</b>, prema <b>"W"</b>;<br>' +
				      'se appartiene a una categoria a <b>DESTRA</b>, prema <b>"P"</b>.</p>' +
				      '<p style="margin-bottom:6px;">Esempi di stimoli per "<font color="#31b404">thecategory</font>": Paolo, Paolo Tosato, P.T.</p>' +
				      '<p style="margin-bottom:6px;">Ogni stimolo appartiene a una sola categoria.</p>' +
				      '<p style="margin-bottom:6px;">Se commette un errore, una <font color="#ff0000"><b>X</b></font> apparirà sullo schermo.</p>' +
				      '<p style="margin-bottom:6px;">Risponda <b>il più velocemente possibile</b> cercando di non commettere errori.</p>' +
				      '<p>Quando è pronto, prema la <b>barra spaziatrice</b> per cominciare.</p>' +
				    '</div>' +
				  '</div>' +
				'</div>',
				
				instTemplateCategoryRight: '<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
				  '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
					'<div style="font-size:19px; max-width:750px; line-height:1.25; margin:90px auto 0 auto; text-align:left;">'+
				      '<p style="margin-bottom:6px;">Le chiediamo di partecipare ad un esperimento.</p>' +
				      '<p style="margin-bottom:6px;">Disponga l\'indice o il medio sul tasto <b>"W"</b> e sul tasto <b>"P"</b>.</p>' +
				      '<p style="margin-bottom:6px;">Al centro dello schermo compariranno stimoli appartenenti alle categorie visualizzate in alto, a destra e a sinistra.</p>' +
				      '<p style="margin-bottom:6px;">Se lo stimolo appartiene a una categoria a <b>SINISTRA</b>, prema <b>"W"</b>;<br>' +
				      'se appartiene a una categoria a <b>DESTRA</b>, prema <b>"P"</b>.</p>' +
				      '<p style="margin-bottom:6px;">Esempi di stimoli per "<font color="#31b404">thecategory</font>": Paolo, Paolo Tosato, P.T.</p>' +
				      '<p style="margin-bottom:6px;">Ogni stimolo appartiene a una sola categoria.</p>' +
				      '<p style="margin-bottom:6px;">Se commette un errore, una <font color="#ff0000"><b>X</b></font> apparirà sullo schermo.</p>' +
				      '<p style="margin-bottom:6px;">Risponda <b>il più velocemente possibile</b> cercando di non commettere errori.</p>' +
				      '<p>Quando è pronto, prema la <b>barra spaziatrice</b> per cominciare.</p>' +
				    '</div>' +
				  '</div>' +
				'</div>',
				
				instTemplateTransitionCtoI: '<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
				  '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
				    '<div style="width:80%; max-width:700px; font-size:19px; line-height:1.35em; text-align:left;">' +
				      '<p style="margin-bottom:12px;">Adesso le categorie appariranno in una nuova configurazione.</p>' +
				      '<p style="margin-bottom:12px;">Premere <b>"W"</b> se lo stimolo appartiene alla categoria di <b>SINISTRA</b>.</p>' +
				      '<p style="margin-bottom:12px;">Premere <b>"P"</b> se lo stimolo appartiene ad <b>UNA delle due categorie</b> a <b>DESTRA</b>.</p>' +
				      '<p style="margin-bottom:12px;">Ogni stimolo appartiene esclusivamente ad <b>UNA delle 3 categorie</b>.</p>' +
				      '<p style="margin-bottom:12px;">I colori delle parole aiuteranno nell\'identificazione della categoria.</p>' +
				      '<p style="margin-top:16px;">Quando è pronto, prema la <b>BARRA SPAZIATRICE</b> per continuare.</p>' +
				    '</div>' +
				  '</div>' +
				'</div>',
				
				instTemplateTransitionItoC: '<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
				  '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
				    '<div style="width:80%; max-width:700px; font-size:19px; line-height:1.35em; text-align:left;">' +
				      '<p style="margin-bottom:12px;">Adesso le categorie appariranno in una nuova configurazione.</p>' +
				      '<p style="margin-bottom:12px;">Premere <b>"W"</b> se lo stimolo appartiene ad <b>UNA delle due categorie</b> di <b>SINISTRA</b>.</p>' +
				      '<p style="margin-bottom:12px;">Premere <b>"P"</b> se lo stimolo appartiene alla categoria a <b>DESTRA</b>.</p>' +
				      '<p style="margin-bottom:12px;">Ogni stimolo appartiene esclusivamente ad <b>UNA delle 3 categorie</b>.</p>' +
				      '<p style="margin-bottom:12px;">I colori delle parole aiuteranno nell\'identificazione della categoria.</p>' +
				      '<p style="margin-top:16px;">Quando è pronto, prema la <b>BARRA SPAZIATRICE</b> per continuare.</p>' +
				    '</div>' +
				  '</div>' +
				'</div>'

		};
			
			// Estensione piCurrent con opzioni e valori di default
			_.extend(piCurrent, _.defaults(options, stiatObj))
			
			// Funzioni helper
			function hasProperties(obj, props) {
			    for (var i = 0; i < props.length; i++) {
			        if (!obj.hasOwnProperty(props[i])) return false;
			    }
			    return true;
			}
			
			function toCsv(matrix) {
			    return matrix.map(function(row) {
			        return row.map(function(val) {
			            if (val === null || val === undefined) return '';
			            var str = String(val);
			            return /[,"\n]/.test(str) ? '"' + str.replace(/"/g,'""') + '"' : str;
			        }).join(',');
			    }).join('\n');
			}
			
			// Impostazioni logger su MinnoJS API
			API.addSettings('logger', {
			    onRow: function(logName, log, settings, ctx){
			        if (!ctx.logs) ctx.logs = [];
			        ctx.logs.push(log);
			    },
			    onEnd: function(name, settings, ctx){
			        return ctx.logs;
			    },
			    serialize: function (name, logs) {
			        var headers = ['block','trial','cond','type','cat','stim','resp','err','rt','d','fb','bOrd'];
			        var myLogs = [];

        for(var i = 0; i < logs.length; i++){
            if(hasProperties(logs[i], ['trial_id','name','responseHandle','stimuli','media','latency']) &&
               hasProperties(logs[i].data, ['block','condition','score'])){
                myLogs.push(logs[i]);
            }
        }

        var content = myLogs.map(function(log){
            var errCode = log.data.score;
            if(errCode !== 0 && errCode !== 1 && errCode !== 2) errCode = '';

            var cat = '';
            var stim = '';
            if (log.stimuli && log.stimuli[0]) {
                var stimObj = log.stimuli[0];
                cat = (typeof stimObj === 'string') ? stimObj : (stimObj.word || '');
            }
            if (log.media && log.media[0]) {
                var mediaObj = log.media[0];
                stim = (typeof mediaObj === 'string') ? mediaObj : (mediaObj.word || '');
            }

            return [
                log.data.block,
                log.trial_id,
                log.data.condition,
                log.name,
                cat,
                stim,
                log.responseHandle || '',
                errCode,
                (log.latency && log.latency <= 2000 ? log.latency : 1500),
                '', // d
                '', // fb
                ''  // bOrd
            ];
        });

        // Riga finale con feedback
        content.push([
            9, 999, 'end', '', '', '', '', '', '', piCurrent.d || '', '', block2Condition || ''
        ]);

        content.unshift(headers);
        return toCsv(content);
    },
    send: function(name, serialized){
        // Invia i log a minnoJS.logger
        window.minnoJS.logger(serialized);
    }
});


		/***********************************************************************************
		*
		* Here starts the script. You might not need to change anything in the actual script.
		*
		************************************************************************************/
		
		var attribute1 = piCurrent.attribute1.name;
		var attribute2 = piCurrent.attribute2.name;
		var category = piCurrent.category.name;

		//This is our block-order condition. We will save it in the explicit table.
		var block2Condition;
		
		// layout object for the trials where category on left
		var leftLayout = [
			{location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
			{location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
			{location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
			{location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css},
			{location:{left:6,top:4+(piCurrent.attribute1.title.height|3)}, media:{word:piCurrent.orText}, css:piCurrent.orCss},
			{location:{left:6,top:11+(piCurrent.attribute1.title.height|3)},media:piCurrent.category.title.media, css:piCurrent.category.title.css}
		];
		// layout object for the trials where category on right
		var rightLayout = [
			{location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
			{location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
			{location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
			{location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css},
			{location:{right:6,top:4+(piCurrent.attribute2.title.height|3)},media:{word:piCurrent.orText}, css:piCurrent.orCss},
			{location:{right:6,top:11+(piCurrent.attribute2.title.height|3)},media:piCurrent.category.title.media, css:piCurrent.category.title.css}
		];
		
		var reminderStimulus = 	{location:{bottom:1}, css: {color:piCurrent.fontColor,'font-size':'1em'}, media : {html: piCurrent.remindErrorText}};

		API.addSettings('canvas',piCurrent.canvas);
		API.addSettings('base_url',piCurrent.base_url);

		/**
		 * Create default Trial
		 */
		API.addTrialSets('sort', {
				    // default trial
				    data: {score: 0, parcel: 'first', logged:false},
				    input: [
				        {handle: 'skip1', on: 'keypressed', key: 27}, // Esc to skip blocks
				        {handle: 'left', on: 'keypressed', key: 'w', isExclusive:true},
				        {handle: 'right', on: 'keypressed', key: 'p', isExclusive:true},
				        {handle: 'timeout', on: 'timeout', duration: 1500, isExclusive: true}
				    ],
				
				    interactions: [
					  // 1. begin trial: show stimulus
					  {
					    conditions: [{ type: 'begin' }],
					    actions: [{ type: 'showStim', handle: 'targetStim' }]
					  },
					
					  // 2. correct response
					  {
					    conditions: [{ type: 'inputEqualsTrial', property: 'corResp' }],
					    actions: [
					      { type: 'removeInput', handle: ['left', 'right', 'timeout'] },
					      { type: 'hideStim', handle: 'All' },
					      { type: 'setTrialAttr', setter: { score: 1 } },
					      { type: 'log' },
					      { type: 'trigger', handle: 'endTrial', duration: piCurrent.ITIDuration } // delay before ending
					    ]
					  },
					
					  // 3. incorrect response
					  {
					    conditions: [
					      { type: 'inputEquals', value: ['left', 'right'] },
					      { type: 'inputEqualsTrial', property: 'corResp', negate: true }
					    ],
					    actions: [
					      { type: 'removeInput', handle: ['left', 'right', 'timeout'] },
					      { type: 'showStim', handle: 'error' },
					      { type: 'setTrialAttr', setter: { score: 0 } },
					      { type: 'log' },
					      { type: 'trigger', handle: 'endTrial', duration: piCurrent.ITIDuration } // delay before ending
					    ]
					  },
					
					  // 4. timeout without response
					  {
					    conditions: [{ type: 'inputEquals', value: 'timeout' }],
					    actions: [
					      { type: 'removeInput', handle: ['left', 'right', 'timeout'] },
					      { type: 'setTrialAttr', setter: { score: 2 } },
					      { type: 'showStim', handle: 'error' },
					      { type: 'log' },
					      { type: 'trigger', handle: 'endTrial', duration: piCurrent.ITIDuration } // delay before ending
					    ]
					  },
					
					  // 5. ITI listener (single, final)
					  {
					    conditions: [{ type: 'inputEquals', value: 'endTrial' }],
					    actions: [
					      { type: 'hideStim', handle: 'All' },
					      { type: 'endTrial' }
					    ]
					  },
				
				        // 6. skip block 1
				        {
				            conditions: [{type: 'inputEquals', value: 'skip1'}],
				            actions: [{type: 'setInput', input: {handle: 'skip2', on: 'enter'}}]
				        },
				
				        // 7. skip block 2
				        {
				            conditions: [{type: 'inputEquals', value: 'skip2'}],
				            actions: [
				                {type: 'goto', destination: 'nextWhere', properties: {blockStart: true}},
				                {type: 'endTrial'}
				            ]
				        }
				    ]
				});


		/**
		 * Create default instructions trials
		 */
		API.addTrialSets('instructions', [
			// generic instructions trial, to be inherited by all other inroduction trials
			{
				// set block as generic so we can inherit it later
				data: {blockStart:true, block:0, condition:'inst', score:0},

				// create user interface (just click to move on...)
				input: [
					{handle:'space',on:'space'}
				],

				interactions: [
					// display instructions
					{
						conditions: [{type:'begin'}],
						actions: [
							{type:'showStim',handle:'All'}
						]
					},
					// space hit, end trial soon
					{
						conditions: [{type:'inputEquals',value:'space'}],
						actions: [
							{type:'hideStim', handle:'All'},
							{type:'log'},
							{type:'trigger', handle:'endTrial', duration:500}
						]
					},
					{
						conditions: [{type:'inputEquals',value:'endTrial'}],
						actions: [{type:'endTrial'}]
					}
				]
			}
		]);

		/**
		 * The four basic trials.
		 */
		API.addTrialSets({
			leftAtt1: [{
				inherit : 'sort', 
				data : {corResp : 'left'},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:'attribute1'}},
					{inherit:{set:'error'}}
				]
			}],
			rightAtt2: [{
				inherit : 'sort', 
				data : {corResp : 'right'},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:'attribute2'}},
					{inherit:{set:'error'}}
				]
			}],
			leftCat: [{
				inherit : 'sort', 
				data : {corResp : 'left'},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:'category'}},
					{inherit:{set:'error'}}
				]
			}],
			rightCat: [{
				inherit : 'sort', 
				data : {corResp : 'right'},
				stimuli : 
				[
					{inherit:{type:'exRandom',set:'category'}},
					{inherit:{set:'error'}}
				]
			}]	
		});

		/**
		 *	Stimulus Sets
		 */
		API.addStimulusSets({
			// This Default stimulus is inherited by the other stimuli so that we can have a consistent look and change it from one place
			Default: [
				{css:{color:'white','font-size':'2em'}}
			],

			instructions: [
				{css:{'font-size':'1.4em',color:'black', lineHeight:1.2}, nolog:true, location:{bottom:1}}
			],

			attribute1 : 
			[{
				data: {alias:attribute1, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.attribute1.css,
				media : {inherit:{type:'exRandom',set:'attribute1'}}
			}],
			attribute2 : 
			[{
				data: {alias:attribute2, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.attribute2.css,
				media : {inherit:{type:'exRandom',set:'attribute2'}}
			}],
			category : 
			[{
				data: {alias:category, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.category.css,
				media : {inherit:{type:'exRandom',set:'category'}}
			}],			
			// this stimulus used for giving feedback, in this case only the error notification
			error : [{
				data:{handle:'error'}, location: {top: 70}, css:{color:'red','font-size':'4em'}, media: {word:'X'}, nolog:true
			}], 			
			dummyForLog : [{
				data:{name:'dummyForLog', alias:'dummyForLog'}, 
				location:{left:99}, media:{word:' '}
			}]
		});

		/**
		 *	Media Sets
		 */
		API.addMediaSets({
			attribute1 : piCurrent.attribute1.media,
			attribute2: piCurrent.attribute2.media,
			category: piCurrent.category.media
		});

		/**
		 *	Create the Task sequence
		 */
		//helper Function for getting the instructions HTML.
		function getInstFromTemplate(inText, blockNum, nBlocks)
		{
			var retText = inText.replace(/attribute1/g, attribute1);
			retText = retText.replace(/attribute2/g, attribute2);
			retText = retText.replace(/thecategory/g, category);
			retText = retText.replace(/blockNum/g, blockNum);
			retText = retText.replace(/nBlocks/g, nBlocks);
			return (retText);
		}

		// Determine starting condition
		var firstCatSide = 'leftCat';
		if (piCurrent.blockOrder == 'startRight')
		{
		    firstCatSide = 'rightCat';
		}
		else if (piCurrent.blockOrder == 'random')
		{
		    firstCatSide = (Math.random() < 0.5) ? 'rightCat' : 'leftCat';
		}
		
		// Store starting condition for instruction logic
		var startingCondition = firstCatSide;
		
		// Build the full trial sequence with conditional instructions
		var trialSequence = [];
		var catSide = '';

		// Layout per le istruzioni con solo categorie e attributi (senza le key)
			var leftLayoutInst = [
			    {location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
			    {location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css},
			    {location:{left:6,top:4+(piCurrent.attribute1.title.height|3)}, media:{word:piCurrent.orText}, css:piCurrent.orCss},
			    {location:{left:6,top:11+(piCurrent.attribute1.title.height|3)},media:piCurrent.category.title.media, css:piCurrent.category.title.css}
			];
			
			var rightLayoutInst = [
			    {location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
			    {location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css},
			    {location:{right:6,top:4+(piCurrent.attribute2.title.height|3)},media:{word:piCurrent.orText}, css:piCurrent.orCss},
			    {location:{right:6,top:11+(piCurrent.attribute2.title.height|3)},media:piCurrent.category.title.media, css:piCurrent.category.title.css}
			];

		
		for (var iBlock = 1; iBlock <= piCurrent.trialsByBlock.length; iBlock++) {
		    var currentCondition = '';
		    var blockLayout;
		    var singleAttribute, catAttribute;
		
		    // Determine block type and category side
		    if (catSide !== 'rightCat' && catSide !== 'leftCat') {
		        // First block — initialize side
		        catSide = firstCatSide;
		    } else if (piCurrent.switchSideBlock == iBlock) {
		        // Switch category sides
		        catSide = (catSide == 'rightCat') ? 'leftCat' : 'rightCat';
		    }
		
		    // Define layout and conditions
		    if (catSide == 'leftCat') {
		        blockLayout = leftLayout;
		        singleAttribute = 'rightAtt2';
		        catAttribute = 'leftAtt1';
		        currentCondition = category + '/' + attribute1 + ',' + attribute2;
		    } else if (catSide == 'rightCat') {
		        blockLayout = rightLayout;
		        singleAttribute = 'leftAtt1';
		        catAttribute = 'rightAtt2';
		        currentCondition = attribute1 + ',' + attribute2 + '/' + category;
		    }
		
		    if (iBlock === 2) {
		        block2Condition = currentCondition; // store condition order
		    }
		
		   	 // === CONDITIONAL INSTRUCTIONS LOGIC ===
				let addInstruction = false;
				let instrHTML = '';
				
				// Determina le istruzioni in base alla condizione iniziale
				if (startingCondition === 'leftCat') {  // Condizione compatibile (C)
				    if (iBlock === 1) {
				        addInstruction = true;
				        instrHTML = getInstFromTemplate(piCurrent.instTemplateCategoryLeft, iBlock, piCurrent.trialsByBlock.length); // InstrA
				    } else if (iBlock === piCurrent.switchSideBlock) {
				        addInstruction = true;
				        instrHTML = piCurrent.instTemplateTransitionCtoI; // InstrB
				    }
				} else if (startingCondition === 'rightCat') { // Condizione incompatibile (I)
				    if (iBlock === 1) {
				        addInstruction = true;
				        instrHTML = getInstFromTemplate(piCurrent.instTemplateCategoryRight, iBlock, piCurrent.trialsByBlock.length); // InstrC
				    } else if (iBlock === piCurrent.switchSideBlock) {
				        addInstruction = true;
				        instrHTML = piCurrent.instTemplateTransitionItoC; // InstrD
				    }
				}
				
				// Aggiungi istruzioni solo quando necessario
				if (addInstruction) {
				    trialSequence.push({
				        inherit: 'instructions',
				        data: { block: iBlock, condition: currentCondition },
				        layout: (catSide === 'leftCat') ? leftLayoutInst : rightLayoutInst, // Layout in alto
				        stimuli: [
				            {
				                media: {
				                    html: instrHTML
				                        .replace('thecategory', piCurrent.category.name)
				                        .replace('blockNum', 'Blocco ' + iBlock)
				                },
				                css: { color: 'black', 'font-size': '1em' }
				            }
				        ]
				    });
				}
		
		    // --- Mini-blocks ---
		    for (var iMini = 1; iMini <= piCurrent.trialsByBlock[iBlock - 1].miniBlocks; iMini++) {
		        var mixer = {
		            mixer: 'random',
		            data: [
		                // Single-attribute trials
		                {
		                    mixer: 'repeat',
		                    times: piCurrent.trialsByBlock[iBlock - 1].singleAttTrials,
		                    data: [{
		                        inherit: singleAttribute,
		                        data: { condition: currentCondition, block: iBlock },
		                        layout: blockLayout.concat(reminderStimulus)
		                    }]
		                },
		                // Shared-attribute trials
		                {
		                    mixer: 'repeat',
		                    times: piCurrent.trialsByBlock[iBlock - 1].sharedAttTrials,
		                    data: [{
		                        inherit: catAttribute,
		                        data: { condition: currentCondition, block: iBlock },
		                        layout: blockLayout.concat(reminderStimulus)
		                    }]
		                }
		            ]
		        };
		
		        // Add category trials
		        mixer.data.push({
		            mixer: 'repeat',
		            times: piCurrent.trialsByBlock[iBlock - 1].categoryTrials,
		            data: [{
		                inherit: catSide,
		                data: { condition: currentCondition, block: iBlock },
		                layout: blockLayout.concat(reminderStimulus)
		            }]
		        });
		
		        trialSequence.push(mixer);
		    }
		}
		
		// --- Add the completed sequence ---
		API.addSequence(trialSequence);

		
		//Settings for the score computation.
		scorer.addSettings('compute',{
			ErrorVar:'score',
			condVar:'condition',
			//condition 1
			cond1VarValues: [
				category + '/' + attribute1 + ',' + attribute2
				//attribute1 + ',' + attribute2 + '/' + category
			],
			//condition 2
			cond2VarValues: [ 
				attribute1 + ',' + attribute2 + '/' + category
				//attribute1 + '/' + category + ',' + attribute2
			],
			parcelVar : "parcel", //We use only one parcel because it is probably not less reliable.
			parcelValue : ['first'],
			fastRT : 150, //Below this reaction time, the latency is considered extremely fast.
			maxFastTrialsRate : 0.1, //Above this % of extremely fast responses within a condition, the participant is considered too fast.
			minRT : 400, //Below this latency
			maxRT : 10000, //above this
			errorLatency : {use:"latency", penalty:600, useForSTD:true},
			postSettings : {score:"score",msg:"",url:"/implicit/scorer"}
		});

		// --- Hook End Task: calcolo punteggio e invio log ---
				API.addSettings('hooks', {
				    endTask: function() {
				
				        // Allow MinnoJS to perform its own internal cleanup first
				        if (this._endTask) this._endTask();
				
				        // --- Serialize and send final log ---
				        var logs = API.getLogs();
				        if (API.settings && API.settings.logger) {
				            var serialized = API.settings.logger.serialize('final', logs);
				            API.settings.logger.send('final', serialized);
				        } else {
				            console.warn('Logger not found — logs not sent.');
				        }
				
				        // --- Trigger Qualtrics continuation ---
				        if (window.minnoJS && typeof window.minnoJS.onEnd === 'function') {
				            try {
				                console.log('Calling window.minnoJS.onEnd() from endTask...');
				                window.minnoJS.onEnd();
				            } catch (e) {
				                console.error('Error executing onEnd():', e);
				            }
				        } else {
				            console.warn('window.minnoJS.onEnd not found — cannot advance Qualtrics automatically.');
				        }
				    }
				});
			/****************************************************
			 *  EXPORT SCRIPT
			 ****************************************************/
			return API.script;
			}
			return stiatExtension;
			});
