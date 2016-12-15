regApp.directive('focus', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focus);
            scope.$watch(model, function (value) {
                if (value === true) {
                    $timeout(function () {
                        element[0].focus(); //set focus on search input box
                    });
                } else if (value === false) {
                    $timeout(function () {
                        element[0].blur(); //set focus on search input box
                    });
                }
            });
            // set attribute value to 'false'
            // on blur event:
            element.bind('blur', function () {
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}]);