const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const SoService = await cds.connect.to('API_SALES_ORDER_SRV');
    this.on('READ', 'A_SalesOrder', async req => {        
        return SoService.run(req.query);       
    });
});