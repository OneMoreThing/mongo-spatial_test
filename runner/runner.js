var Runner = function(){
	this.extent = config['EXTENT'];
	this.world = new Field(config['FIELD_EDGE'] / 2, config['FIELD_EDGE'] / 2, config['FIELD_EDGE'], config['FIELD_EDGE']);
	this.index_bits_list = config['INDEX_BITS_LIST'];
	this.test_points = config['TEST_POINTS'];
	this.cardinalities_list = config['CARDINALITIES_LIST'];
	this.collection = '';
};

Runner.prototype.main = function(){
	var case_classes = [NearCase, WithinRectCase, WithinCircleCase, WithinHexagonCase];
	var _this = this;
	case_classes.forEach(function(case_class){
		var result = _this.run_for_case_class(case_class);
		_this.print_case_test(result, case_class._name);
	});
};

Runner.prototype.print_case_test = function(arr, label){
	print('************************* '+label);
//	print('[');
	arr.forEach(function(row){
		var row_text = '';
		row.forEach(function(elem){
			row_text += elem.millis +' ';
		});
		row_text += '';
		print(row_text);
	});
//	print(']');
	print();
	print();
};

Runner.prototype.run_for_case_class = function(case_class){
	var result = [];
	var _this = this;
	this.cardinalities_list.forEach(function(cardinality){
		result.push(_this.run_for_cardinality(cardinality, case_class));
	});
	return result;
};
	
Runner.prototype.run_for_cardinality = function(cardinality, case_class){
	var _this = this;
	var result = [];
	var collection = cardinality.collection;
	
	this.index_bits_list.forEach(function(bits_num){
		var ret = _this.run_for_index_of_n_bits(bits_num, collection, case_class)
		result.push(ret);
	});
	return result;
};

Runner.prototype.run_for_index_of_n_bits = function(bits_num, collection, case_class){
	var indexed_collection = collection + '_bits_' + bits_num;
	db[indexed_collection].dropIndex({loc: "2d"});
	db[indexed_collection].ensureIndex({ loc: "2d"}, {min: 0, max: config['FIELD_EDGE'], bits: bits_num});
	var run_case = new case_class(this.extent, this.world, this.test_points, indexed_collection);
	var ret = run_case.do_test();
	return ret;
};
	
	




//var r = new Runner()