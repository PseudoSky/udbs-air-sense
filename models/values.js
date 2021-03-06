/* Value Class Declaration */

var Value = mongoose.model('Value', {
	sensorID: String,
	timestamp: { type : Date, default: Date.now },
	value: Number
});

/* Model Functions */

exports.index = function (callback) {
	Value.find(function (error, values) {
		if (error) {
			return console.error(error);
		}

		callback(values);
	}).select('-__v -_id');

}
exports.index_after = function (timestamp, callback) {

	Value.find(function (error, values) {
		if (error) {
			return console.error(error);
		}

		callback(values);
	}).where('timestamp').gt(new Date(timestamp) ).select('-__v -_id');

}

exports.show = function (sensorID, callback) {

	Value.find({
		sensorID: sensorID
	}, function (error, values) {
		if (error) {
			return console.error(error);
		}

		callback(values);
	}).select('-__v -_id -sensorID');

}

exports.truncate = function (callback){
	Value.remove({},callback);
}

exports.insert = function (record, callback) {
	var value = new Value(record);
	if(value.value!=0){
		value.save(function (error) {
			if (error) {
				console.error(error);
			}
			if(callback){
				callback();
			}else{
				return 1;
			}
		});
	}
}

exports.create = function (sensorID, value, callback) {

	var value = new Value({
		sensorID: sensorID,
		value: value
	});

	value.save(function (error) {
		if (error) {
			console.error(error);
		}

		callback();
	});

}