import { Token, Evaluable, Constant as _Constant, Variable as _Variable, Expression as _Expression, isConstant, isVariable, Operator, Numerical } from "./core/definitions";
import { BinaryOperator } from "./core/operators/binary";
import { ExpressionBuilder } from "./core/expression";
import { UnaryOperator, isUnaryOperator } from "./core/operators/unary";
import { Vector } from "./vector";
import { Overwrite, IndeterminateForm } from "./core/errors";
import { abs, sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh, exp, log, ln, floor, ceil } from "./core/math/functions";
import { BigNum } from "./core/math/bignum";
import { mathenv } from "./core/env";
import { MathContext, RoundingMode } from "./core/math/context";
import { Component } from "./core/math/component";

/**
 * Base class to works with scalar quantities.
 * @abstract
 */
export abstract class Scalar extends Numerical implements Token, Evaluable {
	readonly abstract type: "constant" | "variable" | "expression";
	readonly quantity = "scalar";

	public abstract neg: Scalar;

	/**
	 * Adds two {@link Scalar}s together. If `this` and `that` are both constants
	 * then numerically adds the two and returns a new {@link Scalar.Constant} object
	 * otherwise creates an {@link Expression} out of them and returns the same.
	 * @param that The scalar to add `this` with.
	 * @return The result of algebraic addition.
	 */
	public abstract add(that: Scalar): Scalar;

	/**
	 * Subtracts `that` from `this`. If `this` and `that` are both constants
	 * then numerically subtracts one from the other and returns a new
	 * {@link Scalar.Constant} object otherwise creates an {@link Expression} out of them
	 * and returns the same.
	 * @param that The scalar to subtract from `this`.
	 * @return The result of algebraic subtraction.
	 */
	public abstract sub(that: Scalar): Scalar;

	/**
	 * Multiplies two {@link Scalar}s together. If `this` and `that` are both constants
	 * then numerically multiplies the two and returns a new {@link Scalar.Constant} object
	 * otherwise creates an {@link Expression} out of them and returns the same.
	 * @param that The scalar to multiply `this` with.
	 * @return The result of algebraic multiplication.
	 */
	public abstract mul(that: Scalar): Scalar;

	/**
	 * Divides `this` scalar by `that`. If `this` and `that` are both constants
	 * then numerically divides the two and returns a new {@link Scalar.Constant} object
	 * otherwise creates an {@link Expression} out of them and returns the same.
	 * @param that The scalar to divide `this` by.
	 * @return The result of algebraic division.
	 */
	public abstract div(that: Scalar): Scalar;

	/**
	 * Raises `this` scalar to the power of `that`. If `this` and `that` are both constants
	 * then numerically evaluates the exponentiation and returns a new {@link Scalar.Constant} object
	 * otherwise creates an {@link Expression} out of them and returns the same.
	 * @param that The scalar to divide `this` by.
	 * @return The result of algebraic division.
	 */
	public abstract pow(that: Scalar): Scalar;

