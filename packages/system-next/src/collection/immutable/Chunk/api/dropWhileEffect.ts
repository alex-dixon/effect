import type { Effect } from "../../../../io/Effect/definition"
import { chain_ } from "../../../../io/Effect/operations/chain"
import { map_ } from "../../../../io/Effect/operations/map"
import { succeedNow } from "../../../../io/Effect/operations/succeedNow"
import { suspendSucceed } from "../../../../io/Effect/operations/suspendSucceed"
import { concreteId } from "../_definition"
import * as Chunk from "../core"

/**
 * Drops all elements so long as the predicate returns true.
 */
export function dropWhileEffect_<R, E, A>(
  self: Chunk.Chunk<A>,
  f: (a: A) => Effect<R, E, boolean>
): Effect<R, E, Chunk.Chunk<A>> {
  return suspendSucceed(() => {
    const iterator = concreteId(self).arrayLikeIterator()
    let next
    let dropping: Effect<R, E, boolean> = succeedNow(true)
    let builder = Chunk.empty<A>()

    while ((next = iterator.next()) && !next.done) {
      const array = next.value
      const len = array.length
      let i = 0
      while (i < len) {
        const a = array[i]!
        dropping = chain_(dropping, (d) =>
          map_(d ? f(a) : succeedNow(false), (b) => {
            if (!b) {
              builder = Chunk.append_(builder, a)
            }
            return b
          })
        )
        i++
      }
    }
    return map_(dropping, () => builder)
  })
}

/**
 * Drops all elements so long as the predicate returns true.
 *
 * @ets_data_first dropWhileEffect_
 */
export function dropWhileEffect<R, E, A>(
  f: (a: A) => Effect<R, E, boolean>
): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<A>> {
  return (self) => dropWhileEffect_(self, f)
}