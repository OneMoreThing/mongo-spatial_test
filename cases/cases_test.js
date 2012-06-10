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
		this.test_points_bar = 500;
		this.test_points = [{
								'x': this.world.center_x + this.world.width_x / 2 - this.test_points_bar,
								'y': this.world.center_y 
							},
							{
								'x': this.world.center_x,
								'y': this.world.center_y
							},
							{
								'x': this.world.center_x - this.world.width_x / 2 + this.test_points_bar,
								'y': this.world.center_y
							},
							{
								'x': this.world.center_x,
								'y': this.world.center_y + this.world.width_y / 2 - this.test_points_bar
							},
							{
								'x': this.world.center_x,
								'y': this.world.center_y - this.world.width_y / 2 + this.test_points_bar
							}
		                   ];
	};
	
	this.do_test_test = function(case_class, label){
		this.setUp();
		var uni_gen = new UniformDataGenerator(this.world, 'spat_autotests');
		uni_gen.generate_data(10000);
		db['spat_autotests'].ensureIndex({ loc: "2d"}, {min: 0, max: 10000, bits: 26});
		var near_case = new case_class(this.test_points_bar, this.world, this.test_points, 'spat_autotests');
		ret = near_case.do_test();
		assert(ret == true);
		print('OK - near_test ' + label);
	};
	
	this.do_test_near = function(){
		this.do_test_test(NearCase, 'near');
	};
	
	this.do_test_within_box = function(){
		this.do_test_test(WithinRectCase, 'within box');
	};
	
	
	this.do_test_near();
	this.do_test_within_box();
	
};

new case_test();