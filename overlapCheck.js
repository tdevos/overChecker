(function ( $ ) {
    $.fn.overlapCheck = function(options) {
        
        var $settings = $.extend({
            elements: null,
            elementsToCompare: null,
            container: this,
            callback: null,
            deadZone: 0,
            type : ["horizontal", "vertical"]
        }, options );
        var $overlap=[];
        
        var getCoord = function($element){
            $left = $element.position().left;
            $top = $element.position().top;
            $width = $element.width();
            $height = $element.height();
            $item = {
                left : $left,
                right : $left + $width,
                top : $top,
                bottom : $top + $height
            };
            return $item;
        }
        
        var parseFloat = function($value){
            $value = $value.split("/");
            return parseInt($value[0]) / parseInt($value[1]);
        }
        
        var calculateHDeadZone = function(){
            if($.isNumeric($settings.deadZone)){
                return $settings.deadZone;
            }else{
                console.log($settings.elementsToCompare.width() * parseFloat($settings.deadZone));
                return $settings.elementsToCompare.width() * parseFloat($settings.deadZone);
            }
        }
        var calculateVDeadZone = function(){
            if($.isNumeric($settings.deadZone)){
                return $settings.deadZone;
            }else{
                console.log($settings.elementsToCompare.width() * parseFloat($settings.deadZone));
                return $settings.elementsToCompare.width() * parseFloat($settings.deadZone);
            }
        }
        
        var getRatio = function($element1, $element2){
            $item1 = getCoord($element1);
            $item2 = getCoord($element2);
            
            $compare = $item1.right - $item1.left;
            
            $diff = $item2.right - $item1.left;
            if($diff > $compare){
                $diff = $item1.right - $item2.left;
                if($diff > $compare){
                    $diff = $compare;
                }
            }
            return $diff / $compare;
        }
        
        var overlapHorizontally = function($element1, $element2){
            if($.inArray("horizontal", $settings.type) === -1)
                return true;
            $item1 = getCoord($element1);
            $item2 = getCoord($element2);
            if($item1.right - calculateHDeadZone() > $item2.left 
                    && $item1.left + calculateHDeadZone() < $item2.right){
                return true;
            }else{
                return false;
            }
        }
        
        var overlapVertically = function($element1, $element2){
            if($.inArray("vertical", $settings.type) === -1)
                return true;
            $item1 = getCoord($element1);
            $item2 = getCoord($element2);
            if($item1.bottom - calculateVDeadZone() > $item2.top 
                    && $item1.top  + calculateVDeadZone() < $item2.bottom){
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
                    if(overlapHorizontally($element1, $element2) 
                            & overlapVertically($element1, $element2)){
                        $overlap.push({
                            element: $(this),
                            ratio: getRatio($element1, $element2)
                        });
                    }
                }
            });
        });
        
        $($overlap).each(function($id, $over){
            $settings.callback.call(this, $over.element, $over.ratio);
        });
    }
}( jQuery ));