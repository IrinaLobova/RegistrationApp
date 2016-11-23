regApp.directive('focus', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focus);
            scope.$watch(model, function (value) {
                //console.log('value=' + value);
                if (value === true) {
                    $timeout(function () {
                        element[0].focus(); //set focus on search input box
                    });
                }
            });
            // set attribute value to 'false'
            // on blur event:
            element.bind('blur', function () {
                console.log('blur');
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}]);