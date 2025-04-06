sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'lego/store/legostore/test/integration/FirstJourney',
		'lego/store/legostore/test/integration/pages/customSaleOrderMain'
    ],
    function(JourneyRunner, opaJourney, customSaleOrderMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('lego/store/legostore') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThecustomSaleOrderMain: customSaleOrderMain
                }
            },
            opaJourney.run
        );
    }
);