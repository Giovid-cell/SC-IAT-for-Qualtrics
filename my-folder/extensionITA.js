//

define(['pipAPI','pipScorer','underscore'], function(APIConstructor, Scorer, _) {

    function stiatExtension(options) {
        var API = new APIConstructor();
        var scorer = new Scorer();
        var piCurrent = API.getCurrent();

        var stiatObj = {
            // Canvas settings
            canvas: {
                maxWidth: 725,
                proportions: 0.7,
                background: '#ffffff',
                borderWidth: 5,
                canvasBackground: '#ffffff',
                borderColor: 'lightblue'
            },
            
            // Category settings
            category: {
                name: 'Pessoa Racializada',
                title: {
                    media: {word: 'Pessoa Racializada'},
                    css: {color:'#31b404','font-size':'2em'},
                    height: 4
                },
                media: [
                    {image: 'b1.jpg'}, 
                    {image: 'b2.jpg'},
                    {image: 'b3.jpg'},
                    {image: 'b4.jpg'},
                    {image: 'b5.jpg'},
                    {image: 'b6.jpg'}
                ],
                css: {color:'#31b404','font-size':'2em'}
            },
            
            // Attribute 1
            attribute1: {
                name: 'Evitamento',
                title: {
                    media: {word: 'Avoidance'},
                    css: {color:'#31b404','font-size':'2em'},
                    height: 4
                },
                media: [
                    {word: 'Evito'},
                    {word: 'Fujo'},
                    {word: 'Afasto-me'},
                    {word: 'Desvio-me'},
                    {word: 'Rejeito'},
                    {word: 'Recuo'}
                ],
                css: {color:'#31b404','font-size':'2em'}
            },
            
            // Attribute 2
            attribute2: {
                name: 'Aproximação',
                title: {
                    media: {word: 'Approach'},
                    css: {color:'#31b404','font-size':'2em'},
                    height: 4
                },
                media: [
                    {word: 'Aproximo-me'},
                    {word: 'Chego-me'},
                    {word: 'Aproximação'},
                    {word: 'Aproximar-se'},
                    {word: 'Tocar'},
                    {word: 'Aconchegar'}
                ],
                css: {color:'#31b404','font-size':'2em'}
            },
            
            // Trials configuration
            trialsByBlock: [
                { 
                    instHTML: '', 
                    block: 2, 
                    miniBlocks: 2, 
                    singleAttTrials: 10, 
                    sharedAttTrials: 7, 
                    categoryTrials: 7
                },
                { 
                    instHTML: '', 
                    block: 3, 
                    miniBlocks: 2, 
                    singleAttTrials: 10, 
                    sharedAttTrials: 7, 
                    categoryTrials: 7
                },
                { 
                    instHTML: '', 
                    block: 4, 
                    miniBlocks: 2, 
                    singleAttTrials: 10, 
                    sharedAttTrials: 7, 
                    categoryTrials: 7
                },
                { 
                    instHTML: '', 
                    block: 5, 
                    miniBlocks: 2, 
                    singleAttTrials: 10, 
                    sharedAttTrials: 7, 
                    categoryTrials: 7
                }
            ],
            
            // Block settings
            blockOrder: 'random',
            switchSideBlock: 4,
            
            // Base URL
            base_url: {
                image: '/implicit/user/yba/pipexample/stiat/images/'
            },
            
            // Timing settings
            ITIDuration: 250,
            
            // Text and styling
            fontColor: '#000000',
            leftKeyText: 'Pressione a tecla "E" para',
            rightKeyText: 'Pressione a tecla "I" para',
            keysCss: {'font-size':'0.8em', 'font-family':'courier', color:'#000000'},
            orText: 'Ou',
            orCss: {'font-size':'1.8em', color:'#000000'},
            
            // Feedback messages
            remindErrorText: '<p align="center" style="font-size:"0.6em"; font-family:arial">' +
                'Se cometer um erro, um <font color="#ff0000"><b>X</b></font> vermelho irá aparecer. ' +
                'Carregue na outra tecla para continuar.<p/>',
            
            finalText: 'Concluiu esta tarefa<br/><br/>Pressione a BARRA DE ESPAÇO para continuar.',
            
            // Feedback configuration
            timeoutMessage: 'Por favor responda mais rápido!',
            timeoutMessageDuration: 500,
            correctFeedback: 'O',
            correctFeedbackDuration: 500,
            
            // Instruction templates
            instTemplatePractice: '<div><p align="center" style="font-size:20px; font-family:arial">' +
                '<font color="#000000"><u>blockNum parte de nBlocks</u><br/><br/></p>' + 
                '<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
                'Coloque os seus dedos indicadore esquerdo nas teclas <b>E</b> para itens que pertencem à categoria ' + 
                '<font color="#31b404">attribute1</font>.<br/>' + 
                'Coloque os seus dedos indicadore dereito nas teclas <b>I</b> para itens que pertencem à categoria ' + 
                '<font color="#31b404">attribute2</font>.<br/>' + 
                'Durante a tarefa aparecerão palavras e imagens no ecrã.<br/><br/>' + 
                'Se cometer um erro, um <font color="#ff0000"><b>X</b></font> vermelho irá aparecer. ' + 
                'Carregue na outra tecla para continuar.<br/><br/>' + 
                '<p align="center">Quando estiver pronto, por favor, pressione a <b>barra de espaços </b> para começar.</font></p></div>',
            
            instTemplateCategoryRight: '<div><p align="center" style="font-size:20px; font-family:arial">' +
                '<font color="#000000"><u>blockNum parte de nBlocks </u><br/><br/></p>' + 
                '<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
                'Coloque os seus dedos indicadore esquerdo nas teclas <b>E</b> para itens que pertencem à categoria ' + 
                '<font color="#31b404">attribute1</font>.<br/>' + 
                'Coloque os seus dedos indicadore dereito nas teclas <b>I</b> para itens que pertencem à categoria ' + 
                '<font color="#31b404">attribute2</font> ' +
                'e para itens que pertencem à categoria <font color="#31b404">thecategory</font>.<br/>' + 
                'Durante a tarefa aparecerão palavras e imagens no ecrã.<br/><br/>' + 
                'Se cometer um erro, um <font color="#ff0000"><b>X</b></font> vermelho irá aparecer. ' + 
                'Carregue na outra tecla para continuar.<br/><br/>' + 
                '<p align="center">Quando estiver pronto, por favor, pressione a <b>barra de espaços </b> para começar.</font></p></div>',
            
            instTemplateCategoryLeft: '<div><p align="center" style="font-size:20px; font-family:arial">' +
                '<font color="#000000"><u>blockNum parte de nBlocks </u><br/><br/></p>' + 
                '<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
                'Coloque os seus dedos indicadore esquerdo nas teclas <b>E</b> para itens que pertencem à categoria ' + 
                '<font color="#31b404">attribute1</font> ' +
                'e para itens que pertencem à categoria <font color="#31b404">thecategory</font>.<br/>' + 
                'Coloque os seus dedos indicadore dereito nas teclas <b>I</b> para itens que pertencem à categoria ' + 
                '<font color="#31b404">attribute2</font>.<br/>' + 
                'Durante a tarefa aparecerão palavras e imagens no ecrã.<br/><br/>' + 
                'Se cometer um erro, um <font color="#ff0000"><b>X</b></font> vermelho irá aparecer. ' + 
                'Carregue na outra tecla para continuar.<br/><br/>' + 
                '<p align="center">Quando estiver pronto, por favor, pressione a <b>barra de espaços </b> para começar.</font></p></div>',
            
            // Feedback messages
            fb_strongAssociationWithAttribute2: 'Your data suggest a strong positive automatic attitude toward thecategory.',
            fb_moderateAssociationWithAttribute2: 'Your data suggest a moderate positive automatic attitude toward thecategory.',
            fb_weakAssociationWithAttribute2: 'Your data suggest a weak positive automatic attitude toward thecategory.',
            fb_neutralAssociation: 'Your data suggest a neutral automatic attitude toward thecategory.',
            fb_weakAssociationWithAttribute1: 'Your data suggest a weak negative automatic attitude toward thecategory.',
            fb_moderateAssociationWithAttribute1: 'Your data suggest a moderate negative automatic attitude toward thecategory.',
            fb_strongAssociationWithAttribute1: 'Your data suggest a strong negative automatic attitude toward thecategory.',
            
            // Error messages
            manyErrors: '',
            tooFast: '',
            notEnough: ''
        };

        // Merge settings
        _.extend(piCurrent, _.defaults(options, stiatObj));

        // Add settings for Qualtrics
        API.addSettings('onEnd', window.minnoJS.onEnd);
        API.addSettings('canvas', piCurrent.canvas);
        API.addSettings('base_url', piCurrent.base_url);

        // Define layouts
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
        
        var pracLayout = [
            {location:{left:6,top:1},media:{word:piCurrent.leftKeyText}, css:piCurrent.keysCss},
            {location:{right:6,top:1},media:{word:piCurrent.rightKeyText}, css:piCurrent.keysCss},
            {location:{left:6,top:4},media:piCurrent.attribute1.title.media, css:piCurrent.attribute1.title.css},
            {location:{right:6,top:4},media:piCurrent.attribute2.title.media, css:piCurrent.attribute2.title.css}
        ];
        
        var reminderStimulus = {
            location:{bottom:1}, 
            css: {color:piCurrent.fontColor,'font-size':'1em'}, 
            media: {html: piCurrent.remindErrorText}
        };

        // Add stimulus sets with fixed feedback elements
        API.addStimulusSets({
            Default: [
                {css:{color:'white','font-size':'2em'}}
            ],

            instructions: [
                {css:{'font-size':'1.4em',color:'black', lineHeight:1.2}, nolog:true, location:{bottom:1}}
            ],

            attribute1: [{
                data: {alias:piCurrent.attribute1.name, handle:'targetStim'}, 
                inherit: 'Default', 
                css:piCurrent.attribute1.css,
                media: {inherit:{type:'exRandom',set:'attribute1'}}
            }],
            
            attribute2: [{
                data: {alias:piCurrent.attribute2.name, handle:'targetStim'}, 
                inherit: 'Default', 
                css:piCurrent.attribute2.css,
                media: {inherit:{type:'exRandom',set:'attribute2'}}
            }],
            
            category: [{
                data: {alias:piCurrent.category.name, handle:'targetStim'}, 
                inherit: 'Default', 
                css:piCurrent.category.css,
                media: {inherit:{type:'exRandom',set:'category'}}
            }],
            
            // Error feedback (red X)
            error: [{
                data: {handle: 'error'},
                location: {top: 70},
                css: {color:'red', 'font-size':'4em', 'z-index': 9999},
                media: {word: 'X'},
                nolog: true
            }],
            
            // Timeout message
            timeoutMessage: [{
                data: {handle: 'timeoutMessage'},
                css: {color: 'black', 'font-size': '1.5em', 'z-index': 9999},
                media: {html: piCurrent.timeoutMessage},
                location: {bottom: 20},
                nolog: true
            }],
            
            // Correct feedback (green O)
            correctFeedback: [{
                data: {handle: 'correctFeedback'},
                css: {color: '#00FF00', 'font-size': '4em', 'z-index': 9999},
                media: {word: piCurrent.correctFeedback},
                location: {top: 60},
                nolog: true
            }],
            
            dummyForLog: [{
                data: {name:'dummyForLog', alias:'dummyForLog'}, 
                location: {left:99}, 
                media: {word:' '}
            }]
        });

        // Add media sets
        API.addMediaSets({
            attribute1: piCurrent.attribute1.media,
            attribute2: piCurrent.attribute2.media,
            category: piCurrent.category.media
        });

        // Create default trial with fixed feedback interactions
        API.addTrialSets('sort', {
            data: {score: 0, parcel: 'first'},
            input: [
                {handle: 'skip1', on: 'keypressed', key: 27},
                {handle: 'left', on: 'keypressed', key: 'e'},
                {handle: 'right', on: 'keypressed', key: 'i'},
                {handle: 'timeout', on: 'timeout', duration: 1500}
            ],
            interactions: [
                // Begin trial
                {
                    conditions: [{type: 'begin'}],
                    actions: [{type: 'showStim', handle: 'targetStim'}]
                },

                // Error response
                {
                    conditions: [
                        {type: 'inputEqualsTrial', property: 'corResp', negate: true},
                        {type: 'inputEquals', value: ['right', 'left']}
                    ],
                    actions: [
                        {type: 'showStim', handle: 'error'},
                        {type: 'setTrialAttr', setter: {score: 1}},
                        {type: 'log'},
                        {type: 'setInput', input: {handle: 'end', on: 'timeout', duration: piCurrent.ITIDuration}}
                    ]
                },

                // Correct response
                {
                    conditions: [{type: 'inputEqualsTrial', property: 'corResp'}],
                    actions: [
                        {type: 'removeInput', handle: ['left', 'right']},
                        {type: 'hideStim', handle: 'All'},
                        {type: 'showStim', handle: 'correctFeedback'},
                        {type: 'log'},
                        {type: 'setInput', input: {handle: 'end', on: 'timeout', duration: piCurrent.correctFeedbackDuration}}
                    ]
                },

                // Timeout
                {
                    conditions: [{type: 'inputEquals', value: 'timeout'}],
                    actions: [
                        {type: 'showStim', handle: 'error'},
                        {type: 'showStim', handle: 'timeoutMessage'},
                        {type: 'setTrialAttr', setter: {score: 1}},
                        {type: 'log'},
                        {type: 'setInput', input: {handle: 'end', on: 'timeout', duration: piCurrent.timeoutMessageDuration}}
                    ]
                },

                // End trial
                {
                    conditions: [{type: 'inputEquals', value: 'end'}],
                    actions: [
                        {type: 'hideStim', handle: 'All'},
                        {type: 'setInput', input: {handle: 'ITI', on: 'timeout', duration: piCurrent.ITIDuration}}
                    ]
                },
                
                // ITI period
                {
                    conditions: [{type: 'inputEquals', value: 'ITI'}],
                    actions: [{type: 'endTrial'}]
                },

                // Skip block 1
                {
                    conditions: [{type: 'inputEquals', value: 'skip1'}],
                    actions: [
                        {type: 'setInput', input: {handle: 'skip2', on: 'enter'}}
                    ]
                },

                // Skip block 2
                {
                    conditions: [{type: 'inputEquals', value: 'skip2'}],
                    actions: [
                        {type: 'goto', destination: 'nextWhere', properties: {blockStart: true}},
                        {type: 'endTrial'}
                    ]
                }
            ]
        });
      
			//These are templates for the instructions in the task. 
			//If you want more specific instructions for different blocks, 
			// use the instHTML variables above. 
			// The following variables in the instructions text will be replaced: 
			// blockNum, nBlocks, attribute1, attribute2, and thecategory.
			// Notice that this is HTML text.
			instTemplatePractice : '<div><p align="center" style="font-size:20px; font-family:arial">' +
				'<font color="#000000"><u>blockNum parte de nBlocks</u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Coloque os seus dedos indicadore esquerdo nas teclas <b>E</b> para itens que pertencem à categoria ' + 
				'<font color="#31b404">attribute1</font>.<br/>' + 
				'Coloque os seus dedos indicadore dereito nas teclas <b>I</b> para itens que pertencem à categoria ' + 
				'<font color="#31b404">attribute2</font>.<br/>' + 
				'Durante a tarefa aparecerão palavras e imagens no ecrã.<br/><br/>' + 
				'Se cometer um erro, um <font color="#ff0000"><b>X</b></font> vermelho irá aparecer. ' + 
				'Carregue na outra tecla para continuar.<br/><br/>' + 
				'<p align="center">Quando estiver pronto, por favor, pressione a <b>barra de espaços </b> para começar.</font></p></div>', 
			instTemplateCategoryRight : '<div><p align="center" style="font-size:20px; font-family:arial">' +
				'<font color="#000000"><u>blockNum parte de nBlocks </u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Coloque os seus dedos indicadore esquerdo nas teclas <b>E</b> para itens que pertencem à categoria ' + 
				'<font color="#31b404">attribute1</font>.<br/>' + 
				'Coloque os seus dedos indicadore dereito nas teclas <b>I</b> para itens que pertencem à categoria ' + 
				'<font color="#31b404">attribute2</font> ' +
				'e para itens que pertencem à categoria <font color="#31b404">thecategory</font>.<br/>' + 
				'Durante a tarefa aparecerão palavras e imagens no ecrã.<br/><br/>' + 
				'Se cometer um erro, um <font color="#ff0000"><b>X</b></font> vermelho irá aparecer. ' + 
				'Carregue na outra tecla para continuar.<br/><br/>' + 
				'<p align="center">Quando estiver pronto, por favor, pressione a <b>barra de espaços </b> para começar.</font></p></div>', 
			instTemplateCategoryLeft : '<div><p align="center" style="font-size:20px; font-family:arial">' +
				'<font color="#000000"><u>blockNum parte de nBlocks </u><br/><br/></p>' + 
				'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
				'Coloque os seus dedos indicadore esquerdo nas teclas <b>E</b> para itens que pertencem à categoria ' + 
				'<font color="#31b404">attribute1</font> ' +
				'e para itens que pertencem à categoria <font color="#31b404">thecategory</font>.<br/>' + 
				'Coloque os seus dedos indicadore dereito nas teclas <b>I</b> para itens que pertencem à categoria ' + 
				'<font color="#31b404">attribute2</font>.<br/>' + 
				'Durante a tarefa aparecerão palavras e imagens no ecrã.<br/><br/>' + 
				'Se cometer um erro, um <font color="#ff0000"><b>X</b></font> vermelho irá aparecer. ' + 
				'Carregue na outra tecla para continuar.<br/><br/>' + 
				'<p align="center">Quando estiver pronto, por favor, pressione a <b>barra de espaços </b> para começar.</font></p></div>', 
			
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
            // gather logs in array
            onRow: function(logName, log, settings, ctx){
                if (!ctx.logs) ctx.logs = [];
                ctx.logs.push(log);
            },
            // onEnd trigger save (by returning a value)
            onEnd: function(name, settings, ctx){
                return ctx.logs;
            },
            // Transform logs into a string
            // we save as CSV because qualtrics limits to 20K characters and this is more efficient.
            serialize: function (name, logs) {
                var headers = ['block', 'trial', 'cond', 'type', 'cat',  'stim', 'resp', 'err', 'rt', 'd', 'fb', 'bOrd'];
                //console.log(logs);
                var myLogs = [];
                var iLog;
                for (iLog = 0; iLog < logs.length; iLog++)
                {
                    if(!hasProperties(logs[iLog], ['trial_id', 'name', 'responseHandle', 'stimuli', 'media', 'latency'])){
                        //console.log('---MISSING PROPERTIY---');
                        //console.log(logs[iLog]);
                        //console.log('---MISSING PROPERTIY---');
                    }
                    else if(!hasProperties(logs[iLog].data, ['block', 'condition', 'score']))
                    {
                        //console.log('---MISSING data PROPERTIY---');
                        //console.log(logs[iLog].data);
                        //console.log('---MISSING data PROPERTIY---');
                    }
                    else
                    {
                        myLogs.push(logs[iLog]);
                    }
                }
                var content = myLogs.map(function (log) { 
                    return [
                        log.data.block, //'block'
                        log.trial_id, //'trial'
                        log.data.condition, //'cond'
                        //log.data, //'comp'
                        log.name, //'type'
                        log.stimuli[0], //'cat'
                        log.media[0], //'stim'
                        log.responseHandle, //'resp'
                        log.data.score, //'err'
                        log.latency, //'rt'
                        '', //'d'
                        '', //'fb'
                        '' //'bOrd'
                        ]; });
                //console.log('mapped');
                //Add a line with the feedback, score and block-order condition
                content.push([
                            9, //'block'
                            999, //'trial'
                            'end', //'cond'
                            //'', //'comp'
                            '', //'type'
                            '', //'cat'
                            '', //'stim'
                            '', //'resp'
                            '', //'err'
                            '', //'rt'
                            piCurrent.d, //'d'
                            piCurrent.feedback, //'fb'
                            block2Condition //'bOrd'
                        ]);
                //console.log(content);
                        
                content.unshift(headers);
                return toCsv(content);

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
                {type:'setTrialAttr', setter:{score:1}},
                {type:'log'},
                {type:'setInput', input:{handle:'end', on:'timeout', duration:piCurrent.ITIDuration}}
            ]
        },

        // correct response
        {
            conditions: [{type:'inputEqualsTrial', property:'corResp'}],
            actions: [
                {type:'removeInput', handle:['left','right']},
                {type:'hideStim', handle:'All'},
                {type:'showStim', handle:'correctFeedback'}, // Show green "O"
                {type:'log'},
                {type:'setInput', input:{handle:'end', on:'timeout', duration:piCurrent.correctFeedbackDuration}}
            ]
        },

        // ⏱ timeout without response = mistake
        {
            conditions: [{type:'inputEquals', value:'timeout'}],
            actions: [
                {type:'showStim', handle:'error'},
                {type:'showStim', handle:'timeoutMessage'}, // Show timeout message
                {type:'setTrialAttr', setter:{score:1}},
                {type:'log'},
                {type:'setInput', input:{handle:'end', on:'timeout', duration:piCurrent.timeoutMessageDuration}}
            ]
        },

        // end trial (after feedback has been shown)
        {
            conditions: [{type:'inputEquals', value:'end'}],
            actions: [
                {type:'hideStim', handle:'All'},
                {type:'setInput', input:{handle:'ITI', on:'timeout', duration:piCurrent.ITIDuration}}
            ]
        },

        // ITI period
        {
            conditions: [{type:'inputEquals', value:'ITI'}],
            actions: [
                {type:'endTrial'}
            ]
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
			// Timeout message stimulus (MISSING - NEED TO ADD THIS)
			timeoutMessage: [{
				data: {handle: 'timeoutMessage'},
				css: {color: 'black', 'font-size': '1.5em'},
				media: {html: piCurrent.timeoutMessage},
				location: {bottom: 20},
				nolog: true
			}],
			dummyForLog : [{
				data:{name:'dummyForLog', alias:'dummyForLog'}, 
				location:{left:99}, media:{word:' '}
			}],
       // Correct feedback stimulus (green "O")
            correctFeedback: [{
                data: {handle: 'correctFeedback'},
                css: {color: '#00FF00', 'font-size': '4em'},
                media: {word: piCurrent.correctFeedback},
                location: {top: 70},
                nolog: true
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
