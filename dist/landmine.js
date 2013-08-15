(function() {
	/* namespace object */
	var LM = {};
;
	/**
	 * Export
	 */
	if ( window && !window.Landmine ) {
		window.Landmine = LM;
	} else if ( module && module.exports ) {
		module.exports = LM;
	}

})();