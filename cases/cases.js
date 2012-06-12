/**
 * Test Case classes - Single test case means a test for a points in database with given extent
 * and test_points. Test Case performs set of queries centered in "test_points" elements and of range in "extent".
 * Summarized time of all queries and summarized  number of points returned by all queries are
 * given as returning value of do_test(). {'millis': time, 'count': number} 
 * 
 * extent is range of test, ie. limit of searched points in $near query or radius of
 * circle in $within query
 * 
 * test_points is list of points ie. [{'x':1,'y':1},{'x':2, 'y':7},...]. which are centers of "find" queries. 
 * For example: center of circle, point in $near query,
 */


/**
 * TestCase testing {$near: point} query
 */
var NearCase = function(extent, world_box, test_points, collection){
	this.init(extent, world_box, test_points, collection);
	
};

NearCase._name = 'NearCase';

NearCase.prototype.init = function(extent, world_box, test_points, collection){
	this.extent = extent;
	this.collection = collection;
	this.world_box = world_box;
	this.test_points = test_points;
};

NearCase.prototype.do_test = function(){
	
	var _this = this;
	var last_error = 0;
	var exec_time = 0;
	var point_count = 0;
	
	this.test_points.forEach(function(point){
		ret = _this.do_db_query(point);
		exec_time += ret.millis;
		point_count += ret.count;
		last_error = db.getLastError();
		if(last_error != null){
			return null;
		}
	});
	
	return {'millis': exec_time, 'count': point_count};

};


NearCase.prototype.do_db_query = function(point){
	return count_time_and_results(this, function(){
		var found_points = db[this.collection].find({loc: {$near: [point.x, point.y]}}).limit(this.extent / 8);
		return found_points;
	});
};



/**
 * TestCase testing {$within: {$box: ... }} query
 */
var WithinRectCase = function(extent, world_box, test_points, collection){
	NearCase.prototype.init.call(this, extent, world_box, test_points, collection);
};

WithinRectCase._name = 'WithinRectCase';

WithinRectCase.prototype = new NearCase();
WithinRectCase.constructor = WithinRectCase;

WithinRectCase.prototype.do_db_query = function(point){
	var box = [[point.x - this.extent, point.y - this.extent], [point.x + this.extent, point.y + this.extent]];
	return count_time_and_results(this, function(){
		var found_points = db[this.collection].find({ loc: { $within: {$box: box} } });
		return found_points;
	});
};



/**
 * TestCase testing {$within: {$radius: ... }} query
 */
var WithinCircleCase = function(extent, world_box, test_points, collection){
	NearCase.prototype.init.call(this, extent, world_box, test_points, collection);
};

WithinCircleCase._name = 'WithinCircleCase';

WithinCircleCase.prototype = new NearCase();
WithinCircleCase.constructor = WithinCircleCase; 

WithinCircleCase.prototype.do_db_query = function(point){
	var center = point;
	var radius = this.extent;
	var circle = [center, radius];
	return count_time_and_results(this, function(){
		var found_points = db[this.collection].find({ loc: { $within: {$center: circle } } });
		return found_points;
	});
	

};



/**
 * TestCase testing {$within: {$polygon: ... }} query with polygon being hexagon
 */
var WithinHexagonCase = function(extent, world_box, test_points, collection){
	NearCase.prototype.init.call(this, extent, world_box, test_points, collection);
};

WithinHexagonCase._name = 'WithinHexagonCase';

WithinHexagonCase.prototype = new NearCase(); 
WithinHexagonCase.constructor = WithinHexagonCase;

WithinHexagonCase.prototype.do_db_query = function(point){
	var hexagon = new RegularPolygon(6, point, this.extent);
	return count_time_and_results(this, function(){
		var found_points = db[this.collection].find({ loc: { $within: {$polygon: hexagon.vertices } } });
		return found_points;
	});
	
};



/**
 * Helper class creating regular polygon
 */
var RegularPolygon = function(num_of_vertices, center, radius){
	this.vertices = [];
	var angle = 2 * Math.PI / num_of_vertices;
	for (var i = 0; i < num_of_vertices; i++){
	    var x = center.x + radius * Math.sin(i * angle);
	    var y = center.y + radius * Math.cos(i * angle);
	    this.vertices.push({'x': x, 'y': y}); 
	}

};



var count_time_and_results = function(ctx, callback){
	// Warning! callback, count_results, profiling must be done in exactly this order.
	// count_results is in fact triggering query in database which is lazy-loaded before that
	// count_results makes access to all results to make sure query was fully fired.
	var callback_ret = callback.call(ctx); 
	var count = count_results(callback_ret)
	var profile = db.system.profile.find().sort({$natural:-1}).limit(1).next();
	return {'count': count, 'millis': profile.millis};
};

var count_results = function(cursor){
	// must be explicit counting by iteration. 
	// cursor.count() won't work because of some strange in-db optimizations
	var count = 0;
	cursor.forEach(function(p){
		count++;
	});
	return count;
};

