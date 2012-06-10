var uniform_test = function(){
	this.setUp = function(){
		db.spat_autotests.drop();
	};
	
	this.test_random = function(data_gen_class, label){
		var world = new Field(102, 102, 4, 4);
		var u = new data_gen_class(world,  'spat_autotests');
		
		for(var i = 0; i < 1000; i++){
			point = u.rand_point_in_range();
			assert(point.x >= 100 && point.y >= 100 && point.x <= 104 && point.y <= 104);
		}
		print('OK - test_random ' + label);
	};
	
	this.test_data = function(data_gen_class, label){
		
		var data_num = 1000;
		var field_edge = 10000;
		var world = new Field(field_edge/2, field_edge/2, field_edge, field_edge);
		
		var u = new data_gen_class(world, 'spat_autotests');
		u.generate_data(data_num);
		
		var count = db.spat_autotests.find().count();
		assert(count == data_num);
		
		first_record = db.spat_autotests.findOne();
		assert(first_record['name'], 'point0');
		assert(typeof first_record['loc'] != 'undefined');
		print('OK - test_data ' + label);
	};
	
	
	//****************** actual tests ******************
	this.test_uniform_random = function(){
		this.test_random(UniformDataGenerator, 'uniform');
	};
	
	this.test_uniform_data = function(){
		this.setUp();
		this.test_data(UniformDataGenerator, 'uniform');
	};
	
	this.test_normal_random = function(){
		this.test_random(NormalDataGenerator, 'normal');
	};
	
	this.test_normal_data = function(){
		this.setUp();
		this.test_data(NormalDataGenerator, 'normal');
	};
	
	this.test_uniform_random();
	this.test_uniform_data();
	this.test_normal_random();
	this.test_normal_data();
	
};

new uniform_test();

