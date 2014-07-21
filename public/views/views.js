define(
    ['underscore', 'backbone', 'jquery', 'handlebars', 'app', 'helpers'],

    function(_, Backbone, $, Handlebars, App, Helpers){
        
        var Views = {}; // Global views object, will be inject in other modules

        Views.PizzasView = Backbone.View.extend({

            el: $('.pizzas'), // Conteiner for pizza items

            initialize: function(){
                this.render(); // Render each new one
            },
            render: function(){

                this.collection.each(function(pizza){
                    var pizzaView = new Views.PizzaView( { model: pizza } ); // Create new pizza view, this get pizza model

                    this.$el.append(pizzaView.render()); // Append to initialize container
                }, this);
            }
        });

        Views.PizzaView = Backbone.View.extend({
            tagName: 'div',
            className: 'col-xs-3',
            // Register events click
            events: {
                'click .order-pizza' : 'addToCart'
            },
            template: Handlebars.compile( $('#pizza-item').text() ), // Compile pizza item template
            initialize: function(){
                this.render(); 
            },
            render: function(){
                return this.$el.html( this.template( this.model.toJSON() ) ); // Render and append to this DOM element
            },
            addToCart: function(){
                // Add to collections new one
                
                if(!App.cartCollection.contains(this.model)){
                    App.cartCollection.add(
                        this.model
                    );
                }else{
                    this.model.set('count', this.model.get('count') + 1)        
                }
            }
        });

        Views.CartView = Backbone.View.extend({
            el: $('.cart-inner'),
            render: function(){
                this.$el.html('');

                this.collection.each(function(pizza){

                    var cartItemView = new Views.CartItemView( { model: pizza } );

                    this.$el.append(cartItemView.render().el);
                }, this);
            }
        });

        Views.CartItemView = Backbone.View.extend({
            tagName: 'div',
            className: 'cart-item',
            template: Handlebars.compile( $('#cart-item').text() ),
            events: {
                'click .delete-item' : 'destroy'
            },
            initialize: function(){
                this.render();
                this.model.on('destroy', this.remove, this);
                this.model.on('change', this.render, this)
            },
            render: function(){

                this.$el.html( this.template( this.model.toJSON() ) );

                return this;
            },
            destroy: function(){
                this.model.destroy();
            },
            remove: function(){
                this.$el.remove();
            }
        });

        Views.SummaryPriceView = Backbone.View.extend({
            el: $('.summary-price'),
            initialize: function(){
                this.render();

                this.model.on('change', this.render, this);
            },
            render: function(){
                this.$el.html(this.model.get('price') + "$")
            }
        });

        Views.Order = Backbone.View.extend({
            el: $('.order-cart'),
            url: '/order',
            events: {
                'click' : 'order'
            },
            order: function(){

                if(App.cartCollection.models.length > 0){

                    $.get( this.url, function(result){

                        var result = JSON.parse(result);

                        if(!result.success) return false;

                        var tpl = Handlebars.compile( $('#order-ok').text() )
                        
                        $('.cart').append( tpl( {
                            time: Helpers.getDeliveryTime(result.deliveryTime)
                        } ) );

                    });
                }
            }
        });

        // Return views for the module
        return Views;
    }
);

