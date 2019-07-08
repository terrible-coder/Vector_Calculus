## Function add

<declaration>

public add(that: [Scalar](reference/v/0.2.1/quantities/Scalar)): [Scalar.Expression](reference/v/0.2.1/quantities/Scalar.Expression)

</declaration>

Adds `this` variable scalar to another scalar. The [type](reference/v/0.2.1/core/definitions/Evaluable/type)
of `that` does not matter, whatever it may be the result of adding `that` to
a variable scalar is always going to be a scalar expression.

### Parameters
* **that**: [Scalar](reference/v/0.2.1/quantities/Scalar)<br>
 The [Scalar](reference/v/0.2.1/quantities/Scalar) object to add with `this`.

### Returns
[Scalar.Expression](reference/v/0.2.1/quantities/Scalar.Expression):
A [Scalar.Expression](reference/v/0.2.1/quantities/Scalar.Expression) object
representing the scalar expression formed by adding `this` with `that`.