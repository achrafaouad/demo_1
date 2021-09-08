import { format } from 'date-fns'
import { ColumnFilter} from './ColumnFilter'
export const COLUMNS = [
    {
        Header: 'Parcelle',
        Footer:'parcelle',
        accessor:'nomFoncier',
        
        Filter: ColumnFilter,

    },

    {
        Header: 'Coûts totaux',
        Footer:'Coûts_totaux',
        accessor:'priceTot',
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
        accessor:'recolt'
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
        Header: 'machinerie',
        Footer:'machinerie',
        accessor:'matPrice',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
    },
    {
        Header: 'Opérateur',
        Footer:'Opérateur',
        accessor: 'operateur',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
        
    },
    {
        Header: 'Semence/Plante',
        Footer:'Semence/Plante',
        accessor:'Sem',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
        
        
    },

    {
        Header: 'Engrais',
        Footer:'Engrais',
        accessor:'Eng',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
        
        
    },

    {
        Header: 'PHYTOSANITAIRE',
        Footer:'phytosanitaire',
        accessor:'Phy',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
        
        
    }
    ,

    {
        Header: 'Toutes les Entrants',
        Footer:'Entrant',
        accessor:'Entrant',
        Filter: ColumnFilter,
        disableFilters:true,
        Cell: ({ value }) => {
            if(value) return Math.round(value) + ' dh'
            else return '-'
          }
        
    }
    ,

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