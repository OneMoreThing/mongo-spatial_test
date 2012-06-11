
db.setProfilingLevel(2);

var config = function(){
	return {
		'FIELD_EDGE': 10000,
		'EXTENT': 768,
		'INDEX_BITS_LIST': function(){
				var index_bits_list = [];
				for(var i = 0; i < 32; i++){
					index_bits_list.push(i);
				}
				return index_bits_list;
			}(),
		'CARDINALITIES_LIST': [	{'cardinality': 1000, 'collection': 'spat_test_1k'},
	                            {'cardinality': 10000, 'collection': 'spat_test_10k'},
	                            {'cardinality': 100000, 'collection': 'spat_test_100k'},
	                            {'cardinality': 1000000, 'collection': 'spat_test_1kk'}
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