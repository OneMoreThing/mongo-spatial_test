var NearCase = function(extent, world_box, test_points, collection){
	this.init(extent, world_box, test_points, collection);
	
};

NearCase.prototype.init = function(extent, world_box, test_points, collection){
	this.extent = extent;
	this.collection = collection;
	this.world_box = world_box;
	this.test_points = test_points;
};



NearCase.prototype.do_test = function(){
	
	_this = this;
	last_error = 0;
	
	this.test_points.forEach(function(point){
		near_points = _this.do_db_query(point);
		last_error = db.getLastError();
		if(last_error != null){
			return;
		}
	});
	
	return last_error == null;

};


NearCase.prototype.do_db_query = function(point){
	db[this.collection].find({loc: {$near: [point.x, point.y]}}).limit(this.extent);
};