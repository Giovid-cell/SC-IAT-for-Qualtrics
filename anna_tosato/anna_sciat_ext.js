// https://cdn.jsdelivr.net/gh/Giovid-cell/SC-IAT-for-Qualtrics/anna_tosato/anna_sciat_ext.js 

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
			    maxWidth: 1700,
			    proportions: 0.6,
			    background: '#ffffff',
			    borderWidth: 5,
			    canvasBackground: '#ffffff',
			    borderColor: 'lightblue'
			},

			//Define the category.
			category :  
			{
				name : 'Paziente',
				title : {
					media : {word : 'Paziente'},
					css : {color:'#31b404','font-size':'2em'},
					height : 4
				}, 
				media : [ 
					{word: 'Anna'},
					{word: 'Tosato'},
					{word: 'Anna Tosato'},
					{word: 'A.T.'},
					{word: 'Anna Tosato'}
				],
				repeatedStimuli: ['Anna Tosato', 'Tosato Anna'], // Specified repeats
				css : {color:'#31b404','font-size':'2em'}
			},	
			attribute1 : 
			{
				name : 'Sostenere',
				title : {
					media : {word : 'Sostenere'},
					css : {color:'#31b404','font-size':'2em'},
					height : 4
				}, 
				media : [
					{word: 'aiutare'},
					{word: 'assistere'},
					{word: 'soccorrere'},
					{word: 'sostenere'},
					{word: 'appoggiare'}
				],
				repeatedStimuli: ['aiutare', 'sostenere'], // Specified repeats
				css : {color:'#31b404','font-size':'2em'}
			},
			attribute2 : 
			{
				name : 'Ignorare',
				title : {
					media : {word : 'Ignorare'},
					css : {color:'#31b404','font-size':'2em'},
					height : 4
				},
				media : [
					{word: 'ostacolare'},
					{word: 'trascurare'},
					{word: 'ignorare'},
					{word: 'dimenticare'},
					{word: 'tralasciare'}
				],
				repeatedStimuli: ['ostacolare', 'tralasciare'], // Specified repeats
				css : {color:'#31b404','font-size':'2em'}
			},	
			trialsByBlock : 
			[
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
			blockOrder : 'random',
			switchSideBlock : 3,

			base_url : {
				image : '/implicit/user/yba/pipexample/stiat/images/'
			}, 
			ITIDuration : 250,
			
			fontColor : '#000000',
			
			leftKeyText : 'Prema il tasto "W" per', 
			rightKeyText : 'Prema il tasto "P" per', 
			keysCss : {'font-size':'0.8em', 'font-family':'courier', color:'#000000'},
			orText : 'o', 
			orCss : {'font-size':'1.8em', color:'#000000'},

			remindErrorText : '<p align="center" style="font-size:1em; font-family:arial">' +
			'Se commette un errore, o la risposta è troppo lenta, una <font color="#ff0000"><b>X</b></font> rossa apparirà.<p/>',
			
			finalText: 'Ha completato questo compito<br/><br/>Premi la BARRA SPAZIATRICE per continuare.', 

			instTemplateCategoryLeft: '<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
			  '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
				'<div style="font-size:16px; max-width:750px; line-height:1.25; margin:90px auto 0 auto; text-align:left;">'+
			      '<p style="margin-bottom:6px;">Le chiediamo di partecipare ad un esperimento.</p>' +
			      '<p style="margin-bottom:6px;">Disponga l\'indice o il medio sul tasto <b>"W"</b> e sul tasto <b>"P"</b>.</p>' +
			      '<p style="margin-bottom:6px;">Al centro dello schermo compariranno stimoli appartenenti alle categorie visualizzate in alto, a destra e a sinistra.</p>' +
			      '<p style="margin-bottom:6px;">Se lo stimolo appartiene a UNA delle DUE categorie a <b>SINISTRA</b>, prema <b>"W"</b>;<br>' +
			      'se appartiene alla categoria a <b>DESTRA</b>, prema <b>"P"</b>.</p>' +
			      '<p style="margin-bottom:6px;">Esempi di stimoli per "<font color="#31b404">thecategory</font>": Anna, Anna Tosato, P.T.</p>' +
			      '<p style="margin-bottom:6px;">Ogni stimolo appartiene a una sola categoria. Se la risposta è corretta, una <font color="#00b300"><b>O</b></font> verde apparirà sullo schermo.</p>' +
			      '<p style="margin-bottom:6px;">Se commette un errore, o la risposta è troppo lenta, una <font color="#ff0000"><b>X</b></font> apparirà sullo schermo.</p>' +
			      '<p style="margin-bottom:6px;">Risponda <b>il più velocemente possibile</b> cercando di non commettere errori.</p>' +
			      '<p>Quando è pronto/a, prema la <b>barra spaziatrice</b> per cominciare.</p>' +
			    '</div>' +
			  '</div>' +
			'</div>',
			
			instTemplateCategoryRight: '<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
			  '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
				'<div style="font-size:16px; max-width:750px; line-height:1.25; margin:90px auto 0 auto; text-align:left;">'+
			      '<p style="margin-bottom:6px;">Le chiediamo di partecipare ad un esperimento.</p>' +
			      '<p style="margin-bottom:6px;">Disponga l\'indice o il medio sul tasto <b>"W"</b> e sul tasto <b>"P"</b>.</p>' +
			      '<p style="margin-bottom:6px;">Al centro dello schermo compariranno stimoli appartenenti alle categorie visualizzate in alto, a destra e a sinistra.</p>' +
			      '<p style="margin-bottom:6px;">Se lo stimolo appartiene alla categoria a <b>SINISTRA</b>, prema <b>"W"</b>;<br>' +
			      'se appartiene a UNA delle DUE categorie a <b>DESTRA</b>, prema <b>"P"</b>.</p>' +
			      '<p style="margin-bottom:6px;">Esempi di stimoli per "<font color="#31b404">thecategory</font>": Anna, Anna Tosato, P.T.</p>' +
			      '<p style="margin-bottom:6px;">Ogni stimolo appartiene a una sola categoria. Se la risposta è corretta, una <font color="#00b300"><b>O</b></font> verde apparirà sullo schermo.</p>' +
			      '<p style="margin-bottom:6px;">Se commette un errore, o la risposta è troppo lenta, una <font color="#ff0000"><b>X</b></font> apparirà sullo schermo.</p>' +
			      '<p style="margin-bottom:6px;">Risponda <b>il più velocemente possibile</b> cercando di non commettere errori.</p>' +
			      '<p>Quando è pronto/a, prema la <b>barra spaziatrice</b> per cominciare.</p>' +
			    '</div>' +
			  '</div>' +
			'</div>',
			
			instTemplateTransitionCtoI: 
			'<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
			  '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
			    '<div style="width:80%; max-width:700px; font-size:16px; line-height:1.1em; text-align:left;">' +
			      '<p style="margin-bottom:6px;">Adesso le categorie appariranno in una nuova configurazione.</p>' +
			      '<p style="margin-bottom:6px;">Prema <b>\"W\"</b> se lo stimolo appartiene alla categoria di <b>SINISTRA</b>.</p>' +
			      '<p style="margin-bottom:6px;">Prema <b>\"P\"</b> se lo stimolo appartiene ad <b>UNA delle DUE categorie</b> a <b>DESTRA</b>.</p>' +
			      '<p style="margin-bottom:6px;">Ogni stimolo appartiene esclusivamente ad <b>UNA delle TRE categorie</b>.</p>' +
			      '<p style="margin-top:12px;">Quando è pronto/a, prema la <b>BARRA SPAZIATRICE</b> per continuare.</p>' +
			    '</div>' +
			  '</div>' +
			'</div>',
			
			instTemplateTransitionItoC: 
			'<div style="width:100%; height:100%; font-family:arial; padding:38px 0 0 38px;">' +
			  '<div style="display:flex; justify-content:flex-start; align-items:flex-start; width:100%; height:100%;">' +
			    '<div style="width:80%; max-width:700px; font-size:16px; line-height:1.1em; text-align:left;">' +
			      '<p style="margin-bottom:6px;">Adesso le categorie appariranno in una nuova configurazione.</p>' +
			      '<p style="margin-bottom:6px;">Prema <b>\"W\"</b> se lo stimolo appartiene ad <b>UNA delle DUE categorie</b> di <b>SINISTRA</b>.</p>' +
			      '<p style="margin-bottom:6px;">Prema <b>\"P\"</b> se lo stimolo appartiene alla categoria a <b>DESTRA</b>.</p>' +
			      '<p style="margin-bottom:6px;">Ogni stimolo appartiene esclusivamente ad <b>UNA delle TRE categorie</b>.</p>' +
			      '<p style="margin-top:12px;">Quando è pronto/a, prema la <b>BARRA SPAZIATRICE</b> per continuare.</p>' +
			    '</div>' +
			  '</div>' +
			'</div>'
		};
			
		// Extend piCurrent with options and defaults
		_.extend(piCurrent, _.defaults(options, stiatObj));
		
		// Helper Functions
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
		
		// Shuffle array function
		function shuffleArray(array) {
		    var shuffled = array.slice();
		    for (var i = shuffled.length - 1; i > 0; i--) {
		        var j = Math.floor(Math.random() * (i + 1));
		        var temp = shuffled[i];
		        shuffled[i] = shuffled[j];
		        shuffled[j] = temp;
		    }
		    return shuffled;
		}
		
		// ======= CONTROLLED STIMULUS PRESENTATION FUNCTIONS =======
		
		/**
		 * Creates trial array with controlled stimulus repetition
		 * @param {number} count - Number of trials (7 or 10)
		 * @param {Array} mediaArray - Array of media objects {word: 'stimulus'}
		 * @param {Array} repeatedWords - Array of words to repeat [word1, word2]
		 * @returns {Array} - Array of media objects for trials
		 */
		function makeControlledTrials(count, mediaArray, repeatedWords) {
		    var trials = [];
		    
		    if (count === 10) {
		        // Each stimulus appears exactly 2 times
		        for (var i = 0; i < mediaArray.length; i++) {
		            trials.push(mediaArray[i]);
		            trials.push(mediaArray[i]);
		        }
		    } else if (count === 7) {
		        // All 5 stimuli + 2 specific repeats
		        // Add all stimuli once
		        for (var i = 0; i < mediaArray.length; i++) {
		            trials.push(mediaArray[i]);
		        }
		        // Add the 2 specified repeats
		        for (var i = 0; i < mediaArray.length; i++) {
		            var word = mediaArray[i].word;
		            if (repeatedWords.indexOf(word) !== -1) {
		                trials.push(mediaArray[i]);
		            }
		        }
		    }
		    
		    return shuffleArray(trials);
		}
		
		// Logger settings
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
		                '',
		                '',
		                ''
		            ];
		        });

		        content.push([
		            9, 999, 'end', '', '', '', '', '', '', piCurrent.d || '', '', block2Condition || ''
		        ]);

		        content.unshift(headers);
		        return toCsv(content);
		    },
		    send: function(name, serialized){
		        window.minnoJS.logger(serialized);
		    }
		});

		var attribute1 = piCurrent.attribute1.name;
		var attribute2 = piCurrent.attribute2.name;
		var category = piCurrent.category.name;

		var block2Condition;
		
		// Layouts
		var leftLayout = [
			{location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
			{location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
			{location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
			{location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css},
			{location:{left:6,top:4+(piCurrent.attribute1.title.height|3)}, media:{word:piCurrent.orText}, css:piCurrent.orCss},
			{location:{left:6,top:11+(piCurrent.attribute1.title.height|3)},media:piCurrent.category.title.media, css:piCurrent.category.title.css}
		];
		
		var rightLayout = [
			{location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
			{location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
			{location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
			{location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css},
			{location:{right:6,top:4+(piCurrent.attribute2.title.height|3)},media:{word:piCurrent.orText}, css:piCurrent.orCss},
			{location:{right:6,top:11+(piCurrent.attribute2.title.height|3)},media:piCurrent.category.title.media, css:piCurrent.category.title.css}
		];
		
		var reminderStimulus = {location:{bottom:1}, css: {color:piCurrent.fontColor,'font-size':'1em'}, media : {html: piCurrent.remindErrorText}};

		API.addSettings('canvas',piCurrent.canvas);
		API.addSettings('base_url',piCurrent.base_url);

		// Default Trial
		API.addTrialSets('sort', {
		    data: {score: 0, parcel: 'first', logged:false},
		    input: [
		        {handle: 'skip1', on: 'keypressed', key: 27},
		        {handle: 'left', on: 'keypressed', key: 'w', isExclusive:true},
		        {handle: 'right', on: 'keypressed', key: 'p', isExclusive:true},
		        {handle: 'timeout', on: 'timeout', duration: 1500, isExclusive: true}
		    ],
		
		    interactions: [
			  {
			    conditions: [{ type: 'begin' }],
			    actions: [{ type: 'showStim', handle: 'targetStim' }]
			  },
			
			  {
			    conditions: [{ type: 'inputEqualsTrial', property: 'corResp' }],
			    actions: [
			      { type: 'removeInput', handle: ['left', 'right', 'timeout'] },
			      { type: 'showStim', handle: 'correct' },
			      { type: 'setTrialAttr', setter: { score: 1 } },
			      { type: 'log' },
			      { type: 'trigger', handle: 'endTrial', duration: piCurrent.ITIDuration }
			    ]
			  },
			  
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
			      { type: 'trigger', handle: 'endTrial', duration: piCurrent.ITIDuration }
			    ]
			  },
			
			  {
			    conditions: [{ type: 'inputEquals', value: 'timeout' }],
			    actions: [
			      { type: 'removeInput', handle: ['left', 'right', 'timeout'] },
			      { type: 'setTrialAttr', setter: { score: 2 } },
			      { type: 'showStim', handle: 'error' },
			      { type: 'log' },
			      { type: 'trigger', handle: 'endTrial', duration: piCurrent.ITIDuration }
			    ]
			  },
			
			  {
			    conditions: [{ type: 'inputEquals', value: 'endTrial' }],
			    actions: [
			      { type: 'hideStim', handle: 'All' },
			      { type: 'endTrial' }
			    ]
			  },
		
		        {
		            conditions: [{type: 'inputEquals', value: 'skip1'}],
		            actions: [{type: 'setInput', input: {handle: 'skip2', on: 'enter'}}]
		        },
		
		        {
		            conditions: [{type: 'inputEquals', value: 'skip2'}],
		            actions: [
		                {type: 'goto', destination: 'nextWhere', properties: {blockStart: true}},
		                {type: 'endTrial'}
		            ]
		        }
		    ]
		});

		// Instructions trials
		API.addTrialSets('instructions', [
			{
				data: {blockStart:true, block:0, condition:'inst', score:0},
				input: [{handle:'space',on:'space'}],
				interactions: [
					{
						conditions: [{type:'begin'}],
						actions: [{type:'showStim',handle:'All'}]
					},
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

		// Stimulus Sets
		API.addStimulusSets({
			Default: [{css:{color:'white','font-size':'2em'}}],
			instructions: [{css:{'font-size':'1.4em',color:'black', lineHeight:1.2}, nolog:true, location:{bottom:1}}],
			attribute1 : [{
				data: {alias:attribute1, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.attribute1.css,
				media : {inherit:{type:'exRandom',set:'attribute1'}}
			}],
			attribute2 : [{
				data: {alias:attribute2, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.attribute2.css,
				media : {inherit:{type:'exRandom',set:'attribute2'}}
			}],
			category : [{
				data: {alias:category, handle:'targetStim'}, 
				inherit : 'Default', 
				css:piCurrent.category.css,
				media : {inherit:{type:'exRandom',set:'category'}}
			}],			
			error : [{
				data:{handle:'error'}, location: {top: 70}, css:{color:'red','font-size':'4em'}, media: {word:'X'}, nolog:true
			}], 			
			correct: [{
			    data: {handle: 'correct'}, location: {top: 75}, css: {color: 'green', 'font-size': '4em', 'text-shadow': '0 0 2px #000'}, media: {word: 'O'}, nolog: true                          
			}],
			dummyForLog : [{
				data:{name:'dummyForLog', alias:'dummyForLog'}, 
				location:{left:99}, media:{word:' '}
			}]
		});

		// Media Sets (will be overridden by controlled presentation)
		API.addMediaSets({
			attribute1 : piCurrent.attribute1.media,
			attribute2: piCurrent.attribute2.media,
			category: piCurrent.category.media
		});

		// Helper function for instructions
		function getInstFromTemplate(inText, blockNum, nBlocks) {
			var retText = inText.replace(/attribute1/g, attribute1);
			retText = retText.replace(/attribute2/g, attribute2);
			retText = retText.replace(/thecategory/g, category);
			retText = retText.replace(/blockNum/g, blockNum);
			retText = retText.replace(/nBlocks/g, nBlocks);
			return (retText);
		}

		// Determine starting condition
		var firstCatSide = 'leftCat';
		if (piCurrent.blockOrder == 'startRight') {
		    firstCatSide = 'rightCat';
		} else if (piCurrent.blockOrder == 'random') {
		    firstCatSide = (Math.random() < 0.5) ? 'rightCat' : 'leftCat';
		}
		
		var startingCondition = firstCatSide;
		var trialSequence = [];
		var catSide = '';

		// Instruction layouts
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

		// ======= BUILD TRIAL SEQUENCE WITH CONTROLLED STIMULI =======
		for (var iBlock = 1; iBlock <= piCurrent.trialsByBlock.length; iBlock++) {
		    var currentCondition = '';
		    var blockLayout;
		    var isCongruent; // Sostenere + Paziente LEFT vs Ignorare RIGHT
		
		    // Determine category side
		    if (catSide !== 'rightCat' && catSide !== 'leftCat') {
		        catSide = firstCatSide;
		    } else if (piCurrent.switchSideBlock == iBlock) {
		        catSide = (catSide == 'rightCat') ? 'leftCat' : 'rightCat';
		    }
		
		    // Define layout and condition
		    if (catSide == 'leftCat') {
		        blockLayout = leftLayout;
		        isCongruent = true; // Sostenere + Paziente LEFT vs Ignorare RIGHT
		        currentCondition = category + '/' + attribute1 + ',' + attribute2;
		    } else {
		        blockLayout = rightLayout;
		        isCongruent = false; // Sostenere LEFT vs Paziente + Ignorare RIGHT
		        currentCondition = attribute1 + ',' + attribute2 + '/' + category;
		    }
		
		    if (iBlock === 2) {
		        block2Condition = currentCondition;
		    }
		
		    // === CONDITIONAL INSTRUCTIONS ===
		    var addInstruction = false;
		    var instrHTML = '';
		    
		    if (startingCondition === 'leftCat') {
		        if (iBlock === 1) {
		            addInstruction = true;
		            instrHTML = getInstFromTemplate(piCurrent.instTemplateCategoryLeft, iBlock, piCurrent.trialsByBlock.length);
		        } else if (iBlock === piCurrent.switchSideBlock) {
		            addInstruction = true;
		            instrHTML = piCurrent.instTemplateTransitionCtoI;
		        }
		    } else if (startingCondition === 'rightCat') {
		        if (iBlock === 1) {
		            addInstruction = true;
		            instrHTML = getInstFromTemplate(piCurrent.instTemplateCategoryRight, iBlock, piCurrent.trialsByBlock.length);
		        } else if (iBlock === piCurrent.switchSideBlock) {
		            addInstruction = true;
		            instrHTML = piCurrent.instTemplateTransitionItoC;
		        }
		    }
		    
		    if (addInstruction) {
		        trialSequence.push({
		            inherit: 'instructions',
		            data: { block: iBlock, condition: currentCondition },
		            layout: (catSide === 'leftCat') ? leftLayoutInst : rightLayoutInst,
		            stimuli: [{
		                media: {
		                    html: instrHTML
		                        .replace('thecategory', piCurrent.category.name)
		                        .replace('blockNum', 'Blocco ' + iBlock)
		                },
		                css: { color: 'black', 'font-size': '1em' }
		            }]
		        });
		    }
		
		    // === CREATE CONTROLLED TRIAL ARRAYS ===
		    for (var iMini = 1; iMini <= piCurrent.trialsByBlock[iBlock - 1].miniBlocks; iMini++) {
		        var allTrials = [];
		        
		        // Get trial counts
		        var singleAttCount = piCurrent.trialsByBlock[iBlock - 1].singleAttTrials;
		        var sharedAttCount = piCurrent.trialsByBlock[iBlock - 1].sharedAttTrials;
		        var categoryCount = piCurrent.trialsByBlock[iBlock - 1].categoryTrials;
		        
		        if (isCongruent) {
		            // CONGRUENT: Sostenere + Paziente LEFT vs Ignorare RIGHT
		            
		            // Ignorare trials (single attribute, RIGHT, 10 trials - each 2x)
		            var ignorareStimuli = makeControlledTrials(
		                singleAttCount,
		                piCurrent.attribute2.media,
		                piCurrent.attribute2.repeatedStimuli
		            );
		            for (var i = 0; i < ignorareStimuli.length; i++) {
		                allTrials.push({
		                    inherit: 'sort',
		                    data: {
		                        corResp: 'right',
		                        condition: currentCondition,
		                        block: iBlock
		                    },
		                    layout: blockLayout.concat(reminderStimulus),
		                    stimuli: [
		                        {
		                            data: {alias: attribute2, handle: 'targetStim'},
		                            css: piCurrent.attribute2.css,
		                            media: ignorareStimuli[i]
		                        },
		                        {inherit: {set: 'error'}},
		                        {inherit: {set: 'correct'}}
		                    ]
		                });
		            }
		            
		            // Sostenere trials (shared attribute, LEFT, 7 trials - 5 + 2 repeats)
		            var sostenereStimuli = makeControlledTrials(
		                sharedAttCount,
		                piCurrent.attribute1.media,
		                piCurrent.attribute1.repeatedStimuli
		            );
		            for (var i = 0; i < sostenereStimuli.length; i++) {
		                allTrials.push({
		                    inherit: 'sort',
		                    data: {
		                        corResp: 'left',
		                        condition: currentCondition,
		                        block: iBlock
		                    },
		                    layout: blockLayout.concat(reminderStimulus),
		                    stimuli: [
		                        {
		                            data: {alias: attribute1, handle: 'targetStim'},
		                            css: piCurrent.attribute1.css,
		                            media: sostenereStimuli[i]
		                        },
		                        {inherit: {set: 'error'}},
		                        {inherit: {set: 'correct'}}
		                    ]
		                });
		            }
		            
		            // Paziente trials (category, LEFT, 7 trials - 5 + 2 repeats)
		            var pazienteStimuli = makeControlledTrials(
		                categoryCount,
		                piCurrent.category.media,
		                piCurrent.category.repeatedStimuli
		            );
		            for (var i = 0; i < pazienteStimuli.length; i++) {
		                allTrials.push({
		                    inherit: 'sort',
		                    data: {
		                        corResp: 'left',
		                        condition: currentCondition,
		                        block: iBlock
		                    },
		                    layout: blockLayout.concat(reminderStimulus),
		                    stimuli: [
		                        {
		                            data: {alias: category, handle: 'targetStim'},
		                            css: piCurrent.category.css,
		                            media: pazienteStimuli[i]
		                        },
		                        {inherit: {set: 'error'}},
		                        {inherit: {set: 'correct'}}
		                    ]
		                });
		            }
		            
		        } else {
		            // INCONGRUENT: Sostenere LEFT vs Paziente + Ignorare RIGHT
		            
		            // Sostenere trials (single attribute, LEFT, 10 trials - each 2x)
		            var sostenereStimuli = makeControlledTrials(
		                singleAttCount,
		                piCurrent.attribute1.media,
		                piCurrent.attribute1.repeatedStimuli
		            );
		            for (var i = 0; i < sostenereStimuli.length; i++) {
		                allTrials.push({
		                    inherit: 'sort',
		                    data: {
		                        corResp: 'left',
		                        condition: currentCondition,
		                        block: iBlock
		                    },
		                    layout: blockLayout.concat(reminderStimulus),
		                    stimuli: [
		                        {
		                            data: {alias: attribute1, handle: 'targetStim'},
		                            css: piCurrent.attribute1.css,
		                            media: sostenereStimuli[i]
		                        },
		                        {inherit: {set: 'error'}},
		                        {inherit: {set: 'correct'}}
		                    ]
		                });
		            }
		            
		            // Ignorare trials (shared attribute, RIGHT, 7 trials - 5 + 2 repeats)
		            var ignorareStimuli = makeControlledTrials(
		                sharedAttCount,
		                piCurrent.attribute2.media,
		                piCurrent.attribute2.repeatedStimuli
		            );
		            for (var i = 0; i < ignorareStimuli.length; i++) {
		                allTrials.push({
		                    inherit: 'sort',
		                    data: {
		                        corResp: 'right',
		                        condition: currentCondition,
		                        block: iBlock
		                    },
		                    layout: blockLayout.concat(reminderStimulus),
		                    stimuli: [
		                        {
		                            data: {alias: attribute2, handle: 'targetStim'},
		                            css: piCurrent.attribute2.css,
		                            media: ignorareStimuli[i]
		                        },
		                        {inherit: {set: 'error'}},
		                        {inherit: {set: 'correct'}}
		                    ]
		                });
		            }
		            
		            // Paziente trials (category, RIGHT, 7 trials - 5 + 2 repeats)
		            var pazienteStimuli = makeControlledTrials(
		                categoryCount,
		                piCurrent.category.media,
		                piCurrent.category.repeatedStimuli
		            );
		            for (var i = 0; i < pazienteStimuli.length; i++) {
		                allTrials.push({
		                    inherit: 'sort',
		                    data: {
		                        corResp: 'right',
		                        condition: currentCondition,
		                        block: iBlock
		                    },
		                    layout: blockLayout.concat(reminderStimulus),
		                    stimuli: [
		                        {
		                            data: {alias: category, handle: 'targetStim'},
		                            css: piCurrent.category.css,
		                            media: pazienteStimuli[i]
		                        },
		                        {inherit: {set: 'error'}},
		                        {inherit: {set: 'correct'}}
		                    ]
		                });
		            }
		        }
		        
		        // Shuffle all trials together and add to sequence
		        trialSequence.push({
		            mixer: 'random',
		            data: shuffleArray(allTrials)
		        });
		    }
		}
		
		// Add completed sequence
		API.addSequence(trialSequence);

		// Scorer settings
		scorer.addSettings('compute',{
			ErrorVar:'score',
			condVar:'condition',
			cond1VarValues: [
				category + '/' + attribute1 + ',' + attribute2
			],
			cond2VarValues: [ 
				attribute1 + ',' + attribute2 + '/' + category
			],
			parcelVar : "parcel",
			parcelValue : ['first'],
			fastRT : 150,
			maxFastTrialsRate : 0.1,
			minRT : 400,
			maxRT : 10000,
			errorLatency : {use:"latency", penalty:600, useForSTD:true},
			postSettings : {score:"score",msg:"",url:"/implicit/scorer"}
		});

		// End task hook
		API.addSettings('hooks', {
		    endTask: function() {
		        if (this._endTask) this._endTask();
		
		        var logs = API.getLogs();
		        if (API.settings && API.settings.logger) {
		            var serialized = API.settings.logger.serialize('final', logs);
		            API.settings.logger.send('final', serialized);
		        } else {
		            console.warn('Logger not found — logs not sent.');
		        }
		
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

		return API.script;
	}
	return stiatExtension;
});
