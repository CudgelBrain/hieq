import React, { useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  Column,
  useAsyncDebounce,
} from 'react-table';
import Spinner from 'assets/images/spinner.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import CSVDownloader from 'components/CSVDownloader';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  status: string | number;
  filter?: boolean;
  className?: string;
  paginate?: boolean;
  sorting?: boolean;
  itemCount?: boolean;
  tableTitle?: string;
  data: Array<Record<string, any>>;
  exportCSV?: Array<Record<string, any>>;
  columns: Array<Column<Record<string, any>>>;
}

const TextFilter = (data: Record<string, any>) => {
  const {
    column: { filterValue, preFilteredRows, setFilter },
  } = data;
  const [value, setValue] = useState(filterValue);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 200);
  return (
    <input
      value={value || ''}
      className='form-control'
      onChange={(event) => {
        setValue(event.target.value);
        onChange(event.target.value);
      }}
      placeholder={`Search ${preFilteredRows.length} records...`}
    />
  );
};

export const SelectFilter = (data: Record<string, any>) => {
  const {
    column: { filterValue, setFilter, preFilteredRows, id },
  } = data;
  const options = React.useMemo(() => {
    const options: Set<string> = new Set();
    preFilteredRows.forEach((row: Record<string, any>) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      className='custom-select form-control'
      onChange={(event) => {
        setFilter(event.target.value || undefined);
      }}
    >
      <option value=''>All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export const DateFilter = (data: Record<string, any>) => null;

const Table: React.FC<Props> = (props) => {
  const {
    status,
    columns,
    data,
    filter,
    exportCSV,
    paginate,
    sorting,
    itemCount,
    tableTitle,
    className,
  } = props;

  const defaultColumn = React.useMemo(
    () => ({
      Filter: TextFilter,
    }),
    [],
  );

  const {
    page,
    state,
    gotoPage,
    nextPage,
    pageCount,
    prepareRow,
    setPageSize,
    canNextPage,
    headerGroups,
    previousPage,
    getTableProps,
    canPreviousPage,
    getTableBodyProps,
  } = useTable(
    {
      data,
      columns,
      defaultColumn,
    },
    useFilters,
    useSortBy,
    usePagination,
  );
  const { pageIndex, pageSize } = state;

  return (
    <div className={className}>
      {status === 'loading' && (
        <div className='hieq-Spinner'>
          <img src={Spinner} width='160' height='100' alt='' />
        </div>
      )}
      {status !== 'loading' && (
        <React.Fragment>
          <h5 className='heading d-flex align-items-center'>
            {tableTitle && <span className='mr-3'>{tableTitle}</span>}
            {exportCSV && <CSVDownloader data={exportCSV} fileName={tableTitle ?? 'download'} />}
          </h5>
          <div className='row'>
            {itemCount && (
              <div className='col-sm-12 col-md-6'>
                <label className='selectLabel'>
                  Show
                  <select
                    className='custom-select custom-select-sm form-control form-control-sm'
                    value={pageSize}
                    onChange={(event) => {
                      setPageSize(Number(event.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                  Entries
                </label>
              </div>
            )}
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='table-responsive'>
                <table
                  {...getTableProps()}
                  className='table custom-table table-bordered table-hover'
                >
                  <thead>
                    {headerGroups.map((headerGroup, key) => (
                      <React.Fragment key={key}>
                        <tr>
                          {headerGroup.headers.map((column, key) => (
                            <th key={key}>
                              <span>
                                {filter && column.canFilter ? column.render('Filter') : null}
                              </span>
                            </th>
                          ))}
                        </tr>
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column, index) => (
                            <th
                              {...column.getHeaderProps(column.getSortByToggleProps())}
                              key={index}
                            >
                              <div className='d-flex'>
                                {column.render('Header')}
                                {sorting && (
                                  <span>
                                    {column.isSorted ? (
                                      column.isSortedDesc ? (
                                        <FontAwesomeIcon icon={faCaretDown as IconProp} />
                                      ) : (
                                        <FontAwesomeIcon icon={faCaretUp as IconProp} />
                                      )
                                    ) : (
                                      <FontAwesomeIcon icon={faSort as IconProp} />
                                    )}
                                  </span>
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </React.Fragment>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} key={index}>
                          {row.cells.map((cell, innerIndex) => {
                            return (
                              <td {...cell.getCellProps()} key={innerIndex}>
                                {cell.render('Cell')}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    {page.length === 0 && (
                      <tr>
                        <td colSpan={columns.length}>No data available in table</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {paginate && (
            <div className='row mt-4'>
              <div className='col-sm-12 col-md-5'>
                <div className='page-count'>
                  {`Showing ${
                    pageIndex * 10 + 1 > data.length ? data.length : pageIndex * 10 + 1
                  } to ${
                    (pageIndex + 1) * 10 > data.length ? data.length : (pageIndex + 1) * 10
                  } of ${data.length} Entries`}
                </div>
              </div>
              <div className='col-sm-12 col-md-7'>
                <span className='pagination'>
                  <button
                    className='btn btn-primary'
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    {'<<'}
                  </button>
                  <button
                    className='btn btn-primary'
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Previous
                  </button>
                  <button
                    className='btn btn-primary'
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    Next
                  </button>
                  <button
                    className='btn btn-primary'
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    {'>>'}
                  </button>
                </span>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Table;
