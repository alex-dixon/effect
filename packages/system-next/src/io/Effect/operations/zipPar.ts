import * as Tp from "../../../collection/immutable/Tuple"
import type { Effect } from "../definition"
import { zipWithPar_ } from "./zipWithPar"

/**
 * Parallely zips this effects
 *
 * @ets fluent ets/Effect zipPar
 */
export function zipPar_<R, E, A, R2, E2, A2>(
  a: Effect<R, E, A>,
  b: Effect<R2, E2, A2>,
  __etsTrace?: string
): Effect<R & R2, E | E2, Tp.Tuple<[A, A2]>> {
  return zipWithPar_(a, b, Tp.tuple, __etsTrace)
}

/**
 * Parallely zips this effects
 *
 * @ets_data_first zipPar_
 */
export function zipPar<R2, E2, A2>(b: Effect<R2, E2, A2>, __etsTrace?: string) {
  return <R, E, A>(a: Effect<R, E, A>): Effect<R & R2, E | E2, Tp.Tuple<[A, A2]>> =>
    zipPar_(a, b, __etsTrace)
}