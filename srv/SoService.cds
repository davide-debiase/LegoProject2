using { API_SALES_ORDER_SRV as external } from './external/API_SALES_ORDER_SRV';

service SoService {  
    entity A_SalesOrder as projection on external.A_SalesOrder ;
    
    entity customSaleOrder {
        key SOID            :Integer;
        key RETAILERID      : String(5);
        RETAILERNAME        : String(50);
        DATE                : Date @mandatory;
        TOTALPRICE          : Decimal(13,3) ;
        SOITEM              : Association to many customSaleOrderItem  on SOITEM.SOID = $self.SOID @mandatory;
    }
    entity customSaleOrderItem {
        key SOID            : Integer;
        key SOITEMID       : Integer;
        SKU                 : Integer @mandatory;
        DESCRIPTION         : String(255) ;
        THEME               : String(50) @mandatory;
    }
    entity material{
        key SKU : Integer;
        DESCRIPTION : String(255);
        STARTDATE : Date;
        ENDDATE : Date;
        ACTIVE: Boolean;
        Quantity:Integer;
        Price: Decimal(13,3) ;
    }
}