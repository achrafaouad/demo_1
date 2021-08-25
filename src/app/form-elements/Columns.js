import { format } from 'date-fns'
import { ColumnFilter} from './ColumnFilter'
export const COLUMNS = [
    {
        Header: 'id operation',
        Footer:'id_operation',
        accessor:'id_operation',
        Filter: ColumnFilter,
        disableFilters:true
    },
    {
        Header: 'date_application',
        Footer:'date_application',
        accessor:'date_application',
        
        Filter: ColumnFilter,

         Cell: ({ value }) => {
             if(value) return format(new Date(value), 'dd/MM/yyyy')
             else return '-'
           }
    },
    {
        Header: 'Exploitation',
        Footer:'nomFoncier',
        accessor:'nomFoncier'
        ,
        Filter: ColumnFilter
        
    },
    {
        Header: 'Surface travaillée',
        Footer:'surface',
        accessor:'surface'
        ,
        Filter: ColumnFilter,
        Cell: ({ value }) => {
            if(value)
            return  value + 'ha'
            else return '-'
          }
    },
    {
        Header: 'Travaux',
        Footer:'travaux',
        accessor:'travaux'
        ,
        Filter: ColumnFilter,
        
        
    },
    {
        Header: 'Durée de l’opération',
        Footer:'Durée de l’opération',
        accessor:'duré'
        ,
        Filter: ColumnFilter
    },
    {
        Header: 'Produits',
        Footer:'Produits',
        accessor: 'prod'
        ,
        Filter: ColumnFilter
    },
    {
        Header: 'Opérateurs',
        Footer:'Opérateurs',
        accessor:'operateur'
        ,
        Filter: ColumnFilter,
        
    },
    {
        Header: 'Matériels',
        Footer:'Matériels',
        accessor:'matName'
        ,
        Filter: ColumnFilter
    },
    {
        Header: 'Notes',
        Footer:'Notes',
        accessor:'note'
        ,
        Filter: ColumnFilter
    },
    {
        Header: 'Prix total',
        Footer:'prix_total',
        accessor:'prix_totale'
        ,
        Filter: ColumnFilter,
        Cell: ({ value }) => {
            return value + "dh"
          }
    }
]