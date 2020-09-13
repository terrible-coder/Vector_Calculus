import { IllegalNumberFormat } from "../errors";

/**
 * @internal
 */
function trimStart(s: string, zero: (x: string) => boolean): string;
/**
 * @internal
 */
function trimStart<T>(s: T[], zero: (x: T) => boolean): T[];
function trimStart<T>(s: string | T[], zero: (x: string | T) => boolean) {
	let i: number;
	for (i = 0; i < s.length; i++) {
		if(!zero(s[i]))
			break;
	}
	return s.slice(i);
}

/**
 * @internal
 */
function trimEnd(s: string, zero: (x: string) => boolean): string;
/**
 * @internal
 */
function trimEnd<T>(s: T[], zero: (x: T) => boolean): T[];
function trimEnd<T>(s: string | T[], zero: (x: string | T) => boolean) {
	let i: number;
	for(i = s.length - 1; i >= 0; i--) {
		if(!zero(s[i]))
			break;
	}
	return s.slice(0, i+1);
}

/**
 * Trims unnecessary "zeroes" towards the end or beginning of a string.
 * The "zeroes" may not be `'0'`. Any string could be passed in to
 * indicate what character to look for when trimming.
 * @param s String data to check.
 * @param pos Position to trim from.
 * @param zero Representation of zero element to trim.
 * @internal
 */
export function trimZeroes(s: string, pos: "end" | "start", zero: (x: string) => boolean): string;
/**
 * Trims unnecessary "zeroes" towards the end or beginning of an array.
 * The "zeroes" may not be numerically zero. Any data could be passed in to
 * indicate what element to look for when trimming.
 * @param s Array data to check.
 * @param pos Position to trim from.
 * @param zero Representation of zero element to trim.
 * @internal
 */
export function trimZeroes<T>(s: T[], pos: "end" | "start", zero: (x: T) => boolean): T[];
export function trimZeroes<T>(s: string | T[], pos: "end" | "start", zero: (x: string | T) => boolean) {
	if(typeof s === "string")
		return (pos === "end")? trimEnd(s, zero): trimStart(s, zero);
	else
		return (pos === "end")? trimEnd(s, zero): trimStart(s, zero);
}

/**
 * Checks whether the given string is a valid representation of a whole number.
 * The number can be a signed or unsigned one. The boolean flag can be used to
 * impose an unsigned integer check. If this flag is `true` then the passed string
 * cannot have a sign character (`+` or `-`).
 * @param s The string representation of an integer.
 * @param unsigned Flag to impose unsigned integer check.
 * @internal
 */
function isInteger(s: string, unsigned=false) {
	const valid_chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	const signed = ["+", "-"].indexOf(s.charAt(0)) !== -1;
	if(signed && unsigned)
		return false;
	const integer = signed? s.substring(1): s;
	for (const x of integer)
		if (!(x in valid_chars))
			return false;
	return true;
}

/**
 * Checks whether the given string is a valid representation of a real, decimal
 * number.
 * @param s The string representation of a decimal number.
 * @internal
 */
function isDecimal(s: string) {
	const parts = s.split(".");
	if (parts.length > 2)
		return false;
	return parts.length === 1 ? isInteger(parts[0]) : isInteger(parts[0]) && isInteger(parts[1], true);
}

/**
 * Checks whether the given representation of a real number is acceptable.
 * @param s String representation of a real number.
 * @internal
 */
function isValid(s: string) {
	if (s.indexOf("e") > -1) {
		// The number is in scientific mode
		// Me-E
		// M is the mantissa and E is the exponent with base 10
		const i = s.indexOf("e");
		const mantissa = s.substring(0, i), exponent = s.substring(i + 1);
		return isDecimal(mantissa) && isInteger(exponent);
	}
	return isDecimal(s);
}

/**
 * Given a string, adds padding to the rear or front. This is an implementation
 * to only aid with numerical operations where the numbers are stored as
 * strings. Do not use for general use.
 * @param s The string which is to be padded.
 * @param n Number of times padding string must be used.
 * @param elt The padding string. It must be a single character string.
 * @param pos Indicate whether to pad at front or at rear.
 * @internal
 */
export function pad(s: string, n: number, elt: string, pos: "end" | "start"): string;
/**
 * Given a string, adds padding to the rear or front. This is an implementation
 * to only aid with numerical operations where the numbers are stored as
 * strings. Do not use for general use.
 * @param s The array which is to be padded.
 * @param n Number of times padding element must be used.
 * @param elt The padding element.
 * @param pos Indicate whether to pad at front or at rear.
 * @internal
 */
