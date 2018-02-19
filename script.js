//(function() {
"use strict";

	var $input = document.getElementById('input');
	var $out_type = document.getElementById('out_type');
	var $out_hex = document.getElementById('out_hex');
	var $out_dec = document.getElementById('out_dec');
	var $out_oct = document.getElementById('out_oct');
	var $out_bin = document.getElementById('out_bin');

	var typeStrings = {
		'bin': {
			text: 'binary',
			color: '#ff7'
		},
		'hex': {
			text: 'hexadecimal',
			color: '#7ff'
		},
		'oct': {
			text: 'octal',
			color: '#f7f'
		},
		'dec': {
			text: 'decimal',
			color: '#77f'
		},
		'err': {
			text: 'invalid',
			color: '#f77'
		},
		'nul': {
			text: 'empty',
			color: '#777'
		}
	};

	var recognizeType = function __recognizeType(str) {
		var result = {};
		if("" === str) {
			result.type = 'nul';
		} else if(null !== str.match(/^0b[01]+$/i)) {
			result.type = 'bin';
			result.value = parseInt(str.substr(2), 2);
		} else if(null !== str.match(/^b[01]+$/i)) {
			result.type = 'bin';
			result.value = parseInt(str.substr(1), 2);
		} else if(null !== str.match(/^[01]+b$/i)) {
			result.type = 'bin';
			result.value = parseInt(str.substr(0, str.length-1), 2);
		} else if(null !== str.match(/^0[1-9]\d*$/)) {
			result.type = 'oct';
			result.value = parseInt(str, 8);
		} else if(null !== str.match(/^[1-7]\d*$/)) {
			result.type = 'dec';
			result.value = parseInt(str, 10);
		} else if(null !== str.match(/^0x[0-9a-f]+$/i)) {
			result.type = 'hex';
			result.value = parseInt(str.substr(2), 16);
		} else if(null !== str.match(/^[1-9a-f][0-9a-f]*$/i)) {
			result.type = 'hex';
			result.value = parseInt(str, 16);
		} else {
			result.type = 'err';
		}
		return result;
	};

	var group = function __group(str, partLength, separator) {

		if(partLength < 1) {
			console.warn("Illegal argument for `str` in function __group(str, partLength, separator)");
			return str;
		}

		var parts = [];

		for(var i = str.length - partLength; i > -partLength; i-=partLength ) {
			if(i < 0) {
				parts.push(str.substr(0, i + partLength));
			} else {
				parts.push(str.substr(i, partLength));
			}
		}


		return parts.reverse().join(separator);
	};

	var updateFields = function __updateFields(value) {
		if(value !== undefined) {
			$out_dec.textContent = group(value.toString(10), 3, " ");
			$out_hex.textContent = group(value.toString(16), 2, " ");
			$out_oct.textContent = value.toString(8);
			$out_bin.textContent = group(value.toString(2), 4, " ");
		} else {
			$out_dec.textContent = " ";
			$out_hex.textContent = " ";
			$out_oct.textContent = " ";
			$out_bin.textContent = " ";
		}
	};

	var updateType = function __updateType(str) {
		$out_type.textContent = typeStrings[str].text;
		$out_type.className = str;
	};

	var processHash = function __processHash() {
		if(window.location.hash.length > 1) {
			$input.value = window.location.hash.substr(1);
		} else {
			$input.value = "";
		}
		calculate();
	};

	var calculate = function __calculate() {
		var result = recognizeType($input.value);
		updateType(result.type);
		updateFields(result.value);
	};

	$input.addEventListener('keyup', calculate);
	window.addEventListener('hashchange', processHash);

	// bootstrap
	processHash();
	$input.focus();

//})();
