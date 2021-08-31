import { format } from 'date-fns'
import { ColumnFilter} from './ColumnFilter'
export const COLUMNS = [
    {
        Header: 'id operation',
        Footer:'id',
        accessor:'id',
        Filter: ColumnFilter,
        disableFilters:true
    },
    {
        Header: 'date_application',
        Footer:'date',
        accessor:'date',
        
        Filter: ColumnFilter,

         Cell: ({ value }) => {
             if(value) return format(new Date(value), 'dd/MM/yyyy')
             else return '-'
           }
    },
    {
        Header: 'Mouvement',
        Footer:'date',
        accessor:'Mouvement',
        
        Filter: ColumnFilter
    },
    {
        Header: 'TYPE',
        Footer:'TYPE',
        accessor:'type'
        ,
        Filter: ColumnFilter
        
    },
    {
        Header: 'Numéro de lot',
        Footer:'surface',
        accessor:'numéro_de_lot'
        ,
        Filter: ColumnFilter,
        
    },
    {
        Header: 'N° de facture',
        Footer:'N° de facture',
        accessor:'n_facture'
        ,
        Filter: ColumnFilter,
        
        
    },
    {
        Header: 'Produit',
        Footer:'Durée de l’opération',
        accessor:'nom'
        ,
        Filter: ColumnFilter
    },
    {
        Header: 'Quantité',
        Footer:'Durée de l’opération',
        accessor:'quantite_produit'
        ,
        Filter: ColumnFilter,

        Cell: ({ value }) => {
            if(value) return  value + ' kg'
            else return '-'
          }
    },
    {
        Header: 'Client',
        Footer:'Produits',
        accessor: 'client'
        ,
        Filter: ColumnFilter
    },
    {
        Header: 'Note',
        Footer:'Opérateurs',
        accessor:'note'
        ,
        Filter: ColumnFilter,
        
    }
]