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
			canvas : {
				maxWidth: 725,
				proportions : 0.7,
				background: '#ffffff',
				borderWidth: 5,
				canvasBackground: '#ffffff',
				borderColor: 'lightblue'
			}, 
			//Define the category.
			category :  
			{
				name : 'Nome Paziente', //Category name to be used for feedback and logging.
				title : {
					media : {word : 'Nome Paziente'}, //Name of the category presented in the task.
					css : {color:'#31b404','font-size':'2em'}, //Style of the category title.
					height : 4 //Used to position the "Or" in the combined block.
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
				//Can change color and size of the targets here.
				css : {color:'#31b404','font-size':'2em'}
			},	
			attribute1 : 
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
				{word: 'tralasciare'},
				{word: 'ostacolare'},
				{word: 'trascurare'}
				], 
				//Can change color and size of the targets here.
				css : {color:'#31b404','font-size':'2em'}
			},
			attribute2 : 
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
				{word: 'appoggiare'},
				{word: 'aiutare'},
				{word: 'sostenere'}
				], 
				//Can change color and size of the targets here.
				css : {color:'#31b404','font-size':'2em'}
			},	
			trialsByBlock : 
			[//Each object in this array defines a block
			
				{ 
					instHTML : '', 
					block : 1, 
					miniBlocks : 2, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}, 
				{ 
					instHTML : '', 
					block : 2, 
					miniBlocks : 2, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}, 
				{ 
					instHTML : '', 
					block : 3, 
					miniBlocks : 2, 
					singleAttTrials : 10, 
					sharedAttTrials : 7, 
					categoryTrials : 7
				}, 
				{ 
					instHTML : '', 
					block : 4, 
					miniBlocks : 2, 
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
			switchSideBlock : 4, //By default, we switch on block 4 (i.e., after blocks 2 and 3 showed the first pairing condition).

			base_url : {//Where are your images?
				image : '/implicit/user/yba/pipexample/stiat/images/'
			}, 
			ITIDuration : 250, //Duration between trials.
			
			fontColor : '#000000', //The color of messages and key reminders. 
			
			//Text and style for key instructions displayed about the category labels.
			leftKeyText : 'Premi il tasto "E" per', 
			rightKeyText : 'Premi il tasto "I" per', 
			keysCss : {'font-size':'0.8em', 'font-family':'courier', color:'#000000'},
			//Text and style for the separator between the top and bottom category labels.
			orText : 'O', 
			orCss : {'font-size':'1.8em', color:'#000000'},

			//Will appear at the bottom of the screen during trials.
			remindErrorText : '<p align="center" style="font-size:"0.6em"; font-family:arial">' +
			'Se commetti un errore, una <font color="#ff0000"><b>X</b></font> rossa apparità. ' +
			'Premi un altro tasto per continuare.<p/>',
			
			finalText: 'Hai completato questo compito<br/><br/>Premi la BARRA SPAZIATRICE per continuare.', 

			//These are templates for the instructions in the task. 
			//If you want more specific instructions for different blocks, 
			// use the instHTML variables above. 
			// The following variables in the instructions text will be replaced: 
			// blockNum, nBlocks, attribute1, attribute2, and thecategory.
			// Notice that this is HTML text.
			instTemplatePractice : '<div><p align="center" style="font-size:20px; font-family:arial">' +
				'<font color="#000000"><u>blockNum parte di nBlocks</u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Colloca il tuo indice sinistro sul tasto <b>E</b> per parole che riguardano la categoria ' + 
				'<font color="#31b404">attribute1</font>.<br/>' + 
				'Colloca il tuo indice destro sul tasto <b>I</b> per parole che riuguardano la categoria ' + 
				'<font color="#31b404">attribute2</font>.<br/>' + 
				'Durante il compito appariranno parole e immagini sullo schermo.<br/><br/>' + 
				'Se ccommetterai un errore, una <font color="#ff0000"><b>X</b></font> rossa apparirà. ' + 
				'Premi un altro tasto per continuare.<br/><br/>' + 
				'<p align="center">Quando sei pronto, per favore, premi la <b>barra spaziatrice </b> per cominciare.</font></p></div>', 
			instTemplateCategoryRight : '<div><p align="center" style="font-size:20px; font-family:arial">' +
				'<font color="#000000"><u>blockNum parte di nBlocks </u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Colloca il tuo indice sinistro sul tasto <b>E</b> per parole che riguardano la categoria ' + 
				'<font color="#31b404">attribute1</font>.<br/>' + 
				'Colloca il tuo indice destro sul tasto <b>I</b> per parole che riuguardano la categoria ' + 
				'<font color="#31b404">attribute2</font> ' +
				'e per parole che riguardano la categoria <font color="#31b404">thecategory</font>.<br/>' + 
				'Durante il compito appariranno parole e immagini sullo schermo.<br/><br/>' + 
				'Se commetti un errore, una <font color="#ff0000"><b>X</b></font> rossa apparirà. ' + 
				'Premi un altro tasto per continuare.<br/><br/>' + 
				'<p align="center">Quando sei pronto, per favore, premi la <b>barra spaziatrice </b> per cominciare.</font></p></div>', 
			instTemplateCategoryLeft : '<div><p align="center" style="font-size:20px; font-family:arial">' +
				'<font color="#000000"><u>blockNum parte di nBlocks </u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Colloca il tuo indice sinistro sul tasto <b>E</b> per parole che riguardano la categoria ' + 
				'<font color="#31b404">attribute1</font> ' +
				'e parole che riguardano la categoria <font color="#31b404">thecategory</font>.<br/>' + 
				'Colloca il tuo indice destro sul tasto <b>I</b> per parole che riuguardano la categoria ' + 
				'<font color="#31b404">attribute2</font>.<br/>' + 
				'Durante il compito appariranno parole e immagini sullo schermo.<br/><br/>' + 
				'Se commetti un errore, una <font color="#ff0000"><b>X</b></font> rossa apparirà. ' + 
				'Premi un altro tasto per continuare.<br/><br/>' + 
				'<p align="center">Quando sei pronto, per favore, premi la <b>barra spaziatrice </b> per cominciare.</font></p></div>', 

			
			//The default feedback messages for each cutoff. 
			//If you put attribute1, attribute2 and category here, 
			//these will be replaced with the names of attribute1, attribute2 and category.
			fb_strongAssociationWithAttribute2 : 'Your data suggest a strong positive automatic attitude toward thecategory.',
			fb_moderateAssociationWithAttribute2 : 'Your data suggest a moderate positive automatic attitude toward thecategory.',
			fb_weakAssociationWithAttribute2 : 'Your data suggest a weak positive automatic attitude toward thecategory.',
			fb_neutralAssociation : 'Your data suggest a neutral automatic attitude toward thecategory.',
			fb_weakAssociationWithAttribute1 : 'Your data suggest a weak negative automatic attitude toward thecategory.' ,
			fb_moderateAssociationWithAttribute1 : 'Your data suggest a moderate negative automatic attitude toward thecategory.' ,
			fb_strongAssociationWithAttribute1 : 'Your data suggest a strong negative automatic attitude toward thecategory.', 
			
			//Error messages in the scorer. If empty then we use the scorer's default messages.
			manyErrors: '',
			tooFast: '',
			notEnough: '' //Usually relevant only if skipped the task.
		};

		// extend the current object with the default
		_.extend(piCurrent, _.defaults(options, stiatObj));

		
		/**
        **** For Qualtrics
        */
        API.addSettings('onEnd', window.minnoJS.onEnd);

		//For debugging the logger
		//window.minnoJS.logger = console.log;
		//window.minnoJS.onEnd = console.log;
		
API.addSettings('logger', {
    onRow: function(logName, log, settings, ctx){
        if (!ctx.logs) ctx.logs = [];
        ctx.logs.push(log);
    },
    onEnd: function(name, settings, ctx){
        return ctx.logs;
    },
    serialize: function(name, logs) {
        var headers = ['blk','tid','cond','typ','cat','stim','rsp','err','rt','d','fb'];
        var content = [];

        logs.forEach(function(log) {
            if (!log || log.nolog) return;
            if (log.name === 'instructions' || log.name === 'dummyForLog') return;

            var data = log.data || {};
            if (data.condition === 'inst') return;
            if (!log.trial_id) return;
            if (log.name && log.name.includes('goodbye')) return;

            // Stimuli extraction in modo robusto
            var cat = '';
            if (Array.isArray(log.stimuli) && log.stimuli.length > 0) {
                var stimObj = log.stimuli[0];
                cat = (stimObj && typeof stimObj === 'object') ? (stimObj.word || '') : (stimObj || '');
            }

            var stim = '';
            if (Array.isArray(log.media) && log.media.length > 0) {
                var mediaObj = log.media[0];
                stim = (mediaObj && typeof mediaObj === 'object') ? (mediaObj.word || '') : (mediaObj || '');
            }

            // Error coding
            var errorCode = 1;
            if (data.score !== undefined) {
                errorCode = data.score === 0 ? 0 : (data.score === 2 ? 2 : 1);
            }

            content.push([
                data.block || '',
                log.trial_id || '',
                data.condition || '',
                log.name || '',
                cat,
                stim,
                log.responseHandle || '',
                errorCode,
                log.latency || '',
                log.d !== undefined ? log.d : '',
                log.fb || ''
            ]);
        });

        // Add minimal end marker
        content.push([9, 999, 'end', '', '', '', '', '', '', '', '']);
        content.unshift(headers);

        // CSV conversion con escape sicuro
        function toCsv(matrix) {
            return matrix.map(row => row.map(normalize).join(',')).join('\n');
        }

        function normalize(val) {
            if (val === null || val === undefined) return '';
            var str = String(val);
            // Escape se contiene virgola, newline o doppio apice
            return /[,"\n]/.test(str) ? '"' + str.replace(/"/g,'""') + '"' : str;
        }

        return toCsv(content);
    },
    send: function(name, serialized){
        window.minnoJS.logger(serialized);
    }
});
                function hasProperties(obj, props) {
                    var iProp;
                    for (iProp = 0; iProp < props.length; iProp++)
                    {
                        if (!obj.hasOwnProperty(props[iProp]))
                        {
                            //console.log('missing ' + props[iProp]);
                            return false;
                        }
                    }
                    return true;
                }
                function toCsv(matrice) { return matrice.map(buildRow).join('\n'); }
                function buildRow(arr) { return arr.map(normalize).join(','); }
                // wrap in double quotes and escape inner double quotes
                function normalize(val) {
                    var quotableRgx = /(\n|,|")/;
                    if (quotableRgx.test(val)) return '"' + val.replace(/"/g, '""') + '"';
                    return val;
                }
            },
            // Set logs into an input (i.e. put them wherever you want)
            send: function(name, serialized){
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
		// layout object for practice blocks (no category)
		var pracLayout = [
			{location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
			{location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
			{location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
			{location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css}
		];
		
		var reminderStimulus = 	{location:{bottom:1}, css: {color:piCurrent.fontColor,'font-size':'1em'}, media : {html: piCurrent.remindErrorText}};

		API.addSettings('canvas',piCurrent.canvas);
		API.addSettings('base_url',piCurrent.base_url);

		/**
		 * Create default Trial
		 */
		API.addTrialSets('sort',{
    // by default each trial is correct, this is modified in case of an error
    data: {score:0, parcel:'first'},
    // set the interface for trials
    input: [
        {handle:'skip1', on:'keypressed', key:27}, // Esc + Enter will skip blocks
        {handle:'left', on:'keypressed', key:'e'},
        {handle:'right', on:'keypressed', key:'i'},
        {handle:'timeout', on:'timeout', duration:1500} // ⏱ Timeout after 1500ms
    ],

    interactions: [
        // begin trial : display stimulus immediately
        {
            conditions: [{type:'begin'}],
            actions: [{type:'showStim', handle:'targetStim'}]
        },

        // error: incorrect response
			        {
			    conditions: [
			        {type:'inputEqualsTrial', property:'corResp', negate:true},
			        {type:'inputEquals', value:['right','left']}
			    ],
			    actions: [
			        {type:'showStim', handle:'error'},
			        {type:'setTrialAttr', setter:{score:0}},           // errore = 0
			        {type:'log'},                                      // registra il trial
			        {type:'setInput', input:{handle:'end', on:'timeout', duration:piCurrent.ITIDuration}}  // passa al trial successivo
			    ]
			},

        // correct response
        {
            conditions: [{type:'inputEqualsTrial', property:'corResp'}],
            actions: [
                {type:'removeInput', handle:['left','right']},
                {type:'hideStim', handle:'All'},
				{type:'setTrialAttr', setter:{score:1}}, // correct = 1}.
                {type:'log'},
                {type:'setInput', input:{handle:'end', on:'timeout', duration:piCurrent.ITIDuration}}
            ]
        },

        // ⏱ timeout without response = mistake
        {
            conditions: [{type:'inputEquals', value:'timeout'}],
            actions: [
                {type:'showStim', handle:'error'},
                {type:'setTrialAttr', setter:{score:2}},
                {type:'log'},
                {type:'setInput', input:{handle:'end', on:'timeout', duration:piCurrent.ITIDuration}}
            ]
        },

        // end trial
        {
            conditions: [{type:'inputEquals', value:'end'}],
            actions: [{type:'endTrial'}]
        },

        // skip block 1
        {
            conditions: [{type:'inputEquals', value:'skip1'}],
            actions: [
                {type:'setInput', input:{handle:'skip2', on:'enter'}}
            ]
        },

        // skip block 2
        {
            conditions: [{type:'inputEquals', value:'skip2'}],
            actions: [
                {type:'goto', destination: 'nextWhere', properties: {blockStart:true}},
                {type:'endTrial'}
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
		//helper function for getting the instructions HTML.
		function getInstHTML(params)
		{
			var instHTML = '';
			if (params.isPractice)
			{
				instHTML = getInstFromTemplate(piCurrent.instTemplatePractice, params.blockNum, params.nBlocks);
			}
			else if (params.categorySide == 'rightCat')
			{
				instHTML = getInstFromTemplate(piCurrent.instTemplateCategoryRight, params.blockNum, params.nBlocks);
			}
			else if (params.categorySide == 'leftCat')
			{
				instHTML = getInstFromTemplate(piCurrent.instTemplateCategoryLeft, params.blockNum, params.nBlocks);
			}
			return (instHTML);
		}
		
		//This is the tricky part. We will create the trial sequence with js code, for flexibility.
		var trialSequence = [];
		
		////Set the block order
	
			var firstCatSide = 'leftCat';
			if (piCurrent.blockOrder == 'startRight')
			{
			    firstCatSide = 'rightCat';
			}
			else if (piCurrent.blockOrder == 'random')
			{
			    firstCatSide = (Math.random() < 0.5) ? 'rightCat' : 'leftCat';
			}
			
			// Definizione della condizione iniziale secondo la tua logica
			// cat + attributo1 = compatibile, cat + attributo2 = incompatibile
			piCurrent.startCondition = (firstCatSide === 'leftCat')
			    ? 'compatibile'
			    : 'incompatibile';
		
		
		var catSide = '';
		for (var iBlock = 1; iBlock <= piCurrent.trialsByBlock.length; iBlock++)
		{//For each block

			var isPrac = false;
			var currentCondition = '';
			var blockLayout;
			if (piCurrent.trialsByBlock[iBlock-1].categoryTrials === 0)
			{//There are no category trials, so this is a practice block because.
				isPrac = true;
			}
			else if (catSide != 'rightCat' && catSide != 'leftCat' )
			{//This is not practice, and we should not switch sides, but the category side has has never been set.
				catSide = firstCatSide;
			}
			else if (piCurrent.switchSideBlock == iBlock  //Switch category once, on this block
			|| piCurrent.switchSideBlock <= 0 //Switch layout every block
			)
			{//Switch layout
				if (catSide == 'rightCat')
				{
					catSide = 'leftCat';
				}
				else if (catSide == 'leftCat')
				{
					catSide = 'rightCat';
				}
			}

			//According to the catSide
			if (isPrac)
			{
				blockLayout = pracLayout;
				currentCondition = attribute1 + ',' + attribute2;
			}
			else if (catSide == 'leftCat')
			{
				blockLayout =  leftLayout;
				singleAttribute = 'rightAtt2';
				catAttribute = 'leftAtt1';
				currentCondition = category + '/' + attribute1 + ',' + attribute2;
			}
			else if (catSide == 'rightCat')
			{
				blockLayout =  rightLayout;
				singleAttribute = 'leftAtt1';
				catAttribute = 'rightAtt2';
				currentCondition = attribute1 + ',' + attribute2 + '/' + category;
			}

			if (iBlock === 2)
			{//Set the block2Condition variable. That is our block order condition.
				block2Condition = currentCondition;
			}
			//Which is the single attribute? The one that is on the other side of the category.
			var singleAttribute = (catSide == 'rightCat') ? 'leftAtt1' : 'rightAtt2';
			//And the category's attribute? The other side, of course.
			var catAttribute = (singleAttribute == 'leftAtt1') ? 'rightAtt2' : 'leftAtt1';
		
			//Set the instructions html.
			var instHTML = piCurrent.trialsByBlock[iBlock-1].instHTML; 
			//Users can set the instHTML of each block, or use the instructions templates.
			if (instHTML === '') 
			{//Did not use the instHTML of each block, so let's use the instructions templates.
				instHTML = getInstHTML({
					blockNum : iBlock, 
					nBlocks : piCurrent.trialsByBlock.length, 
					isPractice : isPrac, categorySide : catSide
				});
			}
			//Add the block's instructions sequence
			trialSequence.push(
				{
					inherit : 'instructions', 
					data: {blockStart:true},
					layout : blockLayout, 
					stimuli : [
						{ 
							inherit : 'instructions', 
							media : {html : instHTML}
						},
						{
							data : {handle:'dummy', alias:'dummy'},
							media : {word:' '}, 
							location : {top:1}
						}
					]
				}
			);
			
			//We separate each block to mini blocks to reduce repetition of categories and responses.
			for (var iMini = 1; iMini <= piCurrent.trialsByBlock[iBlock-1].miniBlocks; iMini++)
			{//For each mini block
				var mixer = 
				{//This mixer will randomize the trials of all the three groups.
					mixer : 'random', 
					data : 
					[
						{//The single attribute trials
							mixer : 'repeat', 
							times : piCurrent.trialsByBlock[iBlock-1].singleAttTrials,
							data : 
							[{
								inherit : singleAttribute, 
								data : {condition : currentCondition, block : iBlock}, 
								layout : blockLayout.concat(reminderStimulus)
							}]
						}, 
						{//The key-shared attribute trials
							mixer : 'repeat', 
							times : piCurrent.trialsByBlock[iBlock-1].sharedAttTrials,
							data : 
							[{
								inherit : catAttribute, 
								data : {condition : currentCondition, block : iBlock}, 
								layout : blockLayout.concat(reminderStimulus)
							}]
						} 
					]
				};
				if (!isPrac) //If it is not a practice block, then
				{//Add the category trials to mixer's data
					mixer.data.push(
						{//The key-shared attribute trials
							mixer : 'repeat', 
							times : piCurrent.trialsByBlock[iBlock-1].categoryTrials,
							data : 
							[{
								inherit : catSide, 
								data : {condition : currentCondition, block : iBlock}, 
								layout : blockLayout.concat(reminderStimulus)
							}]
						}
					);
				}
				trialSequence.push(mixer);
			}
		}
		//Add the final goodbye trial.
		trialSequence.push({
			inherit : 'instructions', 
			data: {blockStart:true},
			layout : [{media:{word:''}}], 
			stimuli : [
				{ 
					inherit : 'instructions', 
					css : {color:piCurrent.fontColor}, 
					media:{html:'<div><p style="font-size:28px"><color="#000000">' + 
					piCurrent.finalText + '</p></div>'}
				},
				{
					data : {handle:'dummy', alias:'dummy'},
					media : {word:' '}, 
					location : {top:1}
				}			
			]
		});
		//Now add the trials sequence to the API.
		API.addSequence(trialSequence);
		
		/**
		Compute the Feedback.
		**/
		
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
			postSettings : {score:"score",msg:"feedback",url:"/implicit/scorer"}
		});

		//Helper function to set the feedback messages.
		function getFBFromTemplate(inText)
		{
			var retText = inText.replace(/attribute1/g, attribute1);
			retText = retText.replace(/attribute2/g, attribute2);
			retText = retText.replace(/thecategory/g, category);
			return (retText);
		}
		//Set the feedback messages.
		var messageDef = [
				{ cut:'-0.65', message : getFBFromTemplate(piCurrent.fb_strongAssociationWithAttribute1) },
				{ cut:'-0.35', message : getFBFromTemplate(piCurrent.fb_moderateAssociationWithAttribute1) },
				{ cut:'-0.15', message : getFBFromTemplate(piCurrent.fb_weakAssociationWithAttribute1) },
				{ cut:'0.15', message : getFBFromTemplate(piCurrent.fb_neutralAssociation) },
				{ cut:'0.35', message : getFBFromTemplate(piCurrent.fb_weakAssociationWithAttribute2) },
				{ cut:'0.65', message : getFBFromTemplate(piCurrent.fb_moderateAssociationWithAttribute2) },
				{ cut:'5', message : getFBFromTemplate(piCurrent.fb_strongAssociationWithAttribute2) }
		];
		var scoreMessageObject = { MessageDef : messageDef };
		if (piCurrent.manyErrors !== '')
		{
			scoreMessageObject.manyErrors = piCurrent.manyErrors;
		}
		if (piCurrent.tooFast !== '')
		{
			scoreMessageObject.tooFast = piCurrent.tooFast;
		}
		if (piCurrent.notEnough !== '')
		{
			scoreMessageObject.notEnough = piCurrent.notEnough;
		}
		//Set messages to the scorer.
		scorer.addSettings('message',scoreMessageObject);

		//What to do at the end of the task.
		API.addSettings('hooks',{
			endTask: function(){
				//Compute score
				var DScoreObj = scorer.computeD();
				//Save for the task's session.
				piCurrent.feedback = DScoreObj.FBMsg;
				piCurrent.d = DScoreObj.DScore;
				//Save to server
				//API.save({block2Condition:block2Condition, feedback:DScoreObj.FBMsg, d: DScoreObj.DScore});
				window.minnoJS.onEnd();

			}
		});

		return API.script;
	}
	
	return stiatExtension;
});
