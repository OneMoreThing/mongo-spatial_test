var near_test = function(){
	
	this.setUp = function(){
		db.spat_autotests.drop();
		this.world = new Field(5000, 5000, 5000, 5000);
		this.xa = 10;
	};
	
	this.do_test_test = function(){
		this.setUp();
		var uni_gen = new UniformDataGenerator(this.world, 'spat_autotests');
		uni_gen.generate_data(10000);
		var near_case = new NearCase(500, this.world, 'spat_autotests');
		near_case.do_test();
	};
	
	this.do_test_test();
	
	
};

new near_test();