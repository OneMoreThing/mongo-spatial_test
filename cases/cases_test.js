var case_test = function(){
	
	this.setUp = function(){
		//db.spat_autotests.drop();
		this.world = new Field(5000, 5000, 10000, 10000);
		/*
		 * test points:
		 *  _____
		 * |  x  |
		 * | xxx |
		 * |  x  |
		 *  -----
		 * */
		this.test_points_bar = 976;
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
//		var uni_gen = new UniformDataGenerator(this.world, 'spat_autotests');
//		uni_gen.generate_data(1000000);
//		db['spat_autotests'].ensureIndex({ loc: "2d"}, {min: 0, max: 10000, bits: 26});
	};
	
	this.do_test_test = function(case_class, label, extent){
		extent = extent || this.test_points_bar;
		
		var my_case = new case_class(extent, this.world, this.test_points, 'spat_autotests');
		ret = my_case.do_test();
		assert(ret != null);
		print('OK - test ' + label + ' in: '+ret.millis+'ms. and ' + ret.count + ' objects found ');
	};
	
	this.do_test_near = function(){
		this.do_test_test(NearCase, 'near');
	};
	
	this.do_test_within_box = function(){
		this.do_test_test(WithinRectCase, 'within box');
	};
	
	this.do_test_within_circle = function(){
		this.do_test_test(WithinCircleCase, 'within circle');
	};
	
	
	this.regular_polygon_test_square = function(){
		var eq = this.eq;
		rp = new RegularPolygon(4, {'x': 1, 'y': 1}, 2);
		var v_0 = eq(rp.vertices[0].x, 1) && eq(rp.vertices[0].y, 3);
		var v_1 = eq(rp.vertices[1].x, 3) && eq(rp.vertices[1].y, 1);
		var v_2 = eq(rp.vertices[2].x, 1) && eq(rp.vertices[2].y, -1);
		var v_3 = eq(rp.vertices[3].x, -1) && eq(rp.vertices[3].y, 1);
		assert(v_0 && v_1 && v_2 && v_3);
		print('OK - regular_polygon square test');
	};
	
	
	this.eq = function(a,b){
		return (Math.abs(a-b) < 0.0000001);
	};
	
	this.do_test_within_hexagon = function(){
		this.do_test_test(WithinHexagonCase, 'within Hexagon');
	};
	
	
	
	this.setUp();
	this.do_test_near();
	this.do_test_within_box();
	this.do_test_within_circle();
	this.regular_polygon_test_square();
	this.do_test_within_hexagon();
	
};

new case_test();