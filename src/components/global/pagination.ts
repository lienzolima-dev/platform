type GetPaginationButtons = (options: {
  totalPages: number;
  maxBtns: number;
  currentPage: number;
}) => number[];

/**
 *
 * Returns an array of numbers to be used as pagination buttons
 * @param maxBtns represents the maximum number of buttons to be displayed
 *
 * @example
 * ```js
 * getPaginationButtons(10, 5, 3); // returns: [1, 2, 3, 4, 5]
 * getPaginationButtons(10, 5, 8); // returns: [6, 7, 8, 9, 10]
 * ```
 */
export const getPaginationButtons: GetPaginationButtons = ({
  totalPages,
  maxBtns,
  currentPage,
}) => {
  let max = maxBtns;
  if (totalPages <= maxBtns) max = totalPages;

  const half = Math.floor(max / 2);
  let to = max;

  if (currentPage + half >= totalPages) {
    to = totalPages;
  } else if (currentPage > half) {
    to = currentPage + half;
  }
  const from = to - max;

  const arr = Array.from({ length: max }, (_, i) => from + i + 1);
  return arr;
};
