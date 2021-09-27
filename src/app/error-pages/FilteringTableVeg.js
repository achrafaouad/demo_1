import React, { useMemo } from 'react'
import { useTable ,useGlobalFilter, useFilters,usePagination} from 'react-table'
//import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNSVeg } from './ColumnsVeg'
import './Style.css'
import { GlobalFilter } from './GlobalFilter'
import ReactHTMLTableToExcel from "react-html-table-to-excel"


var MOCK_DATA = []

export const FilteringTableVeg = ({datadnem ,handlechangement, values}) => {

  console.log( "camilia" ,datadnem)
  MOCK_DATA = datadnem;
  
  

  const columns = useMemo(() => COLUMNSVeg, [])
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
    initialState: { pageSize: 16 } 
  }, useGlobalFilter , useFilters,usePagination)
  

  const {globalFilter , pageIndex , pageSize} = state;
  
  return (
    
    < >
    <div className="d-flex flex-row-reverse bd-highlight" style={{margin:"10px"}}>
    <div style={{margin:"10px"}}>
      
    <ReactHTMLTableToExcel className="btn btn-info" table="emp-table1"  filename="Emp Excel file" sheet="Sheet" buttonText="Export to Excel"/>
    </div>
    
    <div style={{margin:"10px"}}>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}  />
    </div>
    </div>
   
    <div class="mb-3 " style={{margin:"10px" , width:"200px"}}>
    <span>filtrer vos resultats</span>
              <select className="custom-select custom-select-sm" onChange={handlechangement } value={String(values)} >
                <option value="7">dernière semaine</option>
                <option value="14">dernière deux semaines</option>
                <option value="30">dernière mois</option>
                <option value="90">dernière 3 mois</option> 
                <option value="365">dernière année </option> 
              </select>
            </div>
      <table {...getTableProps()} id="emp-table1">
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