export function pad<T>(s: T[], n: number, elt: T, pos: "end" | "start"): T[];
export function pad<T>(s: string | T[], n: number, elt: string | T, pos: "end" | "start") {
	if(typeof s === "string")
		return pos === "start"? "".padEnd(n*(<string>elt).length, <string>elt) + s : s + "".padEnd(n*(<string>elt).length, <string>elt);
	const padding = new Array(n).fill(0).map(() => <T>elt);
	return pos === "end"? s.concat(padding): padding.concat(s);
}

/**
 * Compares two strings and aligns them to be of equal "length". The sense of
 * length is defined by the caller function. 
 * * If \(diff < 0\) `a` is shorter than `b` by amount \(-diff\)
 * * If \(diff > 0\) `b` is shorter than `a` by amount \(diff\)
 * * If \(diff = 0\) the strings are equal and returned as is.
 * @param a 
 * @param b 
 * @param elt String to use to align strings.
 * @param diff The difference of length between two strings as defined by caller.
 * @internal
 */
export function align(a: string, b: string, elt: string, diff: number): string[];
/**
 * Compares two arrays and aligns them to be of equal "length". The sense of
 * length is defined by the caller function. 
 * * If \(diff < 0\) `a` is shorter than `b` by amount \(-diff\)
 * * If \(diff > 0\) `b` is shorter than `a` by amount \(diff\)
 * * If \(diff = 0\) the arrays are equal and returned as is.
 * @param a 
 * @param b 
 * @param elt Element to use to align arrays.
 * @param diff The difference of length between two arrays as defined by caller.
 * @internal
 */
export function align<T>(a: T[], b: T[], elt: T, diff: number): T[][];
export function align<T>(a: string | T[], b: string | T[], elt: string | T, diff: number) {
	if(diff < 0) {
		const aa = typeof a === "string"? pad(a, -diff, <string>elt, "end"): pad(a, -diff, <T>elt, "end");
		const bb = b.slice();
		return [aa, bb];
	} else if(diff > 0) {
		const aa = a.slice();
		const bb = typeof b === "string"? pad(b, diff, <string>elt, "end"): pad(b, diff, <T>elt, "end");
		return [aa, bb];
	}
	return [a, b];
}

/**
 * Inserts a decimal point in the string at a given index. The `index`
 * value is calculated from the rear of the string starting from 1.
 * @param a The number as a string.
 * @param index The index from the rear.
 * @internal
 */
export function decimate(a: string, index: number) {
	if (index < 0)
		throw new Error("Cannot put decimal point at negative index.");
	let s = a, sgn = "";
	if (s.charAt(0) === "-") {
		s = s.substring(1);
		sgn = "-";
	}
	if (index > s.length)
		s = "0." + pad(s, index - s.length, "0", "start");
	else
		s = s.substring(0, s.length - index) + "." + s.substring(s.length - index);
	return sgn + s;
}

/**
 * Takes a string and parses into the format expected by the {@link BigNum} class.
 * If the string is not of a valid format then it throws error.
 * @param s String representation of the number.
 * @returns An array where the first element is the integer part and the second is the decimal part.
 */
export function parseNum(s: string) {
	if (!isValid(s))
		throw new IllegalNumberFormat(s);
	let num: string;
	const signed = ["+", "-"].indexOf(s.charAt(0)) !== -1;
	const sign = signed? s.charAt(0): "";
	num = signed? s.substring(1): s;
	let parts = [];
	if (s.indexOf("e") > -1) {
		// The number is in scientific mode
		// Me-E
		// M is the mantissa and E is the exponent with base 10
		const mantissa_exponent = num.split("e");
		const mantissa = mantissa_exponent[0], exponent = Number(mantissa_exponent[1]);
		const index = mantissa.indexOf(".");
		const decimalPlaces = index == -1 ? 0 : mantissa.substring(index + 1).length;
		num = mantissa.split(".").join("");
		if (exponent > decimalPlaces)
			num = pad(num, exponent - decimalPlaces, "0", "end");
		else
			num = decimate(num, decimalPlaces - exponent);
	}
	parts = num.split(".");
	if(parts.length === 1) parts.push("");
	parts[0] = trimZeroes(parts[0], "start", x => x === "0");
	parts[1] = trimZeroes(parts[1], "end", x => x ==="0");
	if(parts[0] !== "" || parts[1] !== "")
		parts[0] = (sign === "-"? sign: "") + parts[0];
	return parts;
}
