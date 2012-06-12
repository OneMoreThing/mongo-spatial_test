db.spat_autotests.drop();
var world = new Field(config['FIELD_EDGE'] / 2, config['FIELD_EDGE'] / 2, config['FIELD_EDGE'], config['FIELD_EDGE']);
var index_bits_list = [5, 6, 7];
index_bits_list.forEach(function(bits_num){
	var uni_gen = new UniformDataGenerator(world, 'spat_autotests_bits_'+bits_num);
	uni_gen.generate_data(100000);
	db['spat_autotests_bits_'+bits_num].ensureIndex({ 'loc': "2d"}, {min: 0, max: config['FIELD_EDGE'], bits: bits_num});
});
