var NearCase = function(extent, world_box, collection){
	this.init(extent, world_box, collection);
	
};

NearCase.prototype.init = function(extent, world_box, collection){
	this.extent = extent;
	this.collection = collection;
	this.world_box = world_box;
};



NearCase.prototype.do_test = function(){
	/*
	 * test points:
	 *  _____
	 * |  x  |
	 * | xxx |
	 * |  x  |
	 *  -----
	 * */
	var test_points = [{
							'x': this.world_box.center_x + this.world_box.width_x / 2,
							'y': this.world_box.center_y
						},
						{
							'x': this.world_box.center_x,
							'y': this.world_box.center_y
						},
						{
							'x': this.world_box.center_x - this.world_box.width_x / 2,
							'y': this.world_box.center_y
						},
						{
							'x': this.world_box.center_x,
							'y': this.world_box.center_y + this.world_box.width_y / 2
						},
						{
							'x': this.world_box.center_x,
							'y': this.world_box.center_y - this.world_box.width_y / 2
						}
	                   ];
	test_points.forEach(function(point){
		near_points = db[this.collection].find({loc: {$near: [point.x, point.y]}});
		near_points.forEach(function(x){
			printjson(x);
		});
	});
};
