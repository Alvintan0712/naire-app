import React, { useState } from 'react';
import { Pagination } from 'semantic-ui-react';

function usePagination(items, {maxPageSize = 30, menuProps = {}} = {}) {
  const [activePage, setActivePage] = useState(0);

  function reset() {
    setActivePage(0);
  }

  if (!items)
    return {
      activeItems: [],
      menu: null,
      activeOffset: 0,
      reset,
    };

  const tot = items.length;
  if (tot <= maxPageSize)
    return {
      activeItems: items,
      menu: null,
      activeOffset: 0,
      reset,
    };

  const totalPages = Math.ceil(tot / maxPageSize);
  const activeItems = [];
  const activeOffset = activePage * maxPageSize;
  if (tot) {
    const ni = Math.min((activePage + 1) * maxPageSize, tot);
    for (let i = activeOffset; i < ni; ++i)
      activeItems.push(items[i]);
  }

  const menu = (
    <Pagination
      activePage={activePage + 1}
      onPageChange={(e, {activePage}) => setActivePage(activePage - 1)}
      totalPages={totalPages}
      firstItem={null}
      lastItem={null}
      {...menuProps}
    />
  );

  return {
    activeItems,
    menu,
    activeOffset,
    reset,
  };
}

export { usePagination };
