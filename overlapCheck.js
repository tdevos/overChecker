(function ( $ ) {
    $.fn.overlapCheck = function(options) {
        
        var $settings = $.extend({
            elements: null,
            elementsToCompare: null,
            container: this,
            callback: null,
            type : ["horizontal", "vertical"]
        }, options );
        var $overlap=[];
        
        var getCoord = function($element){
            $left = $element.position().left;
            $top = $element.position().top;
            $width = $element.width();
            $height = $element.height();
            $item = {};
            $item.left = $left;
            $item.right = $left + $width;
            $item.top = $top;
            $item.bottom = $top + $height;
            return $item;
        }
        
        var overlapHorizontally = function($element1, $element2){
            if($.inArray("horizontal", $settings.type) === -1)
                return true;
            console.log("b");
            $item1 = getCoord($element1);
            $item2 = getCoord($element2);
            if($item1.right > $item2.left && $item1.left < $item2.right){
                return true;
            }else{
                return false;
            }
        }
        
        var overlapVertically = function($element1, $element2){
            if($.inArray("vertical", $settings.type) === -1)
                return true;
            console.log("a");
            $item1 = getCoord($element1);
            $item2 = getCoord($element2);
            if($item1.bottom > $item2.top && $item1.top < $item2.bottom){
                return true;
            }else{
                return false;
            }
        }
        
        $settings.elementsToCompare.each(function(){
            $element1 = $(this);
            $settings.container.children($settings.elements).each(function(){
                $element2 = $(this);
                if($element1[0] !== $element2[0]){
                    if(overlapHorizontally($element1, $element2) && overlapVertically($element1, $element2)){
                        $overlap.push($(this));
                    }
                }
            });
        });
        
        $($overlap).each(function($id, $element){
            $settings.callback.call(this, $element);
        });
    }
}( jQuery ));