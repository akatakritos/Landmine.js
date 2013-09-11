var MinePlacer = function() {
};

MinePlacer.prototype.placeMines = function( field, count ) {
	if (count > this.totalPlacableMines(field)) {
		throw "Can't place " + count + " mines in a field sized " + field.width + "x" + field.height;
	}

	for( var i = 0; i < count; i++ ) {
		this.placeMine( field );
	}
};

MinePlacer.prototype.placeMine = function( field ) {
	var spot, pos, placed = false;
	do {
		pos = this.randomLocation( field );
		spot = field.get( pos.x, pos.y );

		if ( ! spot.hasMine) {
			spot.placeMine();
			placed = true;
		}
	} while ( !placed );
};

MinePlacer.prototype.randomLocation = function( field ) {
	return {
		x: Math.floor((Math.random() * (field.width-1))) + 1,
		y: Math.floor((Math.random() * field.height))
	};
};

MinePlacer.prototype.totalPlacableMines = function( field ) {
	return (field.width-1)*field.height;
};

exportTestSymbol('MinePlacer', MinePlacer);
