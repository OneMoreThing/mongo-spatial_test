var Runner = function(){
	this.extent = config['EXTENT'];
	this.world = new Field(config['FIELD_EDGE'] / 2, config['FIELD_EDGE'] / 2, config['FIELD_EDGE'], config['FIELD_EDGE']);
	this.index_bits_list = config['INDEX_BITS_LIST'];
	this.test_points = config['TEST_POINTS'];
	this.cardinalities_list = config['CARDINALITIES_LIST'];
};

Runner.prototype.main = function(){
	var case_classes = [NearCase, WithinRectCase, WithinCircleCase, WithinHexagonCase];
	var _this = this;
	case_classes.forEach(function(case_class){
		var result = this.run_for_case_class(case_class);
		_this.print_case_test(result, typeof case_class)
	});
};

Runner.prototype.print_case_test = function(arr, label){
	print('************************* '+label);
	print('[');
	arr.forEach(function(row){
		var row_text = '[';
		row.forEach(function(elem){
			row_text += elem.millis +', ';
		});
		row_text += '],';
		print(row_text);
	});
	print(']');
};

Runner.prototype.run_for_case_class = function(case_class){
	var result = [];
	var _this = this;
	this.index_bits_list.forEach(function(bits_num){
		result.push(_this.run_for_index_of_n_bits(bits_num, case_class));
	});
	return result;
};
	
Runner.prototype.run_for_index_of_n_bits = function(bits_num, case_class){
	var result = [];
	var _this = this;
	this.cardinalities_list.forEach(function(cardinality){
		var collection = cardinality.collection;
		db[collection].dropIndex({loc: "2d"});
		db[collection].ensureIndex({ loc: "2d"}, {min: 0, max: config['FIELD_EDGE'], bits: bits_num});
		result.push(_this.run_for_cardinality(cardinality, case_class));
	});
	return result;
};
	
	
Runner.prototype.run_for_cardinality = function(cardinality, case_class){
	var collection = cardinality.collection;
	var run_case = new case_class(this.extent, this.world, this.test_points, collection);
	return run_case.do_test();
	
	
};



//var r = new Runner()