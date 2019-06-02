/** The operator for adding two values. */
export const ADD = "add";

/** The operator for subtracting one value from another. */
export const SUB = "sub";
// export const SUB = BinaryOperator.define("-", (a: Evaluable, b: Evaluable) => {
// 	if(a instanceof Scalar && b instanceof Scalar)
// 		return a.sub(b);
// 	throw "Subtraction not defined";
// });
/** The operator for multiplying two values. */
export const MUL = "mul";
// export const MUL = BinaryOperator.define("*", (a: Evaluable, b: Evaluable) => a.mul(b));
/** The operator for dividing one value by another. */
export const DIV = "div";
// export const DIV = BinaryOperator.define("/", (a: Evaluable, b: Evaluable) => {
// 	if(a instanceof Scalar && b instanceof Scalar)
// 		return a.div(b);
// 	throw "Division not defined";
// });