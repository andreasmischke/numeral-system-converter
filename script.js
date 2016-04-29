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
		} else if(null !== str.match(/^0b[01]+$/)) {
			result.type = 'bin';
			result.value = parseInt(str.substr(2), 2);
		} else if(null !== str.match(/^b[01]+$/)) {
			result.type = 'bin';
			result.value = parseInt(str.substr(1), 2);
		} else if(null !== str.match(/^[01]+b$/)) {
			result.type = 'bin';
			result.value = parseInt(str.substr(0, str.length-1), 2);
		} else if(null !== str.match(/^0[1-9]\d*$/)) {
			result.type = 'oct';
			result.value = parseInt(str, 8);
		} else if(null !== str.match(/^[1-9]\d*$/)) {
			result.type = 'dec';
			result.value = parseInt(str, 10);
		} else if(null !== str.match(/^0x[0-9a-f]+$/)) {
			result.type = 'hex';
			result.value = parseInt(str.substr(2), 16);
		} else if(null !== str.match(/^[1-9a-f][0-9a-f]*$/)) {
			result.type = 'hex';
			result.value = parseInt(str, 16);
		} else {
			result.type = 'err';
		}
		return result;
	};

	var updateFields = function __updateFields(value) {
		if(value !== undefined) {
			$out_dec.textContent = value.toString(10);
			$out_hex.textContent = value.toString(16);
			$out_oct.textContent = value.toString(8);
			$out_bin.textContent = value.toString(2);
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
