
var Loader = (function(){

  /**
   * Usage:
   *
   * <pre>
   * var promise = Loader.load(template_url);
   * promise.done(function(data) {
   *  //now 'data' has the contents of the loaded file
   * });
   * </pre>
   *
   *
   * @param {string} url Path to the template file
   * @return {object} A promise object
   */
  function load(url,context) {

    return $.ajax({
      type: 'GET',
      url: url,
      context: context
    });

  }

  return {
    load : load
  }
})();