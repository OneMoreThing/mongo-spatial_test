var runner_test = function(){
	this.setUp = function(){
		
	};
	
	
	this.test_run_for_index_num_of_bits = function(){
		var runner = new Runner();
		runner.cardinalities_list = [	{'cardinality': 1000, 'collection': 'spat_autotests'},
		                            {'cardinality': 10000, 'collection': 'spat_autotests'}];
		var ret = runner.run_for_index_of_n_bits(5, 'spat_autotests', WithinRectCase);

		assert(typeof ret.millis != 'undefined');
		assert(typeof ret.count != 'undefined');
		assert(ret.millis > 0);
		assert(ret.count > 0);
		print("OK - run_for_index_of_n_bits");

	};
	
	this.test_run_for_cardinality = function(){
		var runner = new Runner();
		var cardinality = {'cardinality': 1000, 'collection': 'spat_autotests'};
		runner.index_bits_list = [3, 4, 5]
		var ret = runner.run_for_cardinality(cardinality, NearCase);
		assert(ret.length == 3);
		
		print("OK - run_for_cardinality");
	};
	
	
	
	this.test_run_for_case_class = function(){
		var runner = new Runner();
		runner.cardinalities_list = [	{'cardinality': 1000, 'collection': 'spat_autotests'},
		                            {'cardinality': 10000, 'collection': 'spat_autotests'}];
		runner.index_bits_list = [ 5,6,7 ];
		var ret = runner.run_for_case_class(WithinCircleCase);
		assert(ret.length == 2);
		print("OK - run_for_case_class");
	};
	
	this.test_run_for_index_num_of_bits();
	this.test_run_for_cardinality();
	this.test_run_for_case_class();
	

};

new runner_test();