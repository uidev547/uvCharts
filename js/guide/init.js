$(function () {
	
	var tut1_graphdef = {
	    categories : ['uvCharts'],
	    dataset : {
	        'uvCharts' : [
	            { name : '2009', value : 32 },
	            { name : '2010', value : 60 },
	            { name : '2011', value : 97 },
	            { name : '2012', value : 560 },
	            { name : '2013', value : 999 }
	        ]
	    }
	};

	var tut1_chart = uv.chart('Bar', tut1_graphdef);
	
	var tut3_chart = uv.chart('Bar', tut1_graphdef, {
		graph : {
			palette: 'Lemon'
		},
		
		meta : {
			caption : 'Usage of product over years',
			subcaption : 'among Imaginea products'
		}
	});
	
	var tut2_graphdef = {
	    categories : ['uvCharts', 'matisse', 'bot-bot', 'SocialByWay'],
	    dataset : {
	        'uvCharts' : [
	            { name : '2009', value : 32 },
	            { name : '2010', value : 60 },
	            { name : '2011', value : 97 },
	            { name : '2012', value : 560 },
	            { name : '2013', value : 999 }
	        ],
	
	        'matisse' : [
	            { name : '2009', value : 58 },
	            { name : '2010', value : 75 },
	            { name : '2011', value : 90 },
	            { name : '2012', value : 740 },
	            { name : '2013', value : 890 }      
	        ],
	
	        'bot-bot' : [
	            { name : '2009', value : 43 },
	            { name : '2010', value : 88 },
	            { name : '2011', value : 100 },
	            { name : '2012', value : 420 },
	            { name : '2013', value : 769 }  
	        ],
	
	        'SocialByWay' : [
	            { name : '2009', value : 88 },
	            { name : '2010', value : 120 },
	            { name : '2011', value : 157 },
	            { name : '2012', value : 450 },
	            { name : '2013', value : 1024 } 
	        ],
	
	        'WaveMaker' : [
	            { name : '2009', value : 32 },
	            { name : '2010', value : 60 },
	            { name : '2011', value : 97 },
	            { name : '2012', value : 560 },
	            { name : '2013', value : 999 }  
	        ]
	    }
	};
	
	var tut2_chart = uv.chart('Bar', tut2_graphdef);
});