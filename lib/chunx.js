module.exports = chunx;

var getInstance = (function(content, match) {
	var instance = [];
	if ('object' === typeof content) {
		match = content;
		content = null;
	}
	if (match != null) {
		for (var i in match) {
			instance[i] = match[i];
		}
	}
	instance.find = function(pattern, cb) {
			if ('object' === typeof pattern) {
				pattern = pattern.source;
			}
			var global_regexp = new RegExp(pattern, 'gm'),
				global_match = content.match(global_regexp);
			// remove matched text blocks from content
			content = pattern.replace(global_regexp, '');
			if (global_match != null) {
				global_match.forEach(function(match) {
					var match_part_regexp = new RegExp(pattern, 'm'),
						match_parts = match.match(match_part_regexp),
						cx = new chunx(match, match_parts);
					cb(cx);
				});
			}
	}
	instance.prototype = chunx.prototype;
	return instance;
});

function chunx() {
	return getInstance.apply(null, arguments);
}
chunx.prototype = {}

