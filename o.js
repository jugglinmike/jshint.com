module.exports = {
  /**
   * This option prohibits the use of bitwise operators such as `^` (XOR), `|`
   * (OR) and others. Bitwise operators are very rare in JavaScript programs
   * and quite often `&` is simply a mistyped `&&`.
   *
   * @category enforcers
   */
  bitwise: {
    dflt: false,
    type: "boolean"
  },

  /**
   * This option warns when you define and never use your variables. It is very
   * useful for general code cleanup, especially when used in addition to
   * `undef`.
   *
   *     //jshint unused:true
   *
   *     function test(a, b) {
   *       var c, d = 2;
   *
   *       return a + d;
   *     }
   *
   *     test(1, 2);
   *
   *     // Line 3: 'b' was defined but never used.
   *     // Line 4: 'c' was defined but never used.
   *
   * In addition to that, this option will warn you about unused global
   * variables declared via `global` directive.
   *
   * This can be set to `vars` to only check for variables, not function
   * parameters, or `strict` to check all variables and parameters.  The
   * default (true) behavior is to allow unused parameters that are followed by
   * a used parameter.
   *
   * @category enforcers
   */
  unused: {
    dflt: true,
    type: [true, false, "vars", "strict"]
  }
};
