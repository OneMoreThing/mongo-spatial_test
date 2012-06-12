var create_data = function(data_generator_class, collection_name_prefix){
	collection_name_prefix = collection_name_prefix || '';
	var world = new Field(config['FIELD_EDGE'] / 2, config['FIELD_EDGE'] / 2, config['FIELD_EDGE'], config['FIELD_EDGE']);
	var index_bits_list = config['INDEX_BITS_LIST'];
	var cardinalities_list = config['CARDINALITIES_LIST'];
	
	cardinalities_list.forEach(function(cardinality){
		var collection = collection_name_prefix + cardinality.collection;
		var number_of_data_points = cardinality.cardinality;
		
		index_bits_list.forEach(function(bits_num){
			var indexed_collection = collection + '_bits_' + bits_num;
			var data_generator = new data_generator_class(world, indexed_collection);
			db[indexed_collection].drop();
			data_generator.generate_data(number_of_data_points);
			db[indexed_collection].dropIndex({'loc': '2d'});
			db[indexed_collection].ensureIndex({ 'loc': "2d"}, {min: 0, max: config['FIELD_EDGE'], bits: bits_num});
			print('collection: ', indexed_collection,' generated');
		});
		
	});
	
};

create_data(UniformDataGenerator);