	/**
	 * Computes the absolute value of a {@link Scalar}.
	 * @param x A constant scalar.
	 */
	public static abs(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Computes the absolute value of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static abs(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static abs(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(abs(x.value));
		return new Scalar.Expression(UnaryOperator.ABS, x);
	}

	/**
	 * Calculates the trigonometric sine of a {@link Scalar}.
	 * @param x A constant scalar.
	 */
	public static sin(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the trigonometric sine of a {@link Scalar}.
	 * @param x A scalar variable or expression
	 */
	public static sin(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static sin(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(sin(x.value));
		return new Scalar.Expression(UnaryOperator.SIN, x);
	}

	/**
	 * Calculates the trigonometric cosine of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static cos(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the trigonometric cosine of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static cos(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static cos(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(cos(x.value));
		return new Scalar.Expression(UnaryOperator.COS, x);
	}

	/**
	 * Calculates the trigonometric tangent of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static tan(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the trigonometric tangent of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static tan(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static tan(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(tan(x.value));
		return new Scalar.Expression(UnaryOperator.TAN, x);
	}

	/**
	 * Calculates the inverse trigonometric sine of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static asin(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the inverse trigonometric sine of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static asin(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static asin(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(asin(x.value));
		return new Scalar.Expression(UnaryOperator.ASIN, x);
	}

	/**
	 * Calculates the inverse trigonometric cosine of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static acos(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the inverse trigonometric cosine of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static acos(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static acos(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(acos(x.value));
		return new Scalar.Expression(UnaryOperator.ACOS, x);
	}

	/**
	 * Calculates the inverse trigonometric tangent of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static atan(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the inverse trigonometric tangent of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static atan(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static atan(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(atan(x.value));
		return new Scalar.Expression(UnaryOperator.ATAN, x);
	}

	/**
	 * Calculates the hyperbolic sine of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static sinh(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the hyperbolic sine of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static sinh(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static sinh(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(sinh(x.value));
		return new Scalar.Expression(UnaryOperator.SINH, x);
	}

	/**
	 * Calculates the hyperbolic cosine of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static cosh(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the hyperbolic cosine of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static cosh(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static cosh(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(cosh(x.value));
		return new Scalar.Expression(UnaryOperator.COSH, x);
	}

	/**
	 * Calculates the hyperbolic tangent of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static tanh(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the hyperbolic tangent of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static tanh(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static tanh(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(tanh(x.value));
		return new Scalar.Expression(UnaryOperator.TANH, x);
	}

	/**
	 * Calculates the inverse hyperbolic sine of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static asinh(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the inverse hyperbolic sine of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static asinh(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static asinh(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(asinh(x.value));
		return new Scalar.Expression(UnaryOperator.ASINH, x);
	}

	/**
	 * Calculates the inverse hyperbolic cosine of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static acosh(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the inverse hyperbolic cosine of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static acosh(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static acosh(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(acosh(x.value));
		return new Scalar.Expression(UnaryOperator.ACOSH, x);
	}

	/**
	 * Calculates the inverse hyperbolic tangent of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static atanh(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the inverse hyperbolic tangent of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static atanh(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static atanh(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(atanh(x.value));
		return new Scalar.Expression(UnaryOperator.ATANH, x);
	}

	/**
	 * Calculates the exponential of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static exp(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the exponential of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static exp(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static exp(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(exp(x.value));
		return new Scalar.Expression(UnaryOperator.EXP, x);
	}

	/**
	 * Calculates the natural logarithm (to the base \\( e \\)) of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static ln(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the natural logarithm (to the base \\( e \\)) of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static ln(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static ln(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(ln(x.value));
		return new Scalar.Expression(UnaryOperator.LN, x);
	}

	/**
	 * Calculates the common logarithm (to the base \\( 10 \\)) of a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static log(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Calculates the common logarithm (to the base \\( 10 \\)) of a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static log(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static log(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(log(x.value));
		return new Scalar.Expression(UnaryOperator.LOG, x);
	}

	/**
	 * Evaluates the largest integer less than or equal to a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static floor(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Evaluates the largest integer less than or equal to a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static floor(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static floor(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(floor(x.value));
		return new Scalar.Expression(UnaryOperator.FLOOR, x);
	}

	/**
	 * Evaluates the smallest integer greater than or equal to a {@link Scalar}.
	 * @param x A scalar constant.
	 */
	public static ceil(x: Scalar.Constant): Scalar.Constant;
	/**
	 * Evaluates the smallest integer greater than or equal to a {@link Scalar}.
	 * @param x A scalar variable or expression.
	 */
	public static ceil(x: Scalar.Variable | Scalar.Expression): Scalar.Expression;
	public static ceil(x: Scalar) {
		if(x instanceof Scalar.Constant)
			return new Scalar.Constant(ceil(x.value));
		return new Scalar.Expression(UnaryOperator.CEIL, x);
	}
}

/**
 * @namespace
 */
export namespace Scalar {
	/**
	 * A mapping from name of scalar variables to {@link Scalar.Variable} objects.
	 * @ignore
	 */
	const VARIABLES = new Map<string, Scalar.Variable>();
	/**
	 * A mapping from named scalar constants to {@link Scalar.Constant} objects.
	 * @ignore
	 */
	const NAMED_CONSTANTS = new Map<string, Scalar.Constant>();

	/**
	 * Represents a constant scalar quantity with a fixed value.
	 * @extends {@link Scalar}
	 */
	export class Constant extends Scalar implements _Constant {
		readonly type = "constant";
		readonly classRef = Scalar.Constant;

		/**
		 * Creates a {@link Scalar.Constant} object from number.
		 * One may optionally pass in a string by which `this` object
		 * may be identified by.
		 * 
		 * Using the constructor directly for creating vector objects is
		 * not recommended.
		 * 
		 * @see {@link Scalar.constant}
		 * @param value The fixed value `this` should represent.
		 * @param name The name by which `this` is identified.
		 */
		constructor(readonly value: BigNum, readonly name: string = "") {
			super();
		}

		public get neg() {
			return new Scalar.Constant(this.value.neg);
		}

		/**
		 * Checks for equality of two scalar constants. The equality check
		 * for floating point numbers becomes problematic in the decimal system.
		 * The binary representation is finite and therefore even if two values
		 * are in fact equal they may not return true by using the `==` or `===`
		 * equality. To tackle this problem we use a tolerance value, if the
		 * difference of the two numerical values is less than that tolerance
		 * value then we can assume the values to be practically equal. Smaller
		 * tolerance values will result in more accurate checks.
		 * This function allows a default tolerance of `1e-14` for floating point numbers.
		 * @param that The value to check equality with.
		 */
		public equals(that: Scalar.Constant): boolean;
		/**
		 * Checks for equality of two scalar constants. The equality check
		 * for floating point numbers becomes problematic in the decimal system.
		 * The binary representation is finite and therefore even if two values
		 * are in fact equal they may not return true by using the `==` or `===`
		 * equality. To tackle this problem we use a tolerance value, if the
		 * difference of the two numerical values is less than that tolerance
		 * value then we can assume the values to be practically equal. Smaller
		 * tolerance values will result in more accurate checks.
		 * @param that The value to check equality with.
		 * @param tolerance The tolerance permitted for floating point numbers.
		 */
		public equals(that: Scalar.Constant, context: MathContext): boolean;
		public equals(that: Scalar.Constant, context=mathenv.mode) {
			return this.value.equals(that.value, context);
		}

		/**
		 * Adds two {@link Scalar.Constant} objects numerically.
		 * @param that The {@link Scalar.Constant} to add to `this`.
		 * @return The algebraic sum of `this` and `that`.
		 */
		public add(that: Scalar.Constant): Scalar.Constant;
		/**
		 * Creates and returns a {@link Scalar.Expression} for the addition of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * adding a variable scalar to another scalar always results in an expression.
		 * @param that The {@link Vector} to add to `this`.
		 * @return Expression for sum of `this` and `that`.
		 */
		public add(that: Scalar.Variable | Scalar.Expression): Scalar.Expression;
		public add(that: Scalar) {
			if(that instanceof Scalar.Constant)
				return new Scalar.Constant(this.value.add(that.value));
			return new Scalar.Expression(BinaryOperator.ADD, this, that);
		}

		/**
		 * Subtracts one {@link Scalar.Constant} object from another numerically.
		 * @param that The {@link Scalar.Constant} to subtract from `this`.
		 * @return The algebraic difference of `this` from `that`.
		 */
		public sub(that: Scalar.Constant): Scalar.Constant;
		/**
		 * Creates and returns a {@link Scalar.Expression} for the subtraction of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * subtracting a variable scalar from another scalar always results in an expression.
		 * @param that The {@link Scalar} to add to `this`.
		 * @return Expression for subtracting `that` from `this`.
		 */
		public sub(that: Scalar.Variable | Scalar.Expression): Scalar.Expression;
		public sub(that: Scalar) {
			if(that instanceof Scalar.Constant)
				return new Scalar.Constant(this.value.sub(that.value));
			return new Scalar.Expression(BinaryOperator.SUB, this, that);
		}

		/**
		 * Multiplies two {@link Scalar.Constant} objects numerically.
		 * @param that The {@link Scalar.Constant} to subtract from `this`.
		 * @return The vector difference of `this` from `that`.
		 */
		public mul(that: Scalar.Constant): Scalar.Constant;
		/**
		 * Creates and returns a {@link Scalar.Expression} for the multiplication of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * multiplying a variable scalar by another scalar always results in an expression.
		 * @param that The {@link Scalar} to add to `this`.
		 * @return Expression for subtracting `that` from `this`.
		 */
		public mul(that: Scalar.Variable | Scalar.Expression): Scalar.Expression;
		/**
		 * Scales a {@link Vector.Constant} object numerically.
		 * @see {@link Vector.scale}
		 * @param that The {@link Vector.Constant} to scale by the amount of `this`.
		 * @return The scaled vector.
		 */
		public mul(that: Vector.Constant): Vector.Constant;
		/**
		 * Creates and returns a {@link Vector.Expression} for the scaling of
		 * a {@link Vector} object. The {@link type} of `this` does not matter because
		 * scaling a variable vector by a scalar always results in an expression.
		 * @param that The {@link Vector} to scale by the amount of `this`.
		 * @return Expression for scaling `that` by `this`.
		 */
		public mul(that: Vector.Variable | Vector.Expression): Vector.Expression;
		public mul(that: Scalar | Vector) {
			if(that instanceof Scalar) {
				if(that instanceof Scalar.Constant)
					return new Scalar.Constant(this.value.mul(that.value));
				return new Scalar.Expression(BinaryOperator.MUL, this, that);
			}
			if(that instanceof Vector.Constant)
				return Vector.constant(that.value.map(x => this.mul(x)));
			return new Vector.Expression(BinaryOperator.MUL, this, that, (i: number) => (<Scalar>this).mul(that.X(i)), that.dimension);
		}

		/**
		 * Divides one {@link Scalar.Constant} object by another numerically.
		 * @param that The {@link Scalar.Constant} to divide `this` by.
		 * @return The scalar quotient of dividing `this` by `that`.
		 */
		public div(that: Scalar.Constant): Scalar.Constant;
		/**
		 * Creates and returns a {@link Scalar.Expression} for the division of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * dividing a variable scalar by another scalar always results in an expression.
		 * @param that The {@link Scalar} to divide `this` by `this`.
		 * @return Expression for dividing `this` by `that`.
		 */
		public div(that: Scalar.Variable | Scalar.Expression): Scalar.Expression;
		public div(that: Scalar) {
			if(that instanceof Scalar.Constant) {
				if(that.equals(Scalar.ZERO))
					throw new Error("Division by zero error");
				return new Scalar.Constant(this.value.div(that.value));
			}
			return new Scalar.Expression(BinaryOperator.DIV, this, that);
		}

		/**
		 * Raises a {@link Scalar.Constant} object to the power of another numerically.
		 * @param that The {@link Scalar.Constant} power to raise `this` to.
		 * @return The scalar exponentiation of `this` by `that`.
		 */
		public pow(that: Scalar.Constant): Scalar.Constant;
		/**
		 * Creates and returns a {@link Scalar.Expression} for exponentiation of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * exponentiating a scalar by a variable scalar always results in an expression.
		 * @param that The {@link Scalar} power to raise `this` to.
		 * @return Expression for exponentiating `this` by `that`.
		 */
		public pow(that: Scalar.Variable | Scalar.Expression): Scalar.Expression;
		public pow(that: Scalar) {
			if(that instanceof Scalar.Constant) {
				if(this.equals(Scalar.ZERO) && that.equals(Scalar.ZERO))
					throw new IndeterminateForm("0 raised to the power 0");
				return new Scalar.Constant(this.value.pow(that.value));
			}
			return new Scalar.Expression(BinaryOperator.POW, this, that);
		}
	}

	/**
	 * Represents a variable scalar quantity with no fixed value.
	 * @extends {@link Scalar}
	 */
	export class Variable extends Scalar implements _Variable {
		readonly type = "variable";
		readonly classRef = Scalar.Variable;

		/**
		 * Creates a {@link Scalar.Variable} object.
		 * 
		 * Using the constructor directly for creating vector objects is
		 * not recommended.
		 * 
		 * @see {@link Scalar.variable}
		 * @param name The name with which the {@link Scalar.Variable} is going to be identified.
		 */
		constructor(readonly name: string) {
			super();
		}

		public get neg() {
			return new Scalar.Expression(UnaryOperator.NEG, this);
		}

		/**
		 * Creates and returns a {@link Scalar.Expression} for the addition of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * adding a variable scalar to another scalar always results in an expression.
		 * @param that The {@link Vector} to add to `this`.
		 * @return Expression for sum of `this` and `that`.
		 */
		public add(that: Scalar) {
			return new Scalar.Expression(BinaryOperator.ADD, this, that);
		}

		/**
		 * Creates and returns a {@link Scalar.Expression} for the subtraction of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * subtracting a variable scalar from another scalar always results in an expression.
		 * @param that The {@link Scalar} to add to `this`.
		 * @return Expression for subtracting `that` from `this`.
		 */
		public sub(that: Scalar) {
			return new Scalar.Expression(BinaryOperator.SUB, this, that);
		}

		/**
		 * Creates and returns a {@link Scalar.Expression} for the multiplication of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * multiplying a variable scalar by another scalar always results in an expression.
		 * @param that The {@link Scalar} to add to `this`.
		 * @return Expression for subtracting `that` from `this`.
		 */
		public mul(that: Scalar): Scalar.Expression;
		/**
		 * Creates and returns a {@link Vector.Expression} for the scaling of
		 * a {@link Vector} object. The {@link type} of `this` does not matter because
		 * scaling a variable vector by a scalar always results in an expression.
		 * @param that The {@link Vector} to scale by the amount of `this`.
		 * @return Expression for scaling `that` by `this`.
		 */
		public mul(that: Vector): Vector.Expression;
		public mul(that: Scalar | Vector) {
			if(that instanceof Scalar)
				return new Scalar.Expression(BinaryOperator.MUL, this, that);
			return new Vector.Expression(BinaryOperator.MUL, this, that, (i: number) => this.mul(that.X(i)), that.dimension);
		}

		/**
		 * Creates and returns a {@link Scalar.Expression} for the division of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * dividing a variable scalar by another scalar always results in an expression.
		 * @param that The {@link Scalar} to divide `this` by `this`.
		 * @return Expression for dividing `this` by `that`.
		 */
		public div(that: Scalar) {
			return new Scalar.Expression(BinaryOperator.DIV, this, that);
		}

		/**
		 * Creates and returns a {@link Scalar.Expression} for exponentiation of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * exponentiating a scalar by a variable scalar always results in an expression.
		 * @param that The {@link Scalar} power to raise `this` to.
		 * @return Expression for exponentiating `this` by `that`.
		 */
		public pow(that: Scalar) {
			return new Scalar.Expression(BinaryOperator.POW, this, that);
		}
	}

	/**
	 * @extends {@link Scalar}
	 */
	export class Expression extends Scalar implements _Expression {
		readonly type = "expression";
		readonly classRef = Scalar.Expression;

		/** `Set` of {@link Variable} quantities `this` depends on. */
		readonly arg_list: Set<_Variable>;
		/** Array of `Evaluable` quantity/quantities `this.op` operates on. */
		readonly operands: Evaluable[] = [];

		readonly rest: any[];

		/**
		 * Creates a scalar expression object using a root binary operation.
		 * @param op {BinaryOperator}
		 * @param lhs The left hand side operand of the operator.
		 * @param rhs The right hand side operand of the operator.
		 */
		constructor(op: BinaryOperator, lhs: Evaluable, rhs: Evaluable, ...args: any[]);
		/**
		 * Creates a scalar expression object using a root unary operation.
		 * @param op {UnaryOperator}
		 * @param arg The argument of the operator.
		 */
		constructor(op: UnaryOperator, arg: Evaluable, ...args: any[]);
		constructor(readonly op: Operator, ...args: any[]) {
			super();
			let a, b = undefined;
			if(isUnaryOperator(op)) {
				a = args[0];
				this.rest = args.slice(1);
			} else {
				[a, b] = args.slice(0, 2);
				this.rest = args.slice(2);
			}
			this.arg_list = ExpressionBuilder.createArgList(a, b);
			this.operands.push(a);
			if(b !== undefined)
				this.operands.push(b);
		}

		public get neg() {
			return new Scalar.Expression(UnaryOperator.NEG, this);
		}

		/**
		 * The left hand side operand for `this.op`.
		 * @throws If `this.op` is a `UnaryOperator`.
		 */
		public get lhs() {
			if(this.operands.length === 2)
				return this.operands[0];
			throw new Error("Unary operators have no left hand argument.");
		}

		/**
		 * The right hand side operand for `this.op`.
		 * @throws If `this.op` is a `UnaryOperator`.
		 */
		public get rhs() {
			if(this.operands.length === 2)
				return this.operands[1];
			throw new Error("Unary operators have no right hand argument.");
		}

		/**
		 * The argument for `this.op`.
		 * @throws If `this.op` is a `BinaryOperator`.
		 */
		public get arg() {
			if(this.operands.length === 1)
				return this.operands[0];
			throw new Error("Binary operators have two arguments.");
		}

		/**
		 * Creates and returns a {@link Scalar.Expression} for the addition of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * adding a unknown scalar/scalar expression to another scalar always results in an expression.
		 * @param that The {@link Vector} to add to `this`.
		 * @return Expression for sum of `this` and `that`.
		 */
		public add(that: Scalar) {
			return new Scalar.Expression(BinaryOperator.ADD, this, that);
		}

		/**
		 * Creates and returns a {@link Scalar.Expression} for the subtraction of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * subtracting a unknown scalar/scalar expression from another scalar always results in an expression.
		 * @param that The {@link Scalar} to add to `this`.
		 * @return Expression for subtracting `that` from `this`.
		 */
		public sub(that: Scalar) {
			return new Scalar.Expression(BinaryOperator.SUB, this, that);
		}

		/**
		 * Creates and returns a {@link Scalar.Expression} for the multiplication of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * multiplying a unknown scalar/scalar expression by another scalar always results in an expression.
		 * @param that The {@link Scalar} to add to `this`.
		 * @return Expression for subtracting `that` from `this`.
		 */
		public mul(that: Scalar): Scalar.Expression;
		/**
		 * Creates and returns a {@link Vector.Expression} for the scaling of
		 * a {@link Vector} object. The {@link type} of `this` does not matter because
		 * scaling a unknown vector/scalar expression by a scalar always results in an expression.
		 * @param that The {@link Vector} to scale by the amount of `this`.
		 * @return Expression for scaling `that` by `this`.
		 */
		public mul(that: Vector): Vector.Expression;
		public mul(that: Scalar | Vector) {
			if(that instanceof Scalar)
				return new Scalar.Expression(BinaryOperator.MUL, this, that);
			return new Vector.Expression(BinaryOperator.MUL, this, that, (i: number) => this.mul(that.X(i)), that.dimension);
		}

		/**
		 * Creates and returns a {@link Scalar.Expression} for the division of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * dividing a unknown scalar/scalar expression by another scalar always results in an expression.
		 * @param that The {@link Scalar} to divide `this` by `this`.
		 * @return Expression for dividing `this` by `that`.
		 */
		public div(that: Scalar) {
			return new Scalar.Expression(BinaryOperator.DIV, this, that);
		}

		/**
		 * Creates and returns a {@link Scalar.Expression} for exponentiation of
		 * two {@link Scalar} objects. The {@link type} of `this` does not matter because
		 * exponentiating a scalar by a unknown scalar/scalar expression always results in an expression.
		 * @param that The {@link Scalar} power to raise `this` to.
		 * @return Expression for exponentiating `this` by `that`.
		 */
		public pow(that: Scalar) {
			return new Scalar.Expression(BinaryOperator.POW, this, that);
		}

		/**
		 * Checks whether `this` {@link Scalar.Expression} depends on a given
		 * {@link Variable}.
		 * @param v The {@link Variable} to check against.
		 */
		public isFunctionOf(v: _Variable): boolean {
			return this.arg_list.has(v);
		}

		/**
		 * Evaluates this {@link Scalar.Expression} at the given values for the
		 * {@link Variable} objects `this` depends on. In case `this` is not a
		 * function of any of the variables in the mapping then `this` is returned
		 * as is. 
		 * @param values A map from the {@link Variable} quantities to {@link Constant} quantities.
		 * @return The result after evaluating `this` at the given values.
		 */
		public at(values: Map<_Variable, _Constant>) {
			const res = ExpressionBuilder.evaluateAt(this, values);
			if(isConstant(res))
				return <Scalar.Constant>res;
			if(isVariable(res))
				return <Scalar.Variable>res;
			return <Scalar.Expression>res;
		}
	}

	/**
	 * Creates a new {@link Scalar.Constant} object from a number.
	 * 
	 * This is the recommended way of creating {@link Scalar.Constant} objects instead of
	 * using the constructor.
	 * @param value The fixed value the {@link Scalar.Constant} is supposed to represent.
	 */
	export function constant(value: number): Scalar.Constant;
	/**
	 * Defines a named {@link Scalar.Constant} object from a number.
	 * 
	 * This is the recommended way of creating named {@link Scalar.Constant} objects instead of
	 * using the constructor.
	 * @param value The fixed value the {@link Scalar.Constant} is supposed to represent.
	 * @param name The string with which `this` object is identified.
	 * @throws Throws an error if a {@link Scalar.Constant} with the same name has been defined previously.
	 */
	export function constant(value: number, name: string): Scalar.Constant;
	/**
	 * Creates a new {@link Scalar.Constant} object from an array of numbers.
	 * The numbers are interpreted as the real and imaginary components of
	 * a hyper-complex number.
	 * 
	 * This is the recommended way of creating {@link Scalar.Constant} objects instead of
	 * using the constructor.
	 * @param value The fixed value the {@link Scalar.Constant} is supposed to represent.
	 */
	export function constant(value: number[]): Scalar.Constant;
	/**
	 * Defines a named {@link Scalar.Constant} object from an array of numbers.
	 * The numbers are interpreted as the real and imaginary components of
	 * a hyper-complex number.
	 * 
	 * This is the recommended way of creating named {@link Scalar.Constant} objects instead of
	 * using the constructor.
	 * @param value The fixed value the {@link Scalar.Constant} is supposed to represent.
	 * @param name The string with which `this` object is identified.
	 * @throws Throws an error if a {@link Scalar.Constant} with the same name has been defined previously.
	 */
	export function constant(value: number[], name: string): Scalar.Constant;
	/**
	 * Creates a new {@link Scalar.Constant} object from an array of strings.
	 * The numbers are interpreted as the real and imaginary components of
	 * a hyper-complex number.
	 * 
	 * This is the recommended way of creating {@link Scalar.Constant} objects instead of
	 * using the constructor.
	 * @param value The fixed value the {@link Scalar.Constant} is supposed to represent.
	 */
	export function constant(value: string[]): Scalar.Constant;
	/**
	 * Defines a named {@link Scalar.Constant} object from an array of strings.
	 * The numbers are interpreted as the real and imaginary components of
	 * a hyper-complex number.
	 * 
	 * This is the recommended way of creating named {@link Scalar.Constant} objects instead of
	 * using the constructor.
	 * @param value The fixed value the {@link Scalar.Constant} is supposed to represent.
	 * @param name The string with which `this` object is identified.
	 * @throws Throws an error if a {@link Scalar.Constant} with the same name has been defined previously.
	 */
	export function constant(value: string[], name: string): Scalar.Constant;
	/**
	 * Creates a new {@link Scalar.Constant} object from a {@link Component} object.
	 * 
	 * This is the recommended way of creating {@link Scalar.Constant} objects instead of
	 * using the constructor.
	 * @param value The fixed value the {@link Scalar.Constant} is supposed to represent.
	 */
	export function constant(value: Component): Scalar.Constant;
	/**
	 * Defines a named {@link Scalar.Constant} object from a {@link Component}
	 * object.
	 * 
	 * This is the recommended way of creating named {@link Scalar.Constant} objects instead of
	 * using the constructor.
	 * @param value The fixed value the {@link Scalar.Constant} is supposed to represent.
	 * @param name The string with which `this` object is identified.
	 * @throws Throws an error if a {@link Scalar.Constant} with the same name has been defined previously.
	 */
	export function constant(value: Component, name: string): Scalar.Constant;
	/**
	 * Creates a new {@link Scalar.Constant} object from a {@link BigNum} object.
	 * 
	 * This is the recommended way of creating {@link Scalar.Constant} objects instead of
	 * using the constructor.
	 * @param value The fixed value the {@link Scalar.Constant} is supposed to represent.
	 */
	export function constant(value: BigNum): Scalar.Constant;
	/**
	 * Defines a named {@link Scalar.Constant} object from a {@link BigNum} object.
	 * 
	 * This is the recommended way of creating named {@link Scalar.Constant} objects instead of
	 * using the constructor.
	 * @param value The fixed value the {@link Scalar.Constant} is supposed to represent.
	 * @param name The string with which `this` object is identified.
	 * @throws Throws an error if a {@link Scalar.Constant} with the same name has been defined previously.
	 */
	export function constant(value: BigNum, name: string): Scalar.Constant;
	/**
	 * Returns a previously declared named {@link Scalar.Constant} object.
	 * @param name The name of the named {@link Scalar.Constant} object to be retrieved.
	 */
	export function constant(name: string): Scalar.Constant;
	export function constant(a: number | number[] | string[] | Component | BigNum | string, b?: string) {
		if(typeof a === "string") {
			const value = NAMED_CONSTANTS.get(a);
			if(value === undefined)
				throw Error(`No such constant defined: ${a}.`);
			return value;
		}
		let name = "";
		if(b !== undefined) {
			if(NAMED_CONSTANTS.get(b) !== undefined)
				throw new Overwrite(b);
			name = b;
		}
		let big: BigNum;
		if(typeof a === "number") big = BigNum.real(a);
		else if(Array.isArray(a))
			if(typeof a[0] === "number") big = BigNum.hyper(<Array<number>>a);
			else big = BigNum.hyper(<Array<string>>a);
		else if(a instanceof Component) big = new BigNum(a);
		else big = a;
		const value = name === ""? new Scalar.Constant(big): new Scalar.Constant(big, name);
		if(name !== "") NAMED_CONSTANTS.set(name, value);
		return value;
	}

	/**
	 * Creates a new {@link Scalar.Variable} object if it has not been created before.
	 * Otherwise just returns the previously created object.
	 * @param value 
	 */
	export function variable(name: string) {
		let v = VARIABLES.get(name);
		if(v === undefined) {
			v = new Scalar.Variable(name);
			VARIABLES.set(name, v);
		}
		return v;
	}

	export const ZERO = Scalar.constant(0);
}

/**
 * Represents the idea of infinity.
 */
// export const oo = Scalar.constant(Infinity);
/**
 * The irrational Euler's number. The derivative of the exponential function to
 * the base of this number gives the same exponential function.
 */
export const e = Scalar.constant(Component.E);
/**
 * The circle constant pi. It is defined as the ratio of the circumference
 * of a circle to its diameter.
 */
export const pi = Scalar.constant(Component.PI);
/**
 * The circle constant tau. It is defined as the ratio of the circumference
 * of a circle to its radius. It is twice the value of pi.
 */
export const tau = Scalar.constant(Component.TWO.mul(Component.PI, {precision: 50, rounding: RoundingMode.UP}));