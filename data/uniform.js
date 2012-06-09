
var UniformDataGenerator = function(min_x, min_y, max_x, max_y, collection){
	this.max_x = max_x;
	this.max_y = max_y;
	this.min_x = min_x;
	this.min_y = min_y;
	this.collection = collection;
};

UniformDataGenerator.prototype.rand_point_in_range = function(){
	px = Math.random() * (this.max_x - this.min_x) + this.min_x;
	py = Math.random() * (this.max_y - this.min_y) + this.min_y;
	return {'x': px, 'y': py};
};

UniformDataGenerator.prototype.generate_uniform_data = function(num_of_points){
	for(var i = 0; i < num_of_points; i++){
		var rand_point = this.rand_point_in_range();
		db[this.collection].insert({'loc': [rand_point.x,rand_point.y], 'name':'point'+i});
	}
};


