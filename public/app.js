define(
    ['models', 'collections', 'views', 'exports'],

    function(Models, Collections, Views, exports){

        var initialize = function(){
            
            exports.pizzasCollection = new Collections.PizzasList;
            
            exports.cartCollection = new Collections.CartCollection();

            exports.summaryPrice = new Models.SummaryPrice;

            exports.summaryPriceView = new Views.SummaryPriceView({
                model: exports.summaryPrice
            });

            exports.order = new Views.Order();
            
        }
        
        return {
            initialize: initialize
        };
    }
);