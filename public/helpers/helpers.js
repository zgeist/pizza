define(
    [], 

    function(){
        var Helpers = {};

        Helpers.getDeliveryTime = function(timestamp){

            var times = {
                diff : timestamp,
                ms : Math.floor( timestamp            % 1000 ),
                s  : Math.floor( timestamp /     1000 %   60 ),
                m  : Math.floor( timestamp /    60000 %   60 ),
                h  : Math.floor( timestamp /  3600000 %   24 ),
                d  : Math.floor( timestamp / 86400000        )
                }, time = '';

                if(times['d'] > 0) time += times['d'] + ' Days ';
                if(times['h'] > 0) time += times['h'] + ' Hours ';
                if(times['m'] > 0) time += times['m'] + ' Minutes ';
                if(times['s'] > 0) time += times['s'] + ' Seconds';

            return time;

        }

        return Helpers;  
    
    }
);    

    