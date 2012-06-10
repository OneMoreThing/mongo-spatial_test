var case_test = function(){
	
	this.setUp = function(){
		db.spat_autotests.drop();
		this.world = new Field(5000, 5000, 10000, 10000);
		/*
		 * test points:
		 *  _____
		 * |  x  |
		 * | xxx |
		 * |  x  |
		 *  -----
		 * */
		this.test_points = [{
								'x': this.world.center_x + this.world.width_x / 2 - 1,
								'y': this.world.center_y 
							},
							{
								'x': this.world.center_x,
								'y': this.world.center_y
							},
							{
								'x': this.world.center_x - this.world.width_x / 2 + 1,
								'y': this.world.center_y
							},
							{
								'x': this.world.center_x,
								'y': this.world.center_y + this.world.width_y / 2 - 1
							},
							{
								'x': this.world.center_x,
								'y': this.world.center_y - this.world.width_y / 2 + 1
							}
		                   ];
	};
	
	this.do_test_test = function(){
		this.setUp();
		var uni_gen = new UniformDataGenerator(this.world, 'spat_autotests');
		uni_gen.generate_data(10000);
		db['spat_autotests'].ensureIndex({ loc: "2d"}, {min: 0, max: 10000, bits: 26});
		var near_case = new NearCase(500, this.world, this.test_points, 'spat_autotests');
		ret = near_case.do_test();
		assert(ret == true);
		print('OK - near_test');
	};
	
	this.do_test_test();
	
	
};

new case_test();