var rangeSlider = function () {
    var slider = $('.range-slider'),
            range = $('.range-slider__range'),
            value = $('.range-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

rangeSlider();

mainAppModule.directive('range', function () {
    return{
        templateUrl: 'controls/range/range.html',
        restirct: 'E',
        replace: true,
        transclude: true,
        link: function (scope, element, attrs) {
           
           scope.value = 0;
           var slider = element;
           
        }

    }
});