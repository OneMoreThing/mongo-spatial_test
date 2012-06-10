/**
 * Data generators file. Classes used to generate points in database.
 * Every class has to implement generate_data(num_of_points) method which generates points
 * and saves them to database as objects. {'x' :123, 'y':456'}
 */




/**
 * Field helper class - class to describe field/box we are working on.
 * In other words describe world boundaries
 */
var Field = function(center_x, center_y, width_x, width_y){
	this.center_x = center_x;
	this.center_y = center_y;
	this.width_x = width_x;
	this.width_y = width_y;
};




/**
 * UniformDataGenerator class - generates uniformly distributed points and
 * saves it to database
 * 
 */
var UniformDataGenerator = function(field, collection){
	if(typeof field == 'undefined'){
		return;
	}
	this.init(field, collection);
};

UniformDataGenerator.prototype.init = function(field, collection){
	this.max_x = field.center_x + field.width_x/2;
	this.max_y = field.center_y + field.width_y/2;
	this.min_x = field.center_x - field.width_x/2;
	this.min_y = field.center_y - field.width_y/2;
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
 * 
 */
var NormalDataGenerator = function(field, collection){
	return UniformDataGenerator.prototype.init.call(this, field, collection);
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
	//making normally distributed random value from 2 uniformly distributed randoms
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
	X = mean + Math.sqrt(variance) * X;
	return X;
};


