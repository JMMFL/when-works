import { useCallback, useMemo, useState } from "react";

export default function useIterator(array = [], initialIndex = 0) {
  const [index, setIndex] = useState(initialIndex);
  const endIndex = array.length - 1;

  const previous = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }, [index]);

  const next = useCallback(() => {
    if (index <= endIndex) {
      setIndex(index + 1);
    }
  }, [index, endIndex]);

  const element = useMemo(() => array[index], [index, array]);

  return [element ?? array[initialIndex], { previous, next }];
}
