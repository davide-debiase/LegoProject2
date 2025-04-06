   namespace SoService;
    entity customSaleOrder {
        key SOID            :Integer;
        key RETAILERID      : String(5);
        RETAILERNAME        : String(50);
        DATE                : Date @mandatory;
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
    }