// ets_tracing: off

import * as T from "../../../../Effect"
import type { Predicate } from "../../../../Function"
import * as M from "../../../../Managed"
import type * as C from "../core"
import * as RunReduceWhileManaged from "./runReduceWhileManaged"

/**
 * Reduces the elements in the stream to a value of type `S`.
 * Stops the fold early when the condition is not fulfilled.
 */
export function runReduceWhile_<R, E, A, S>(
  self: C.Stream<R, E, A>,
  s: S,
  cont: Predicate<S>,
  f: (s: S, a: A) => S
): T.Effect<R, E, S> {
  return M.use_(
    RunReduceWhileManaged.runReduceWhileManaged_(self, s, cont, (s, a) => f(s, a)),
    T.succeed
  )
}

/**
 * Reduces the elements in the stream to a value of type `S`.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first runReduceWhile_
 */
export function runReduceWhile<A, S>(s: S, cont: Predicate<S>, f: (s: S, a: A) => S) {
  return <R, E>(self: C.Stream<R, E, A>) => runReduceWhile_(self, s, cont, f)
}