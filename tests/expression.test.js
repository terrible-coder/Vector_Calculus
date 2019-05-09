const d = require("../build/definitions");
const { ADD, MUL } = require("../build/operators");
const Expression = require("../build/expression").Expression;
const s = require("../build/scalar");

const x = new s.Scalar.Variable();
const y = new s.Scalar.Variable();
const two = new s.Scalar.Constant(2);
const expr1 = x.add(two);
const expr2 = x.add(y);

describe("Checks expression functionality", function() {
	test("Checks dependency", function() {
		expect(expr1).toBeInstanceOf(Expression);
		expect(expr1.isFunctionOf(x)).toBe(true);
		expect(expr2.isFunctionOf(y)).toBe(true);
	});
	
	test("Check evaluation at a point", function() {
		const four = two.add(two);
		console.log(expr1.at(new Map([
			[x, two]
		])));
		expect(expr1.at(new Map([
			[x, two]
		]))).toEqual(four);
		expect(expr2.at(new Map([
			[x, two]
		]))).toEqual(two.add(y));
		expect(expr2.at(new Map([
			[x, two],
			[y, two]
		]), false)).toEqual(new Expression(ADD, two, two));
	});
});