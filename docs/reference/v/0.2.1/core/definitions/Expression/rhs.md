## Property rhs

readonly lhs: Evaluable;

The right hand side operand for [`this.op`](reference/v/0.2.1/core/definitions/Expression/op).
This value should be available only when [`this.op`](reference/v/0.2.1/core/definitions/Expression/op)
is a [BinaryOperator](reference/v/0.2.1/core/operators/BinaryOperator).

### Throws
 If [`this.op`](reference/v/0.2.1/core/definitions/Expression/op) is a
 [UnaryOperator](reference/v/0.2.1/core/operators/UnaryOperator).