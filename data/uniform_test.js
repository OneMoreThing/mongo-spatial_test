var uniform_test = function(){
	this.setUp = function(){
		db.spat_autotests.drop();
	};
	
	this.test_random = function(){
		this.setUp();
		var u = new UniformDataGenerator(100, 100, 103, 103, 'spat_autotests');
		
		for(var i = 0; i < 1000; i++){
			point = u.rand_point_in_range();
			assert(point.x >= 100 && point.y >= 100 && point.x <= 103 && point.y <= 103);
		}
		print('OK - test_random');
	}();
	
	this.test_data = function(){
		this.setUp();
		
		var data_num = 1000000;
		var field_edge = 10000;
		
		var u = new UniformDataGenerator(0, 0, field_edge, field_edge, 'spat_autotests');
		u.generate_uniform_data(data_num);
		
		var count = db.spat_autotests.find().count();
		assert(count == data_num);
		
		first_record = db.spat_autotests.findOne();
		assert(first_record['name'], 'point0');
		assert(typeof first_record['loc'] != 'undefined');
		print('OK - test_data');
	}();
}();

