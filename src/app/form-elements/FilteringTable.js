import React, { useMemo } from 'react'
import { useTable ,useGlobalFilter, useFilters,usePagination} from 'react-table'
//import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './Columns'
import './Style.css'
import { GlobalFilter } from './GlobalFilter'
import ReactHTMLTableToExcel from "react-html-table-to-excel"




var MOCK_DATA = []

export const FilteringTable = ({datadnem}) => {

  console.log( "hanadzeb" ,datadnem)
  MOCK_DATA = datadnem;
  

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    //rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
    setPageSize
  } = useTable({
    columns,
    data,
    initialState: { pageSize: 10 } 
  }, useGlobalFilter , useFilters,usePagination)
  

  const {globalFilter , pageIndex , pageSize} = state;
  
  return (
    
    < >
    <div className="d-flex flex-row-reverse bd-highlight" style={{margin:"10px"}}>
    <div style={{margin:"10px"}}>
      
    <ReactHTMLTableToExcel className="btn btn-info" table="emp-table2"  filename="Emp Excel file" sheet="Sheet" buttonText="Export to Excel"/>
    </div>
    <div style={{margin:"10px"}}>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    </div>
    </div>

      <table {...getTableProps()} id="emp-table2">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                <div  style={{color:"black"}}>{column.canFilter ? column.render('Filter') : null}</div>
                </th>

              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} style={{color:"black"}}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        
      </table>
      <div>
        <span style={{color:"#ffff"}}>
          Page {' '} <strong> {pageIndex + 1} du {pageOptions.length} </strong>{' '}
        </span>
          <button className="btn btn-success btn-sm" onClick = {()=> previousPage()} disabled={!canPreviousPage}> Previous</button>
          <button className="btn btn-success btn-sm" onClick = {()=> nextPage()} disabled={!canNextPage} > Next</button>
      </div>
    </>
  )
}