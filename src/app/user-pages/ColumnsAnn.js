import { format } from 'date-fns'
import { ColumnFilter} from './ColumnFilter'
export const COLUMNSAnn = [
    {
        Header: 'Parcelle',
        Footer:'parcelle',
        accessor:'nom',
        
        Filter: ColumnFilter,

    },
    {
        Header: 'Espèce',
        Footer:'Espèce',
        accessor:'type',
        
        Filter: ColumnFilter,

    },

    {
        Header: 'Coûts totaux',
        Footer:'Coûts_totaux',
        accessor:'prixtot',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
        
    },
    {
        Header: 'Produit',
        Footer:'produit',
        accessor:'Produit'
        ,
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
        
    },
    {
        Header: 'Marge Nette',
        Footer:'marge_nette',
        accessor:'margeNet',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
    },
    {
        Header: 'Oeufs',
        Footer:'machinerie',
        accessor:'eggs',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return value + 'Oeuf'
            else return '-'
          }
    },
    {
        Header: 'Lait',
        Footer:'Lait',
        accessor:'Lait',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return value + 'L'
            else return '-'
          }
    },
    {
        Header: 'traitements',
        Footer:'traitements',
        accessor: 'traitements',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
        
    },
    {
        Header: 'alimentation',
        Footer:'alimentation',
        accessor: 'alimentation',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
        
    },
   
    {
        Header: ' le Roi',
        Footer:'Roi',
        accessor:'Roi',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + "%"
            else return '-'
          }  
        
    }
]