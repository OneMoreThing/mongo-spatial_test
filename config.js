
db.setProfilingLevel(2);

var config = function(){
	return {
		'FIELD_EDGE': 10000,
		'EXTENT': 768,
		'INDEX_BITS_LIST': function(){
				var index_bits_list = [];
				for(var i = 1; i <= 10; i++){
					index_bits_list.push(i);
				}
				return index_bits_list;
			}(),
		'CARDINALITIES_LIST': [	
		                       	{'cardinality': 1000, 'collection': 'spat2_test_1k'},
		                       	{'cardinality': 5000, 'collection': 'spat2_test_5k'},
	                            {'cardinality': 10000, 'collection': 'spat2_test_10k'},
	                            {'cardinality': 25000, 'collection': 'spat2_test_25k'},
	                            {'cardinality': 50000, 'collection': 'spat2_test_50k'},
	                            {'cardinality': 75000, 'collection': 'spat2_test_75k'},
	                            {'cardinality': 100000, 'collection': 'spat2_test_100k'},
//	                            {'cardinality': 500000, 'collection': 'spat2_test_500k'},
	                            //{'cardinality': 1000000, 'collection': 'spat2_test_1kk'}
	                            ]
	};
}();

config['TEST_POINTS'] =  [
	            	    {
	            			'x': config['FIELD_EDGE'] - config['EXTENT'],
	            			'y': config['FIELD_EDGE'] / 2 
	            		},
	            		{
	            			'x': config['FIELD_EDGE'] / 2,
	            			'y': config['FIELD_EDGE'] / 2
	            		},
	            		{
	            			'x': config['EXTENT'],
	            			'y': config['FIELD_EDGE'] / 2
	            		},
	            		{
	            			'x': config['FIELD_EDGE'] / 2,
	            			'y': config['FIELD_EDGE']  - config['EXTENT']
	            		},
	            		{
	            			'x': config['FIELD_EDGE'] / 2,
	            			'y': config['EXTENT']
	            		}
	            	];