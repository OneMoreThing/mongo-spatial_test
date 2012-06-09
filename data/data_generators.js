
/**
 * UniformDataGenerator class - generates uniformly distributed points and
 * saves it to database
 * 
 */

var UniformDataGenerator = function(min_x, min_y, max_x, max_y, collection){
	this.init(min_x, min_y, max_x, max_y, collection);
};

UniformDataGenerator.prototype.init = function(min_x, min_y, max_x, max_y, collection){
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

UniformDataGenerator.prototype.generate_data = function(num_of_points){
	for(var i = 0; i < num_of_points; i++){
		var rand_point = this.rand_point_in_range();
		db[this.collection].insert({'loc': [rand_point.x,rand_point.y], 'name':'point'+i});
	}
};


/**
 * NormalDataGenerator - generates normally (Gauss stuff) distributed data and
 * saves it to database
 */

var NormalDataGenerator = function(min_x, min_y, max_x, max_y, collection){
	return UniformDataGenerator.prototype.init.call(this, min_x, min_y, max_x, max_y, collection);
};

NormalDataGenerator.prototype = new UniformDataGenerator();
NormalDataGenerator.constructor = NormalDataGenerator;

NormalDataGenerator.prototype.rand_point_in_range = function(){
	var mean_x = this.min_x + (this.max_x - this.min_x) / 2;
	var mean_y = this.min_y + (this.max_y - this.min_y) / 2;
	var variance_x = (this.max_x - this.min_x) / 12;
	var variance_y = (this.max_y - this.min_y) / 12;
	
	var point = {
			'x': this.normal_random(mean_x, variance_x),
			'y': this.normal_random(mean_y, variance_y)
	};
	
	if(point.x > this.max_x){
		point.x = this.max_x;
	}
	
	if(point.y > this.max_y){
		point.y = this.max_y;
	}
	
	if(point.x < this.min_x){
		point.x = this.min_x;
	}
	
	if(point.y < this.min_y){
		point.y = this.min_y;
	}
	return point;
};

NormalDataGenerator.prototype.normal_random = function(mean, variance) {
	if (mean == undefined)
		mean = 0.0;
	if (variance == undefined)
		variance = 1.0;
	var V1, V2, S;
	do {
		var U1 = Math.random();
		var U2 = Math.random();
		V1 = 2 * U1 - 1;
		V2 = 2 * U2 - 1;
		S = V1 * V1 + V2 * V2;
	} while (S > 1);

	X = Math.sqrt(-2 * Math.log(S) / S) * V1;
	// Y = Math.sqrt(-2 * Math.log(S) / S) * V2;
	X = mean + Math.sqrt(variance) * X;
	// Y = mean + Math.sqrt(variance) * Y ;
	return X;
};


