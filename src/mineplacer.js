var MinePlacer = function() {
};

MinePlacer.prototype.placeMines = function( field, count ) {
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
		x: Math.floor((Math.random() * field.width-1) + 1),
		y: Math.floor((Math.random() * field.height))
	};
};

exportTestSymbol('MinePlacer', MinePlacer);