
  /**
   * Export
   */
  if ( typeof window !== 'undefined' && !window.Landmine ) {
    window.Landmine = LM;
  } else if ( module && module.exports ) {
    module.exports = LM;
  }

})();
