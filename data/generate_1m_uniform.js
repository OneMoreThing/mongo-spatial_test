var data_num = 1000000;
var field_edge = 10000;
var world = new Field(field_edge/2, field_edge/2, field_edge/2, field_edge/2);
var u = new UniformDataGenerator(world, 'spat_autotests');
u.generate_data(data_num);